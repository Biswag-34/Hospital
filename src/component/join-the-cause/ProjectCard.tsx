// components/join-cause/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "./data";

type Props = {
  project: Project;
  onJoin?: (projectId: string) => void;
};

function formatMonthYear(dateISO?: string) {
  if (!dateISO) return null;
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString("en-IN", { month: "long", year: "numeric" });
}

export default function ProjectCard({ project, onJoin }: Props) {
  const startLabel =
    project.status === "upcoming" ? formatMonthYear(project.startDate) : null;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-[var(--surface-border)]",
        "bg-[var(--surface)] shadow-[var(--shadow-soft)]",
        "transition-shadow",
        "hover:shadow-[var(--shadow-strong)]",
        "focus-within:shadow-[var(--shadow-strong)]",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
          style={{ backgroundImage: `url(${project.image})` }}
        />

        {/* Stronger readability fade (works on bright images) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/70 via-[var(--bg-dark)]/18 to-transparent" />

        {/* badges */}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          {project.urgent && (
            <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-semibold text-[var(--bg-page)] shadow-sm">
              Urgent
            </span>
          )}

          <span className="rounded-full bg-[var(--bg-page)]/85 px-3 py-1 text-xs font-semibold text-[var(--text-heading)] shadow-sm backdrop-blur">
            {project.status === "ongoing" ? "Ongoing" : "Upcoming"}
          </span>

          {startLabel && (
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md",
                "border border-white/15",
                "bg-[var(--bg-dark)]/35 text-white",
              ].join(" ")}
            >
              Starting {startLabel}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/85">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-medium text-[var(--text-body)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[var(--surface-muted)] p-3">
          {project.stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="truncate text-xs text-[var(--text-muted)]">{s.label}</div>
              <div className="truncate text-sm font-semibold text-[var(--text-heading)]">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* progress */}
        {typeof project.progress === "number" && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Progress</span>
              <span className="font-semibold text-[var(--text-body)]">
                {project.progress}%
              </span>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--primary-soft)]">
              <div
                className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-700"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* points */}
        <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
          {project.points.slice(0, 3).map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--primary)]/40" />
              <span className="line-clamp-2">{p}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={() => onJoin?.(project.id)}
            className={[
              "w-full rounded-xl px-4 py-3 text-sm font-semibold",
              "bg-[var(--primary)] text-[var(--bg-page)]",
              "shadow-[var(--shadow-soft)] transition",
              "hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-strong)]",
              "active:scale-[0.99]",
              "focus:outline-none focus-visible:shadow-[var(--ring)]",
            ].join(" ")}
          >
            Join The Cause
          </button>
        </div>
      </div>

      {/* glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[var(--primary)]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}
