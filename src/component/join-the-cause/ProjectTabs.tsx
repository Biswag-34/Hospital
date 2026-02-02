// components/join-cause/ProjectTabs.tsx
"use client";

import { motion } from "framer-motion";
import type { ProjectStatus } from "./data";

type Props = {
  value: ProjectStatus;
  onChange: (v: ProjectStatus) => void;
  counts?: { ongoing: number; upcoming: number };
};

export default function ProjectTabs({ value, onChange, counts }: Props) {
  const items: { key: ProjectStatus; label: string }[] = [
    { key: "ongoing", label: "Ongoing" },
    { key: "upcoming", label: "Upcoming" },
  ];

  return (
    <div
      className={[
        "inline-flex items-center gap-1",
        "rounded-2xl border border-[var(--surface-border)]",
        // slightly deeper surface so it doesn't look white on cream bg
        "bg-[var(--surface-muted)] p-1",
        // softer + warmer shadow (less contrasty than before)
        "shadow-[0_10px_28px_rgba(111,51,64,0.10)]",
      ].join(" ")}
    >
      {items.map((it) => {
        const active = it.key === value;
        const count = counts?.[it.key];

        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={[
              "relative isolate rounded-xl px-4 py-2",
              "text-sm font-semibold transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/25",
              active
                ? "text-[var(--bg-page)]"
                : "text-[var(--text-body)] hover:bg-[var(--surface)]/70",
            ].join(" ")}
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                className={[
                  "absolute inset-0 -z-10 rounded-xl",
                  "bg-[var(--primary)]",
                  // subtle highlight so pill doesn't feel flat
                  "shadow-[0_10px_26px_rgba(111,51,64,0.18)]",
                ].join(" ")}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}

            <span className="relative">{it.label}</span>

            {typeof count === "number" && (
              <span
                className={[
                  "ml-2 rounded-full px-2 py-0.5 text-xs font-bold",
                  active
                    ? "bg-white/18 text-[var(--bg-page)]"
                    : "bg-[var(--primary-soft)] text-[var(--text-body)]",
                ].join(" ")}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
