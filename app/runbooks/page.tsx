"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { tacticalAudio } from "@/components/TacticalAudio";
import {
  Wrench,
  Copy,
  Check,
  AlertTriangle,
  Terminal,
  ExternalLink,
} from "lucide-react";

interface RunbookItem {
  id: string;
  name: string;
  category: "Operating System" | "Packet Forensics" | "Offensive Tooling" | "Cloud Assurance";
  installCmd: string;
  steps: string[];
  alertNote?: string;
}

const RUNBOOKS: RunbookItem[] = [
  {
    id: "rb-wsl-kali",
    name: "WSL2 & Kali Linux Subsystem",
    category: "Operating System",
    installCmd: `# 1. Enable WSL & install Kali Linux:
wsl --install -d kali-linux
# 2. Inside Kali Linux terminal:
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y kali-linux-default git curl wget python3-pip python3-venv`,
    steps: [
      "WSL2 delivers native Linux kernel execution inside Windows with direct access to host files at /mnt/c/Users/.",
      "Access Linux filesystem in Windows Explorer via \\\\wsl$\\kali-linux.",
      "Always set up a Python virtual environment: python3 -m venv ~/sec-venv.",
    ],
    alertNote:
      "If you receive virtualization error 0x80370102, enable Intel VT-x or AMD-V in your motherboard BIOS settings.",
  },
  {
    id: "rb-wireshark",
    name: "Wireshark Packet Analyzer & Non-Root Captures",
    category: "Packet Forensics",
    installCmd: `# Install Wireshark & Tshark:
sudo apt update && sudo apt install -y wireshark tshark
# Allow non-root users to capture packets:
sudo dpkg-reconfigure wireshark-common
sudo usermod -aG wireshark $USER`,
    steps: [
      "Log out and log back into your Linux terminal for group membership to take effect.",
      "Verify with: wireshark & or tshark -i eth0.",
      "Filter HTTP credentials using display filter: http.request.method == \"POST\".",
    ],
    alertNote:
      "Never run Wireshark as root (sudo wireshark) in production environments to avoid privilege vulnerabilities.",
  },
  {
    id: "rb-metasploit",
    name: "Metasploit Framework & Database Integration",
    category: "Offensive Tooling",
    installCmd: `# Kali includes Metasploit. Initialize PostgreSQL DB:
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo msfdb init
# Launch console without banner:
msfconsole -q`,
    steps: [
      "Verify database connection inside msfconsole with: db_status.",
      "Run automated Nmap scans into the database using: db_nmap -sV -p- <target_ip>.",
      "View discovered open ports with: services.",
    ],
    alertNote:
      "Always check show options before running exploit to verify RHOSTS, LHOST, and LPORT are correctly set.",
  },
  {
    id: "rb-cloud-aws",
    name: "AWS CLI & ScoutSuite Multi-Cloud Auditor",
    category: "Cloud Assurance",
    installCmd: `# 1. Install AWS CLI v2:
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install
aws configure

# 2. Install ScoutSuite auditor:
pip3 install scoutsuite
scout aws --profile default`,
    steps: [
      "Configure your AWS IAM Access Key and Secret Key using: aws configure.",
      "Set up strict budget alarms in the AWS Billing console to guarantee $0 spend during experiments.",
      "ScoutSuite generates an interactive offline HTML dashboard analyzing IAM, S3, and VPC posture.",
    ],
    alertNote:
      "Kenya Identity Verification Tip from AH Team: If AWS SMS OTP verification fails on Safaricom numbers, use an Airtel Kenya line or submit an immediate AWS support ticket for callback verification.",
  },
];

export default function RunbooksPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    tacticalAudio.playBlip(1200, 0.04);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white/20">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Editorial Header */}
        <div className="space-y-2 max-w-3xl pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-sans text-apple-orange">
            <Wrench className="w-3.5 h-3.5" />
            <span>Environment Setup & Directives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-semibold tracking-[-0.03em] text-white">
            Battle-Tested Tool Runbooks
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Prescriptive step-by-step setup guides verified for the AfricaHackon Academy laboratory modules.
            Copy-paste terminal commands with built-in troubleshooting tips.
          </p>
        </div>

        {/* Runbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RUNBOOKS.map((rb) => (
            <div
              key={rb.id}
              className="p-6 sm:p-8 rounded-3xl glass-panel space-y-5 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300">
                    {rb.category}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{rb.name}</h3>

                <div className="space-y-1.5 mb-4">
                  {rb.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-apple-orange flex-shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Code Snippet */}
                <div className="relative group">
                  <pre className="p-4 rounded-2xl bg-black/90 border border-white/[0.08] font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                    {rb.installCmd}
                  </pre>
                  <button
                    onClick={() => handleCopy(rb.installCmd, rb.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/[0.1] hover:bg-white/[0.2] text-zinc-300 transition-colors"
                  >
                    {copiedId === rb.id ? (
                      <Check className="w-3.5 h-3.5 text-apple-green" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {rb.alertNote && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 flex items-start gap-2.5 font-sans">
                  <AlertTriangle className="w-4 h-4 text-apple-orange flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rb.alertNote}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
