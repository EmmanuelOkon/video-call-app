import CallList from '@/components/core/CallList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Orion Rooms - Recordings",
  description: "",
};

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-8 text-foreground">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-2">
          Archive
        </span>
        <h1 className="text-3xl font-semibold">Recordings</h1>
        <p className="text-sm text-slate-1">
          Review your saved sessions and share moments.
        </p>
      </header>

      <CallList type='recordings' />
    </section>
  );
}

export default Recordings