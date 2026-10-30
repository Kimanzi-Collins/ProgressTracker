"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import AnatomyCyberEngine from "@/components/AnatomyCyberEngine";
import { FRAMEWORK_SECTIONS } from "@/data/frameworkSections";
import { INITIAL_SQUAD_MEMBERS, SquadMember } from "@/data/squadMembers";
import { tacticalAudio } from "@/components/TacticalAudio";
import {
  Shield,
  Layers,
  Sparkles,
  Flame,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Terminal,
  Zap,
  Users,
  MapPin,
  Clock,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [members, setMembers] = useState<SquadMember[]>(INITIAL_SQUAD_MEMBERS);
  const [completedCriteria, setCompletedCriteria] = useState<string[]>([]);
  const [checkedToday, setCheckedToday] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedMembers = localStorage.getItem("ah_squad_members_v3");
    if (savedMembers) {
      try {
        const parsed = JSON.parse(savedMembers);
        if (Array.isArray(parsed) && parsed.length === 7) setMembers(parsed);
      } catch {
        // Fallback
      }
    }

    const savedCriteria = localStorage.getItem("ah_completed_criteria");
    if (savedCriteria) {
      try {
        setCompletedCriteria(JSON.parse(savedCriteria));
      } catch {
        // Fallback
      }
    }
  }, []);

  const totalCriteria = FRAMEWORK_SECTIONS.reduce(
    (acc, s) => acc + s.completionCriteria.length,
    0
  );
  const completedCount = completedCriteria.length;
  const overallProgress = Math.round((completedCount / totalCriteria) * 100);

  const averageStreak = Math.round(
    members.reduce((acc, m) => acc + m.currentStreak, 0) / members.length
  );

  const handleQuickCheckIn = (id: string) => {
    if (checkedToday[id]) return;
    const updated = members.map((m) => {
      if (m.id === id) {
        const next = m.currentStreak + 1;
        return {
          ...m,
          currentStreak: next,
          longestStreak: Math.max(next, m.longestStreak),
          lastActive: "Just now",
        };
      }
      return m;
    });

    setMembers(updated);
    try {
      localStorage.setItem("ah_squad_members_v3", JSON.stringify(updated));
    } catch {
      // Safe catch
    }
    setCheckedToday((prev) => ({ ...prev, [id]: true }));
    tacticalAudio.playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header activeStreakCount={averageStreak} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 sm:space-y-24">
        {/* Apple-grade Editorial Hero Section */}
        <section className="relative text-center sm:text-left space-y-6 sm:space-y-8 pt-4 sm:pt-10">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-white/[0.04] via-apple-blue/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Minimal Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-sans text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-green shadow-[0_0_8px_rgba(48,209,88,0.8)]" />
            <span className="font-medium text-white">Cohort 6 Sprint</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">3 Weeks to Practical Exam</span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-3 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-[-0.035em] text-white leading-[1.05]">
              Seven minds. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500">
                Zero blind spots.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed font-normal">
              The high-performance revision operating system for AfricaHackon Squad Vanguard.
              Navigate the 7-section curriculum, eliminate individual vulnerabilities, track daily streaks, and master practical labs.
            </p>
          </div>

          {/* Tactile Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href="/curriculum"
              onClick={() => tacticalAudio.playSuccess()}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-sans font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.22)] flex items-center justify-center gap-2 group"
            >
              <span>Explore 7-Section Framework</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/diagnostic"
              onClick={() => tacticalAudio.playBlip(750, 0.02)}
              className="w-full sm:w-auto px-6 py-3 rounded-full glass-panel hover:bg-white/[0.08] text-zinc-200 font-sans font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-apple-green" />
              <span>Diagnose Weaknesses</span>
            </Link>

            <Link
              href="/labs"
              onClick={() => tacticalAudio.playBlip(750, 0.02)}
              className="w-full sm:w-auto px-6 py-3 rounded-full glass-panel hover:bg-white/[0.08] text-zinc-200 font-sans font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-apple-teal" />
              <span>Interactive Labs</span>
            </Link>
          </div>

          {/* Key Milestone Bar */}
          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-center sm:justify-start gap-6 sm:gap-10 text-xs font-sans text-zinc-400">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                7
              </span>
              <span className="text-zinc-500 text-[11px]">Squad Ninjas</span>
            </div>
            <div className="w-px h-6 bg-white/[0.08]" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                7
              </span>
              <span className="text-zinc-500 text-[11px]">Core Sections</span>
            </div>
            <div className="w-px h-6 bg-white/[0.08]" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-lg sm:text-xl font-semibold text-apple-green tracking-tight">
                {overallProgress}%
              </span>
              <span className="text-zinc-500 text-[11px]">Criteria Verified</span>
            </div>
            <div className="w-px h-6 bg-white/[0.08]" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-lg sm:text-xl font-semibold text-apple-orange tracking-tight">
                {averageStreak}d
              </span>
              <span className="text-zinc-500 text-[11px]">Squad Streak</span>
            </div>
          </div>
        </section>

        {/* Signature Moment: Crafted Interactive Isometric Anatomy Figure */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              // Technical Explainer Rig
            </span>
            <span className="text-xs font-sans text-zinc-400">
              Interactive Hardware Perspective
            </span>
          </div>
          <AnatomyCyberEngine />
        </section>

        {/* The 7-Section Framework Quick Gateway */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-sans font-semibold text-apple-blue uppercase tracking-wider">
                Syllabus Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white mt-1">
                The 7-Section Curriculum Roadmap
              </h2>
            </div>
            <Link
              href="/curriculum"
              onClick={() => tacticalAudio.playBlip(750, 0.02)}
              className="text-xs font-sans text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View full directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FRAMEWORK_SECTIONS.map((sec) => (
              <Link
                key={sec.id}
                href={`/curriculum/${sec.id}`}
                onClick={() => tacticalAudio.playBlip(750, 0.02)}
                className="p-6 rounded-3xl glass-panel hover:glass-panel-elevated hover:border-white/20 transition-all flex flex-col justify-between group space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-zinc-400 font-semibold px-2 py-0.5 rounded-full bg-white/[0.06]">
                      SEC 0{sec.number}
                    </span>
                    <span className="font-sans text-zinc-500 text-[11px]">
                      {sec.durationLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-semibold text-white group-hover:text-apple-blue transition-colors tracking-tight leading-snug">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans line-clamp-2 mt-1 leading-relaxed">
                    {sec.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-sans">
                  <span className="text-[11px] text-zinc-500">
                    {sec.modules.length} Modules • {sec.completionCriteria.length} Checkpoints
                  </span>
                  <span className="inline-flex items-center gap-1 text-white font-medium group-hover:translate-x-1 transition-transform">
                    Enter
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Squad Vanguard Command Strip */}
        <section className="p-6 sm:p-8 rounded-3xl glass-panel-elevated space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-apple-green shadow-[0_0_8px_rgba(48,209,88,0.8)]" />
                <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                  Squad Vanguard (7 Members)
                </h3>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Daily task cadence and mutual accountability. Click "+ Check In" to increment your streak today.
              </p>
            </div>

            <Link
              href="/squad"
              onClick={() => tacticalAudio.playBlip(750, 0.02)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-black font-sans font-medium text-xs transition-all shadow-sm"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Open Squad HQ</span>
            </Link>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {members.map((member) => {
              const isLogged = !!checkedToday[member.id];
              return (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-60 sm:w-auto p-4 rounded-2xl glass-panel flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold text-white truncate">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-sans truncate">
                        @{member.handle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs font-sans">
                    <div className="flex items-center gap-1 text-apple-orange font-medium">
                      <Flame className="w-3.5 h-3.5 fill-apple-orange" />
                      <span>{member.currentStreak}d</span>
                    </div>

                    <button
                      onClick={() => handleQuickCheckIn(member.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-all ${
                        isLogged
                          ? "bg-apple-green/15 text-apple-green"
                          : "bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-black"
                      }`}
                    >
                      {isLogged ? "Logged" : "+ Check In"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Apple-style Footer */}
      <footer className="border-t border-white/[0.08] bg-black py-12 px-4 sm:px-6 text-xs font-sans text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
              <Shield className="w-4 h-4 text-apple-green" />
            </div>
            <div>
              <div className="text-zinc-200 font-medium">AfricaHackon Academy • Cohort 6</div>
              <div className="text-zinc-500 text-[11px] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-zinc-400" />
                HackHouse Africa • 124 Manyani E Rd, Nairobi
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            <Link href="/curriculum" className="hover:text-white transition-colors">
              Curriculum
            </Link>
            <Link href="/squad" className="hover:text-white transition-colors">
              Squad
            </Link>
            <Link href="/diagnostic" className="hover:text-white transition-colors">
              Weakness Audit
            </Link>
            <Link href="/labs" className="hover:text-white transition-colors">
              Labs
            </Link>
            <Link href="/runbooks" className="hover:text-white transition-colors">
              Runbooks
            </Link>
          </div>

          <div className="text-[11px] text-zinc-600">
            3-Week Sprint Architecture • Squad Vanguard
          </div>
        </div>
      </footer>
    </div>
  );
}
