import Link from "next/link";
import { VideoIcon, BrainIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

interface Props {
  meetingId: string;
}

export const UpcomingState = ({ meetingId }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Ready to start your meeting"
        description="Join the call, conduct your meeting normally, and your AI secretary will take care of the rest."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-lg text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-y-1 text-center p-3 rounded-lg bg-muted/40 border">
          <VideoIcon className="size-5 text-blue-600" />
          <span className="font-medium text-foreground">1. Start the call</span>
          <span className="text-xs">Join and conduct your meeting as usual</span>
        </div>
        <div className="flex flex-col items-center gap-y-1 text-center p-3 rounded-lg bg-muted/40 border">
          <FileTextIcon className="size-5 text-blue-600" />
          <span className="font-medium text-foreground">2. Transcript captured</span>
          <span className="text-xs">Everything is recorded and transcribed automatically</span>
        </div>
        <div className="flex flex-col items-center gap-y-1 text-center p-3 rounded-lg bg-muted/40 border">
          <BrainIcon className="size-5 text-blue-600" />
          <span className="font-medium text-foreground">3. AI summary ready</span>
          <span className="text-xs">Your secretary analyzes the transcript and delivers insights</span>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}