"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  alt: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  alt,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "group flex min-h-[240px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-glass-1 px-5 py-6 text-foreground shadow-[0_18px_50px_rgba(8,12,26,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(92,79,255,0.25)]",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center h-12 w-12 rounded-2xl border border-white/10 bg-white/10 shadow-[0_12px_24px_rgba(8,12,26,0.35)]">
        <Image src={img} alt={`${alt} icon`} width={26} height={26} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-sm font-medium text-slate-1">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
