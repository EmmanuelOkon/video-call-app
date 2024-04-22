import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Voom - Personal Room",
  description: "",
};

const PersonalRoom = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">PersonalRoom</h1>
    </section>
  );
}

export default PersonalRoom