"use client";

import React, { useState } from "react";
import {
  DIAGNOSTIC_QUESTIONS,
  generateRecommendations,
} from "@/data/weaknessAssessment";
import { SquadMember } from "@/data/squadMembers";
import {
  X,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Target,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";
import confetti from "canvas-confetti";

interface WeaknessDiagnosticModalProps {
  member: SquadMember;
  onClose: () => void;
  onSaveAssessment: (memberId: string, updatedScores: Record<string, number>, focusAreas: string[]) => void;
}

export default function WeaknessDiagnosticModal({
  member,
  onClose,
  onSaveAssessment,
}: WeaknessDiagnosticModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(() => ({
    linuxScripting: member?.weaknessScores?.linuxScripting ?? 75,
    networkingPackets: member?.weaknessScores?.networkingPackets ?? 75,
    windowsAD: member?.weaknessScores?.windowsAD ?? 75,
    webAppSec: member?.weaknessScores?.webAppSec ?? 75,
    mobileAppSec: member?.weaknessScores?.mobileAppSec ?? 75,
    cloudSec: member?.weaknessScores?.cloudSec ?? 75,
    grcReporting: member?.weaknessScores?.grcReporting ?? 75,
  }));
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = DIAGNOSTIC_QUESTIONS.length;
  const currentQ = DIAGNOSTIC_QUESTIONS[currentStep];

  const handleSelectOption = (score: number) => {
    tacticalAudio.playBlip(950, 0.02);
    const updated = { ...scores, [currentQ.domain]: score };
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

  const recommendations = isFinished ? generateRecommendations(scores) : null;

  const handleSaveAndApply = () => {
    if (!recommendations) return;
    onSaveAssessment(member.id, scores, recommendations.criticalFocus);
    tacticalAudio.playSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-black/80 backdrop-blur-xl animate-apple-reveal">
      <div className="relative w-full max-w-2xl bg-canvas-elevated border border-white/[0.12] rounded-t-[32px] sm:rounded-3xl shadow-apple-glass overflow-hidden text-zinc-100 flex flex-col max-h-[92vh]">
        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1" />

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-apple-green" />
            <span className="text-xs font-sans font-semibold text-white tracking-tight">
              Weakness Diagnostic • {member.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Apple Slim Progress Bar */}
        {!isFinished && (
          <div className="w-full bg-white/[0.04] h-1 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {!isFinished ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-sans text-zinc-400">
                <span className="font-medium text-apple-blue">{currentQ.domainLabel}</span>
                <span>
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-display font-semibold text-white leading-snug tracking-tight">
                {currentQ.prompt}
              </h3>

              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.score)}
                    className="w-full p-4 rounded-2xl text-left bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/20 transition-all flex items-center justify-between group"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-sans px-2 py-0.5 rounded-full font-semibold uppercase ${
                            opt.level === "Master"
                              ? "bg-apple-green/15 text-apple-green"
                              : opt.level === "Proficient"
                              ? "bg-apple-blue/10 text-apple-blue"
                              : opt.level === "Familiar"
                              ? "bg-apple-orange/15 text-apple-orange"
                              : "bg-apple-red/15 text-apple-red"
                          }`}
                        >
                          {opt.level}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 font-sans group-hover:text-white transition-colors">
                        {opt.text}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 animate-apple-reveal">
              <div className="text-center space-y-2 pb-4 border-b border-white/[0.08]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-apple-green/10 text-apple-green text-xs font-sans font-medium">
                  <Target className="w-3.5 h-3.5" />
                  Diagnostic Complete
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">
                  Your Personalized Roadmap
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">
                  {recommendations?.summaryAnalysis}
                </p>
              </div>

              {/* Mastery Breakdown Bars */}
              <div className="space-y-3">
                <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
                  Domain Mastery Overview
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(scores).map(([domainKey, scoreVal]) => {
                    const label = DIAGNOSTIC_QUESTIONS.find((q) => q.domain === domainKey)?.domainLabel || domainKey;
                    return (
                      <div
                        key={domainKey}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                          <span className="text-zinc-300 font-medium">{label}</span>
                          <span className="text-zinc-400 font-mono text-[11px]">{scoreVal}%</span>
                        </div>
                        <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              scoreVal >= 75
                                ? "bg-apple-green"
                                : scoreVal >= 50
                                ? "bg-apple-orange"
                                : "bg-apple-red"
                            }`}
                            style={{ width: `${scoreVal}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* High-Yield Recommended Labs */}
              <div className="space-y-3">
                <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block">
                  Targeted Labs to Eliminate Weaknesses
                </span>
                <div className="space-y-2">
                  {recommendations?.recommendedLabs.map((lab, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                    >
                      <div className="pr-4">
                        <div className="text-xs sm:text-sm font-semibold text-white">{lab.title}</div>
                        <div className="text-xs text-zinc-400 font-sans mt-0.5">{lab.reason}</div>
                      </div>
                      <a
                        href={lab.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/[0.08] hover:bg-white text-zinc-300 hover:text-black transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setIsFinished(false);
                  }}
                  className="px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-sans font-medium text-zinc-300 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake
                </button>
                <button
                  onClick={handleSaveAndApply}
                  className="flex-1 py-2.5 rounded-full bg-white text-black font-sans font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  Save & Apply Roadmap
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
