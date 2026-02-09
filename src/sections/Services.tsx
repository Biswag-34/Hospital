// src/components/ServicesShowcase.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { SERVICES, type Service } from "../data/service-data";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);
  return matches;
}

// Typed easing (no TS issues)
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ✅ Wheel service colors only (allowed hardcoded)
const ACCENTS = [
  "rgba(106, 46, 58, 0.72)", // maroon
  "rgba(63, 111, 106, 0.72)", // teal
  "rgba(47, 95, 119, 0.72)", // muted blue
  "rgba(122, 85, 36, 0.72)", // amber-brown
  "rgba(78, 104, 63, 0.72)", // olive
  "rgba(74, 78, 111, 0.72)", // indigo
  "rgba(154, 100, 111, 0.72)", // rose-maroon
  "rgba(79, 92, 96, 0.72)", // slate
];

export default function ServicesShowcase() {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <section className="w-full py-10 md:py-14" id="services" style={{ background: "var(--bg-section)" }}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <header className="text-center mx-auto max-w-3xl">
          <p
            className="font-semibold tracking-wide"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            ANTHARANGA HOSPITAL
          </p>

          <h2
            className="mt-2 font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-heading)",
              fontSize: "var(--h2)",
              lineHeight: "var(--lh-heading)",
            }}
          >
            Explore Our Services
          </h2>

          <p
            className="mt-3"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--lh-body)",
            }}
          >
            Choose a service to instantly view complete details—built for minimal scroll and easy navigation.
          </p>
        </header>

        <div className="mt-8 md:mt-10">{isDesktop ? <DesktopWheel /> : <MobileServices />}</div>
      </div>
    </section>
  );
}

/* ----------------------------- DESKTOP (Wheel + Right Card) ----------------------------- */

function DesktopWheel() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const active = useMemo(() => SERVICES.find((s) => s.id === activeId) ?? null, [activeId]);

  const spring = { type: "spring" as const, stiffness: 140, damping: 30, mass: 1.05 };
  const fade = reduceMotion ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT };

  return (
    <div className="w-full">
      <motion.div
        layout
        transition={reduceMotion ? { duration: 0 } : spring}
        className={[
          "grid items-start",
          active ? "grid-cols-1 lg:grid-cols-[38%_62%]" : "grid-cols-1",
          // ✅ tight in expanded mode; still nice gap when active
          active ? "gap-10 lg:gap-12" : "gap-0",
        ].join(" ")}
        // ✅ remove big margins that created whitespace
        style={{
          margin: 0,
          paddingTop: active ? 6 : 0,
        }}
      >
        {/* Wheel column */}
        <motion.div
          layout
          transition={reduceMotion ? { duration: 0 } : spring}
          className={active ? "justify-self-stretch" : "justify-self-center"}
          // ✅ remove extra padding in expanded mode
          style={{ padding: active ? "10px 0" : "0px" }}
        >
          <motion.div
            layout
            transition={reduceMotion ? { duration: 0 } : spring}
            className="relative mx-auto"
            style={{
              // expanded wheel (no active): minimal space, no extra vertical whitespace
              width: active ? "min(480px, 36vw)" : "min(520px, 42vw)",
              aspectRatio: "1 / 1",
            }}
          >
            <div className="absolute inset-0">
              <PoweredHub
                items={SERVICES}
                activeId={activeId}
                hoverId={hoverId}
                onHover={setHoverId}
                onSelect={setActiveId}
              />
            </div>
          </motion.div>

          {/* ✅ Reset button ONLY when active (no reserved height in expanded mode) */}
          <AnimatePresence>
            {active && (
              <motion.div
                key="reset-row"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={fade}
                className="mt-4 flex items-center justify-center"
              >
                <button
                  onClick={() => setActiveId(null)}
                  className="rounded-full border px-5 py-2 text-xs font-semibold shadow-sm"
                  style={{
                    borderColor: "var(--surface-border)",
                    background: "var(--surface)",
                    color: "var(--text-body)",
                    fontFamily: "var(--font-body)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  Reset
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right card column – render ONLY when active (prevents any block below wheel) */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="card-col"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={fade}
              className="min-h-[520px]"
              // ✅ theme spacing + no extra whitespace when expanded
              style={{ padding: "10px 0" }}
            >
              <ServiceDataCard service={active} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ----------------------------- POWERED HUB ----------------------------- */

function PoweredHub({
  items,
  activeId,
  hoverId,
  onHover,
  onSelect,
}: {
  items: Service[];
  activeId: string | null;
  hoverId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const reduceMotion = useReducedMotion();

  const size = 1000;
  const cx = 500;
  const cy = 500;

  // geometry (already reduced)
  const centerR = 160;
  const nodeR = 92;
  const ringR = 300;

  const points = useMemo(() => {
    const n = items.length;
    return items.map((s, idx) => {
      const a = -Math.PI / 2 + (idx * 2 * Math.PI) / n;
      const x = cx + Math.cos(a) * ringR;
      const y = cy + Math.sin(a) * ringR;
      return { id: s.id, x, y, idx };
    });
  }, [items]);

  const poweredId = hoverId ?? activeId;

  const lineT = reduceMotion ? { duration: 0 } : { duration: 0.42, ease: EASE_OUT };
  const nodeT = reduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT };

  const clamp2: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx}
          cy={cy}
          r={centerR}
          fill="var(--surface)"
          stroke="var(--surface-border)"
          strokeWidth={8}
        />
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          style={{
            fontSize: 44,
            fontWeight: 800,
            fill: "var(--text-heading)",
            fontFamily: "var(--font-heading)",
          }}
          className="select-none"
        >
          Services
        </text>

        {points.map((p) => {
          const isPowered = poweredId === p.id;
          const color = ACCENTS[p.idx % ACCENTS.length];

          const dx = p.x - cx;
          const dy = p.y - cy;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const ux = dx / len;
          const uy = dy / len;

          const x1 = cx + ux * (centerR + 16);
          const y1 = cy + uy * (centerR + 16);
          const x2 = p.x - ux * (nodeR + 14);
          const y2 = p.y - uy * (nodeR + 14);

          return (
            <motion.line
              key={`line-${p.id}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              initial={false}
              animate={{
                stroke: isPowered ? color : "rgba(96, 42, 54, 0.20)",
                strokeWidth: isPowered ? 18 : 13,
                opacity: isPowered ? 1 : 0.68,
              }}
              transition={lineT}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {points.map((p) => {
        const s = items[p.idx];
        const Icon = s.icon;

        const isPowered = poweredId === s.id;
        const color = ACCENTS[p.idx % ACCENTS.length];

        const leftPct = (p.x * 100) / size;
        const topPct = (p.y * 100) / size;
        const nodeSizePct = ((nodeR * 2) * 100) / size;

        return (
          <motion.button
            key={s.id}
            onClick={() => onSelect(s.id)}
            onMouseEnter={() => onHover(s.id)}
            onMouseLeave={() => onHover(null)}
            className="absolute rounded-full focus:outline-none"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              width: `${nodeSizePct}%`,
              height: `${nodeSizePct}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.015 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }}
              className="h-full w-full"
              style={{ transformOrigin: "center" }}
            >
              <motion.div
                initial={false}
                animate={{
                  borderColor: isPowered ? color : "var(--surface-border)",
                  boxShadow: isPowered
                    ? `0 0 0 10px rgba(106,46,58,0.05), 0 0 0 18px ${color}18`
                    : "0 0 0 8px rgba(106,46,58,0.045)",
                }}
                transition={nodeT}
                className="h-full w-full rounded-full border grid place-items-center"
                style={{ background: "var(--surface)" }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isPowered ? color : "rgba(106,46,58,0.06)",
                  }}
                  transition={nodeT}
                  className="h-[88%] w-[88%] rounded-full grid place-items-center"
                >
                  <div className="grid place-items-center gap-2 px-3">
                    <Icon
                      className="h-6 w-6"
                      style={{
                        color: isPowered ? "var(--text-on-image)" : "var(--primary)",
                        opacity: 0.95,
                      }}
                    />

                    <span
                      className="text-center"
                      style={{
                        ...clamp2,
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        fontWeight: 800,
                        lineHeight: 1.12,
                        color: isPowered ? "var(--text-on-image)" : "var(--text-body)",
                        opacity: isPowered ? 1 : 0.9,
                        maxWidth: "92%",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ----------------------------- SERVICE DATA CARD ----------------------------- */

function ServiceDataCard({ service }: { service: Service }) {
  const reduceMotion = useReducedMotion();
  const fade = reduceMotion ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT };

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 14 }}
      transition={fade}
      className="relative overflow-hidden rounded-3xl border"
      style={{
        borderColor: "var(--surface-border)",
        boxShadow: "var(--shadow-soft)",
        marginLeft: 10,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--overlay-soft)" }} />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(243,232,221,0.90), rgba(243,232,221,0.86))",
        }}
      />

      <div className="relative p-7 md:p-8">
        <h3
          className="font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-heading)",
            fontSize: "var(--h3)",
            lineHeight: "var(--lh-heading)",
          }}
        >
          {service.title}
        </h3>

        <p
          className="mt-2 max-w-3xl"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-muted)",
            fontSize: "var(--text-md)",
            lineHeight: "var(--lh-body)",
          }}
        >
          {service.summary}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {service.subServices.slice(0, 4).map((ss) => (
            <div
              key={ss.title}
              className="rounded-2xl border p-4"
              style={{
                borderColor: "var(--surface-border)",
                // ✅ theme muted surface + backdrop
                background: "rgba(234, 220, 208, 0.76)",
                boxShadow: "var(--shadow-soft)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                className="text-sm font-semibold"
                style={{
                  color: "var(--text-heading)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {ss.title}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {ss.points.slice(0, 4).map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)" }} />
                    <span style={{ color: "var(--text-body)", opacity: 0.92, fontFamily: "var(--font-body)" }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-6 rounded-2xl border px-4 py-3"
          style={{
            borderColor: "var(--surface-border)",
            background: "var(--primary-soft)",
          }}
        >
          <p
            className="text-xs font-bold tracking-wide"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            OUR COMMITMENT
          </p>
          <p
            className="mt-1 text-sm font-semibold"
            style={{
              color: "var(--text-body)",
              fontFamily: "var(--font-body)",
            }}
          >
            {service.commitmentShort}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------- MOBILE (BEHAVIOR UNCHANGED; THEME TOKENS APPLIED) ----------------------------- */

function MobileServices() {
  const reduceMotion = useReducedMotion();
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const current = SERVICES[activeIndex];

  const fade = reduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE_OUT };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <p
          className="text-sm font-semibold"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-muted)",
          }}
        >
          Swipe • Tap to expand
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-10 w-10 rounded-2xl border grid place-items-center active:scale-95"
            aria-label="Previous"
            style={{
              borderColor: "var(--surface-border)",
              background: "var(--surface)",
              color: "var(--text-body)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="h-10 w-10 rounded-2xl border grid place-items-center active:scale-95"
            aria-label="Next"
            style={{
              borderColor: "var(--surface-border)",
              background: "var(--surface)",
              color: "var(--text-body)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={14}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        className="pb-4"
      >
        {SERVICES.map((s, idx) => (
          <SwiperSlide key={s.id}>
            <AnimatePresence mode="wait">
              {!expanded || idx !== activeIndex ? (
                <motion.button
                  key="collapsed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={fade}
                  onClick={() => {
                    if (idx === activeIndex) setExpanded(true);
                    else swiperRef.current?.slideTo(idx);
                  }}
                  className="w-full overflow-hidden rounded-3xl border shadow-sm text-left"
                  style={{
                    borderColor: "var(--surface-border)",
                    background: "var(--surface)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div className="h-48 w-full" style={{ background: "rgba(106,46,58,0.04)" }}>
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>

                  <div className="p-4">
                    <p
                      className="text-lg font-semibold"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--text-heading)" }}
                    >
                      {s.title}
                    </p>
                    <p
                      className="mt-1 text-sm line-clamp-2"
                      style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}
                    >
                      {s.summary}
                    </p>
                    <p
                      className="mt-3 text-xs font-semibold"
                      style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}
                    >
                      Tap to view details
                    </p>
                  </div>
                </motion.button>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={fade}
                  className="relative overflow-hidden rounded-3xl border shadow-sm"
                  style={{
                    borderColor: "var(--surface-border)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${current.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0" style={{ background: "var(--overlay-soft)" }} />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, rgba(243,232,221,0.92), rgba(243,232,221,0.88))",
                    }}
                  />

                  <button
                    onClick={() => setExpanded(false)}
                    className="absolute right-3 top-3 z-10 h-11 w-11 rounded-2xl border grid place-items-center active:scale-95"
                    aria-label="Collapse"
                    style={{
                      borderColor: "var(--surface-border)",
                      background: "rgba(243,232,221,0.82)",
                      color: "var(--text-body)",
                      boxShadow: "var(--shadow-soft)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <ChevronUp className="h-5 w-5" />
                  </button>

                  <div className="relative p-4 pt-16">
                    <h3
                      className="text-2xl font-semibold tracking-tight"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--text-heading)" }}
                    >
                      {current.title}
                    </h3>
                    <p className="mt-2 text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
                      {current.summary}
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-3">
                      {current.subServices.slice(0, 4).map((ss) => (
                        <div
                          key={ss.title}
                          className="rounded-2xl border p-4"
                          style={{
                            borderColor: "var(--surface-border)",
                            background: "rgba(234, 220, 208, 0.76)",
                            boxShadow: "var(--shadow-soft)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-body)", color: "var(--text-heading)" }}>
                            {ss.title}
                          </p>
                          <ul className="mt-2 space-y-1 text-sm">
                            {ss.points.slice(0, 4).map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)" }} />
                                <span style={{ fontFamily: "var(--font-body)", color: "var(--text-body)", opacity: 0.92 }}>
                                  {t}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-5 rounded-2xl border px-4 py-3"
                      style={{
                        borderColor: "var(--surface-border)",
                        background: "var(--primary-soft)",
                      }}
                    >
                      <p className="text-xs font-bold tracking-wide" style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
                        OUR COMMITMENT
                      </p>
                      <p className="mt-1 text-sm font-semibold" style={{ fontFamily: "var(--font-body)", color: "var(--text-body)" }}>
                        {current.commitmentShort}
                      </p>
                    </div>

                    <p className="mt-4 text-xs font-semibold" style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
                      Swipe left/right to switch services.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
