import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voom - Home",
  description: "",
};

const HomePage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">
        Home
      </h1>

    </section>
  );
};

export default HomePage;
