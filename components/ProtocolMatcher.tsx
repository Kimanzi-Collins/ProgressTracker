"use client";

import React, { useState } from "react";
import { tacticalAudio } from "./TacticalAudio";
import { Zap, CheckCircle2, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface MatchPair {
  service: string;
  port: number;
  description: string;
}

const PROTOCOL_PAIRS: MatchPair[] = [
  { service: "FTP", port: 21, description: "Cleartext File Transfer Protocol" },
  { service: "SSH", port: 22, description: "Secure Shell encrypted CLI" },
  { service: "SMTP", port: 25, description: "Simple Mail Transfer Protocol (Outbound mail)" },
  { service: "DNS", port: 53, description: "Domain Name System resolution" },
  { service: "HTTP", port: 80, description: "HyperText Transfer Protocol" },
  { service: "Kerberos", port: 88, description: "Active Directory Key Distribution Center" },
  { service: "SMB", port: 445, description: "Server Message Block (Windows files & pipes)" },
  { service: "HTTPS", port: 443, description: "HTTP over TLS encryption" },
  { service: "RDP", port: 3389, description: "Microsoft Remote Desktop Protocol" },
  { service: "MySQL", port: 3306, description: "Default relational database port" },
];

export default function ProtocolMatcher() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, number>>({});
  const [mistakes, setMistakes] = useState(0);

  const isCompleted = Object.keys(matches).length === PROTOCOL_PAIRS.length;

  const handleSelectService = (srv: string) => {
    if (matches[srv]) return;
    setSelectedService(srv);
    tacticalAudio.playBlip(750, 0.02);
  };

  const handleSelectPort = (port: number) => {
    if (!selectedService) return;
    const correctPair = PROTOCOL_PAIRS.find((p) => p.service === selectedService);

    if (correctPair && correctPair.port === port) {
      const updated = { ...matches, [selectedService]: port };
      setMatches(updated);
      setSelectedService(null);
      tacticalAudio.playSuccess();

      if (Object.keys(updated).length === PROTOCOL_PAIRS.length) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      setMistakes((m) => m + 1);
      tacticalAudio.playAlert();
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedService(null);
    setMistakes(0);
    tacticalAudio.playBlip(600, 0.02);
  };

  return (
    <div className="p-6 rounded-3xl bg-canvas-elevated border border-white/[0.08] space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-apple-green font-semibold uppercase tracking-wider">
            Exam Speed Challenge
          </span>
          <h3 className="text-xl font-display font-semibold text-white mt-0.5">
            Network Service & Port Matcher
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Select a service on the left, then click its corresponding port on the right.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-mono font-bold text-white">
              {Object.keys(matches).length} / {PROTOCOL_PAIRS.length}
            </div>
            <div className="text-[10px] font-sans text-zinc-500">Pairs Matched</div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 transition-colors"
            title="Reset Matcher"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isCompleted ? (
        <div className="p-8 rounded-3xl bg-apple-green/10 border border-apple-green/30 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-apple-green mx-auto" />
          <h4 className="text-xl font-display font-semibold text-white">
            100% Port Mastery Achieved!
          </h4>
          <p className="text-xs text-zinc-300 font-sans max-w-sm mx-auto">
            You matched all 10 critical service ports with {mistakes} incorrect attempts. Ready for the practical exam section!
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-full bg-apple-green text-black font-sans font-semibold text-xs hover:bg-emerald-400 transition-colors"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {/* Services Column */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              Services
            </span>
            {PROTOCOL_PAIRS.map((pair) => {
              const isMatched = !!matches[pair.service];
              const isSelected = selectedService === pair.service;

              return (
                <button
                  key={pair.service}
                  onClick={() => handleSelectService(pair.service)}
                  disabled={isMatched}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-mono font-semibold transition-all flex items-center justify-between ${
                    isMatched
                      ? "bg-apple-green/15 text-apple-green border border-apple-green/30 opacity-70"
                      : isSelected
                      ? "bg-white text-black shadow-md font-bold scale-[1.02]"
                      : "bg-white/[0.03] text-zinc-200 hover:bg-white/[0.07] border border-white/[0.06]"
                  }`}
                >
                  <span>{pair.service}</span>
                  {isMatched && <CheckCircle2 className="w-3.5 h-3.5 text-apple-green" />}
                </button>
              );
            })}
          </div>

          {/* Shuffled Ports Column */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              Ports
            </span>
            {[22, 80, 21, 443, 25, 445, 53, 88, 3306, 3389].map((port) => {
              const matchedService = Object.keys(matches).find((s) => matches[s] === port);
              const isMatched = !!matchedService;

              return (
                <button
                  key={port}
                  onClick={() => handleSelectPort(port)}
                  disabled={isMatched || !selectedService}
                  className={`w-full p-3 rounded-2xl text-center text-xs font-mono font-semibold transition-all ${
                    isMatched
                      ? "bg-apple-green/15 text-apple-green border border-apple-green/30 opacity-70"
                      : selectedService
                      ? "bg-white/[0.06] text-white hover:bg-white hover:text-black border border-white/[0.1] cursor-pointer"
                      : "bg-white/[0.02] text-zinc-500 border border-white/[0.04] cursor-not-allowed"
                  }`}
                >
                  Port {port} {isMatched && `(${matchedService})`}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
