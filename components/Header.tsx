"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Shield,
  Menu,
  X,
  Layers,
  Users,
  Terminal,
  Wrench,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";

interface HeaderProps {
  activeStreakCount?: number;
}

export default function Header({ activeStreakCount = 21 }: HeaderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMuted(tacticalAudio.getMuted());
  }, []);

  const handleToggleAudio = () => {
    const muted = tacticalAudio.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { href: "/", label: "Overview" },
    { href: "/curriculum", label: "7-Section Framework" },
    { href: "/squad", label: "Squad (7 Ninjas)" },
    { href: "/diagnostic", label: "Weakness Audit" },
    { href: "/labs", label: "Interactive Labs" },
    { href: "/runbooks", label: "Runbooks" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-black/70 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <Link
          href="/"
          onClick={() => tacticalAudio.playBlip(900, 0.02)}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-4 h-4 text-apple-green" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm tracking-tight text-white">
                Vanguard OS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/[0.08] text-zinc-300">
                Cohort 6
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-sans tracking-tight">
              AfricaHackon Academy
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-xs font-sans text-zinc-300">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => tacticalAudio.playBlip(750, 0.02)}
                className={`px-3.5 py-1 rounded-full transition-all ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-sans font-medium text-zinc-200">
            <Flame className="w-3.5 h-3.5 text-apple-orange fill-apple-orange" />
            <span>{activeStreakCount}d Streak</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-400 hover:text-white transition-all"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Diagnostic Direct CTA */}
          <Link
            href="/diagnostic"
            onClick={() => tacticalAudio.playSuccess()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-sans font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_4px_14px_rgba(255,255,255,0.25)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Audit Weakness
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-b border-white/[0.08] bg-black/95 backdrop-blur-2xl space-y-3 animate-apple-reveal">
          <nav className="flex flex-col space-y-1 text-sm font-sans text-zinc-300">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    tacticalAudio.playBlip(750, 0.02);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2.5 px-3.5 rounded-xl transition-colors ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "hover:bg-white/[0.06] text-zinc-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/diagnostic"
            onClick={() => {
              tacticalAudio.playSuccess();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-full bg-white text-black font-sans font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Launch 7-Section Weakness Audit
          </Link>
        </div>
      )}
    </header>
  );
}
