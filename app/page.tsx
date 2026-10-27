"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SquadWarRoom from "@/components/SquadWarRoom";
import CurriculumMatrix from "@/components/CurriculumMatrix";
import IncidentPracticalsHub from "@/components/IncidentPracticalsHub";
import ToolRunbooksHub from "@/components/ToolRunbooksHub";
import ModuleDetailModal from "@/components/ModuleDetailModal";
import WeaknessDiagnosticModal from "@/components/WeaknessDiagnosticModal";
import MobileFloatingDock from "@/components/MobileFloatingDock";
import { INITIAL_SQUAD_MEMBERS, SquadMember } from "@/data/squadMembers";
import { CURRICULUM_MODULES, CurriculumModule } from "@/data/curriculumData";
import { Shield, MapPin, ArrowUpRight } from "lucide-react";

export default function Home() {
  const [members, setMembers] = useState<SquadMember[]>(INITIAL_SQUAD_MEMBERS);
  const [activeMemberId, setActiveMemberId] = useState<string>("mem-1");
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [diagnosticMember, setDiagnosticMember] = useState<SquadMember | null>(null);

  // Initialize and persist in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ah_squad_members_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.length === 7 &&
          parsed[0]?.weaknessScores
        ) {
          setMembers(parsed);
        }
      } catch {
        // Fallback to initial
      }
    }
  }, []);

  const saveMembers = (newMembers: SquadMember[]) => {
    setMembers(newMembers);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ah_squad_members_v2", JSON.stringify(newMembers));
      } catch {
        // Safe catch for private/quota errors
      }
    }
  };

  const activeMember =
    members.find((m) => m.id === activeMemberId) || members[0] || INITIAL_SQUAD_MEMBERS[0];

  const handleSelectMember = (id: string) => {
    setActiveMemberId(id);
  };

  const handleLogStreak = (memberId: string) => {
    const updated = members.map((m) => {
      if (m.id === memberId) {
        const nextStreak = m.currentStreak + 1;
        const nextLongest = Math.max(nextStreak, m.longestStreak);
        return {
          ...m,
          currentStreak: nextStreak,
          longestStreak: nextLongest,
          lastActive: "Just now",
        };
      }
      return m;
    });
    saveMembers(updated);
  };

  const handleToggleModuleComplete = (moduleId: string) => {
    const updated = members.map((m) => {
      if (m.id === activeMemberId) {
        const exists = m.completedTasks.includes(moduleId);
        const nextTasks = exists
          ? m.completedTasks.filter((id) => id !== moduleId)
          : [...m.completedTasks, moduleId];
        return {
          ...m,
          completedTasks: nextTasks,
          totalTasksCompleted: nextTasks.length,
        };
      }
      return m;
    });
    saveMembers(updated);
  };

  const handleOpenDiagnostic = (member: SquadMember) => {
    setDiagnosticMember(member);
    setDiagnosticOpen(true);
  };

  const handleSaveDiagnostic = (
    memberId: string,
    updatedScores: Record<string, number>,
    focusAreas: string[]
  ) => {
    const updated = members.map((m) => {
      if (m.id === memberId) {
        return {
          ...m,
          weaknessScores: {
            linuxScripting: updatedScores.linuxScripting ?? m.weaknessScores.linuxScripting,
            networkingPackets: updatedScores.networkingPackets ?? m.weaknessScores.networkingPackets,
            windowsAD: updatedScores.windowsAD ?? m.weaknessScores.windowsAD,
            webAppSec: updatedScores.webAppSec ?? m.weaknessScores.webAppSec,
            mobileAppSec: updatedScores.mobileAppSec ?? m.weaknessScores.mobileAppSec,
            cloudSec: updatedScores.cloudSec ?? m.weaknessScores.cloudSec,
            grcReporting: updatedScores.grcReporting ?? m.weaknessScores.grcReporting,
          },
          recommendedFocus: focusAreas,
        };
      }
      return m;
    });
    saveMembers(updated);
  };

  const velocityMultiplier = Math.min(
    2.2,
    0.8 + (activeMember.currentStreak / 20) * 0.7
  );

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header
        onOpenGlobalDiagnostic={() => handleOpenDiagnostic(activeMember)}
        activeStreakCount={activeMember.currentStreak}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 pb-28">
        <HeroSection
          onOpenDiagnostic={() => handleOpenDiagnostic(activeMember)}
          activeMemberName={activeMember.name}
          velocityMultiplier={velocityMultiplier}
        />

        <SquadWarRoom
          members={members}
          activeMemberId={activeMemberId}
          onSelectMember={handleSelectMember}
          onLogDailyStreak={handleLogStreak}
          onOpenDiagnostic={handleOpenDiagnostic}
        />

        <CurriculumMatrix
          modules={CURRICULUM_MODULES}
          completedModuleIds={activeMember.completedTasks}
          onOpenModule={(mod) => setSelectedModule(mod)}
          onToggleComplete={handleToggleModuleComplete}
        />

        <IncidentPracticalsHub />

        <ToolRunbooksHub />
      </main>

      {/* Floating iOS Bottom Dock on Mobile */}
      <MobileFloatingDock
        onOpenDiagnostic={() => handleOpenDiagnostic(activeMember)}
      />

      {/* Modals */}
      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onMarkComplete={handleToggleModuleComplete}
        isCompleted={selectedModule ? activeMember.completedTasks.includes(selectedModule.id) : false}
      />

      {diagnosticOpen && (
        <WeaknessDiagnosticModal
          member={diagnosticMember || activeMember}
          onClose={() => setDiagnosticOpen(false)}
          onSaveAssessment={handleSaveDiagnostic}
        />
      )}

      {/* Apple-style Minimalist Footer */}
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
            <a
              href="https://learnlinux.africahackon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Linux Labs <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://overthewire.org/wargames/bandit/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Bandit Wargame <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://portswigger.net/web-security"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              PortSwigger Academy <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[11px] text-zinc-600">
            Crafted for Squad Vanguard • Spatial Design System
          </div>
        </div>
      </footer>
    </div>
  );
}
