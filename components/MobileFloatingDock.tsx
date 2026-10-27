"use client";

import React from "react";
import { Users, Layers, Crosshair, Wrench, Sparkles } from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";

interface MobileFloatingDockProps {
  onOpenDiagnostic: () => void;
}

export default function MobileFloatingDock({
  onOpenDiagnostic,
}: MobileFloatingDockProps) {
  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 flex items-center justify-center pointer-events-none animate-apple-reveal">
      <div className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full glass-panel-elevated shadow-apple-glass border border-white/[0.15]">
        <a
          href="#squad-war-room"
          onClick={() => tacticalAudio.playBlip(750, 0.02)}
          className="p-2.5 rounded-full hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          title="War Room"
        >
          <Users className="w-4 h-4" />
        </a>

        <a
          href="#curriculum-matrix"
          onClick={() => tacticalAudio.playBlip(750, 0.02)}
          className="p-2.5 rounded-full hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          title="Curriculum"
        >
          <Layers className="w-4 h-4" />
        </a>

        <a
          href="#incident-practicals"
          onClick={() => tacticalAudio.playBlip(750, 0.02)}
          className="p-2.5 rounded-full hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          title="Incidents"
        >
          <Crosshair className="w-4 h-4" />
        </a>

        <a
          href="#tool-runbooks"
          onClick={() => tacticalAudio.playBlip(750, 0.02)}
          className="p-2.5 rounded-full hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          title="Runbooks"
        >
          <Wrench className="w-4 h-4" />
        </a>

        <div className="w-px h-5 bg-white/[0.1] mx-0.5" />

        <button
          onClick={() => {
            tacticalAudio.playSuccess();
            onOpenDiagnostic();
          }}
          className="px-3.5 py-2 rounded-full bg-white text-black font-sans font-semibold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Audit</span>
        </button>
      </div>
    </div>
  );
}
