import MeetingTypeList from "@/components/core/MeetingTypeList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orion Rooms - Home",
  description: "",
};

const HomePage = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: userTimeZone,
  });
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: userTimeZone,
  }).format(now);

  

  return (
    <section className="flex size-full flex-col gap-8 text-foreground">
      <div className="relative h-[320px] w-full overflow-hidden rounded-[28px] border border-border bg-hero-light dark:bg-hero">
        <div className="relative flex h-full flex-col justify-between px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="glass-panel inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-1">
              Next up · 12:30 PM
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-2">
              Personal room
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground lg:text-6xl">
              {time}
            </h1>
            <p className="text-lg font-medium text-slate-1 lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default HomePage;
