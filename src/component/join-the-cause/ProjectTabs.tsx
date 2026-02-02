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
    <div className="inline-flex rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-1 shadow-[0_8px_24px_rgba(122,63,76,0.08)]">
      {items.map((it) => {
        const active = it.key === value;
        const count = counts?.[it.key];

        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className="relative isolate rounded-xl px-4 py-2 text-sm font-semibold transition"
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 -z-10 rounded-xl bg-[var(--primary)]"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}

            <span className={active ? "text-[var(--bg-page)]" : "text-[var(--text-muted)]"}>
              {it.label}
            </span>

            {typeof count === "number" && (
              <span
                className={[
                  "ml-2 rounded-full px-2 py-0.5 text-xs font-bold",
                  active
                    ? "bg-white/15 text-[var(--bg-page)]"
                    : "bg-[var(--primary-soft)] text-[var(--text-muted)]",
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
