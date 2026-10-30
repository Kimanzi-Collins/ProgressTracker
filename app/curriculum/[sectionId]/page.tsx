"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { FRAMEWORK_SECTIONS, FrameworkSection } from "@/data/frameworkSections";
import { tacticalAudio } from "@/components/TacticalAudio";
import AnatomyCyberEngine from "@/components/AnatomyCyberEngine";
import SubnetCalculator from "@/components/SubnetCalculator";
import ProtocolMatcher from "@/components/ProtocolMatcher";
import MetasploitTerminal from "@/components/MetasploitTerminal";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PageProps {
  params: Promise<{ sectionId: string }>;
}

export default function SectionDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const section = FRAMEWORK_SECTIONS.find((s) => s.id === resolvedParams.sectionId);

  if (!section) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<
    "modules" | "interactive" | "outcomes" | "criteria" | "quiz"
  >("modules");
  const [completedCriteria, setCompletedCriteria] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [section.modules[0]?.id || ""]: true,
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Load criteria from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ah_completed_criteria");
    if (saved) {
      try {
        setCompletedCriteria(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, []);

  const toggleCriteria = (id: string) => {
    tacticalAudio.playBlip(900, 0.03);
    const next = completedCriteria.includes(id)
      ? completedCriteria.filter((c) => c !== id)
      : [...completedCriteria, id];

    setCompletedCriteria(next);
    localStorage.setItem("ah_completed_criteria", JSON.stringify(next));

    if (!completedCriteria.includes(id)) {
      tacticalAudio.playSuccess();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const toggleModuleExpand = (modId: string) => {
    tacticalAudio.playBlip(700, 0.02);
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    tacticalAudio.playBlip(800, 0.02);
  };

  const handleEvaluateQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    section.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) correctCount++;
    });

    if (correctCount === section.quiz.length) {
      tacticalAudio.playSuccess();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      tacticalAudio.playAlert();
    }
  };

  const sectionCompletedCount = section.completionCriteria.filter((c) =>
    completedCriteria.includes(c.id)
  ).length;
  const sectionPercent = Math.round(
    (sectionCompletedCount / section.completionCriteria.length) * 100
  );

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/curriculum"
            onClick={() => tacticalAudio.playBlip(750, 0.02)}
            className="inline-flex items-center gap-2 text-xs font-sans text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to 7-Section Framework</span>
          </Link>

          <span className="text-xs font-mono text-zinc-500">
            {section.durationLabel} • Week {section.week}
          </span>
        </div>

        {/* Section Header Banner */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel-elevated relative overflow-hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/[0.08] text-white w-fit">
              SECTION 0{section.number}
            </span>

            <div className="flex items-center gap-3">
              <span className="text-xs font-sans text-zinc-400">
                Criteria Verified: {sectionCompletedCount} / {section.completionCriteria.length} ({sectionPercent}%)
              </span>
              <div className="w-24 bg-white/[0.08] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-apple-green h-full rounded-full transition-all duration-500"
                  style={{ width: `${sectionPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-semibold text-white tracking-tight">
              {section.title}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              {section.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed pt-1">
              {section.summary}
            </p>
          </div>

          {/* Navigation Tabs (Apple Segmented Bar) */}
          <div className="pt-4 border-t border-white/[0.08] flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "modules", label: `Modules (${section.modules.length})`, icon: BookOpen },
              { id: "interactive", label: "Interactive Rig & Tools", icon: Sparkles },
              { id: "outcomes", label: "Learning Outcomes", icon: CheckCircle2 },
              { id: "criteria", label: `Completion Criteria (${section.completionCriteria.length})`, icon: CheckCircle2 },
              { id: "quiz", label: `Exam Checkpoint (${section.quiz.length})`, icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    tacticalAudio.playBlip(800, 0.02);
                    setActiveTab(tab.id as never);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all flex-shrink-0 ${
                    activeTab === tab.id
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
        </div>

        {/* TAB 1: MODULES & THEORY */}
        {activeTab === "modules" && (
          <div className="space-y-5 animate-apple-reveal">
            {section.modules.map((mod) => {
              const isExpanded = !!expandedModules[mod.id];
              return (
                <div
                  key={mod.id}
                  className="rounded-3xl glass-panel border border-white/[0.08] overflow-hidden"
                >
                  <button
                    onClick={() => toggleModuleExpand(mod.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-sans mt-0.5">{mod.description}</p>
                    </div>
                    <div className="p-2 rounded-full bg-white/[0.06] text-zinc-300">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-6 pt-0 space-y-6 border-t border-white/[0.06]">
                      {mod.submodules.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3"
                        >
                          <h4 className="text-sm sm:text-base font-semibold text-apple-blue font-sans">
                            {sub.title}
                          </h4>
                          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                            {sub.summary}
                          </p>

                          {/* Key Points */}
                          <ul className="space-y-1.5 pt-1">
                            {sub.keyPoints.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="flex items-start gap-2 text-xs text-zinc-400 font-sans"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-apple-green flex-shrink-0 mt-1.5" />
                                <span className="leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Code Snippets if any */}
                          {sub.commandSnippets?.map((snip, sIdx) => (
                            <div key={sIdx} className="space-y-1 pt-2">
                              <span className="text-[11px] font-mono text-zinc-500">{snip.label}</span>
                              <pre className="p-3.5 rounded-xl bg-black/90 border border-white/[0.08] font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                                {snip.code}
                              </pre>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: INTERACTIVE TOOLS & RIG */}
        {activeTab === "interactive" && (
          <div className="space-y-8 animate-apple-reveal">
            {section.id === "section-4" && <AnatomyCyberEngine />}
            {section.id === "section-5" && (
              <div className="space-y-8">
                <SubnetCalculator />
                <ProtocolMatcher />
              </div>
            )}
            {section.id === "section-6" && <MetasploitTerminal />}
            {section.id !== "section-4" &&
              section.id !== "section-5" &&
              section.id !== "section-6" && (
                <div className="space-y-6">
                  <div className="p-8 rounded-3xl glass-panel text-center space-y-3">
                    <Sparkles className="w-10 h-10 text-apple-green mx-auto" />
                    <h3 className="text-xl font-display font-semibold text-white">
                      Section Interactive Workbench Active
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">
                      Practice with our cross-disciplinary tools including the Packet Encapsulation
                      Engine and the CIDR / VLSM Subnet Calculator.
                    </p>
                  </div>
                  <AnatomyCyberEngine />
                </div>
              )}
          </div>
        )}

        {/* TAB 3: LEARNING OUTCOMES */}
        {activeTab === "outcomes" && (
          <div className="p-8 rounded-3xl glass-panel space-y-6 animate-apple-reveal">
            <div>
              <span className="text-xs font-sans font-semibold text-apple-blue uppercase tracking-wider">
                Target Competencies
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">
                Required Section Learning Outcomes
              </h3>
            </div>

            <div className="space-y-3">
              {section.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3.5"
                >
                  <span className="w-6 h-6 rounded-full bg-apple-blue/10 text-apple-blue font-mono text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMPLETION CRITERIA CHECKLIST */}
        {activeTab === "criteria" && (
          <div className="p-8 rounded-3xl glass-panel space-y-6 animate-apple-reveal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-sans font-semibold text-apple-green uppercase tracking-wider">
                  Verification Checklist
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">
                  Section Completion Criteria
                </h3>
              </div>
              <span className="text-xs font-sans text-zinc-400">
                Click each item once verified to save your personal sprint progress.
              </span>
            </div>

            <div className="space-y-3">
              {section.completionCriteria.map((item) => {
                const isChecked = completedCriteria.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCriteria(item.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? "bg-apple-green/10 border-apple-green/30 text-white"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-apple-green border-apple-green text-black"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className="text-xs sm:text-sm font-sans font-medium">{item.task}</span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-400 uppercase">
                      {item.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: EXAM CHECKPOINT QUIZ */}
        {activeTab === "quiz" && (
          <div className="p-8 rounded-3xl glass-panel space-y-6 animate-apple-reveal">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-sans font-semibold text-apple-orange uppercase tracking-wider">
                  Knowledge Evaluation
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">
                  Exam Checkpoint Questions
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              {section.quiz.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3"
                >
                  <h4 className="text-sm sm:text-base font-semibold text-white font-sans">
                    {qIdx + 1}. {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      const showStatus = quizSubmitted;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuiz(qIdx, optIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3.5 rounded-xl text-xs font-sans transition-all flex items-center justify-between ${
                            showStatus
                              ? isCorrect
                                ? "bg-apple-green/15 text-apple-green font-medium"
                                : isSelected
                                ? "bg-apple-red/15 text-apple-red"
                                : "bg-white/[0.02] text-zinc-500"
                              : isSelected
                              ? "bg-white text-black font-semibold shadow-sm"
                              : "bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]"
                          }`}
                        >
                          <span>{opt}</span>
                          {showStatus && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-apple-green" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pt-2 text-xs text-zinc-400 font-sans border-t border-white/[0.06]">
                      <span className="font-semibold text-zinc-200">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleEvaluateQuiz}
                className="w-full py-3 rounded-full bg-white text-black font-sans font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Submit & Verify Section Quiz
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                  tacticalAudio.playBlip(700, 0.02);
                }}
                className="w-full py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white font-sans font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Section Quiz
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
