"use client";

import React, { useState } from "react";
import { tacticalAudio } from "./TacticalAudio";
import { Terminal, Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function MetasploitTerminal() {
  const [history, setHistory] = useState<string[]>([
    "msf6 > # Welcome to the Metasploit Framework Interactive Simulation",
    "msf6 > # Try commands: 'search vsftpd', 'use exploit/unix/ftp/vsftpd_234_backdoor', 'set RHOSTS 192.168.1.50', 'show options', 'exploit'",
  ]);
  const [input, setInput] = useState("");
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [rhosts, setRhosts] = useState<string>("192.168.1.50");

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    tacticalAudio.playTerminalKey();
    const prompt = currentModule ? `msf6 (${currentModule}) >` : "msf6 >";
    const newHistory = [...history, `${prompt} ${cmd}`];

    const lower = cmd.toLowerCase();

    if (lower === "help") {
      newHistory.push(
        "Core Commands:\n  banner        - Display Metasploit ASCII banner\n  search <term> - Search module taxonomy\n  use <module>  - Select module by name\n  show options  - Displays options for current module\n  set <opt> <val> Set a context-specific variable\n  exploit / run - Launch current module\n  exit / back   - Return to top-level prompt"
      );
    } else if (lower === "banner") {
      newHistory.push(
        "       =[ metasploit v6.4.12-dev                          ]\n+ -- --=[ 2412 exploits - 1245 auxiliary - 428 post       ]\n+ -- --=[ 965 payloads - 47 encoders - 11 nops             ]\n+ -- --=[ Free practical lab environment for Cohort 6      ]"
      );
    } else if (lower.startsWith("search")) {
      newHistory.push(
        "Matching Modules\n================\n  #  Name                                  Disclosure Date  Rank       Check  Description\n  -  ----                                  ---------------  ----       -----  -----------\n  0  exploit/unix/ftp/vsftpd_234_backdoor  2011-07-03       excellent  No     VSFTPD v2.3.4 Backdoor Execution"
      );
    } else if (lower.startsWith("use")) {
      if (lower.includes("vsftpd") || lower.includes("234")) {
        setCurrentModule("exploit/unix/ftp/vsftpd_234_backdoor");
        newHistory.push("[*] Using exploit/unix/ftp/vsftpd_234_backdoor");
        tacticalAudio.playSuccess();
      } else {
        newHistory.push("[-] Unknown module. Try: 'use exploit/unix/ftp/vsftpd_234_backdoor'");
      }
    } else if (lower === "back") {
      setCurrentModule(null);
      newHistory.push("[*] Returned to root prompt.");
    } else if (lower.startsWith("set rhosts")) {
      const parts = cmd.split(" ");
      const ip = parts[2] || "192.168.1.50";
      setRhosts(ip);
      newHistory.push(`RHOSTS => ${ip}`);
    } else if (lower === "show options") {
      newHistory.push(
        `Module options (exploit/unix/ftp/vsftpd_234_backdoor):\n\n   Name    Current Setting  Required  Description\n   ----    ---------------  --------  -----------\n   RHOSTS  ${rhosts}    yes       The target host(s)\n   RPORT   21               yes       The target port (TCP)\n\nExploit target:\n   Id  Name\n   0   Automatic`
      );
    } else if (lower === "exploit" || lower === "run") {
      if (!currentModule) {
        newHistory.push("[-] Please select an exploit module first using 'use <module>'.");
      } else {
        newHistory.push(
          `[*] ${rhosts}:21 - Banner: 220 (vsFTPd 2.3.4)\n[*] ${rhosts}:21 - USER: sending backdoor string admin:)...\n[+] ${rhosts}:21 - Backdoor service spawned on port 6200!\n[*] Command shell session 1 opened (192.168.1.10:4444 -> ${rhosts}:6200)\n[+] root@metasploitable:/# (UID: 0 / ROOT ACCESS CONFIRMED)`
        );
        tacticalAudio.playSuccess();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    } else {
      newHistory.push(`[-] Unknown command: ${cmd}. Type 'help' for available commands.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="p-6 rounded-3xl bg-canvas-elevated border border-white/[0.08] space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-apple-red" />
          <span className="font-semibold text-white">msfconsole Interactive Command Simulator</span>
        </div>
        <span className="text-[10px] text-zinc-500 font-sans">Metasploit Framework 6.4</span>
      </div>

      {/* Terminal Screen */}
      <div className="bg-black/95 rounded-2xl p-4 border border-white/[0.08] min-h-[260px] max-h-[360px] overflow-y-auto space-y-1.5 shadow-inner">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.startsWith("msf6")
                ? "text-zinc-200 font-semibold"
                : line.includes("[+]")
                ? "text-apple-green font-bold"
                : line.includes("[-]")
                ? "text-apple-red"
                : "text-zinc-400"
            }`}
          >
            {line}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
          <span className="text-apple-red font-bold">
            {currentModule ? `msf6 (${currentModule}) >` : "msf6 >"}
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command (e.g. search vsftpd, exploit)..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-zinc-700"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
