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

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

function formatLakh(n: number) {
  const s = n.toFixed(n % 1 === 0 ? 0 : 1);
  return `₹${s}L`;
}

export default function ProjectCard({ project, onJoin }: Props) {
  const startLabel =
    project.status === "upcoming" ? formatMonthYear(project.startDate) : null;

  const isBucket = Boolean(project.budget || project.amc || project.specs?.length);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={[
        "group relative overflow-hidden rounded-3xl border border-[var(--surface-border)]",
        "bg-[var(--surface)] shadow-[var(--shadow-soft)]",
        "transition-shadow hover:shadow-[var(--shadow-strong)]",
      ].join(" ")}
    >
      {/* ✅ Bigger: image + content side-by-side on md+ */}
      <div className="grid md:grid-cols-[420px_1fr]">
        {/* IMAGE */}
        <div className="relative h-56 md:h-full min-h-[260px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${project.image})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/70 via-[var(--bg-dark)]/20 to-transparent" />

          <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
            {project.urgent && (
              <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-semibold text-[var(--bg-page)] shadow-sm">
                Urgent
              </span>
            )}

            <span className="rounded-full bg-[var(--bg-page)]/85 px-3 py-1 text-xs font-semibold text-[var(--text-heading)] shadow-sm backdrop-blur">
              {project.status === "ongoing" ? "Ongoing" : "Upcoming"}
            </span>

            {isBucket && (
              <span className="rounded-full bg-[var(--surface)]/75 px-3 py-1 text-xs font-semibold text-[var(--text-heading)] border border-[var(--surface-border)] shadow-sm backdrop-blur">
                Donation Bucket
              </span>
            )}

            {startLabel && (
              <span className="rounded-full px-3 py-1 text-xs font-semibold border border-white/15 bg-[var(--bg-dark)]/35 text-white backdrop-blur-md">
                Starting {startLabel}
              </span>
            )}
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-xl font-extrabold text-white leading-snug">
              {project.title}
            </h3>
            {/* ✅ no clamp */}
            <p className="mt-1 text-sm text-white/85">{project.subtitle}</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
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

          {/* stats (no truncate) */}
          {project.stats?.length ? (
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[var(--surface-muted)] p-3 border border-[var(--surface-border)]">
              {project.stats.slice(0, 3).map((s) => (
                <div key={s.label} className="min-w-0">
                  <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
                  <div className="text-sm font-semibold text-[var(--text-heading)]">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* ✅ bucket budget: full details without truncation */}
          {project.budget ? (
            <div className="mt-4 rounded-2xl border border-[var(--surface-border)] overflow-hidden">
              <div className="bg-[var(--surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--text-heading)]">
                Transparent Budget (INR)
              </div>

              <div className="px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Total estimate</div>
                    <div className="mt-1 text-lg font-extrabold text-[var(--text-heading)]">
                      {formatLakh(project.budget.totalMinLakh)} –{" "}
                      {formatLakh(project.budget.totalMaxLakh)}
                    </div>
                  </div>

                  {project.amc ? (
                    <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--bg-soft)] px-3 py-2">
                      <div className="text-xs text-[var(--text-muted)]">AMC / year</div>
                      <div className="mt-0.5 text-sm font-semibold text-[var(--text-body)]">
                        ₹{formatINR(project.amc.min)} – ₹{formatINR(project.amc.max)}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 divide-y divide-[var(--surface-border)] rounded-xl border border-[var(--surface-border)]">
                  {project.budget.breakdown.map((b) => (
                    <div
                      key={b.label}
                      className="flex flex-wrap items-start justify-between gap-3 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-[var(--text-body)]">{b.label}</div>
                        {b.note ? (
                          <div className="mt-1 text-xs text-[var(--text-muted)]">{b.note}</div>
                        ) : null}
                      </div>
                      <div className="text-sm font-semibold text-[var(--text-heading)]">
                        {formatLakh(b.minLakh)} – {formatLakh(b.maxLakh)}
                      </div>
                    </div>
                  ))}
                </div>

                {project.specs?.length ? (
                  <div className="mt-4 rounded-xl border border-[var(--surface-border)] bg-[var(--bg-soft)] p-4">
                    <div className="text-sm font-semibold text-[var(--text-heading)]">
                      Key Specifications
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {project.specs.map((s) => (
                        <div key={s.label} className="flex items-start justify-between gap-3">
                          <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
                          <div className="text-xs font-semibold text-[var(--text-body)] text-right">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {project.transparency?.length ? (
                  <div className="mt-4 text-xs text-[var(--text-muted)]">
                    <div className="font-semibold text-[var(--text-heading)]/80">
                      Transparency
                    </div>
                    <ul className="mt-2 space-y-1">
                      {project.transparency.map((t) => (
                        <li key={t}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              {/* progress (only for normal projects) */}
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
                {project.points.slice(0, 4).map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--primary)]/40" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* CTA */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => onJoin?.(project.id)}
              className={[
                "w-full rounded-xl px-5 py-3 text-sm font-semibold",
                "bg-[var(--primary)] text-[var(--bg-page)]",
                "shadow-[var(--shadow-soft)] transition",
                "hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-strong)]",
                "active:scale-[0.99]",
                "focus:outline-none focus-visible:shadow-[var(--ring)]",
              ].join(" ")}
            >
              {isBucket ? "Donate to this bucket" : "Join The Cause"}
            </button>
          </div>
        </div>
      </div>

      {/* glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[var(--primary)]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}
