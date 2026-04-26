# MeetMind (Async AI Meeting Secretary MVP)

MeetMind is a meeting workspace where users run normal calls, then an AI secretary handles the post-meeting work: transcript analysis, structured summaries, and follow-up Q&A chat.

## MVP Flow

1. Create a meeting and assign an AI secretary.
2. Start and run the call normally (no live AI bot joins).
3. Stream sends recording/transcription webhooks.
4. Inngest processes the transcript and generates summary output.
5. Users ask follow-up questions in post-meeting chat.

## Features

- AI secretaries with custom persona instructions
- Meeting scheduling and call management
- Automatic transcript + recording ingestion from Stream
- Background summary generation via Inngest
- Post-meeting AI Q&A chat grounded in summary + persona
- Better Auth (social + email/password)
- Neon + Drizzle persistence

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS v4 + shadcn/ui
- tRPC + TanStack Query
- Drizzle ORM + Neon PostgreSQL
- Stream Video + Stream Chat
- Inngest
- OpenAI-compatible API (configured for Qwen/Alibaba-compatible endpoint)

## Environment Variables

Create `.env` with at least:

```dotenv
DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_STREAM_VIDEO_API_KEY=
STREAM_VIDEO_SECRET_KEY=
NEXT_PUBLIC_STREAM_CHAT_API_KEY=
STREAM_CHAT_SECRET_KEY=

OPENAI_API_KEY=
OPENAI_BASE_URL=

# Optional if you use webhook tunneling
# Set this inside package.json script value
# dev:webhook -> ngrok http --url=[YOUR_NGROK_STATIC_DOMAIN] 3000
```

## Local Development

```bash
# Install deps
npm install --legacy-peer-deps

# Start app
npm run dev

# Start tunnel for Stream webhooks (optional but needed for webhook testing)
npm run dev:webhook

# Start Inngest dev server
npx inngest-cli@latest dev
```

## Useful Scripts

```bash
# Database
npm run db:push
npm run db:studio

# Build
npm run build
npm run start
```

## Notes

- Live in-call AI voice agent is intentionally removed in this MVP.
- Webhook and summary pipeline are designed for async post-meeting analysis.
- Qwen model routing is configured in:
	- `src/inngest/functions.ts`
	- `src/app/api/webhook/route.ts`
