"use client";

import React, { useState } from "react";
import {
  Wrench,
  Copy,
  Check,
  AlertTriangle,
  Terminal,
} from "lucide-react";
import { tacticalAudio } from "./TacticalAudio";

interface RunbookItem {
  id: string;
  name: string;
  category: "Operating System" | "Web Security" | "Mobile Analysis" | "Cloud Assurance";
  installCmd: string;
  guide: string[];
  troubleshootAlert?: string;
}

const RUNBOOKS: RunbookItem[] = [
  {
    id: "rb-wsl",
    name: "WSL2 & Kali Linux Subsystem",
    category: "Operating System",
    installCmd: `# In PowerShell as Administrator:
wsl --install -d kali-linux
# Inside Kali terminal:
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y kali-linux-default git curl wget python3-pip`,
    guide: [
      "WSL2 delivers bare-metal Linux performance inside Windows without VM virtualization drag.",
      "Access host files directly at /mnt/c/Users/ and access Linux files in Windows Explorer via \\\\wsl$\\kali-linux.",
    ],
    troubleshootAlert:
      "If you receive virtualization error 0x80370102, confirm Intel VT-x or AMD-V is enabled in your BIOS.",
  },
  {
    id: "rb-burp",
    name: "Burp Suite & Firefox FoxyProxy",
    category: "Web Security",
    installCmd: `# Kali includes Burp Community. To launch:
burpsuite &
# 1. Install Firefox Extension: FoxyProxy Standard
# 2. Configure HTTP Proxy: 127.0.0.1 on Port 8080
# 3. Export CA Certificate from http://burp/cert and import into Firefox`,
    guide: [
      "Open Firefox, navigate to http://burp/cert while Burp listener is running, and save cacert.der.",
      "In Firefox: Settings -> Privacy & Security -> Certificates -> View Certificates -> Import -> Trust this CA to identify websites.",
    ],
    troubleshootAlert:
      "Maintain a dedicated Firefox browser profile exclusively for security assessments to avoid intercepting personal sessions.",
  },
  {
    id: "rb-cloud",
    name: "AWS CLI & ScoutSuite Multi-Cloud Audit",
    category: "Cloud Assurance",
    installCmd: `# Install AWS CLI v2:
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install
aws configure

# Install ScoutSuite multi-cloud auditor:
pip3 install scoutsuite
scout aws --profile default`,
    guide: [
      "Configure AWS IAM credentials with least-privilege audit permissions.",
      "Create zero-dollar budget alarms in AWS Budgets to prevent unexpected charges during labs.",
      "ScoutSuite compiles an interactive offline HTML report analyzing IAM, S3, and VPC posture.",
    ],
    troubleshootAlert:
      "Kenya Identity Verification Note: If SMS OTP fails on Safaricom numbers, use an Airtel line or submit an immediate AWS support ticket for callback verification.",
  },
  {
    id: "rb-mobile",
    name: "Mobile Pentest: Genymotion, MobSF & JADX",
    category: "Mobile Analysis",
    installCmd: `# 1. Install JADX Decompiler:
sudo apt update && sudo apt install -y default-jdk
wget https://github.com/skylot/jadx/releases/download/v1.5.0/jadx-1.5.0.zip
unzip jadx-1.5.0.zip -d /opt/jadx && sudo ln -s /opt/jadx/bin/jadx-gui /usr/local/bin/jadx-gui

# 2. Run MobSF via Docker:
docker run -it --rm -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest`,
    guide: [
      "Use Genymotion with an Android 9.0/10.0 Google Pixel image for optimal compatibility with Frida SSL unpinning.",
      "Upload VulnBank.apk to MobSF at http://localhost:8000 for automated SAST and component mapping.",
    ],
    troubleshootAlert:
      "For deep-link testing, trigger exported activities via: adb shell am start -W -a android.intent.action.VIEW -d <URI>.",
  },
];

export default function ToolRunbooksHub() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    tacticalAudio.playBlip(1200, 0.04);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="tool-runbooks" className="space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div>
        <span className="text-xs font-sans font-medium text-apple-teal uppercase tracking-wider">
          Environment & Tools
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white mt-1">
          Directives & Setup Runbooks
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
          Standardized installation recipes verified for the AfricaHackon Cohort 6 laboratory modules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RUNBOOKS.map((rb) => (
          <div
            key={rb.id}
            className="p-6 rounded-3xl glass-panel space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300">
                  {rb.category}
                </span>
              </div>
              <h3 className="text-base font-display font-semibold text-white mb-2">
                {rb.name}
              </h3>

              <div className="space-y-1.5 mb-4">
                {rb.guide.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-apple-teal flex-shrink-0 mt-1.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Terminal Code Snippet */}
              <div className="relative group">
                <pre className="p-4 rounded-2xl bg-black/80 border border-white/[0.08] font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
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

            {rb.troubleshootAlert && (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 flex items-start gap-2.5 font-sans">
                <AlertTriangle className="w-4 h-4 text-apple-orange flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rb.troubleshootAlert}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
