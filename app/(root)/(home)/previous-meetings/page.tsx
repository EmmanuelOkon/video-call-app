import CallList from "@/components/core/CallList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Voom - Previous Meetings",
  description: "",
};

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous Meetings</h1>

      <CallList type="ended" />
    </section>
  );
};

export default PreviousPage;
