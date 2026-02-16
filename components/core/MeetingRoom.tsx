"use client";

import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { URLS } from "@/utils/routes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-app-light text-foreground dark:bg-dark-2">
      <div className="relative flex size-full items-center justify-center px-4 pb-28 pt-6">
        <div className="flex size-full max-w-[1100px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn(
            "glass-panel ml-4 hidden h-[calc(100vh-140px)] w-[320px] overflow-hidden",
            {
              "show-block": showParticipants,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-6 left-1/2 flex w-[min(92vw,820px)] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-border bg-card/80 px-4 py-3 shadow-[0_20px_40px_rgba(8,12,26,0.25)] backdrop-blur-xl">
        <CallControls onLeave={() => router.push(URLS.HOME)} />

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl border border-border bg-card/60 px-4 py-2 text-foreground hover:bg-card/80">
                <LayoutList size={18} className="text-foreground" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-border bg-card text-foreground">
              {[
                "Grid",
                "Speaker-Left",
                "Speaker-Right"
              ].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-border" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl border border-border bg-card/60 px-4 py-2 hover:bg-card/80">
              <Users size={18} className="text-foreground" />
            </div>
          </button>
        </div>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
