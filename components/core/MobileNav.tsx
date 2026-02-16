"use client";

import ThemeToggle from "@/components/core/ThemeToggle";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[280px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-card/90 outline-0 backdrop-blur-xl"
        >
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/icons/logo.svg"
                width={32}
                height={32}
                alt="Orion Rooms logo"
                className="max-sm:size-10"
              />
              <div className="flex flex-col leading-none">
                <span className="text-[22px] font-semibold text-foreground">
                  Orion
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-2">
                  Rooms
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle className="sm:hidden" />
              <SheetClose asChild className="border-none outline-0">
                <X className="h-8 w-8 text-2xl font-bold text-foreground" />
              </SheetClose>
            </div>
          </nav>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            {/* <SheetClose asChild> */}
              <section className="flex h-full flex-col gap-4 pt-16 text-foreground">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route;

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        key={link.label}
                        href={link.route}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl px-4 py-3 w-full max-w-60 transition",
                          {
                            "bg-violet-1/20 text-primary-foreground ring-1 ring-violet-1/30":
                              isActive,
                            "text-slate-1 hover:bg-white/5": !isActive,
                          }
                        )}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5">
                          <Image
                            src={link.imgUrl}
                            alt={link.label}
                            width={22}
                            height={22}
                          />
                        </span>
                        <p className="font-medium">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            {/* </SheetClose> */}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
