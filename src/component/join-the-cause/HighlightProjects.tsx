// components/join-cause/HighlightProjects.tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "./data";

type Props = {
  projects: Project[];
  onJoin?: (projectId: string) => void;
};

export default function HighlightProjects({ projects, onJoin }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-heading)]">
            Highlighted Causes
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
            These initiatives are currently prioritized due to impact, urgency, or time-sensitive needs.
          </p>
        </div>
        <div className="hidden md:block text-sm text-[var(--text-muted)]">
          Updated weekly • Transparent stats
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {projects.slice(0, 2).map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: idx * 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]
                       shadow-[0_10px_30px_rgba(122,63,76,0.10)]"
          >
            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[230px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                />

                {/* Maroon overlay instead of black */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/75 via-[var(--primary)]/22 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--bg-page)]/85 px-3 py-1 text-xs font-semibold text-[var(--text-heading)] shadow-sm backdrop-blur">
                    Highlight
                  </span>
                  {p.urgent && (
                    <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-semibold text-[var(--bg-page)] shadow-sm">
                      Urgent
                    </span>
                  )}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/85">{p.subtitle}</p>

                  <button
                    onClick={() => onJoin?.(p.id)}
                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-[var(--bg-page)] px-4 py-2.5 text-sm font-semibold
                               text-[var(--primary)] shadow-sm transition hover:opacity-90"
                  >
                    Join The Cause
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-3 gap-2 rounded-xl bg-[var(--surface-muted)] p-3">
                  {p.stats.map((s) => (
                    <div key={s.label} className="min-w-0">
                      <div className="truncate text-xs text-[var(--text-muted)]">{s.label}</div>
                      <div className="truncate text-sm font-semibold text-[var(--text-heading)]">{s.value}</div>
                    </div>
                  ))}
                </div>

                {typeof p.progress === "number" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span>Progress</span>
                      <span className="font-semibold text-[var(--text-body)]">{p.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--primary-soft)]">
                      <div
                        className="h-full rounded-full bg-[var(--primary)]"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                  {p.points.slice(0, 3).map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--primary)]/40" />
                      <span className="line-clamp-2">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 text-xs text-[var(--text-muted)]">
                  *All contributions are used strictly for patient care & project execution.
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
