import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import ThemeToggle from "@/components/core/ThemeToggle";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full border-b border-border bg-card/80 px-6 py-4 backdrop-blur-xl lg:px-10 lg:py-6">
      <div className="flex-between mx-auto w-full max-w-6xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
            <Image
              src="/icons/logo.svg"
              width={24}
              height={24}
              alt="Orion Rooms logo"
              className="max-sm:size-8"
            />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-[22px] font-semibold text-foreground">
              Orion
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-2">
              Rooms
            </span>
          </div>
        </Link>

        <div className="flex-between gap-4">
          <ThemeToggle className="hidden sm:flex" />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="gap-2 rounded-full bg-violet-1/90 px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(92,79,255,0.35)] transition hover:bg-violet-2">
                <LogIn size={16} />
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
