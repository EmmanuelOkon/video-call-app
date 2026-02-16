import CallList from "@/components/core/CallList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orion Rooms - Previous Meetings",
  description: "",
};

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-8 text-foreground">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-2">
          History
        </span>
        <h1 className="text-3xl font-semibold">Previous Meetings</h1>
        <p className="text-sm text-slate-1">
          Recap your last sessions and reconnect quickly.
        </p>
      </header>

      <CallList type="ended" />
    </section>
  );
};

export default PreviousPage;
