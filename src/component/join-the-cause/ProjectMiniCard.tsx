// components/join-cause/ProjectMiniCard.tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "./data";

type Props = {
  project: Project;
  selected?: boolean;
  onSelect?: (id: string) => void;
};

export default function ProjectMiniCard({ project, selected, onSelect }: Props) {
  const isBucket =
    project.kind === "bucket" ||
    Boolean(project.budget || project.amc || project.specs?.length);

  const topTags = project.tags.slice(0, 3);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(project.id)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      className={[
        "group text-left w-full",
        "relative overflow-hidden rounded-2xl",
        "border bg-[var(--surface)]",
        selected
          ? "border-[var(--primary)] shadow-[var(--shadow-strong)]"
          : "border-[var(--surface-border)] shadow-[var(--shadow-soft)]",
        "transition-[box-shadow,transform,border-color] duration-300",
        "focus:outline-none focus-visible:shadow-[var(--ring)]",
      ].join(" ")}
      aria-pressed={selected}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,var(--primary-soft),transparent_60%)]" />

      <div className="relative p-4">
        {/* badges */}
        <div className="flex flex-wrap items-center gap-2">
          {project.urgent && (
            <span className="rounded-full bg-[var(--danger)] px-2.5 py-1 text-[11px] font-bold text-[var(--bg-page)] shadow-sm">
              Urgent
            </span>
          )}

          <span className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-heading)]">
            {project.status === "ongoing" ? "Ongoing" : "Upcoming"}
          </span>

          {isBucket && (
            <span className="rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-heading)]">
              Donation Bucket
            </span>
          )}

          {selected && (
            <span className="rounded-full bg-[var(--primary)] px-2.5 py-1 text-[11px] font-semibold text-[var(--bg-page)]">
              Selected
            </span>
          )}
        </div>

        {/* title + subtitle */}
        <div className="mt-3">
          <div className="text-base font-extrabold leading-snug text-[var(--text-heading)]">
            {project.title}
          </div>
          <div className="mt-1 text-xs leading-relaxed text-[var(--text-muted)] line-clamp-2">
            {project.subtitle}
          </div>
        </div>

        {/* ✅ tags on card */}
        {topTags.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {topTags.map((t) => (
              <span
                key={t}
                className={[
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  "bg-[var(--primary-soft)] text-[var(--text-body)]",
                  "border border-[var(--surface-border)]/70",
                ].join(" ")}
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)] p-3">
          {(project.stats || []).slice(0, 3).map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="text-[10px] tracking-wide uppercase text-[var(--text-muted)] truncate">
                {s.label}
              </div>
              <div className="mt-0.5 text-xs font-bold text-[var(--text-heading)] truncate">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-[11px] text-[var(--text-muted)]">
            Click to view full details ↓
          </div>

          <span
            className={[
              "inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-bold",
              selected
                ? "bg-[var(--primary)] text-[var(--bg-page)]"
                : "bg-[var(--surface)] text-[var(--text-heading)] border border-[var(--surface-border)]",
              "transition",
            ].join(" ")}
          >
            Open
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(to_right,transparent,var(--primary),transparent)] opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
    </motion.button>
  );
}
