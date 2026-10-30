"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { INITIAL_SQUAD_MEMBERS, SquadMember } from "@/data/squadMembers";
import { FRAMEWORK_SECTIONS } from "@/data/frameworkSections";
import { tacticalAudio } from "@/components/TacticalAudio";
import {
  Flame,
  Users,
  TrendingUp,
  Zap,
  CheckCircle2,
  Sparkles,
  Shield,
  ArrowRight,
  UserCheck,
  Calendar,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function SquadPage() {
  const [members, setMembers] = useState<SquadMember[]>(INITIAL_SQUAD_MEMBERS);
  const [activeMemberId, setActiveMemberId] = useState<string>("mem-1");
  const [checkedToday, setCheckedToday] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("ah_squad_members_v3");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 7) {
          setMembers(parsed);
        }
      } catch {
        // Fallback
      }
    }
  }, []);

  const saveMembers = (newMembers: SquadMember[]) => {
    setMembers(newMembers);
    try {
      localStorage.setItem("ah_squad_members_v3", JSON.stringify(newMembers));
    } catch {
      // Safe catch
    }
  };

  const handleCheckIn = (id: string) => {
    if (checkedToday[id]) return;
    const updated = members.map((m) => {
      if (m.id === id) {
        const nextStreak = m.currentStreak + 1;
        return {
          ...m,
          currentStreak: nextStreak,
          longestStreak: Math.max(nextStreak, m.longestStreak),
          lastActive: "Just now",
        };
      }
      return m;
    });

    saveMembers(updated);
    setCheckedToday((prev) => ({ ...prev, [id]: true }));
    tacticalAudio.playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const activeMember = members.find((m) => m.id === activeMemberId) || members[0];
  const averageStreak = Math.round(
    members.reduce((acc, m) => acc + m.currentStreak, 0) / members.length
  );
  const highestStreak = Math.max(...members.map((m) => m.currentStreak));

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header activeStreakCount={activeMember.currentStreak} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14">
        {/* Page Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-sans text-apple-green">
              <Users className="w-3.5 h-3.5" />
              <span>Squad Vanguard Headquarters</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-semibold tracking-[-0.03em] text-white">
              7 Cohort Ninjas. One Goal.
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Track collective cadence, daily task streaks, and personalized section readiness. Check in
              daily to keep squad velocity high before the AfricaHackon final examination.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <div className="p-4 rounded-2xl glass-panel text-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Average Streak</span>
              <div className="text-2xl font-display font-bold text-apple-green mt-0.5">
                {averageStreak}d
              </div>
            </div>
            <div className="p-4 rounded-2xl glass-panel text-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Peak Streak</span>
              <div className="text-2xl font-display font-bold text-apple-orange mt-0.5">
                {highestStreak}d
              </div>
            </div>
          </div>
        </div>

        {/* 7-Member Interactive Roster Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1 font-sans">
            <span>SQUAD ROSTER & DAILY CHECK-IN</span>
            <span>Click any member to inspect dossier</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.map((member) => {
              const isSelected = member.id === activeMemberId;
              const isLogged = !!checkedToday[member.id];

              return (
                <div
                  key={member.id}
                  onClick={() => {
                    tacticalAudio.playBlip(750, 0.02);
                    setActiveMemberId(member.id);
                  }}
                  className={`p-5 rounded-3xl transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "glass-panel-elevated ring-1 ring-white/30 shadow-apple-glass"
                      : "glass-panel hover:bg-white/[0.04] opacity-80 hover:opacity-100"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                      />
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] text-xs font-sans font-medium text-apple-orange">
                        <Flame className="w-3.5 h-3.5 fill-apple-orange" />
                        <span>{member.currentStreak}d</span>
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-base text-white tracking-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans truncate mb-3">
                      @{member.handle} • {member.badge}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Active: {member.lastActive}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckIn(member.id);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-all ${
                        isLogged
                          ? "bg-apple-green/15 text-apple-green"
                          : "bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-black"
                      }`}
                    >
                      {isLogged ? "Checked In" : "+ Check In"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Member Dossier */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel-elevated space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-4">
              <img
                src={activeMember.avatar}
                alt={activeMember.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-2xl font-display font-semibold text-white tracking-tight">
                    {activeMember.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-white/[0.08] text-zinc-300">
                    {activeMember.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  @{activeMember.handle} • {activeMember.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-sans text-zinc-400">Streak:</span>
              <span className="text-xl font-display font-bold text-apple-orange">
                {activeMember.currentStreak} Days
              </span>
              <span className="text-xs text-zinc-500 font-sans">
                (Best: {activeMember.longestStreak}d)
              </span>
            </div>
          </div>

          {/* Section Progress Bars & Personal Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Section Readiness Across the 7 Framework Sections */}
            <div className="space-y-3">
              <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
                7-Section Framework Readiness
              </span>

              <div className="space-y-3">
                {FRAMEWORK_SECTIONS.map((sec) => {
                  const score = activeMember.sectionProgress[sec.id] || 70;
                  return (
                    <div key={sec.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-zinc-300 font-medium truncate max-w-[260px]">
                          Sec 0{sec.number}: {sec.title}
                        </span>
                        <span className="text-zinc-400 font-mono text-[11px]">{score}%</span>
                      </div>
                      <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-apple-green h-full rounded-full transition-all duration-700"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Personal Exam Focus */}
            <div className="space-y-4">
              <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
                Personalized Revision Priorities
              </span>

              <div className="space-y-3">
                {activeMember.personalFocus.map((focus, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-apple-orange/15 text-apple-orange flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      !
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-medium text-zinc-200">
                      {focus}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs font-sans text-zinc-400">
                <span className="font-semibold text-white block">
                  Peer Review & Accountability
                </span>
                <p className="leading-relaxed">
                  Collaborate at HackHouse Africa (124 Manyani E Rd, Nairobi) or sync on Discord.
                  Pair up weekly to test each other on service port mapping and the 7 InfoSec processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
