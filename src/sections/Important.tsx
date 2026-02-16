// src/components/CauseImpactSection.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  HeartHandshake,
  HandHeart,
  Stethoscope,
  BadgeCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type CTA = {
  id: string;
  label: string;
  sub: string;
  href: string;
  icon: React.ReactNode;
  tone?: "primary" | "soft";
};

type Props = {
  /** Optional: background image URL (you can pass your own). */
  bgImageUrl?: string;
};

const STORAGE_KEY = "hr_causeSpotlight_dismissed_v1";

// Helper: set "do not show again" for N days
function setDismissForDays(days = 7) {
  const until = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, String(until));
}
function isDismissed() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const until = Number(raw);
  if (!Number.isFinite(until)) return false;
  return Date.now() < until;
}

export default function CauseImpactSection({ bgImageUrl }: Props) {
  const reduce = useReducedMotion();
  const [spotlight, setSpotlight] = useState(false);

  // Only spotlight once per visitor for a few days (keeps it premium, not spammy)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isDismissed()) return;

    const t = window.setTimeout(() => setSpotlight(true), 4200); // 4.2s
    const off = window.setTimeout(() => {
      setSpotlight(false);
      setDismissForDays(3); // auto-cooldown after it plays
    }, 8200); // ends around 8.2s

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(off);
    };
  }, []);

  const ctas: CTA[] = useMemo(
    () => [
      {
        id: "donate",
        label: "Donate",
        sub: "Support urgent treatment & supplies",
        href: "/join-the-cause#ongoing",
        icon: <HandHeart className="h-5 w-5" />,
        tone: "primary",
      },
      {
        id: "volunteer",
        label: "Volunteer",
        sub: "Join outreach & health camps",
        href: "/join-the-cause#ongoing",
        icon: <HeartHandshake className="h-5 w-5" />,
        tone: "soft",
      },
      {
        id: "sponsor",
        label: "Sponsor a patient",
        sub: "Fund care for someone in need",
        href: "/join-the-cause#ongoing",
        icon: <Stethoscope className="h-5 w-5" />,
        tone: "soft",
      },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { k: "100%", v: "Transparent updates", icon: <BadgeCheck className="h-4 w-4" /> },
      { k: "24/7", v: "Emergency-ready care", icon: <Sparkles className="h-4 w-4" /> },
      { k: "10k+", v: "Patients served", icon: <Sparkles className="h-4 w-4" /> },
    ],
    []
  );

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image (optional) */}
      <div className="absolute inset-0 -z-10">
        {bgImageUrl ? (
          <img
            src={bgImageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(120,80,70,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(120,80,70,0.12),transparent_60%)]" />
        )}
        {/* Elegant overlay that matches your beige theme */}
        <div className="absolute inset-0 bg-[#efe6dc]/80 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={[
            "relative rounded-3xl border border-black/10 bg-white/50",
            "shadow-[0_18px_60px_rgba(0,0,0,0.08)]",
            "px-5 sm:px-8 py-8 sm:py-10",
          ].join(" ")}
        >
          {/* Spotlight ring (4–8s) */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: spotlight ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute -inset-1 rounded-[28px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(122,61,52,0.0), rgba(122,61,52,0.18), rgba(122,61,52,0.0))",
                filter: "blur(10px)",
              }}
            />
          )}

          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Left: message */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs sm:text-sm text-black/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7a3d34]" />
                Updated weekly • Transparent stats
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-black/90">
                Your support turns <span className="text-[#7a3d34]">care</span> into reality.
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-black/65 max-w-2xl">
                Donations and volunteering help fund urgent treatment, outreach camps, and essential
                supplies—so patients receive help when they need it most.
              </p>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-black/10 bg-white/55 px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-black/70">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-[#7a3d34]/10 text-[#7a3d34]">
                        {s.icon}
                      </span>
                      <div className="text-lg font-semibold text-black/85">{s.k}</div>
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-black/60">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTAs */}
            <div className="relative">
              <div className="rounded-3xl border border-black/10 bg-white/55 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-black/80">Choose how to help</div>
                    <div className="text-xs text-black/55">Takes less than a minute.</div>
                  </div>
                  <span className="text-xs rounded-full bg-[#7a3d34]/10 text-[#7a3d34] px-2 py-1 border border-[#7a3d34]/15">
                    Ongoing needs
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  {ctas.map((c, idx) => (
                    <motion.a
                      key={c.id}
                      href={c.href}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.55,
                        delay: reduce ? 0 : 0.06 * idx,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={reduce ? {} : { y: -2 }}
                      className={[
                        "group flex items-center justify-between gap-3 rounded-2xl border",
                        "px-4 py-3 sm:px-5 sm:py-4",
                        c.tone === "primary"
                          ? "border-[#7a3d34]/25 bg-[#7a3d34] text-white shadow-[0_14px_40px_rgba(122,61,52,0.25)]"
                          : "border-black/10 bg-white/55 text-black/85 hover:bg-white/70",
                        "transition-colors",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={[
                            "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                            c.tone === "primary"
                              ? "bg-white/15 text-white"
                              : "bg-[#7a3d34]/10 text-[#7a3d34]",
                          ].join(" ")}
                        >
                          {c.icon}
                        </span>
                        <div>
                          <div className="text-sm sm:text-base font-semibold leading-tight">
                            {c.label}
                          </div>
                          <div
                            className={[
                              "mt-0.5 text-xs sm:text-sm leading-snug",
                              c.tone === "primary" ? "text-white/80" : "text-black/60",
                            ].join(" ")}
                          >
                            {c.sub}
                          </div>
                        </div>
                      </div>

                      <span
                        className={[
                          "inline-flex items-center gap-1 text-xs sm:text-sm font-medium",
                          c.tone === "primary" ? "text-white/90" : "text-black/60",
                        ].join(" ")}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-4 text-[11px] sm:text-xs text-black/55">
                  Tip: Add your background image for more impact — this section keeps the same sleek
                  tone with an overlay.
                </div>
              </div>

              {/* Tiny side glow (premium touch) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl bg-[#7a3d34]/15"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
