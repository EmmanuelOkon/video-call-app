"use client";

import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { useGetCallById } from "@/hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Voom - Personal Room",
//   description: "",
// };

const Table = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card/70 px-4 py-3">
    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-2">
      {title}
    </span>
    <span
      className={cn("break-all text-sm font-semibold text-foreground", className)}
    >
      {description}
    </span>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const router = useRouter();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`)
  };

  return (
    <section className="flex size-full flex-col gap-8 text-foreground">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-2">
          Your space
        </span>
        <h1 className="text-3xl font-semibold">Personal Room</h1>
        <p className="text-sm text-slate-1">
          Share your personal room link and jump into instant calls.
        </p>
      </header>

      <div className="grid w-full gap-4 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.username}'s Meeting Room`}
          className="capitalize"
        />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          className="rounded-full bg-violet-1/90 px-6 text-white shadow-[0_14px_28px_rgba(92,79,255,0.35)] transition hover:bg-violet-2"
          onClick={startRoom}
        >
          Start Meeting
        </Button>
        <Button
          className="rounded-full border border-border bg-card/70 px-6 text-slate-1 hover:bg-card/90 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
