import Link from "next/link";
import {
  CallControls,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";

interface Props {
  onLeave: () => void;
  meetingName: string;
};

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex h-full flex-col justify-between p-4 text-foreground">
      <div className="flex items-center gap-4 rounded-full border border-border bg-white/90 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm">
        <Link href="/" className="flex w-fit items-center justify-center rounded-full bg-blue-50 px-3 py-2">
          <img src="logo.png" width={180} height={52} alt="Mysoft Haven" className="h-10 w-auto object-contain" />
        </Link>
        <h4 className="text-base font-medium text-foreground">
          {meetingName}
        </h4>
      </div>
      <SpeakerLayout />
      <div className="rounded-full border border-border bg-white/90 px-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
