import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex-center h-screen w-full px-6">
      <Card className="glass-panel w-full max-w-[520px] border border-border p-6 py-9 text-foreground">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex-center">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            <Button
              asChild
              className="rounded-full bg-violet-1/90 px-6 text-white shadow-[0_14px_28px_rgba(92,79,255,0.35)] transition hover:bg-violet-2"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
