"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { avatarImages } from "@/utils";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <motion.section
      className="relative flex min-h-[258px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#f4f6ff] via-[#eef1ff] to-[#e6ebff] px-6 py-8 text-foreground shadow-[0_24px_60px_rgba(8,12,26,0.15)] dark:border-white/10 dark:from-[#151d33] dark:via-[#11182c] dark:to-[#0b1122] dark:text-white dark:shadow-[0_24px_60px_rgba(8,12,26,0.45)]"
      whileHover={{ y: -6, boxShadow: "0 30px 70px rgba(92, 79, 255, 0.25)" }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <article className="flex flex-col gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
          <Image src={icon} alt="upcoming" width={24} height={24} />
        </span>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-foreground dark:text-white">
              {title}
            </h1>
            <p className="text-sm font-medium text-slate-1">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("relative flex flex-wrap items-center justify-between gap-4", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full border border-dark-3", {
                absolute: index > 0,
              })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border border-border bg-card text-xs font-semibold text-slate-1 dark:border-white/10 dark:bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleClick}
              className="rounded-full bg-violet-1/90 px-5 text-white shadow-[0_14px_28px_rgba(92,79,255,0.35)] transition hover:bg-violet-2"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={18} height={18} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="rounded-full border border-border bg-card/70 px-5 text-slate-1 hover:bg-card/90 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={18}
                height={18}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </motion.section>
  );
};

export default MeetingCard;
