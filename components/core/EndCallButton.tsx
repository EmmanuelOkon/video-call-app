"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

import { URLS } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push(URLS.HOME);
  };

  return (
    <Button
      onClick={endCall}
      className="rounded-full border border-red-500/40 bg-red-500/15 px-4 text-sm font-semibold text-red-200 transition hover:bg-red-500/25"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
