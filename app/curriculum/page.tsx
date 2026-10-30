"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { FRAMEWORK_SECTIONS, FrameworkSection } from "@/data/frameworkSections";
import {
  Layers,
  Clock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Shield,
  Terminal,
  Network,
  Binary,
  Flame,
  Filter,
} from "lucide-react";
import { tacticalAudio } from "@/components/TacticalAudio";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Lock: Shield,
  Terminal,
  Network,
  Binary,
  Flame,
  BookOpen,
};

export default function CurriculumIndexPage() {
  const [selectedWeek, setSelectedWeek] = useState<number | "all">("all");
  const [completedCriteria, setCompletedCriteria] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ah_completed_criteria");
    if (saved) {
      try {
        setCompletedCriteria(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, []);

  const filteredSections =
    selectedWeek === "all"
      ? FRAMEWORK_SECTIONS
      : FRAMEWORK_SECTIONS.filter((s) => s.week === selectedWeek);

  const totalCriteria = FRAMEWORK_SECTIONS.reduce(
    (acc, s) => acc + s.completionCriteria.length,
    0
  );
  const completedCount = completedCriteria.length;
  const overallProgress = Math.round((completedCount / totalCriteria) * 100);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Page Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-sans text-apple-blue">
              <Layers className="w-3.5 h-3.5" />
              <span>3-Week Comprehensive Roadmap</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-semibold tracking-[-0.03em] text-white">
              The 7-Section Cybersecurity Framework
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Complete syllabus architecture for AfricaHackon Cohort 6. Click into any section to
              explore detailed module notes, interactive tools, learning outcomes, and practical completion criteria.
            </p>
          </div>

          {/* Progress Capsule Widget */}
          <div className="p-5 rounded-3xl glass-panel-elevated space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="text-zinc-400">Squad Mastery Progress</span>
              <span className="font-mono text-apple-green font-semibold">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
              <div
                className="bg-apple-green h-full rounded-full transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="text-[11px] font-sans text-zinc-500">
              {completedCount} of {totalCriteria} completion criteria verified
            </div>
          </div>
        </div>

        {/* Week Segmented Control Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: "all", label: "All 7 Sections" },
            { id: 1, label: "Week 1: Fundamentals & Linux" },
            { id: 2, label: "Week 2: Networking (Parts 1 & 2)" },
            { id: 3, label: "Week 3: Metasploit & Exam Prep" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                tacticalAudio.playBlip(800, 0.02);
                setSelectedWeek(tab.id as never);
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all flex-shrink-0 ${
                selectedWeek === tab.id
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "bg-white/[0.05] text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSections.map((sec) => {
            const IconComponent = iconMap[sec.iconName] || Shield;
            const secCompleted = sec.completionCriteria.filter((c) =>
              completedCriteria.includes(c.id)
            ).length;
            const secTotal = sec.completionCriteria.length;
            const secPercent = Math.round((secCompleted / secTotal) * 100);

            return (
              <Link
                key={sec.id}
                href={`/curriculum/${sec.id}`}
                onClick={() => tacticalAudio.playBlip(750, 0.02)}
                className="p-6 sm:p-7 rounded-3xl glass-panel hover:glass-panel-elevated hover:border-white/20 transition-all flex flex-col justify-between group space-y-6"
              >
                <div>
                  {/* Top Eyebrow Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300">
                      SECTION 0{sec.number}
                    </span>
                    <span className="text-xs font-sans text-zinc-500">{sec.durationLabel}</span>
                  </div>

                  {/* Section Title & Subtitle */}
                  <div className="space-y-1.5 mb-3">
                    <h3 className="text-xl font-display font-semibold text-white group-hover:text-apple-blue transition-colors tracking-tight leading-snug">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                      {sec.subtitle}
                    </p>
                  </div>

                  {/* Modules Pills */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                      Core Modules ({sec.modules.length})
                    </span>
                    <div className="space-y-1.5">
                      {sec.modules.slice(0, 3).map((m) => (
                        <div
                          key={m.id}
                          className="text-xs text-zinc-300 font-sans truncate flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
                          <span className="truncate">{m.title}</span>
                        </div>
                      ))}
                      {sec.modules.length > 3 && (
                        <span className="text-[11px] font-sans text-zinc-500 pl-3.5 block">
                          +{sec.modules.length - 3} more sub-disciplines
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Progress & Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        secPercent === 100 ? "text-apple-green" : "text-zinc-600"
                      }`}
                    />
                    <span>
                      {secCompleted}/{secTotal} verified ({secPercent}%)
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-white font-medium group-hover:translate-x-1 transition-transform">
                    Enter Section
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
