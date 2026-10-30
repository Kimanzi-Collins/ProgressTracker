"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import AnatomyCyberEngine from "@/components/AnatomyCyberEngine";
import SubnetCalculator from "@/components/SubnetCalculator";
import ProtocolMatcher from "@/components/ProtocolMatcher";
import MetasploitTerminal from "@/components/MetasploitTerminal";
import { tacticalAudio } from "@/components/TacticalAudio";
import {
  Terminal,
  Calculator,
  Zap,
  Sparkles,
  Layers,
  FileCode,
  CheckCircle2,
} from "lucide-react";

export default function LabsPage() {
  const [activeTool, setActiveTool] = useState<
    "subnet" | "ports" | "anatomy" | "metasploit"
  >("subnet");

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Editorial Header */}
        <div className="space-y-2 max-w-3xl pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-sans text-apple-teal">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Practical Lab Workbench</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-semibold tracking-[-0.03em] text-white">
            Practical Tools & Simulators
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            The AfricaHackon certification focuses strictly on hands-on practical execution.
            Use these interactive rigs to drill subnet math, port numbers, packet encapsulation, and Metasploit workflows.
          </p>
        </div>

        {/* Tool Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: "subnet", label: "CIDR / VLSM Calculator", icon: Calculator },
            { id: "ports", label: "Port & Protocol Speed-Matcher", icon: Zap },
            { id: "anatomy", label: "OSI Encapsulation Rig (Anatomy)", icon: Layers },
            { id: "metasploit", label: "msfconsole Terminal", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  tacticalAudio.playBlip(800, 0.02);
                  setActiveTool(tab.id as never);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all flex-shrink-0 ${
                  activeTool === tab.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/[0.05] text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tool View */}
        <div className="space-y-8">
          {activeTool === "subnet" && <SubnetCalculator />}
          {activeTool === "ports" && <ProtocolMatcher />}
          {activeTool === "anatomy" && <AnatomyCyberEngine />}
          {activeTool === "metasploit" && <MetasploitTerminal />}
        </div>
      </main>
    </div>
  );
}
