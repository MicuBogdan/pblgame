import type { ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
  className?: string;
}

export default function Scene({ children, className }: SceneProps) {
  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-[radial-gradient(900px_500px_at_8%_10%,#fff3d6,transparent),radial-gradient(1000px_600px_at_92%_12%,#d4efe8,transparent),linear-gradient(135deg,#f8e8c8,#e7d2a4_45%,#cbb48a)] ${
        className || ""
      }`}
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,#f7b36b_0%,transparent_70%)] opacity-40 blur-2xl float-slow"></div>
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,#7fb7a7_0%,transparent_70%)] opacity-35 blur-2xl float-slower"></div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fbe1b1_0%,transparent_70%)] opacity-30 blur-3xl"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
