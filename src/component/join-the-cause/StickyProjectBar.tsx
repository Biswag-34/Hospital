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
      {/* subtle backdrop */}
      <div className="border-b border-[var(--surface-border)] bg-[var(--bg-page)]/75 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3">
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

      {/* soft shadow line */}
      <div className="h-3 bg-gradient-to-b from-[var(--primary)]/10 to-transparent" />
    </div>
  );
}
