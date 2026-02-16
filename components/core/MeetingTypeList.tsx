/* eslint-disable camelcase */
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import DatePicker from "react-datepicker";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import HomeCard from "./HomeCard";
import Loader from "./Loader";
import MeetingModal from "./MeetingModal";

import { useGetCalls } from "@/hooks/useGetCalls";
import { URLS } from "@/utils/routes";
import { Input } from "../ui/input";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();
  const { isLoading } = useGetCalls();
  const [isLoadingIcon, setIsLoadingIcon] = useState(false);

  const createMeeting = async () => {
    setIsLoadingIcon(true);
    if (!client || !user) {
      setIsLoadingIcon(false);
      return;
    }

    try {
      // setIsLoadingIcon(true);
      if (!values.dateTime) {
        // setIsLoadingIcon(false);
        toast({ title: "Please select a date and time" });
        return;
      }

      if (meetingState === "isJoiningMeeting") {
        console.log("joining");
        const emptyLink = values.link.trim().length === 0;
        if (emptyLink) {
          setIsLoadingIcon(false);
          toast({ title: "Provide a meeting link" });
          return;
        }
      }

      if (meetingState === "isScheduleMeeting") {
        console.log("scheduling");
        const now = new Date();
        if (values.dateTime < now) {
          // setIsLoadingIcon(false);
          toast({ title: "Selected date and time is in the past" });
          return;
        }
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <motion.section
      className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start an instant meeting"
          alt="add"
          className="bg-gradient-to-br from-[#f1f3ff] via-[#e7e9ff] to-white dark:from-violet-3/80 dark:via-violet-1/70 dark:to-[#1c1f3f]"
          handleClick={() => setMeetingState("isInstantMeeting")}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          alt="add person"
          className="bg-gradient-to-br from-[#eef3ff] via-[#e6ecff] to-[#f6f8ff] dark:from-[#243664] dark:via-[#1a2342] dark:to-[#131a33]"
          handleClick={() => setMeetingState("isJoiningMeeting")}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/schedule.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
          alt="calendar"
          className="bg-gradient-to-br from-[#f2edff] via-[#eae4ff] to-[#f7f5ff] dark:from-[#2b1f58] dark:via-[#241f48] dark:to-[#131a33]"
          handleClick={() => setMeetingState("isScheduleMeeting")}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Meeting Recordings"
          alt="record"
          className="bg-gradient-to-br from-[#fff3e6] via-[#fbe9d6] to-[#f8f2ea] dark:from-[#3a2e1e] dark:via-[#242031] dark:to-[#151a30]"
          handleClick={() => router.push(URLS.RECORDINGS)}
        />
      </motion.div>

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
          buttonText={isLoading ? "loading..." : "Schedule Meeting"}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-medium leading-[22.4px] text-slate-1">
              Add a description
            </label>
            <Textarea
              className="min-h-[110px] border border-border bg-card/80 text-foreground focus-visible:ring-1 focus-visible:ring-violet-2"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-sm font-medium leading-[22.4px] text-slate-1">
              Select Date and Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded-lg border border-border bg-card/80 p-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-violet-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border border-border bg-card/80 text-foreground focus-visible:ring-1 focus-visible:ring-violet-2"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText={isLoading ? "loading..." : "Start Meeting"}
        handleClick={createMeeting}
      />
    </motion.section>
  );
};

export default MeetingTypeList;
