// components/join-cause/JoinCauseHero.tsx
"use client";

import { motion } from "framer-motion";

type Props = {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

export default function JoinCauseHero({ onPrimaryClick, onSecondaryClick }: Props) {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-page)]">
      {/* Soft maroon-tinted glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,63,76,0.12),transparent_55%)]" />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
              Join The Cause • Community-led impact
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-heading)] sm:text-5xl">
              Every contribution becomes care.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
              Support projects that upgrade treatment, enable outreach, and help patients who need it most.
              Explore causes, view transparent stats, and join in seconds.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onPrimaryClick}
                className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--bg-page)]
                           shadow-[0_8px_24px_rgba(122,63,76,0.10)] transition hover:bg-[var(--primary-hover)]"
              >
                View Projects
              </button>

              <button
                onClick={onSecondaryClick}
                className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold
                           text-[var(--text-heading)] shadow-[0_8px_24px_rgba(122,63,76,0.08)] transition hover:bg-[var(--surface-muted)]"
              >
                Contact Us
              </button>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                { k: "100%", v: "Transparent updates" },
                { k: "24/7", v: "Emergency-ready care" },
                { k: "10k+", v: "Patients served" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-[0_8px_24px_rgba(122,63,76,0.08)]"
                >
                  <div className="text-lg font-semibold text-[var(--text-heading)]">{x.k}</div>
                  <div className="mt-1 text-sm text-[var(--text-muted)]">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] p-3 shadow-[0_16px_40px_rgba(122,63,76,0.12)]">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(122,63,76,0.10),rgba(122,63,76,0.03))]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(122,63,76,0.14),transparent_60%)]" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { t: "Ongoing Projects", d: "4 active now" },
                  { t: "Upcoming", d: "Planned monthly" },
                ].map((b) => (
                  <div key={b.t} className="rounded-2xl bg-[var(--surface-muted)] p-4">
                    <div className="text-sm font-semibold text-[var(--text-heading)]">{b.t}</div>
                    <div className="mt-1 text-sm text-[var(--text-muted)]">{b.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
