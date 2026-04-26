import { eq, count } from "drizzle-orm";

import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

type CurrentSubscription = {
  id: string;
  name: string;
} | null;

type Product = {
  id: string;
  name: string;
  description: string;
  metadata: {
    variant?: string;
    badge?: string | null;
  };
  prices: Array<{
    amountType: "fixed" | "free";
    priceAmount: number;
    recurringInterval: string;
  }>;
  benefits: Array<{
    description: string;
  }>;
};

export const premiumRouter = createTRPCRouter({
  getCurrentSubscription: protectedProcedure.query(async (): Promise<CurrentSubscription> => {
    // MVP: No subscription system - all users on free tier
    return null;
  }),
  getProducts: protectedProcedure.query(async (): Promise<Product[]> => {
    // MVP: No premium products available
    return [];
  }),
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    // MVP: Return free tier usage

    const [userMeetings] = await db
      .select({
        count: count(meetings.id),
      })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id));

    const [userAgents] = await db
      .select({
        count: count(agents.id),
      })
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));

    return {
      meetingCount: userMeetings.count,
      agentCount: userAgents.count,
    };
  })
});