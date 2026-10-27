"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Shield,
  Layers,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";

interface HeaderProps {
  onOpenGlobalDiagnostic: () => void;
  activeStreakCount: number;
}

export default function Header({
  onOpenGlobalDiagnostic,
  activeStreakCount,
}: HeaderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(tacticalAudio.getMuted());
  }, []);

  const handleToggleAudio = () => {
    const muted = tacticalAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-black/60 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Apple-style Brandmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          onClick={() => tacticalAudio.playBlip(900, 0.02)}
        >
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-4 h-4 text-apple-green" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm tracking-tight text-white">
                CyberSync
              </span>
              <span className="text-[10px] font-sans font-medium px-1.5 py-0.2 rounded-full bg-white/[0.08] text-zinc-300">
                Cohort 6
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-sans tracking-tight">
              AfricaHackon Academy
            </span>
          </div>
        </a>

        {/* Center Minimalist Segmented Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-xs font-sans text-zinc-300">
          <a
            href="#squad-war-room"
            onClick={() => tacticalAudio.playBlip(750, 0.02)}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            War Room
          </a>
          <a
            href="#curriculum-matrix"
            onClick={() => tacticalAudio.playBlip(750, 0.02)}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            Curriculum
          </a>
          <a
            href="#incident-practicals"
            onClick={() => tacticalAudio.playBlip(750, 0.02)}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            Incidents
          </a>
          <a
            href="#tool-runbooks"
            onClick={() => tacticalAudio.playBlip(750, 0.02)}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            Runbooks
          </a>
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-sans font-medium text-zinc-200">
            <Flame className="w-3.5 h-3.5 text-apple-orange fill-apple-orange" />
            <span>{activeStreakCount}d Streak</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleAudio}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-400 hover:text-white transition-all"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Diagnostic Action Button */}
          <button
            onClick={() => {
              tacticalAudio.playSuccess();
              onOpenGlobalDiagnostic();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-sans font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_4px_14px_rgba(255,255,255,0.25)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Diagnose
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 border-b border-white/[0.08] bg-black/95 backdrop-blur-2xl space-y-3 animate-apple-reveal">
          <nav className="flex flex-col space-y-1 text-sm font-sans text-zinc-300">
            <a
              href="#squad-war-room"
              onClick={() => {
                tacticalAudio.playBlip(750, 0.02);
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Squad War Room
            </a>
            <a
              href="#curriculum-matrix"
              onClick={() => {
                tacticalAudio.playBlip(750, 0.02);
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Curriculum (12 Modules)
            </a>
            <a
              href="#incident-practicals"
              onClick={() => {
                tacticalAudio.playBlip(750, 0.02);
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Breach Incident Labs
            </a>
            <a
              href="#tool-runbooks"
              onClick={() => {
                tacticalAudio.playBlip(750, 0.02);
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Setup Runbooks
            </a>
          </nav>

          <button
            onClick={() => {
              tacticalAudio.playSuccess();
              setMobileMenuOpen(false);
              onOpenGlobalDiagnostic();
            }}
            className="w-full py-2.5 rounded-full bg-white text-black font-sans font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Launch Weakness Diagnosis
          </button>
        </div>
      )}
    </header>
  );
}
