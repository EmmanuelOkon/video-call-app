"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  // const { isLoading } = useGetCalls();

  const [isLoading, setIsLoading] = useState(false);
  // const [showLinkError, setShowLinkError] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    handleClick && handleClick();


    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel flex w-full max-w-[520px] flex-col gap-6 border border-border px-6 py-9 text-foreground">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          {/* {showLinkError && <span>Provide a meeting link</span>} */}
          <Button
            className="bg-violet-1/90 text-white shadow-[0_14px_28px_rgba(92,79,255,0.35)] transition hover:bg-violet-2 focus-visible:ring-1 focus-visible:ring-violet-2"
            onClick={handleButtonClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {isLoading ? "loading..." : buttonText}
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
