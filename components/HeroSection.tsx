"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";

const CyberThreeCore = dynamic(() => import("./CyberThreeCore"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border border-white/10 animate-spin border-t-white/40" />
    </div>
  ),
});

interface HeroSectionProps {
  onOpenDiagnostic: () => void;
  activeMemberName: string;
  velocityMultiplier: number;
}

export default function HeroSection({
  onOpenDiagnostic,
  activeMemberName,
  velocityMultiplier,
}: HeroSectionProps) {
  return (
    <section className="relative pt-6 pb-12 sm:pt-14 sm:pb-20 overflow-hidden">
      {/* Apple-style Soft Radial Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-white/[0.04] via-apple-blue/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Apple-grade Monumental Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-sans text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-apple-green shadow-[0_0_8px_rgba(48,209,88,0.8)]" />
              <span className="font-medium text-white">Cohort 6</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Squad Vanguard</span>
            </div>

            {/* Monumental Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-[-0.035em] text-white leading-[1.05]">
                Seven minds. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500">
                  Zero blind spots.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                The high-performance progress engine for AfricaHackon Academy.
                Track daily task streaks, pinpoint individual vulnerabilities, and master hands-on labs before the practical final exam.
              </p>
            </div>

            {/* Tactile Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => {
                  tacticalAudio.playSuccess();
                  onOpenDiagnostic();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-sans font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.22)] flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Diagnose Weaknesses</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#curriculum-matrix"
                onClick={() => tacticalAudio.playBlip(750, 0.02)}
                className="w-full sm:w-auto px-6 py-3 rounded-full glass-panel hover:bg-white/[0.08] text-zinc-200 font-sans font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Explore 12 Modules</span>
              </a>
            </div>

            {/* Minimalist Key Stats Bar */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-center lg:justify-start gap-6 sm:gap-10 text-xs font-sans text-zinc-400">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  7
                </span>
                <span className="text-zinc-500 text-[11px]">Squad Ninjas</span>
              </div>
              <div className="w-px h-6 bg-white/[0.08]" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  12
                </span>
                <span className="text-zinc-500 text-[11px]">Core Modules</span>
              </div>
              <div className="w-px h-6 bg-white/[0.08]" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg sm:text-xl font-semibold text-apple-green tracking-tight">
                  100%
                </span>
                <span className="text-zinc-500 text-[11px]">Hands-On Labs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Apple-style Spatial Artifact Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md lg:max-w-none rounded-3xl glass-panel p-2 shadow-apple-glass relative">
              <CyberThreeCore
                velocityMultiplier={velocityMultiplier}
                activeMemberName={activeMemberName}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
