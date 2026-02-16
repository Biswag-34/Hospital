// components/join-cause/JoinCausePage.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import JoinCauseHero from "./JoinCauseHero";
import StickyProjectBar, { type Filter } from "./StickyProjectBar";
import ProjectMiniCard from "./ProjectMiniCard";
import ProjectDetailCard from "./ProjectDetailCard"; // adjust if your file name differs
import { projects, allProjectTags } from "./data";

export default function JoinCausePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id || "");

  const detailRef = useRef<HTMLDivElement | null>(null);

  const counts = useMemo(() => {
    const all = projects.length;
    const urgent = projects.filter((p) => p.urgent).length;
    const ongoing = projects.filter((p) => p.status === "ongoing").length;
    const upcoming = projects.filter((p) => p.status === "upcoming").length;
    return { all, urgent, ongoing, upcoming };
  }, []);

  const filtered = useMemo(() => {
    let list = [...projects];

    if (filter === "urgent") list = list.filter((p) => p.urgent);
    if (filter === "ongoing") list = list.filter((p) => p.status === "ongoing");
    if (filter === "upcoming") list = list.filter((p) => p.status === "upcoming");

    if (selectedTags.length) {
      // OR match (a project appears if it contains any selected tag)
      list = list.filter((p) => selectedTags.some((t) => p.tags.includes(t)));
    }

    return list;
  }, [filter, selectedTags]);

  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedId) || filtered[0] || projects[0];
  }, [selectedId, filtered]);

  function onSelectProject(id: string) {
    setSelectedId(id);
    // smooth scroll to detail view
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
    );
  }

  function clearTags() {
    setSelectedTags([]);
  }

  return (
    <main className="bg-[var(--bg-page)]">
      <JoinCauseHero
        onPrimaryClick={() => {
          // scroll to grid
          const el = document.getElementById("projects-grid");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        onSecondaryClick={() => {
          // you can open your contact modal here
          const el = document.getElementById("projects-grid");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <StickyProjectBar
        value={filter}
        onChange={setFilter}
        counts={counts}
        tags={allProjectTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClearTags={clearTags}
      />

      {/* ✅ ONE section: grid */}
      <section id="projects-grid" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--text-heading)]">
              Projects
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              All projects in one place — filter by status & tags.
            </p>
          </div>

          <div className="text-xs text-[var(--text-muted)]">
            Showing <span className="font-semibold text-[var(--text-heading)]">{filtered.length}</span>{" "}
            of <span className="font-semibold text-[var(--text-heading)]">{projects.length}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectMiniCard
              key={p.id}
              project={p}
              selected={p.id === selectedProject?.id}
              onSelect={onSelectProject}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
            No projects match this filter. Try changing status or clearing tags.
          </div>
        )}
      </section>

      {/* ✅ Details (single strip handled inside ProjectDetailCard) */}
      <div ref={detailRef}>
        {selectedProject ? (
          <ProjectDetailCard
            project={selectedProject}
            onBack={() => {
              const el = document.getElementById("projects-grid");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            onDonate={(id) => {
              // hook your donation modal here
              console.log("Donate:", id);
            }}
          />
        ) : null}
      </div>
    </main>
  );
}
