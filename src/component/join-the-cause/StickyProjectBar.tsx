// components/join-cause/StickyProjectBar.tsx
"use client";

import ProjectTabs from "./ProjectTabs";
import type { ProjectStatus } from "./data";

type Props = {
  value: ProjectStatus;
  onChange: (v: ProjectStatus) => void;
  counts: { ongoing: number; upcoming: number };
};

export default function StickyProjectBar({ value, onChange, counts }: Props) {
  return (
    <div className="sticky top-0 z-50">
      <div
        className={[
          "backdrop-blur-xl",
          // more distinct than bg-page so it doesn't disappear on cream
          "bg-[var(--bg-section)]/92",
          "border-b border-[var(--surface-border)]",
          // warm, soft elevation (strong enough to separate)
          "shadow-[0_14px_34px_rgba(111,51,64,0.14)]",
        ].join(" ")}
      >
        {/* subtle maroon tint wash for premium separation */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(111,51,64,0.10),rgba(111,51,64,0.00))]" />

        <div className="relative mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[var(--text-heading)]">
                {value === "ongoing" ? "Ongoing Projects" : "Upcoming Projects"}
              </div>
              <div className="truncate text-xs text-[var(--text-muted)]">
                {value === "ongoing"
                  ? "Support active initiatives happening now"
                  : "Help us launch these planned initiatives on time"}
              </div>
            </div>

            <ProjectTabs value={value} onChange={onChange} counts={counts} />
          </div>
        </div>
      </div>

      {/* clean separator (optional, but looks great on cream) */}
      <div className="h-px w-full bg-[var(--surface-border)]/60" />
    </div>
  );
}
