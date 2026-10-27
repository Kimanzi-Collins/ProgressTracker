"use client";

import React, { useState } from "react";
import { INCIDENT_PRACTICALS, IncidentScenario } from "@/data/incidentPracticals";
import {
  ShieldAlert,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  Shield,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";
import confetti from "canvas-confetti";

export default function IncidentPracticalsHub() {
  const [activeScenario, setActiveScenario] = useState<IncidentScenario>(INCIDENT_PRACTICALS[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [copiedLog, setCopiedLog] = useState(false);

  const handleCopyLog = () => {
    navigator.clipboard.writeText(activeScenario.sampleLogOrArtifact);
    setCopiedLog(true);
    tacticalAudio.playBlip(1100, 0.04);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleVerifyAnswer = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
    setIsAnswerSubmitted(true);
    if (idx === activeScenario.verificationChallenge.correctAnswer) {
      tacticalAudio.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      tacticalAudio.playAlert();
    }
  };

  return (
    <section id="incident-practicals" className="space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div>
        <span className="text-xs font-sans font-medium text-apple-orange uppercase tracking-wider">
          Forensics & Threat Hunting
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white mt-1">
          Enterprise Incident Scenarios
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
          Realistic breach forensic labs from AfricaHackon Scripting & Beetlebug squad assignments.
        </p>
      </div>

      {/* Scenario Selector Ribbon (Horizontal swipeable on mobile) */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
        {INCIDENT_PRACTICALS.map((item) => {
          const isSelected = item.id === activeScenario.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                tacticalAudio.playBlip(800, 0.02);
                setActiveScenario(item);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
              }}
              className={`flex-shrink-0 w-64 sm:w-auto p-4 sm:p-5 rounded-3xl text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "glass-panel-elevated ring-1 ring-white/30 shadow-apple-glass"
                  : "glass-panel hover:bg-white/[0.04] opacity-80 hover:opacity-100"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-sans mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 font-medium">
                    {item.category}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">{item.severity}</span>
                </div>
                <h4 className="text-sm font-display font-semibold text-white truncate">
                  {item.target}
                </h4>
                <p className="text-xs text-zinc-400 font-sans line-clamp-1 mt-0.5">
                  {item.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Incident Inspection Panel */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-zinc-400">
              <span className="font-semibold text-white">{activeScenario.target}</span>
              <span>•</span>
              <span className="text-zinc-500">{activeScenario.attackPattern}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mt-1">
              {activeScenario.title}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
          {activeScenario.scenarioSummary}
        </p>

        {/* Forensic Raw Log Stream (macOS Terminal style) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-sans text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-apple-blue" />
              Forensic Log & Telemetry Capture
            </span>
            <button
              onClick={handleCopyLog}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
            >
              {copiedLog ? <Check className="w-3.5 h-3.5 text-apple-green" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLog ? "Copied" : "Copy Log"}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-black/90 border border-white/[0.08] font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed shadow-inner">
            {activeScenario.sampleLogOrArtifact}
          </pre>
        </div>

        {/* Investigation Steps Checklist */}
        <div className="space-y-3">
          <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
            Investigation Protocol
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeScenario.investigationSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-2.5 text-xs text-zinc-300 font-sans"
              >
                <span className="w-4 h-4 rounded-full bg-white/[0.08] text-white font-sans text-[10px] flex items-center justify-center font-semibold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Verification Challenge */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
          <span className="text-xs font-sans font-semibold text-apple-orange flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Verification Challenge
          </span>
          <p className="text-xs sm:text-sm font-semibold text-white font-sans">
            {activeScenario.verificationChallenge.question}
          </p>

          <div className="space-y-2 pt-1">
            {activeScenario.verificationChallenge.options.map((opt, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              const isCorrect = activeScenario.verificationChallenge.correctAnswer === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleVerifyAnswer(optIdx)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-sans transition-all flex items-center justify-between ${
                    isAnswerSubmitted
                      ? isCorrect
                        ? "bg-apple-green/15 text-apple-green font-medium"
                        : isSelected
                        ? "bg-apple-red/15 text-apple-red"
                        : "bg-white/[0.02] text-zinc-500"
                      : "bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]"
                  }`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-apple-green" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <AlertCircle className="w-4 h-4 text-apple-red" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div className="pt-2 text-xs text-zinc-400 font-sans border-t border-white/[0.06]">
              <span className="font-semibold text-zinc-200">Key Takeaway: </span>
              {activeScenario.verificationChallenge.explanation}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
