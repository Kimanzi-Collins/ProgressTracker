"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { FRAMEWORK_SECTIONS } from "@/data/frameworkSections";
import { tacticalAudio } from "@/components/TacticalAudio";
import {
  Sparkles,
  ChevronRight,
  Target,
  ArrowRight,
  RotateCcw,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";

interface DiagnosticQuestion {
  sectionId: string;
  sectionTitle: string;
  prompt: string;
  options: {
    text: string;
    score: number;
    level: "Novice" | "Familiar" | "Proficient" | "Master";
  }[];
}

const DIAGNOSTIC_PROMPTS: DiagnosticQuestion[] = [
  {
    sectionId: "section-1",
    sectionTitle: "Section 1: Intro & Security Processes",
    prompt: "Can you list the 7 Information Security Processes in order and map the CIA triad to real attack incidents?",
    options: [
      { text: "I struggle with the processes and get confused between authorization and authentication.", score: 25, level: "Novice" },
      { text: "I know the CIA triad, but cannot recall all 7 processes in exact order without checking.", score: 50, level: "Familiar" },
      { text: "I can recite the 7 processes and explain the 5 historic eras (Creeper to SolarWinds).", score: 75, level: "Proficient" },
      { text: "I can design risk treatment plans and distinguish technical vs non-technical roles effortlessly.", score: 100, level: "Master" },
    ],
  },
  {
    sectionId: "section-2",
    sectionTitle: "Section 2: Key Terminologies & IR Phases",
    prompt: "How confident are you explaining NIST CSF 5 functions, the 3-2-1 backup rule, and the 6 Incident Response phases?",
    options: [
      { text: "Frameworks feel overwhelming; I confuse symmetric and asymmetric encryption.", score: 25, level: "Novice" },
      { text: "I understand firewalls vs IDS, but struggle with IR metrics (MTTD/MTTR).", score: 50, level: "Familiar" },
      { text: "I know the 6 IR phases (Preparation to Lessons Learned) and Kenya DPA requirements.", score: 75, level: "Proficient" },
      { text: "I can structure an ISO 27001 ISMS audit and classify enterprise data across all 4 tiers.", score: 100, level: "Master" },
    ],
  },
  {
    sectionId: "section-3",
    sectionTitle: "Section 3: Linux Architecture & Scripting",
    prompt: "Can you manage Linux services with systemctl, write modular Bash automation scripts, and audit running processes?",
    options: [
      { text: "I have difficulty navigating the CLI without graphical file managers.", score: 25, level: "Novice" },
      { text: "I know basic commands (ls, cd, chmod), but writing Bash loops is challenging.", score: 50, level: "Familiar" },
      { text: "I write Bash scripts with argument validators, manage systemd daemons, and use APT.", score: 75, level: "Proficient" },
      { text: "I find SUID binaries for privesc, parse complex logs, and complete OverTheWire Bandit challenges.", score: 100, level: "Master" },
    ],
  },
  {
    sectionId: "section-4",
    sectionTitle: "Section 4: Networking Fundamentals (Part 1)",
    prompt: "Can you recite all 7 OSI layers from memory, map them to TCP/IP, and state the exact PDU at each layer?",
    options: [
      { text: "I mix up Layer 2 and Layer 3, and don't know the difference between Segments and Packets.", score: 25, level: "Novice" },
      { text: "I know the 7 OSI layers, but struggle with fiber single-mode vs multi-mode specs.", score: 50, level: "Familiar" },
      { text: "I can map OSI to TCP/IP and trace packet encapsulation from Application down to Physical bits.", score: 75, level: "Proficient" },
      { text: "I analyze radio frequencies (802.11ax), understand network topologies, and explain decapsulation.", score: 100, level: "Master" },
    ],
  },
  {
    sectionId: "section-5",
    sectionTitle: "Section 5: Networking Fundamentals (Part 2)",
    prompt: "Can you calculate CIDR subnets (/27, /30) on the fly, explain VLSM, and match 10+ service ports without notes?",
    options: [
      { text: "Subnetting math is confusing; I cannot calculate usable hosts from a mask.", score: 25, level: "Novice" },
      { text: "I know common ports (80, 443), but Kerberos 88, SMB 445, and RDP 3389 trip me up.", score: 50, level: "Familiar" },
      { text: "I calculate subnets quickly, know RFC 1918 private ranges, and convert binary/hex.", score: 75, level: "Proficient" },
      { text: "I analyze Wireshark http.cap streams for credentials and calculate complex VLSM allocations.", score: 100, level: "Master" },
    ],
  },
  {
    sectionId: "section-6",
    sectionTitle: "Section 6: Metasploit Framework",
    prompt: "Can you navigate msfconsole, distinguish Exploit vs Auxiliary modules, and configure RHOSTS/LHOST/LPORT?",
    options: [
      { text: "I have never launched or used Metasploit Framework.", score: 25, level: "Novice" },
      { text: "I have opened msfconsole, but struggle with setting options and handling multi/handler listeners.", score: 50, level: "Familiar" },
      { text: "I can search modules, configure RHOSTS/LHOST, generate payloads with msfvenom, and run scans.", score: 75, level: "Proficient" },
      { text: "I execute complete full-chain exploitation against Metasploitable2 and manage sessions independently.", score: 100, level: "Master" },
    ],
  },
  {
    sectionId: "section-7",
    sectionTitle: "Section 7: Toolchain & Practical Exam Readiness",
    prompt: "Is your virtualized laboratory environment fully operational and tested for the final practical exam?",
    options: [
      { text: "I don't have Kali Linux or a hypervisor installed yet.", score: 25, level: "Novice" },
      { text: "I have Kali Linux, but Wireshark and Git are not properly configured.", score: 50, level: "Familiar" },
      { text: "All tools (VMware/VirtualBox, Kali, Wireshark, VS Code, Git) are installed and verified.", score: 75, level: "Proficient" },
      { text: "My entire lab is battle-tested, I've solved OverTheWire Bandit, and I'm ready for the 3-week exam sprint.", score: 100, level: "Master" },
    ],
  },
];

export default function DiagnosticPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = DIAGNOSTIC_PROMPTS.length;
  const currentQ = DIAGNOSTIC_PROMPTS[currentStep];

  const handleSelectOption = (score: number) => {
    tacticalAudio.playBlip(950, 0.02);
    const updated = { ...scores, [currentQ.sectionId]: score };
    setScores(updated);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      tacticalAudio.playSuccess();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  // Find weakest sections
  const sortedSections = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  const weakestSectionId = sortedSections[0]?.[0] || "section-5";
  const weakestSection = FRAMEWORK_SECTIONS.find((s) => s.id === weakestSectionId);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-8">
        {!isFinished ? (
          <div className="p-8 sm:p-12 rounded-3xl glass-panel-elevated space-y-8">
            {/* Top Step Counter */}
            <div className="flex items-center justify-between text-xs font-sans text-zinc-400 pb-4 border-b border-white/[0.08]">
              <span className="text-apple-blue font-semibold uppercase">
                {currentQ.sectionTitle}
              </span>
              <span>
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>

            {/* Apple Slim Progress Bar */}
            <div className="w-full bg-white/[0.06] h-1 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>

            {/* Question Prompt */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Self-Audit Assessment
              </span>
              <h2 className="text-xl sm:text-3xl font-display font-semibold text-white tracking-tight leading-snug">
                {currentQ.prompt}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full p-5 rounded-2xl text-left bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/20 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1 pr-4">
                    <span
                      className={`text-[10px] font-sans px-2.5 py-0.5 rounded-full font-semibold uppercase ${
                        opt.level === "Master"
                          ? "bg-apple-green/15 text-apple-green"
                          : opt.level === "Proficient"
                          ? "bg-apple-blue/10 text-apple-blue"
                          : opt.level === "Familiar"
                          ? "bg-apple-orange/15 text-apple-orange"
                          : "bg-apple-red/15 text-apple-red"
                      }`}
                    >
                      {opt.level} ({opt.score}%)
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-200 font-sans group-hover:text-white leading-relaxed">
                      {opt.text}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="p-8 sm:p-12 rounded-3xl glass-panel-elevated space-y-8 animate-apple-reveal">
            <div className="text-center space-y-2 pb-6 border-b border-white/[0.08]">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-apple-green/10 text-apple-green text-xs font-sans font-medium">
                <Target className="w-3.5 h-3.5" />
                Diagnostic Complete
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight">
                Your Tailored Exam Sprint Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-sans leading-relaxed">
                Based on your diagnostic profile, your biggest opportunity for exam points is in{" "}
                <strong className="text-white font-semibold">{weakestSection?.title}</strong>.
              </p>
            </div>

            {/* 7-Section Radar Mastery Grid */}
            <div className="space-y-3">
              <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
                7-Section Framework Scorecard
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FRAMEWORK_SECTIONS.map((sec) => {
                  const score = scores[sec.id] || 50;
                  return (
                    <div
                      key={sec.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-zinc-200 font-medium truncate max-w-[200px]">
                          Sec 0{sec.number}: {sec.title}
                        </span>
                        <span className="font-mono text-zinc-400 text-[11px]">{score}%</span>
                      </div>
                      <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            score >= 75
                              ? "bg-apple-green"
                              : score >= 50
                              ? "bg-apple-orange"
                              : "bg-apple-red"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Target Section CTA */}
            {weakestSection && (
              <div className="p-6 rounded-3xl bg-apple-blue/10 border border-apple-blue/25 space-y-3">
                <span className="text-[11px] font-mono text-apple-blue uppercase tracking-wider block font-semibold">
                  Recommended Priority Deep-Dive
                </span>
                <h3 className="text-xl font-display font-semibold text-white">
                  Section 0{weakestSection.number}: {weakestSection.title}
                </h3>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {weakestSection.summary}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/curriculum/${weakestSection.id}`}
                    onClick={() => tacticalAudio.playSuccess()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-sans font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
                  >
                    Launch Priority Section
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setScores({});
                  setIsFinished(false);
                  tacticalAudio.playBlip(700, 0.02);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-zinc-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Diagnostic Audit
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
