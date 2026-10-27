"use client";

import React, { useState } from "react";
import { SquadMember } from "@/data/squadMembers";
import {
  Flame,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  UserCheck,
  ChevronRight,
  Shield,
  Zap,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";
import confetti from "canvas-confetti";

interface SquadWarRoomProps {
  members: SquadMember[];
  activeMemberId: string;
  onSelectMember: (id: string) => void;
  onLogDailyStreak: (id: string) => void;
  onOpenDiagnostic: (member: SquadMember) => void;
}

export default function SquadWarRoom({
  members,
  activeMemberId,
  onSelectMember,
  onLogDailyStreak,
  onOpenDiagnostic,
}: SquadWarRoomProps) {
  const activeMember = members.find((m) => m.id === activeMemberId) || members[0] || {
    id: "mem-1",
    name: "Collins Kimanzi",
    handle: "Gh0stNode",
    role: "Squad Lead // Red Team",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    currentStreak: 19,
    longestStreak: 24,
    totalTasksCompleted: 42,
    lastActive: "Just now",
    badge: "Vanguard Lead",
    weaknessScores: {
      linuxScripting: 92,
      networkingPackets: 85,
      windowsAD: 78,
      webAppSec: 88,
      mobileAppSec: 72,
      cloudSec: 70,
      grcReporting: 84,
    },
    recommendedFocus: ["AWS IAM Policy Auditing", "Genymotion Mobile Deeplink Patching"],
    completedTasks: ["task-c1-1"],
  };
  const [loggedToday, setLoggedToday] = useState<Record<string, boolean>>({});

  const totalCompleted = members.reduce((acc, m) => acc + m.completedTasks.length, 0);
  const averageStreak = Math.round(
    members.reduce((acc, m) => acc + m.currentStreak, 0) / members.length
  );
  const highestStreak = Math.max(...members.map((m) => m.currentStreak));

  const handleCheckIn = (id: string) => {
    if (loggedToday[id]) return;
    onLogDailyStreak(id);
    setLoggedToday((prev) => ({ ...prev, [id]: true }));
    tacticalAudio.playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <section id="squad-war-room" className="space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-sans font-medium text-apple-blue uppercase tracking-wider">
            Command Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white mt-1">
            Squad Cadence & Activity
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md">
          7 cohort ninjas synchronizing daily labs, practical checkpoints, and weakness mitigation.
        </p>
      </div>

      {/* Apple-style Bento Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-5 sm:p-6 rounded-3xl glass-panel relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-sans text-zinc-400">Average Squad Streak</span>
            <div className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight flex items-center gap-2">
              {averageStreak}
              <span className="text-sm font-sans font-normal text-zinc-500">days</span>
            </div>
            <span className="text-[11px] text-apple-green font-sans font-medium block">
              +14% momentum this sprint
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-apple-green/10 border border-apple-green/20 flex items-center justify-center text-apple-green">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl glass-panel relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-sans text-zinc-400">Peak Member Streak</span>
            <div className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight flex items-center gap-2">
              {highestStreak}
              <span className="text-sm font-sans font-normal text-zinc-500">days</span>
            </div>
            <span className="text-[11px] text-apple-orange font-sans font-medium block">
              Continuous daily check-ins
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-apple-orange/10 border border-apple-orange/20 flex items-center justify-center text-apple-orange">
            <Flame className="w-6 h-6 fill-apple-orange" />
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl glass-panel relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-sans text-zinc-400">Completed Practical Labs</span>
            <div className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight flex items-center gap-2">
              {totalCompleted}
              <span className="text-sm font-sans font-normal text-zinc-500">labs</span>
            </div>
            <span className="text-[11px] text-apple-blue font-sans font-medium block">
              Verified across 12 modules
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-apple-blue/10 border border-apple-blue/20 flex items-center justify-center text-apple-blue">
            <Zap className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 7-Member Interactive Selector (Horizontally scrollable on mobile, grid on desktop) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1 font-sans">
          <span>SELECT SQUAD MEMBER</span>
          <span className="sm:hidden">Swipe to explore →</span>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {members.map((member) => {
            const isSelected = member.id === activeMemberId;
            return (
              <div
                key={member.id}
                onClick={() => {
                  tacticalAudio.playBlip(750, 0.02);
                  onSelectMember(member.id);
                }}
                className={`flex-shrink-0 w-64 sm:w-auto p-4 sm:p-5 rounded-3xl transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "glass-panel-elevated ring-1 ring-white/30 shadow-apple-glass"
                    : "glass-panel hover:bg-white/[0.04] opacity-80 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=27272a&color=ffffff&bold=true`;
                        }}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
                      />
                      {isSelected && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-apple-green ring-2 ring-black" />
                      )}
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] text-xs font-sans font-medium text-apple-orange">
                      <Flame className="w-3 h-3 fill-apple-orange" />
                      <span>{member.currentStreak}d</span>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-sm text-white truncate">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-sans truncate mb-3">
                    @{member.handle} • {member.role.split("//")[0]}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-400 font-sans">
                    {member.completedTasks.length} labs done
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckIn(member.id);
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-all ${
                      loggedToday[member.id]
                        ? "bg-apple-green/15 text-apple-green"
                        : "bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-black"
                    }`}
                  >
                    {loggedToday[member.id] ? "Logged" : "+ Check In"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Member Inspection Bento */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <img
              src={activeMember.avatar}
              alt={activeMember.name}
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeMember.name)}&background=27272a&color=ffffff&bold=true`;
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">
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

          <button
            onClick={() => {
              tacticalAudio.playBlip(1000, 0.03);
              onOpenDiagnostic(activeMember);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-black font-sans font-medium text-xs transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Retake Diagnostic Audit
          </button>
        </div>

        {/* 2-Column Bento: Weakness Areas vs Domain Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Priority Focus */}
          <div className="space-y-3">
            <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
              Prioritized Exam Recommendations
            </span>

            <div className="space-y-2.5">
              {activeMember.recommendedFocus.map((focus, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5 hover:bg-white/[0.05] transition-colors"
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

            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed pt-1">
              Derived automatically from diagnostic scores to eliminate high-risk blindspots before exam evaluation.
            </p>
          </div>

          {/* Domain Readiness Bars */}
          <div className="space-y-3">
            <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
              Domain Mastery Breakdown
            </span>

            <div className="space-y-3">
              {[
                { label: "Linux & CLI Automation", score: activeMember.weaknessScores.linuxScripting },
                { label: "Network Forensics & PCAP", score: activeMember.weaknessScores.networkingPackets },
                { label: "Active Directory & Windows", score: activeMember.weaknessScores.windowsAD },
                { label: "Web & API Security (crAPI)", score: activeMember.weaknessScores.webAppSec },
                { label: "Mobile Reverse Eng (MobSF)", score: activeMember.weaknessScores.mobileAppSec },
                { label: "Cloud Security (AWS/Azure)", score: activeMember.weaknessScores.cloudSec },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-zinc-300 font-medium">{item.label}</span>
                    <span className="text-zinc-400 font-mono text-[11px]">{item.score}%</span>
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.score >= 75
                          ? "bg-apple-green"
                          : item.score >= 50
                          ? "bg-apple-orange"
                          : "bg-apple-red"
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
