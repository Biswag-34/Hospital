// components/join-cause/ProjectDetailsCard.tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "./data";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}
function formatLakh(n: number) {
  const s = n.toFixed(n % 1 === 0 ? 0 : 1);
  return `₹${s}L`;
}

type Props = {
  project: Project;
  onDonate?: (id: string) => void;
  onBack?: () => void;
};

export default function ProjectDetailCard({ project, onDonate, onBack }: Props) {
  const isBucket =
    project.kind === "bucket" ||
    Boolean(project.budget || project.amc || project.specs?.length);

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto max-w-6xl px-4 pb-14"
    >
      {/* ✅ Single header (no double strip) */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-heading)]">
            Project details
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Transparent view — budget, specs, and trust notes.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className={[
            "rounded-xl px-4 py-2 text-sm font-semibold",
            "border border-[var(--surface-border)] bg-[var(--surface)]",
            "hover:bg-[var(--surface-muted)] transition",
            "focus:outline-none focus-visible:shadow-[var(--ring)]",
          ].join(" ")}
        >
          Back to list
        </button>
      </div>

      {/* ✅ Premium big card */}
      <div
        className={[
          "mt-6 relative overflow-hidden rounded-[28px]",
          "border border-[var(--surface-border)]",
          "bg-[var(--surface)] shadow-[var(--shadow-strong)]",
        ].join(" ")}
      >
        {/* soft glows */}
        <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-[var(--secondary)]/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,var(--primary-soft),transparent_55%)] opacity-70" />

        <div className="relative grid lg:grid-cols-[0.95fr_1.35fr]">
          {/* left image panel */}
          <div className="relative min-h-[260px] lg:min-h-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/75 via-[var(--bg-dark)]/25 to-transparent" />

            {/* floating chips */}
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              {project.urgent && (
                <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-bold text-[var(--bg-page)] shadow-sm">
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
            </div>

            {/* bottom title */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3
                className="text-2xl font-extrabold text-white leading-snug"
                style={{ textShadow: "var(--text-shadow-on-image)" }}
              >
                {project.title}
              </h3>
              <p
                className="mt-2 text-sm text-white/90 max-w-xl"
                style={{ textShadow: "var(--text-shadow-on-image)" }}
              >
                {project.subtitle}
              </p>

              {/* tags row */}
              {project.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/12 border border-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* right content */}
          <div className="p-6 sm:p-7">
            {/* quick stats */}
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-muted)] p-3">
              {(project.stats || []).slice(0, 3).map((s) => (
                <div key={s.label} className="min-w-0">
                  <div className="text-[10px] tracking-wide uppercase text-[var(--text-muted)] truncate">
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-sm font-extrabold text-[var(--text-heading)] truncate">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* budget */}
            {project.budget ? (
              <div className="mt-5 rounded-2xl border border-[var(--surface-border)] overflow-hidden">
                <div className="px-4 py-3 bg-[var(--surface-muted)]">
                  <div className="text-sm font-extrabold text-[var(--text-heading)]">
                    Transparent Budget (INR)
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    Item-wise breakdown for trust & clarity.
                  </div>
                </div>

                <div className="px-4 py-4 bg-[var(--bg-soft)]/30">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-[var(--text-muted)]">Total estimate</div>
                      <div className="mt-1 text-lg font-extrabold text-[var(--text-heading)]">
                        {formatLakh(project.budget.totalMinLakh)} – {formatLakh(project.budget.totalMaxLakh)}
                      </div>
                    </div>

                    {project.amc ? (
                      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2 text-right">
                        <div className="text-xs text-[var(--text-muted)]">AMC / year</div>
                        <div className="mt-0.5 text-sm font-bold text-[var(--text-heading)]">
                          ₹{formatINR(project.amc.min)} – ₹{formatINR(project.amc.max)}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 space-y-2">
                    {project.budget.breakdown.map((b) => (
                      <div
                        key={b.label}
                        className="flex items-start justify-between gap-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2"
                        style={{ boxShadow: "var(--inset-highlight)" }}
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[var(--text-heading)] leading-snug">
                            {b.label}
                          </div>
                          {b.note ? (
                            <div className="mt-0.5 text-xs text-[var(--text-muted)] leading-relaxed">
                              {b.note}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex-none text-sm font-extrabold text-[var(--text-heading)]">
                          {formatLakh(b.minLakh)} – {formatLakh(b.maxLakh)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* specs */}
            {project.specs?.length ? (
              <div className="mt-5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-muted)] p-4">
                <div className="text-sm font-extrabold text-[var(--text-heading)]">
                  Key Specifications
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {project.specs.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-3"
                      style={{ boxShadow: "var(--inset-highlight)" }}
                    >
                      <div className="text-[11px] tracking-wide uppercase text-[var(--text-muted)]">
                        {s.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text-heading)] leading-snug">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* transparency notes */}
            {project.transparency?.length ? (
              <div className="mt-5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-4">
                <div className="text-sm font-extrabold text-[var(--text-heading)]">Transparency</div>
                <ul className="mt-2 space-y-2 text-sm text-[var(--text-muted)]">
                  {project.transparency.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--primary)]/45 flex-none" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* donate */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onDonate?.(project.id)}
                className={[
                  "w-full rounded-2xl px-5 py-3 text-sm font-extrabold",
                  "bg-[var(--primary)] text-[var(--bg-page)]",
                  "shadow-[var(--glow-primary-soft)] transition",
                  "hover:bg-[var(--primary-hover)] hover:shadow-[var(--glow-primary)]",
                  "active:scale-[0.99]",
                  "focus:outline-none focus-visible:shadow-[var(--ring)]",
                ].join(" ")}
              >
                {isBucket ? "Donate to this bucket" : "Join this project"}
              </button>

              <div className="mt-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)] p-3 text-[11px] text-[var(--text-muted)]">
                You’ll receive updates during{" "}
                <span className="font-semibold text-[var(--text-heading)]">
                  purchase → installation → commissioning
                </span>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
