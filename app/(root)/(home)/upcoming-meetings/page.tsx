import CallList from "@/components/core/CallList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orion Rooms - Upcoming Meetings",
  description: "",
};


const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-8 text-foreground">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-2">
          Schedule
        </span>
        <h1 className="text-3xl font-semibold">Upcoming Meetings</h1>
        <p className="text-sm text-slate-1">
          Your next sessions, lined up and ready.
        </p>
      </header>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;