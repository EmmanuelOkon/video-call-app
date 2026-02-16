"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { motion } from "framer-motion";

import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import Loader from "./Loader";
import MeetingCard from "./MeetingCard";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Try again later" });
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  //   const earliestTimestamp = Math.min(...(upcomingCalls?.map((call) => new Date(call.state?.startsAt)?.getTime() ?? 0) ?? []));

  //   console.log(upcomingCalls);
  //   console.log(
  //     `Object ${upcomingCalls?.length} startsAt: `,
  //     upcomingCalls?.map((call) => call.state?.startsAt)
  //   );

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 xl:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <motion.div key={(meeting as Call).id} variants={itemVariants}>
            <MeetingCard
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom?.description?.substring(0, 26) ||
                (meeting as CallRecording)?.filename?.substring(0, 20) ||
                "Personal Meeting"
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === "ended"}
              link={
                type === "recordings"
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
              buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
              buttonText={type === "recordings" ? "Play" : "Start"}
              handleClick={
                type === "recordings"
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
            />
          </motion.div>
        ))
      ) : (
        <div className="glass-panel flex min-h-[240px] items-center justify-center rounded-3xl border border-border px-6 py-10 text-center text-foreground">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-2">
              Nothing here yet
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              {noCallsMessage}
            </h1>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CallList;
