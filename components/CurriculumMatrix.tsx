"use client";

import React, { useState } from "react";
import { CurriculumModule } from "@/data/curriculumData";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  ChevronRight,
  Layers,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";

interface CurriculumMatrixProps {
  modules: CurriculumModule[];
  completedModuleIds: string[];
  onOpenModule: (module: CurriculumModule) => void;
  onToggleComplete: (moduleId: string) => void;
}

export default function CurriculumMatrix({
  modules,
  completedModuleIds,
  onOpenModule,
  onToggleComplete,
}: CurriculumMatrixProps) {
  const [selectedSprint, setSelectedSprint] = useState<"All" | "Sprint 1" | "Sprint 2">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = modules.filter((m) => {
    const matchesSprint =
      selectedSprint === "All"
        ? true
        : selectedSprint === "Sprint 1"
        ? m.sprint.includes("Sprint 1")
        : m.sprint.includes("Sprint 2");

    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSprint && matchesSearch;
  });

  return (
    <section id="curriculum-matrix" className="space-y-6 sm:space-y-8">
      {/* Section Header & Apple-style Segmented Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-sans font-medium text-apple-blue uppercase tracking-wider">
            Curriculum Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white mt-1">
            Practical Modules & Checkpoints
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            12 comprehensive modules designed for Cohort 6 practical examination readiness.
          </p>
        </div>

        {/* Filter Controls (Apple Segmented Bar & Search) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Segmented Control Bar */}
          <div className="inline-flex rounded-full bg-white/[0.05] p-1 border border-white/[0.08] backdrop-blur-xl text-xs font-sans">
            {(["All", "Sprint 1", "Sprint 2"] as const).map((sprint) => (
              <button
                key={sprint}
                onClick={() => {
                  tacticalAudio.playBlip(850, 0.02);
                  setSelectedSprint(sprint);
                }}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  selectedSprint === sprint
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {sprint}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter topics & labs..."
              className="pl-9 pr-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white placeholder-zinc-500 font-sans outline-none focus:border-white/30 transition-colors w-44 sm:w-52"
            />
          </div>
        </div>
      </div>

      {/* Bento Grid of Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((mod) => {
          const isCompleted = completedModuleIds.includes(mod.id);

          return (
            <div
              key={mod.id}
              onClick={() => {
                tacticalAudio.playBlip(750, 0.02);
                onOpenModule(mod);
              }}
              className={`p-6 rounded-3xl transition-all cursor-pointer flex flex-col justify-between group ${
                isCompleted
                  ? "glass-panel-elevated ring-1 ring-apple-green/30"
                  : "glass-panel hover:bg-white/[0.04] hover:border-white/20"
              }`}
            >
              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300">
                      Module {mod.number}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      {mod.sprint.split(":")[0]}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(mod.id);
                      tacticalAudio.playSuccess();
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      isCompleted
                        ? "text-apple-green"
                        : "text-zinc-600 hover:text-zinc-300"
                    }`}
                    title={isCompleted ? "Mark incomplete" : "Mark complete"}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Module Title & Tagline */}
                <h3 className="text-lg font-display font-semibold text-white group-hover:text-apple-blue transition-colors mb-2 leading-snug tracking-tight">
                  {mod.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-4 leading-relaxed">
                  {mod.tagline}
                </p>

                {/* Topics Preview Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {mod.topics.slice(0, 2).map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400 truncate max-w-[220px]"
                    >
                      {topic}
                    </span>
                  ))}
                  {mod.topics.length > 2 && (
                    <span className="text-[11px] font-sans px-2 py-1 rounded-full bg-white/[0.03] text-zinc-500">
                      +{mod.topics.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-sans text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <Clock className="w-3.5 h-3.5" />
                    {mod.estimatedHours}h
                  </span>
                  <span className="text-[11px] text-apple-blue">
                    {mod.practicalLabs.length} Practical Labs
                  </span>
                </div>

                <div className="flex items-center gap-1 text-white text-xs font-medium group-hover:translate-x-0.5 transition-transform">
                  View
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
