"use client";

import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 flex h-screen w-fit flex-col justify-between border-r border-border bg-card/80 p-6 pt-28 text-foreground backdrop-blur-xl max-sm:hidden lg:w-[280px]">
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                "group flex items-center gap-4 rounded-2xl px-4 py-3 transition",
                {
                  "bg-violet-1/20 text-primary-foreground shadow-[0_16px_30px_rgba(92,79,255,0.18)] ring-1 ring-violet-1/30":
                    isActive,
                  "text-slate-1 hover:bg-white/5": !isActive,
                }
              )}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 transition group-hover:bg-white/20">
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={22}
                  height={22}
                />
              </span>
              <div className="flex flex-1 items-center justify-between">
                <p className="text-[15px] font-semibold max-lg:hidden">
                  {link.label}
                </p>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full bg-violet-2 opacity-0 transition",
                    {
                      "opacity-100": isActive,
                    }
                  )}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
