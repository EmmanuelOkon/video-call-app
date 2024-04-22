import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Voom - Meeting Room",
  description: "",
};

const Meeting = ({ params }: { params: { id: string } }) => {
  return <div>Meeting Room: #{params.id} </div>;
};

export default Meeting;
