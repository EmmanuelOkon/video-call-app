"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/utils";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[280px] ">
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
        <SheetContent side="left" className="border-none bg-dark-1 outline-0 ">
          <nav className="flex items-center justify-between ">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/icons/logo.svg"
                width={32}
                height={32}
                alt="Voom logo"
                className="max-sm:size-10"
              />
              <p className="text-[26px] font-extrabold text-white max-sm:hidden pl-2">
                Voom
              </p>
            </Link>
            <SheetClose asChild className="border-none outline-0">
              <X className="h-8 w-8 text-2xl font-bold text-white" />
            </SheetClose>
          </nav>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto ">
            {/* <SheetClose asChild> */}
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route;

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        key={link.label}
                        href={link.route}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={24}
                          height={24}
                        />
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
