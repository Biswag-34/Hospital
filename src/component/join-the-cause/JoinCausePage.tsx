// components/join-cause/JoinCausePage.tsx
"use client";

import { useMemo, useState } from "react";
import JoinCauseHero from "./JoinCauseHero";
import HighlightProjects from "./HighlightProjects";
import ProjectGrid from "./ProjectGrid";
import StickyProjectBar from "./StickyProjectBar";
import { projects } from "./data";
import type { ProjectStatus } from "./data";

export default function JoinCausePage() {
  const [status, setStatus] = useState<ProjectStatus>("ongoing");

  const handleJoin = (projectId: string) => {
    console.log("Join cause for:", projectId);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const counts = useMemo(() => {
    return {
      ongoing: projects.filter((p) => p.status === "ongoing").length,
      upcoming: projects.filter((p) => p.status === "upcoming").length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.status === status);
  }, [status]);

  const highlighted = useMemo(() => {
    const sameTabFeatured = projects.filter((p) => p.status === status && p.featured);
    if (sameTabFeatured.length >= 1) return sameTabFeatured;

    const urgentSameTab = projects.filter((p) => p.status === status && p.urgent);
    if (urgentSameTab.length >= 1) return urgentSameTab;

    return projects.filter((p) => p.featured).slice(0, 2);
  }, [status]);

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)]">
      <JoinCauseHero
        onPrimaryClick={() => scrollTo("projects")}
        onSecondaryClick={() => scrollTo("contact")}
      />

      {/* Sticky Tabs Bar */}
      <StickyProjectBar value={status} onChange={setStatus} counts={counts} />

      <HighlightProjects projects={highlighted} onJoin={handleJoin} />

      <div id="projects" className="mx-auto max-w-6xl px-4">
        <div className="h-px w-full bg-[var(--surface-border)]" />
      </div>

      <ProjectGrid
        title={status === "ongoing" ? "Ongoing Projects" : "Upcoming Projects"}
        subtitle={
          status === "ongoing"
            ? "Projects currently running — support the impact in real time."
            : "Planned initiatives — help us prepare resources and execute faster."
        }
        projects={filteredProjects}
        onJoin={handleJoin}
      />

      {/* Final Contact CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
        <div
          className={[
            "relative overflow-hidden rounded-3xl border border-[var(--surface-border)]",
            "bg-[var(--bg-dark)] p-8 sm:p-10",
            "text-[var(--bg-page)]",
            "shadow-[var(--shadow-strong)]",
          ].join(" ")}
        >
          {/* Token-based soft glow (no hardcoded RGBA) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,var(--primary-soft),transparent_58%)]" />
            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-28 -bottom-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Want to partner, sponsor, or volunteer?
            </h2>

            <p className="mt-3 text-[var(--bg-page)]/80 leading-relaxed">
              Reach out and our team will guide you — donations, volunteering, CSR partnerships, or equipment support.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className={[
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "bg-[var(--bg-page)] text-[var(--primary)]",
                  "shadow-[var(--shadow-soft)] transition hover:opacity-90 active:scale-[0.98]",
                  "focus:outline-none focus-visible:shadow-[var(--ring)]",
                ].join(" ")}
              >
                Contact Us
              </a>

              <a
                href="tel:+910000000000"
                className={[
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "border border-white/20 bg-white/10 text-[var(--bg-page)]",
                  "transition hover:bg-white/15 active:scale-[0.98]",
                  "focus:outline-none focus-visible:shadow-[var(--ring)]",
                ].join(" ")}
              >
                Call Now
              </a>
            </div>

            <div className="mt-6 text-sm text-[var(--bg-page)]/70">
              Email: support@yourhospital.com • Address: Your City, India
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
