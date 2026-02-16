import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-light px-6 py-16 text-foreground dark:bg-app">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-violet-1/20 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-sky-1/20 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-violet-2/15 blur-[160px]" />
      </div>

      <div className="glass-panel relative w-full max-w-3xl rounded-[36px] border border-border px-8 py-12 text-center shadow-[0_28px_70px_rgba(8,12,26,0.25)] sm:px-12">
        <span className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-2">
          Orion Rooms
        </span>
        <p className="text-6xl font-semibold tracking-tight sm:text-7xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          This room drifted out of orbit
        </h1>
        <p className="mt-3 text-sm text-slate-1 sm:text-base">
          The page you are looking for is not in this constellation. Let us get you
          back to a live room.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-violet-1/90 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(92,79,255,0.35)] transition hover:bg-violet-2"
          >
            Back to Home
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/personal-room"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-card/90"
          >
            Open Personal Room
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
