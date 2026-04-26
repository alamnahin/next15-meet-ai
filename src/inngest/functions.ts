import OpenAI from "openai";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { meetings } from "@/db/schema";
import { inngest } from "@/inngest/client";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export const meetingsProcessing = inngest.createFunction(
  { id: "meetings-processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const transcriptUrl = await step.run("get-transcript-url", async () => {
      const [meeting] = await db
        .select({ transcriptUrl: meetings.transcriptUrl })
        .from(meetings)
        .where(eq(meetings.id, event.data.meetingId));

      if (!meeting?.transcriptUrl) {
        throw new Error("Transcript URL not found for this meeting");
      }

      return meeting.transcriptUrl;
    });

    const transcript = await step.run("download-transcript", async () => {
      return fetch(transcriptUrl).then((res) => res.text());
    });

    const output = await step.run("generate-summary", async () => {
      const completion = await openaiClient.chat.completions.create({
        model: "qwen-max",
        messages: [
          {
            role: "system",
            content:
              "You are an AI meeting secretary. Summarize the meeting into key points, decisions, blockers, and next actions.",
          },
          {
            role: "user",
            content: transcript,
          },
        ],
      });

      const summary = completion.choices[0]?.message?.content?.trim();

      if (!summary) {
        throw new Error("Failed to generate meeting summary");
      }

      return summary;
    });

    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: output,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });
  }
);