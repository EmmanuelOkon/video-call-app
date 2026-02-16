"use client";
import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import Alert from "./Alert";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call?.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-app-light px-6 py-12 text-foreground dark:bg-app">
      <div className="glass-panel flex w-full max-w-xl flex-col gap-6 rounded-[28px] border border-border px-6 py-8">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-2">
            Ready to join
          </span>
          <h1 className="text-3xl font-semibold">Setup your call</h1>
          <p className="text-sm text-slate-1">
            Check your camera and microphone before entering.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card/70 p-4">
          <VideoPreview />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-1">
            <input
              type="checkbox"
              checked={isMicCamToggled}
              onChange={(e) => setIsMicCamToggled(e.target.checked)}
              className="h-4 w-4 accent-violet-2"
            />
            Join with mic and camera off
          </label>
          <DeviceSettings />
        </div>
        <Button
          className="w-full rounded-full bg-violet-1/90 px-4 py-2.5 text-white shadow-[0_14px_28px_rgba(92,79,255,0.35)] transition hover:bg-violet-2"
          onClick={() => {
            call.join();

            setIsSetupComplete(true);
          }}
        >
          Join meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
