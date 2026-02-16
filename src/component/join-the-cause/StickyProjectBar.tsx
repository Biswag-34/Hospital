// components/join-cause/StickyProjectBar.tsx
"use client";

import { motion } from "framer-motion";

export type Filter = "all" | "urgent" | "ongoing" | "upcoming";

type Props = {
  value: Filter;
  onChange: (v: Filter) => void;

  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;

  counts: { all: number; urgent: number; ongoing: number; upcoming: number };
};

export default function StickyProjectBar({
  value,
  onChange,
  tags,
  selectedTags,
  onToggleTag,
  onClearTags,
  counts,
}: Props) {
  const items: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "urgent", label: "Urgent", count: counts.urgent },
    { key: "ongoing", label: "Ongoing", count: counts.ongoing },
    { key: "upcoming", label: "Upcoming", count: counts.upcoming },
  ];

  const hasTags = selectedTags.length > 0;

  return (
    <div className="sticky top-0 z-50">
      <div
        className={[
          "relative backdrop-blur-xl",
          "bg-[var(--bg-section)]/92",
          "border-b border-[var(--surface-border)]",
          "shadow-[0_14px_34px_rgba(111,51,64,0.14)]",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(111,51,64,0.10),rgba(111,51,64,0.00))]" />

        <div className="relative mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-3">
            {/* Top row */}
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[var(--text-heading)]">
                  Choose a project to view full transparent details
                </div>
                <div className="truncate text-xs text-[var(--text-muted)]">
                  Filter by status or tags — everything stays in one grid
                </div>
              </div>

              {/* Status pills */}
              <div
                className={[
                  "inline-flex items-center gap-1",
                  "rounded-2xl border border-[var(--surface-border)]",
                  "bg-[var(--surface-muted)] p-1",
                  "shadow-[0_10px_28px_rgba(111,51,64,0.10)]",
                ].join(" ")}
                role="tablist"
                aria-label="Project filters"
              >
                {items.map((it) => {
                  const active = it.key === value;

                  return (
                    <button
                      key={it.key}
                      type="button"
                      onClick={() => onChange(it.key)}
                      className={[
                        "relative isolate rounded-xl px-3 sm:px-4 py-2",
                        "text-sm font-semibold transition",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/25",
                        active
                          ? "text-[var(--bg-page)]"
                          : "text-[var(--text-body)] hover:bg-[var(--surface)]/70",
                      ].join(" ")}
                      role="tab"
                      aria-selected={active}
                    >
                      {active && (
                        <motion.span
                          layoutId="filter-pill"
                          className={[
                            "absolute inset-0 -z-10 rounded-xl",
                            "bg-[var(--primary)]",
                            "shadow-[0_10px_26px_rgba(111,51,64,0.18)]",
                          ].join(" ")}
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}

                      <span className="relative">{it.label}</span>

                      <span
                        className={[
                          "ml-2 rounded-full px-2 py-0.5 text-xs font-bold",
                          active
                            ? "bg-white/18 text-[var(--bg-page)]"
                            : "bg-[var(--primary-soft)] text-[var(--text-body)]",
                        ].join(" ")}
                        aria-label={`${it.count} ${it.label} projects`}
                      >
                        {it.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tag row */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-semibold text-[var(--text-muted)] mr-1">
                Tags:
              </div>

              {tags.map((t) => {
                const active = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onToggleTag(t)}
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold transition",
                      "border",
                      active
                        ? "bg-[var(--primary)] text-[var(--bg-page)] border-[var(--primary)] shadow-[var(--shadow-soft)]"
                        : "bg-[var(--surface)] text-[var(--text-body)] border-[var(--surface-border)] hover:bg-[var(--surface-muted)]",
                      "focus:outline-none focus-visible:shadow-[var(--ring)]",
                    ].join(" ")}
                    aria-pressed={active}
                  >
                    {t}
                  </button>
                );
              })}

              {hasTags && (
                <button
                  type="button"
                  onClick={onClearTags}
                  className={[
                    "ml-1 rounded-full px-3 py-1 text-xs font-semibold",
                    "bg-[var(--surface-muted)] text-[var(--text-heading)]",
                    "border border-[var(--surface-border)] hover:bg-[var(--surface)] transition",
                    "focus:outline-none focus-visible:shadow-[var(--ring)]",
                  ].join(" ")}
                >
                  Clear tags
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-[var(--surface-border)]/60" />
    </div>
  );
}
