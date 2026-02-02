// components/join-cause/ProjectGrid.tsx
"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "./data";

type Props = {
  title: string;
  subtitle?: string;
  projects: Project[];
  onJoin?: (projectId: string) => void;
};

export default function ProjectGrid({ title, subtitle, projects, onJoin }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-heading)]">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-[var(--text-muted)]">{subtitle}</p>}
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <motion.div
            key={p.id}
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
          >
            <ProjectCard project={p} onJoin={onJoin} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
