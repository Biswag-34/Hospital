// components/join-cause/ProjectMiniGrid.tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "./data";
import ProjectMiniCard from "./ProjectMiniCard";

type Props = {
  sectionId?: string; // urgent/ongoing/upcoming anchor id
  title: string;
  subtitle?: string;
  projects: Project[];
  selectedId?: string;
  onSelect: (projectId: string) => void;
};

export default function ProjectMiniGrid({
  sectionId,
  title,
  subtitle,
  projects,
  selectedId,
  onSelect,
}: Props) {
  return (
    <section id={sectionId} className="mt-10">
      {/* Section header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--text-heading)]">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
          ) : null}
        </div>

        <div className="text-xs text-[var(--text-muted)]">
          Click a card to view full breakdown ↓
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <motion.div
            key={p.id}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <ProjectMiniCard
              project={p}
              selected={p.id === selectedId}
              onSelect={onSelect}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
