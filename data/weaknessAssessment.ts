export interface DiagnosticQuestion {
  id: string;
  domain: "linuxScripting" | "networkingPackets" | "windowsAD" | "webAppSec" | "mobileAppSec" | "cloudSec" | "grcReporting";
  domainLabel: string;
  prompt: string;
  options: {
    text: string;
    score: number; // 25, 50, 75, 100
    level: "Novice" | "Familiar" | "Proficient" | "Master";
  }[];
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "diag-1",
    domain: "linuxScripting",
    domainLabel: "Linux & CLI Automation",
    prompt: "How comfortable are you chaining CLI text utilities (awk, sed, grep, cut) and writing bash automation scripts?",
    options: [
      { text: "I struggle with basic file commands and need cheat sheets for chmod.", score: 25, level: "Novice" },
      { text: "I can navigate directories, manage users, and write simple loops in bash.", score: 50, level: "Familiar" },
      { text: "I can parse complex web logs and automate recon pipelines with Python/Bash.", score: 75, level: "Proficient" },
      { text: "I can solve OverTheWire Bandit challenges and build custom toolkits (like Elliot CLI).", score: 100, level: "Master" },
    ],
  },
  {
    id: "diag-2",
    domain: "networkingPackets",
    domainLabel: "Networking & Packet Forensics",
    prompt: "Can you calculate subnet masks on the fly and analyze PCAP streams in Wireshark for covert channels?",
    options: [
      { text: "I know IP vs MAC, but CIDR subnetting math (/27, /29) is difficult.", score: 25, level: "Novice" },
      { text: "I understand the TCP 3-way handshake and basic Wireshark display filters.", score: 50, level: "Familiar" },
      { text: "I can calculate VLSM subnets quickly and reconstruct HTTP/FTP streams from raw PCAPs.", score: 75, level: "Proficient" },
      { text: "I hunt covert C2 beacon intervals and craft custom Snort IDS signatures with ease.", score: 100, level: "Master" },
    ],
  },
  {
    id: "diag-3",
    domain: "windowsAD",
    domainLabel: "Windows & Active Directory",
    prompt: "How experienced are you with Active Directory enumeration, Kerberos tickets, and Windows privilege escalation?",
    options: [
      { text: "I have only used Windows as a desktop user; Active Directory is new to me.", score: 25, level: "Novice" },
      { text: "I understand domain controllers, users, groups, and basic PowerShell commands.", score: 50, level: "Familiar" },
      { text: "I can identify unquoted service paths, AlwaysInstallElevated, and run BloodHound.", score: 75, level: "Proficient" },
      { text: "I understand Kerberoasting, AS-REP roasting, token impersonation, and Metasploit pivoting via Ngrok.", score: 100, level: "Master" },
    ],
  },
  {
    id: "diag-4",
    domain: "webAppSec",
    domainLabel: "Web & API Security",
    prompt: "Can you configure Burp Suite to intercept traffic, test for BOLA in APIs, and exploit SQLi/XSS?",
    options: [
      { text: "I know what OWASP is, but haven't used Burp Suite proxy or Repeater.", score: 25, level: "Novice" },
      { text: "I can intercept browser traffic with FoxyProxy and test basic injection strings.", score: 50, level: "Familiar" },
      { text: "I can exploit PortSwigger labs (Blind SQLi, BOLA in crAPI, CSRF, JWT tampering).", score: 75, level: "Proficient" },
      { text: "I regularly find complex business logic flaws, SSRF, and chained auth bypasses.", score: 100, level: "Master" },
    ],
  },
  {
    id: "diag-5",
    domain: "mobileAppSec",
    domainLabel: "Mobile Security (Android & MobSF)",
    prompt: "How familiar are you with decompiling Android APKs with JADX, bypassing root detection, and auditing activities?",
    options: [
      { text: "I have never decompiled or reversed an Android APK.", score: 25, level: "Novice" },
      { text: "I know what APKs are and have looked at AndroidManifest.xml files.", score: 50, level: "Familiar" },
      { text: "I can set up Genymotion, run MobSF, and find exported components or insecure SharedPreferences.", score: 75, level: "Proficient" },
      { text: "I use Frida to hook SSL pinning, patch binaries with apktool, and exploit WebView JS interfaces.", score: 100, level: "Master" },
    ],
  },
  {
    id: "diag-6",
    domain: "cloudSec",
    domainLabel: "Cloud Security & Multi-Cloud Audits",
    prompt: "How comfortable are you auditing AWS IAM policies, configuring VPC security groups, and running ScoutSuite?",
    options: [
      { text: "I have not created AWS or Azure accounts yet.", score: 25, level: "Novice" },
      { text: "I have created free-tier accounts, set up budgets, and know what S3 and EC2 are.", score: 50, level: "Familiar" },
      { text: "I can configure AWS CLI, audit IAM roles, and run automated ScoutSuite scans.", score: 75, level: "Proficient" },
      { text: "I can exploit multi-cloud IAM privilege escalation and review Kubernetes/Cloud pentest scenarios.", score: 100, level: "Master" },
    ],
  },
  {
    id: "diag-7",
    domain: "grcReporting",
    domainLabel: "Governance, Risk & Reporting",
    prompt: "Can you map vulnerabilities to CVSS v3.1, write executive summaries, and understand ISO 27001/NIST CSF controls?",
    options: [
      { text: "I only focus on hacking tools; reporting and compliance seem boring.", score: 25, level: "Novice" },
      { text: "I understand the difference between inherent and residual risk.", score: 50, level: "Familiar" },
      { text: "I can write professional mini-reports with remediation steps and CVSS scores.", score: 75, level: "Proficient" },
      { text: "I engineer AI compliance audits, build GRC frameworks, and deliver boardroom-ready reports.", score: 100, level: "Master" },
    ],
  },
];

export function generateRecommendations(scores: Record<string, number>): {
  criticalFocus: string[];
  recommendedLabs: { title: string; url: string; reason: string }[];
  summaryAnalysis: string;
} {
  const sortedDomains = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  const weakestDomain = sortedDomains[0][0];

  const domainLabMap: Record<string, { title: string; url: string; reason: string }[]> = {
    linuxScripting: [
      { title: "OverTheWire Bandit (Levels 0-15)", url: "https://overthewire.org/wargames/bandit/", reason: "Fastest way to build instinctual Linux CLI and bash redirection reflexes." },
      { title: "AfricaHackon Scripting Practicals", url: "https://github.com/Kimanzi-Collins/Cybersecurity", reason: "Direct practice with log analysis scripts from real incident scenarios." },
    ],
    networkingPackets: [
      { title: "Wireshark Sample Captures", url: "https://wiki.wireshark.org/SampleCaptures", reason: "Practice filtering HTTP POST credentials and spotting beaconing intervals." },
      { title: "TryHackMe Networking Path", url: "https://tryhackme.com/module/network-fundamentals", reason: "Master CIDR subnet math (/24, /28) and default gateway routing." },
    ],
    windowsAD: [
      { title: "TryHackMe: Active Directory Basics", url: "https://tryhackme.com/room/activedirectorybasics", reason: "Hands-on domain controller enumeration and BloodHound mapping." },
      { title: "OffSec: Metasploit Unleashed", url: "https://www.offsec.com/metasploit-unleashed/", reason: "Practice configuring msfvenom payloads and tunneling over Ngrok." },
    ],
    webAppSec: [
      { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", reason: "Essential for mastering SQL injection, BOLA, and Burp Suite Repeater." },
      { title: "OWASP crAPI Docker Lab", url: "https://github.com/OWASP/crAPI", reason: "Realistic modern microservice API testbed for broken authorization flaws." },
    ],
    mobileAppSec: [
      { title: "VulnBank Mobile Security Assessment", url: "https://github.com/Kimanzi-Collins/Cybersecurity", reason: "AfricaHackon squad assignment: decompile APK, audit ContentProviders, and bypass deep links." },
      { title: "MobSF Dynamic Testing Guide", url: "https://mas.owasp.org/", reason: "Automated mobile vulnerability analysis in Genymotion emulator." },
    ],
    cloudSec: [
      { title: "ScoutSuite Multi-Cloud Audit", url: "https://github.com/nccgroup/ScoutSuite", reason: "Automate security posture audits across AWS and Azure environments." },
      { title: "Orca Security Practical Cloud Guide", url: "https://orca.security/wp-content/uploads/2021/12/pracCloudSecurity.pdf", reason: "Understand cloud threat models and IAM least privilege enforcement." },
    ],
    grcReporting: [
      { title: "NIST CSF 2.0 Core Explorer", url: "https://www.nist.gov/cyberframework", reason: "Understand control mapping and risk treatment plans for corporate audits." },
    ],
  };

  const criticalFocus = sortedDomains.slice(0, 2).map(([d]) => {
    switch (d) {
      case "linuxScripting": return "Linux CLI & Bash Automation";
      case "networkingPackets": return "CIDR Subnetting & Packet Capture Analysis";
      case "windowsAD": return "Active Directory Enumeration & Privilege Escalation";
      case "webAppSec": return "Burp Suite Traffic Interception & API Vulnerabilities";
      case "mobileAppSec": return "Android APK Decompilation & Component Auditing";
      case "cloudSec": return "AWS IAM Hardening & ScoutSuite Multi-Cloud Audits";
      case "grcReporting": return "Risk Scoring (Inherent vs Residual) & Report Writing";
      default: return d;
    }
  });

  return {
    criticalFocus,
    recommendedLabs: domainLabMap[weakestDomain] || domainLabMap["linuxScripting"],
    summaryAnalysis: `Your primary tactical opportunity lies in ${criticalFocus[0]}. Mastering this area before the final exam will close your biggest vulnerability window.`,
  };
}
