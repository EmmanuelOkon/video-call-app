import { Metadata } from "next";
import React from "react";
import CallList from "@/components/core/CallList";

export const metadata: Metadata = {
  title: "Voom - Upcoming Meetings",
  description: "",
};


const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming Meeting</h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;