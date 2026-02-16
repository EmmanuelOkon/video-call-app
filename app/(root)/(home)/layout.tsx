import Navbar from "@/components/core/Navbar";
import PageTransition from "@/components/core/PageTransition";
import Sidebar from "@/components/core/Sidebar";
import { Metadata } from "next";

import { ReactNode } from "react";

export const metadata: Metadata = {
  icons: {
    icon: "/icons/logo.svg",
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-1/15 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-sky-1/10 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-violet-2/10 blur-[160px]" />
      </div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-10 pt-28 max-md:pb-16 sm:px-10 lg:px-14">
          <PageTransition className="w-full">
            <div className="w-full max-w-6xl pb-10">{children}</div>
          </PageTransition>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
