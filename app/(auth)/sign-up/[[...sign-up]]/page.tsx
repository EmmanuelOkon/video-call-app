import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-app-light px-6 py-12 text-foreground dark:bg-app">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-violet-1/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-sky-1/20 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-4xl items-center justify-center">
        <div className="glass-panel w-full max-w-[480px] rounded-[32px] border border-border px-8 py-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Image
                src="/icons/logo.svg"
                width={26}
                height={26}
                alt="Orion Rooms"
              />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-2">
                Get started
              </p>
              <h1 className="text-2xl font-semibold text-foreground">
                Create your account
              </h1>
            </div>
          </div>
          <SignUp
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                headerTitle: "text-foreground text-xl font-semibold",
                headerSubtitle: "text-slate-2",
                socialButtonsIconButton:
                  "border border-border bg-card/60 hover:bg-card/80",
                formFieldInput:
                  "border border-border bg-card/80 text-foreground focus:ring-1 focus:ring-violet-2",
                formButtonPrimary:
                  "bg-violet-1/90 hover:bg-violet-2 text-white shadow-[0_14px_28px_rgba(92,79,255,0.35)]",
                footerActionLink: "text-violet-2 hover:text-foreground",
                dividerLine: "bg-border",
                dividerText: "text-slate-2",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
