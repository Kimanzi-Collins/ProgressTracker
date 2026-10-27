"use client";

import React, { useState } from "react";
import { CurriculumModule } from "@/data/curriculumData";
import {
  X,
  Terminal,
  ExternalLink,
  BookOpen,
  Wrench,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";
import confetti from "canvas-confetti";

interface ModuleDetailModalProps {
  module: CurriculumModule | null;
  onClose: () => void;
  onMarkComplete?: (moduleId: string) => void;
  isCompleted?: boolean;
}

export default function ModuleDetailModal({
  module,
  onClose,
  onMarkComplete,
  isCompleted = false,
}: ModuleDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "labs" | "terminal" | "quiz" | "tools">(
    "overview"
  );
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalSuccess, setTerminalSuccess] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!module) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    tacticalAudio.playBlip(1200, 0.04);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const trimmed = terminalInput.trim();
    tacticalAudio.playTerminalKey();

    if (
      trimmed.toLowerCase() === module.interactiveChallenge.targetCommand.toLowerCase() ||
      trimmed.includes(module.interactiveChallenge.targetCommand.slice(0, 10))
    ) {
      setTerminalHistory((prev) => [
        ...prev,
        `$ ${trimmed}`,
        module.interactiveChallenge.successOutput,
      ]);
      setTerminalSuccess(true);
      tacticalAudio.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        `$ ${trimmed}`,
        `Command mismatch. Hint: ${module.interactiveChallenge.hint}`,
      ]);
      tacticalAudio.playAlert();
    }
    setTerminalInput("");
  };

  const handleSelectQuiz = (qId: string, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    tacticalAudio.playBlip(800, 0.02);
  };

  const handleEvaluateQuiz = () => {
    setQuizSubmitted(true);
    const total = module.quiz.length;
    let correctCount = 0;
    module.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correctCount++;
    });

    if (correctCount === total) {
      tacticalAudio.playSuccess();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      tacticalAudio.playAlert();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    module.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / module.quiz.length) * 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-black/75 backdrop-blur-xl animate-apple-reveal">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-canvas-elevated border border-white/[0.12] rounded-t-[32px] sm:rounded-3xl shadow-apple-glass flex flex-col overflow-hidden text-zinc-100">
        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 text-[11px] font-sans font-semibold rounded-full bg-white/[0.08] text-white">
              Module {module.number}
            </span>
            <span className="text-xs font-sans text-zinc-400 hidden sm:inline">
              {module.sprint}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {onMarkComplete && (
              <button
                onClick={() => {
                  onMarkComplete(module.id);
                  tacticalAudio.playSuccess();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                  isCompleted
                    ? "bg-apple-green/15 text-apple-green"
                    : "bg-white/[0.08] hover:bg-white text-zinc-300 hover:text-black"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isCompleted ? "Completed" : "Mark as Done"}
              </button>
            )}

            <button
              onClick={() => {
                tacticalAudio.playBlip(600, 0.02);
                onClose();
              }}
              className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header & Apple Segmented Control */}
        <div className="px-6 pt-5 pb-3 border-b border-white/[0.08]">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-1">
            {module.title}
          </h2>
          <p className="text-xs text-zinc-400 font-sans mb-4">{module.tagline}</p>

          {/* Segmented Tabs (Horizontal Scrollable on mobile) */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-sans">
            {[
              { id: "overview", label: "Overview", icon: BookOpen },
              { id: "labs", label: "Practical Labs", icon: ExternalLink },
              { id: "terminal", label: "Terminal Simulator", icon: Terminal },
              { id: "quiz", label: `Quiz (${module.quiz.length})`, icon: HelpCircle },
              { id: "tools", label: "Runbooks", icon: Wrench },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    tacticalAudio.playBlip(900, 0.02);
                    setActiveTab(tab.id as never);
                  }}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-sm"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-apple-reveal">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] font-sans text-zinc-500 uppercase">Trainers</span>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5">
                    {module.instructors.join(", ")}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] font-sans text-zinc-500 uppercase">Effort</span>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5">
                    {module.estimatedHours} Hours Hands-On
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[11px] font-sans text-zinc-500 uppercase">Sprint</span>
                  <div className="text-xs sm:text-sm font-semibold text-apple-blue mt-0.5">
                    {module.sprint}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-sans font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Syllabus Topics
                </h4>
                <div className="space-y-2">
                  {module.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                    >
                      <span className="w-5 h-5 rounded-full bg-white/[0.06] text-zinc-300 font-sans text-[11px] flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {module.notesExcerpt && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="text-xs font-sans font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-apple-green" />
                    Field Notes & Cheat Sheet Excerpt
                  </span>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {module.notesExcerpt}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRACTICAL LABS */}
          {activeTab === "labs" && (
            <div className="space-y-4 animate-apple-reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {module.practicalLabs.map((lab, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-apple-blue/10 text-apple-blue">
                          {lab.type}
                        </span>
                        <span className="text-[11px] font-sans text-zinc-400">
                          {lab.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                        {lab.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        {lab.description}
                      </p>
                    </div>

                    <a
                      href={lab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-white text-black text-xs font-sans font-semibold hover:bg-zinc-200 transition-colors"
                    >
                      Open Free Lab
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TERMINAL SIMULATOR */}
          {activeTab === "terminal" && (
            <div className="space-y-4 animate-apple-reveal">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1 font-sans">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-apple-green" />
                    {module.interactiveChallenge.title}
                  </span>
                  <span>{terminalSuccess ? "Completed" : "Pending"}</span>
                </div>
                <p className="text-xs text-zinc-300 font-sans">
                  {module.interactiveChallenge.instruction}
                </p>
              </div>

              {/* macOS-style Terminal Box */}
              <div className="bg-black/90 rounded-2xl p-4 border border-white/[0.1] min-h-[220px] flex flex-col justify-between font-mono text-xs shadow-inner">
                <div className="space-y-1.5">
                  <div className="text-zinc-500 whitespace-pre-line">
                    {module.interactiveChallenge.initialOutput}
                  </div>
                  {terminalHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`whitespace-pre-line ${
                        item.startsWith("$")
                          ? "text-zinc-200 font-semibold"
                          : item.includes("[+]")
                          ? "text-apple-green"
                          : "text-zinc-400"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="mt-4 flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                  <span className="text-apple-green font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder={module.interactiveChallenge.targetCommand}
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-zinc-700 font-mono"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-full bg-white text-black text-xs font-sans font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    Run
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: QUIZ ENGINE */}
          {activeTab === "quiz" && (
            <div className="space-y-6 animate-apple-reveal">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-sans text-zinc-400">
                  Concept Verification Checkpoint
                </span>
                {quizSubmitted && (
                  <span className="text-xs font-sans font-semibold text-apple-green">
                    Score: {calculateScore()}%
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {module.quiz.map((q, qIdx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3"
                  >
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {qIdx + 1}. {q.question}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[q.id] === optIdx;
                        const isCorrect = q.correctAnswer === optIdx;
                        const showStatus = quizSubmitted;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuiz(q.id, optIdx)}
                            disabled={quizSubmitted}
                            className={`w-full text-left p-3 rounded-xl text-xs font-sans transition-all flex items-center justify-between ${
                              showStatus
                                ? isCorrect
                                  ? "bg-apple-green/15 text-apple-green font-medium"
                                  : isSelected
                                  ? "bg-apple-red/15 text-apple-red"
                                  : "bg-white/[0.02] text-zinc-400"
                                : isSelected
                                ? "bg-white text-black font-semibold shadow-sm"
                                : "bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]"
                            }`}
                          >
                            <span>{opt}</span>
                            {showStatus && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-apple-green" />
                            )}
                            {showStatus && isSelected && !isCorrect && (
                              <AlertCircle className="w-4 h-4 text-apple-red" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="pt-2 text-[11px] text-zinc-400 font-sans border-t border-white/[0.05]">
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
                  Submit & Verify Answers
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="w-full py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white font-sans font-semibold text-xs transition-colors"
                >
                  Reset Quiz
                </button>
              )}
            </div>
          )}

          {/* TAB 5: RUNBOOKS */}
          {activeTab === "tools" && (
            <div className="space-y-5 animate-apple-reveal">
              {module.toolsAndRunbooks.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-semibold text-apple-blue uppercase">
                      {tool.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-white">{tool.name}</h4>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans">{tool.configNotes}</p>

                  <div className="relative group">
                    <pre className="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                      {tool.installCommand}
                    </pre>
                    <button
                      onClick={() => handleCopy(tool.installCommand, `tool-${idx}`)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/[0.1] hover:bg-white/[0.2] text-zinc-300 transition-colors"
                    >
                      {copiedCode === `tool-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-apple-green" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {tool.troubleshootingTip && (
                    <div className="p-3 rounded-xl bg-apple-orange/10 border border-apple-orange/20 text-xs text-zinc-300 font-sans">
                      <strong className="text-apple-orange">Tip: </strong>
                      {tool.troubleshootingTip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
