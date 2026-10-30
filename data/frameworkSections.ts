export interface FrameworkSubmodule {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  commandSnippets?: { label: string; code: string; explanation?: string }[];
  visualCallout?: { type: "info" | "warning" | "tip" | "table"; title: string; content: string };
}

export interface FrameworkModule {
  id: string;
  title: string;
  description: string;
  submodules: FrameworkSubmodule[];
}

export interface SectionCompletionItem {
  id: string;
  task: string;
  category: "knowledge" | "hands-on" | "verification";
}

export interface SectionQuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FrameworkSection {
  id: string;
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  week: 1 | 2 | 3;
  durationLabel: string;
  summary: string;
  iconName: string;
  accentColor: string;
  modules: FrameworkModule[];
  learningOutcomes: string[];
  completionCriteria: SectionCompletionItem[];
  quiz: SectionQuizItem[];
  interactiveLabType?: "cia-triad" | "incident-response" | "linux-terminal" | "osi-encapsulation" | "port-subnet" | "msfconsole" | "exam-planner";
}

export const FRAMEWORK_SECTIONS: FrameworkSection[] = [
  {
    id: "section-1",
    number: 1,
    slug: "introduction-to-cybersecurity",
    title: "Introduction to Cybersecurity",
    subtitle: "Foundations, Evolution, CIA Triad, Processes, Threats & Roles",
    week: 1,
    durationLabel: "Week 1 Core",
    summary:
      "Master the fundamental axioms of information security: definition, the 5 historical eras (Creeper to SolarWinds), the extended CIA triad, the 7 sequential security processes, threat sources, and technical vs. non-technical cyber roles.",
    iconName: "Shield",
    accentColor: "#3b82f6", // Electric Blue
    interactiveLabType: "cia-triad",
    modules: [
      {
        id: "s1-m1",
        title: "Module 1 — Introduction to Information Security",
        description: "The economic, geopolitical, and defensive necessity of modern cybersecurity.",
        submodules: [
          {
            id: "s1-m1-1",
            title: "Definition & Scope of Cybersecurity",
            summary:
              "Cybersecurity is the practice of protecting systems, networks, programs, devices, and data from unauthorized digital attacks, damage, or unauthorized access.",
            keyPoints: [
              "Cybersecurity encompasses technical controls, human governance, legal standards, and operational resilience.",
              "Security is not a static product or destination; it is an active continuous process of risk minimization.",
              "The cost of failure: operational shutdown, reputational collapse, regulatory penalties (GDPR, Kenya DPA), and direct capital theft.",
            ],
          },
          {
            id: "s1-m1-2",
            title: "Why It Matters (The Cybercrime Economy)",
            summary:
              "The global underground economy has evolved into a multi-trillion dollar industrialized ecosystem.",
            keyPoints: [
              "Cybercrime as a Service (CaaS): Dark-web markets lease ransomware (RaaS), bulletproof hosting, and stolen credential databases.",
              "Every entity is a target: Attackers automate scanning against all IP spaces—small organizations are targeted as pivots into larger enterprise supply chains.",
              "The 'One Breach' reality: A single compromised credential or unpatched CVE can compromise an entire corporate enterprise directory.",
            ],
          },
        ],
      },
      {
        id: "s1-m2",
        title: "Module 2 — Evolution of Cybersecurity (5 Historic Eras)",
        description: "Chronological progression from experimental academic networks to weaponized Zero Trust landscapes.",
        submodules: [
          {
            id: "s1-m2-1",
            title: "1960s–1980s: The Mainframe & Academic Genesis",
            summary: "Physical air-gaps, early ARPANET experiments, and the Creeper & Reaper milestone.",
            keyPoints: [
              "1971: Creeper, written by Bob Thomas at BBN, was the first self-replicating program on ARPANET ('I'M THE CREEPER: CATCH ME IF YOU CAN').",
              "Ray Tomlinson created 'Reaper' to track down and delete Creeper—the world's first antivirus.",
              "Threats were largely intellectual curiosity and experimental code rather than financially motivated crime.",
            ],
          },
          {
            id: "s1-m2-2",
            title: "1980s–1990s: Networking Era & First Firewalls",
            summary: "The emergence of PC boot-sector viruses and hardware perimeter defenses.",
            keyPoints: [
              "1986: Brain Virus (written in Pakistan) became the first widely recognized MS-DOS boot sector virus.",
              "1988: The Morris Worm incapacitated ~10% of the Internet, leading to the creation of the first Computer Emergency Response Team (CERT).",
              "Perimeter defense born: Cisco PIX and Check Point Software Technologies introduced stateful packet inspection firewalls.",
            ],
          },
          {
            id: "s1-m2-3",
            title: "2000s: The Age of Industrialized Cybercrime",
            summary: "Mass-mailing worms, botnets, and the dawn of international regulatory compliance.",
            keyPoints: [
              "2000–2003: ILOVEYOU script worm infected 10% of connected machines worldwide; Code Red and SQL Slammer caused global network paralysis.",
              "Regulatory awakening: Introduction of HIPAA (health privacy) and Sarbanes-Oxley (SOX, corporate financial audit accountability).",
              "Attackers shifted from notoriety to monetized botnets, bank phishing, and spam distribution networks.",
            ],
          },
          {
            id: "s1-m2-4",
            title: "2010s: Advanced Persistent Threats (APTs) & Cloud Migration",
            summary: "State-sponsored warfare, massive data exfiltrations, and destructive ransomware.",
            keyPoints: [
              "Nation-state weaponization: Stuxnet (targeting Iranian uranium centrifuges) proved cyber weapons can physically destroy infrastructure.",
              "Catastrophic enterprise breaches: Equifax (147M credit files leaked via Apache Struts), Yahoo (3 billion accounts compromised).",
              "2017 WannaCry & NotPetya: EternalBlue exploit weaponized NSA SMB vulnerability, paralyzing shipping giants (Maersk) and hospitals worldwide.",
            ],
          },
          {
            id: "s1-m2-5",
            title: "2020s: Zero Trust, AI/ML & Autonomous Attacks",
            summary: "Dissolved perimeters, software supply-chain attacks, and adversarial machine learning.",
            keyPoints: [
              "Zero Trust Architecture: The axiom 'Never Trust, Always Verify' replaces castle-and-moat perimeter models.",
              "Supply Chain Weaponization: 2020 SolarWinds Orion breach inserted backdoors into US federal agencies and Fortune 500 networks.",
              "AI & Automated Warfare: Deepfakes, automated polymorphic malware, generative phishing, and LLM-assisted exploitation.",
            ],
          },
        ],
      },
      {
        id: "s1-m3",
        title: "Module 3 — Fundamentals: Extended CIA Triad",
        description: "Core tenets of security architecture and assurance.",
        submodules: [
          {
            id: "s1-m3-1",
            title: "The Classic CIA Triad",
            summary: "Confidentiality, Integrity, and Availability remain the bedrock of risk calculation.",
            keyPoints: [
              "Confidentiality: Concealing data from unauthorized parties. Controls: AES-256 encryption, Role-Based Access Control (RBAC), multi-factor authentication (MFA).",
              "Integrity: Guaranteeing data authenticity and preventing tampering. Controls: Cryptographic hashing (SHA-256), digital signatures, append-only immutable audit trails.",
              "Availability: Guaranteeing timely, uninterrupted access for legitimate users. Controls: Redundancy, failover clustering, DDoS mitigation, and tested backup procedures.",
            ],
          },
          {
            id: "s1-m3-2",
            title: "Extended Security Axioms",
            summary: "Non-repudiation, Authentication, and Privacy essential to modern legal and enterprise compliance.",
            keyPoints: [
              "Non-repudiation: Inability of an actor to deny the authenticity of their signature or transaction. Enforced via Public Key Infrastructure (PKI) and cryptographic timestamps.",
              "Authentication: The proof of claimed identity. Modern standards require Multi-Factor Authentication (Something you know, something you have, something you are).",
              "Privacy & Data Minimization: Collecting only what is necessary, retaining it only for the required period, and managing user consent under frameworks like Kenya DPA & GDPR.",
            ],
          },
        ],
      },
      {
        id: "s1-m4",
        title: "Module 4 — The 7 Information Security Processes",
        description: "Sequential lifecycle methodology required by cybersecurity managers and auditors.",
        submodules: [
          {
            id: "s1-m4-1",
            title: "The 7 Sequential Processes in Order",
            summary: "A rigorous, continuous cycle from asset risk assessment through ongoing improvement.",
            keyPoints: [
              "1. Risk Assessment: Identifying assets, vulnerabilities, threats, likelihood, and business impact.",
              "2. Security Planning: Designing security policies, architecture blueprints, and allocation of budget/resources.",
              "3. Implementation of Security Controls: Deploying firewalls, endpoint detection (EDR), IAM policies, and encryption.",
              "4. Monitoring & Detection: Operating SOC tooling, SIEM correlation rules, IDS/IPS, and user behavioral analytics.",
              "5. Incident Response: Containing active compromises, eradicating root causes, and preserving forensic evidence.",
              "6. Disaster Recovery: Restoring systems from clean backups, failover to secondary sites, and resuming operations.",
              "7. Continuous Improvement: Post-mortem reviews, patch management, audit gap closures, and tabletop exercises.",
            ],
          },
        ],
      },
      {
        id: "s1-m5",
        title: "Module 5 — Cybersecurity Threat Actors & Vectors",
        description: "Taxonomy of who attacks, why they attack, and how they execute intrusion operations.",
        submodules: [
          {
            id: "s1-m5-1",
            title: "Threat Sources & Motivations",
            summary: "From opportunistic script kiddies to well-funded Advanced Persistent Threats (APTs).",
            keyPoints: [
              "Nation-States (APTs): Geopolitical espionage, critical infrastructure sabotage, intellectual property theft. Motivations: Sovereignty and war.",
              "Cybercriminal Syndicates: Ransomware cartels, financial fraud, wire diversion. Motivation: Pure profit.",
              "Hacktivists: Defacement, distributed denial of service (DDoS), leaking sensitive documents. Motivation: Political/social causes.",
              "Malicious Insiders & Accidental Insiders: Disgruntled staff, rogue admins, or employees misconfiguring public S3 buckets.",
            ],
          },
          {
            id: "s1-m5-2",
            title: "Common Attack Vectors",
            summary: "The technical methods adversaries use to gain initial access and establish persistence.",
            keyPoints: [
              "Phishing & Social Engineering: Spear phishing (targeted), whaling (targeting executives), voice phishing (vishing).",
              "Credential Stuffing & Password Spraying: Testing breached password lists against single sign-on (SSO) portals without MFA.",
              "Code Injection & Zero-Days: SQLi, command injection, exploiting unpatched vulnerabilities before patches exist.",
            ],
          },
        ],
      },
      {
        id: "s1-m6",
        title: "Module 6 — Career Paths, Teams & The Red Team",
        description: "Mapping offensive vs. defensive disciplines across technical and non-technical fields.",
        submodules: [
          {
            id: "s1-m6-1",
            title: "Technical vs. Non-Technical Roles",
            summary: "Finding your specialty within the AfricaHackon career ecosystem.",
            keyPoints: [
              "Technical Roles: Penetration Tester, SOC Security Analyst, Incident Responder, Cloud Security Engineer, DevSecOps Engineer, Malware Reverse Engineer, Security Architect.",
              "Non-Technical Roles: GRC Compliance Analyst, Cyber Risk Consultant, Security Awareness Trainer, Cyber Legal/Privacy Counsel, Information Security Project Manager.",
            ],
          },
          {
            id: "s1-m6-2",
            title: "Red Team Responsibilities & Objectives",
            summary: "Adversary simulation designed to evaluate people, processes, and technology.",
            keyPoints: [
              "Objective: Emulate real-world threat actors to identify defensive blindspots rather than just checklist scanning.",
              "Core Workflow: OSINT reconnaissance → Initial access payload delivery → Defense evasion → Privilege escalation → Lateral movement → Objective execution (crown jewels).",
              "Collaboration: Red Teams partner with Blue Teams in Purple Team exercises to ensure detections are built for all uncovered techniques.",
            ],
          },
        ],
      },
    ],
    learningOutcomes: [
      "Define cybersecurity in one precise sentence covering technology, people, and processes.",
      "Summarize the 5 historical eras of cybersecurity evolution and cite key milestone incidents.",
      "Apply the CIA triad and extended principles (non-repudiation, privacy) to realistic enterprise threat scenarios.",
      "Recite the 7 information security processes in correct chronological order from memory.",
      "Identify 5+ threat actor classes and match their typical motivation to real-world attack vectors.",
      "Distinguish technical roles from non-technical governance specializations.",
      "Explain the Red Team's methodology, operational constraints, and relationship with Blue Team defenders.",
    ],
    completionCriteria: [
      { id: "c1-1", task: "Understand and solve the interactive CIA Triad incident scenario", category: "hands-on" },
      { id: "c1-2", task: "Explain the 5 evolution eras (Mainframe, Networking, Cybercrime, APT, Zero Trust)", category: "knowledge" },
      { id: "c1-3", task: "List the 7 security processes in order from memory without consulting notes", category: "knowledge" },
      { id: "c1-4", task: "Describe 3 distinct threat actor types and corresponding defensive mitigations", category: "knowledge" },
      { id: "c1-5", task: "Name 5 technical and 5 non-technical cybersecurity career specializations", category: "verification" },
    ],
    quiz: [
      {
        question: "Which 1971 ARPANET program is historically considered the first self-replicating experimental code, and which program was created to remove it?",
        options: [
          "Brain was removed by McAfee",
          "Creeper was removed by Reaper",
          "Morris Worm was removed by CERT",
          "ILOVEYOU was removed by Norton",
        ],
        correctIndex: 1,
        explanation: "Bob Thomas wrote Creeper on ARPANET in 1971; Ray Tomlinson followed with Reaper, the first anti-virus program designed to delete Creeper.",
      },
      {
        question: "A disgruntled former financial analyst tampers with ledger database hashes so transactions cannot be verified. Which primary pillar of the CIA triad is attacked?",
        options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation only"],
        correctIndex: 1,
        explanation: "Integrity ensures data is authentic, accurate, and protected from unauthorized modification or corruption.",
      },
      {
        question: "In the 7 Information Security Processes, which step immediately follows 'Security Planning' and precedes 'Monitoring & Detection'?",
        options: [
          "Disaster Recovery",
          "Implementation of Security Controls",
          "Continuous Improvement",
          "Risk Assessment",
        ],
        correctIndex: 1,
        explanation: "The order is: Risk Assessment → Security Planning → Implementation of Security Controls → Monitoring & Detection → Incident Response → Disaster Recovery → Continuous Improvement.",
      },
    ],
  },
  {
    id: "section-2",
    number: 2,
    slug: "key-terminologies-in-cybersecurity",
    title: "Key Terminologies & Security Controls",
    subtitle: "Frameworks (NIST, ISO 27001), Networks, Encryption, 3-2-1 Backups & 6 IR Phases",
    week: 1,
    durationLabel: "Week 1 Core",
    summary:
      "Deep dive into cybersecurity operational frameworks: NIST CSF 5 functions, ISO 27001 ISMS, Kenyan DPA laws, network topologies, symmetric vs asymmetric cryptography, the 3-2-1 backup standard, and the 6 phases of incident response.",
    iconName: "Lock",
    accentColor: "#10b981", // Emerald
    interactiveLabType: "incident-response",
    modules: [
      {
        id: "s2-m1",
        title: "Module 7.1 — Frameworks, Governance & Data Protection Laws",
        description: "Standards and legislation that govern enterprise risk management.",
        submodules: [
          {
            id: "s2-m1-1",
            title: "NIST Cybersecurity Framework (CSF 2.0)",
            summary: "The voluntary framework organizing security into 5 core functions (plus Govern in 2.0).",
            keyPoints: [
              "Identify: Cataloging assets, suppliers, vulnerabilities, and legal governance.",
              "Protect: Implementing safeguards (access controls, awareness training, data security).",
              "Detect: Uncovering cybersecurity events through continuous monitoring (SIEM/EDR).",
              "Respond: Taking action regarding a detected incident (containment, mitigation).",
              "Recover: Restoring capabilities and services impaired by a cyber incident.",
            ],
          },
          {
            id: "s2-m1-2",
            title: "ISO/IEC 27001 & CIS Controls",
            summary: "International certifiable standards for Information Security Management Systems (ISMS).",
            keyPoints: [
              "ISO 27001 defines how to establish, implement, maintain, and continually improve an ISMS.",
              "CIS Critical Security Controls: 18 prioritized, prescriptive technical safeguards divided into 3 Implementation Tiers.",
              "Security Policy Architecture: Acceptable Use Policy (AUP), Access Control Policy, Data Classification Standard, Breach Notification Procedure.",
            ],
          },
          {
            id: "s2-m1-3",
            title: "Data Protection Legislation (Kenya DPA, GDPR, HIPAA)",
            summary: "Legal compliance mandates and regulatory liability for data controllers.",
            keyPoints: [
              "Kenya Data Protection Act (2019): Governed by the Office of the Data Protection Commissioner (ODPC). Mandates consent, registration of data processors, and 72-hour breach notification.",
              "GDPR: Global benchmark penalizing up to 4% of annual global turnover for severe privacy failures.",
              "HIPAA: Protects Protected Health Information (PHI) in healthcare via Security and Privacy Rules.",
            ],
          },
        ],
      },
      {
        id: "s2-m2",
        title: "Module 7.2 — Network Security Fundamentals & Controls",
        description: "Network boundaries, protocol security, firewalls, and detection systems.",
        submodules: [
          {
            id: "s2-m2-1",
            title: "Network Scopes & Protocols",
            summary: "LAN, WAN, VPN and secure protocol counterparts.",
            keyPoints: [
              "LAN (Local Area Network) vs WAN (Wide Area Network) vs VPN (Virtual Private Network encrypted tunnel over public transit).",
              "Unencrypted vs Encrypted Protocols: HTTP (80) vs HTTPS (443 TLS); FTP (21) vs SFTP (22 SSH); Telnet (23) vs SSH (22).",
              "Segmentation: Dividing networks into security zones (VLANs, DMZs) to prevent lateral adversary movement.",
            ],
          },
          {
            id: "s2-m2-2",
            title: "Firewalls & Intrusion Detection Systems (IDS)",
            summary: "Traffic inspection engines operating at host and network levels.",
            keyPoints: [
              "Firewalls: Network-based (edge appliance) vs Host-based (UFW, Windows Defender Firewall). Functions: Stateful packet inspection, egress filtering, NAT.",
              "IDS/IPS: NIDS (monitors network wire, e.g. Snort/Suricata) vs HIDS (monitors host file changes/logs, e.g. OSSEC/Wazuh).",
              "Signature-based Detection (matches known pattern hashes/rules) vs Anomaly-based (flags statistical behavioral deviations).",
            ],
          },
        ],
      },
      {
        id: "s2-m3",
        title: "Module 7.3 & 7.4 — Data Security, Classification & Cryptography",
        description: "Data classification, backup resilience, and mathematical cipher systems.",
        submodules: [
          {
            id: "s2-m3-1",
            title: "Data Classification & The 3-2-1 Backup Standard",
            summary: "Protecting data throughout its lifecycle (at rest, in transit, in use).",
            keyPoints: [
              "4-Tier Classification: Public (marketing) → Internal (org policies) → Confidential (customer records, financial plans) → Restricted (passwords, encryption keys, PII).",
              "The 3-2-1 Backup Rule: Maintain 3 total copies of data, on 2 different media types, with 1 copy stored off-site / in the cloud.",
              "Backup Architectures: Full (complete copy), Incremental (only changes since last backup), Differential (all changes since last full).",
            ],
          },
          {
            id: "s2-m3-2",
            title: "Symmetric vs. Asymmetric Cryptography",
            summary: "Ciphers for bulk encryption vs. key exchange and digital identity.",
            keyPoints: [
              "Symmetric Encryption: Single shared key for encrypt/decrypt. Extremely fast. Examples: AES-256, ChaCha20. Use: Disk encryption, database tables.",
              "Asymmetric Encryption: Public key encrypts, private key decrypts. Examples: RSA-4096, ECC (Elliptic Curve). Use: TLS handshakes, SSH authentication.",
              "Key Protocols: TLS (web traffic), IPsec (VPN tunnels), SSH (secure CLI), WPA3 (Wi-Fi), PGP/GPG (email signing), SRTP (encrypted VoIP).",
            ],
          },
        ],
      },
      {
        id: "s2-m4",
        title: "Module 7.5 — Incident Response & Virtual Labs Setup",
        description: "The 6 phases of incident management, key SOC metrics, and Kali Linux virtualization.",
        submodules: [
          {
            id: "s2-m4-1",
            title: "The 6 Phases of Incident Response (NIST / SANS)",
            summary: "Standard operational triage workflow from preparation through lessons learned.",
            keyPoints: [
              "1. Preparation: Establishing policy, IR team (IRT), communication channels, and forensic toolkits.",
              "2. Identification: Detecting anomalies, triage alerts, and confirming whether an event is a true positive breach.",
              "3. Containment: Short-term isolation (pulling network cable, isolating VM) and long-term containment.",
              "4. Eradication: Removing malware, terminating compromised accounts, closing vulnerabilities.",
              "5. Recovery: Restoring systems to clean production from verified immutable backups and testing services.",
              "6. Lessons Learned: Conducting post-incident post-mortem within two weeks to update controls and detection rules.",
            ],
          },
          {
            id: "s2-m4-2",
            title: "Incident Response Metrics",
            summary: "Measuring SOC operational maturity.",
            keyPoints: [
              "MTTD (Mean Time to Detect): Time between initial adversary compromise and defensive discovery.",
              "MTTR (Mean Time to Respond / Remediate): Time elapsed from breach discovery to full containment.",
              "False Positive Rate: Percentage of generated alerts that represent benign operational activity.",
            ],
          },
        ],
      },
    ],
    learningOutcomes: [
      "Explain the purpose of NIST CSF, ISO 27001, and CIS Controls without notes.",
      "List and describe the 5 core NIST CSF functions (Identify, Protect, Detect, Respond, Recover).",
      "Identify the core components of an enterprise security policy and understand Kenya DPA requirements.",
      "Distinguish LAN, WAN, and VPN architectures and contrast firewall vs IDS categories.",
      "Classify organizational data into the 4 standard sensitivity categories.",
      "Contrast symmetric vs asymmetric cryptography and cite appropriate real-world use cases.",
      "List the 6 Incident Response phases in sequential order and calculate SOC operational metrics (MTTD, MTTR).",
    ],
    completionCriteria: [
      { id: "c2-1", task: "Name the 5 NIST CSF functions from memory and explain their objectives", category: "knowledge" },
      { id: "c2-2", task: "Explain symmetric vs asymmetric encryption with one concrete protocol example each", category: "knowledge" },
      { id: "c2-3", task: "List the 6 Incident Response phases in order from Preparation to Lessons Learned", category: "knowledge" },
      { id: "c2-4", task: "Classify 5 real-world data samples into Public, Internal, Confidential, and Restricted", category: "hands-on" },
      { id: "c2-5", task: "Match at least 8 security and encryption protocols (TLS, SSH, IPsec, etc.) to their specific function", category: "verification" },
    ],
    quiz: [
      {
        question: "Under the 3-2-1 backup strategy, how should an enterprise structure its critical data repositories?",
        options: [
          "3 versions kept for 2 months on 1 local hard drive",
          "3 total copies of data, across 2 different media types, with 1 copy kept off-site or in the cloud",
          "3 passwords for 2 administrators with 1 emergency keycard",
          "3 daily incremental backups with 2 weekly differentials and 1 yearly archive",
        ],
        correctIndex: 1,
        explanation: "The 3-2-1 rule dictates 3 copies of data, stored across 2 different physical media formats, with 1 copy physically or logically off-site.",
      },
      {
        question: "Which cryptographic approach is used during a TLS handshake to securely negotiate a shared symmetric session key without transmitting the key over the wire?",
        options: [
          "Symmetric AES-GCM encryption",
          "Asymmetric Public-Key Cryptography (e.g. RSA or Diffie-Hellman Key Exchange)",
          "MD5 hashing algorithm",
          "Base64 encoding",
        ],
        correctIndex: 1,
        explanation: "Asymmetric cryptography solves the key distribution paradox: it allows two parties to authenticate and negotiate a shared key over an insecure channel.",
      },
      {
        question: "In the 6 phases of Incident Response, which phase directly follows 'Identification' and focuses on stopping an intruder from spreading laterally?",
        options: ["Eradication", "Containment", "Recovery", "Lessons Learned"],
        correctIndex: 1,
        explanation: "Identification confirms the breach; Containment immediately follows to isolate compromised machines and prevent adversary movement.",
      },
    ],
  },
  {
    id: "section-3",
    number: 3,
    slug: "linux-fundamentals",
    title: "Linux Fundamentals & Automation",
    subtitle: "Architecture, Package Managers (APT/DNF), CLI Navigation, Bash, Python & Services",
    week: 1,
    durationLabel: "Week 1 Core",
    summary:
      "Hands-on mastery of the hacker's operating system: Linux architecture (Kernel, Shell, Filesystem, Processes), package management (APT, DNF, DPKG, PIP), navigation, bash scripting, basic Python, systemd service administration (systemctl, ps, top), and Git workflows.",
    iconName: "Terminal",
    accentColor: "#f59e0b", // Amber
    interactiveLabType: "linux-terminal",
    modules: [
      {
        id: "s3-m1",
        title: "Module 1 & 2 — Linux Architecture & Package Management",
        description: "Kernel, shell, and managing software repositories.",
        submodules: [
          {
            id: "s3-m1-1",
            title: "Linux Architecture Essentials",
            summary: "Kernel, Shell, Filesystem, and Processes explained.",
            keyPoints: [
              "Hardware → Kernel (core OS managing CPU, RAM, and hardware drivers) → Shell (CLI interpreter such as Bash or Zsh) → Applications (utilities, compilers, daemons).",
              "Why Linux in Cyber: Open-source auditability, modularity, high stability, complete network control, scriptability, and lightweight server footprints.",
              "Distributions: Debian/Ubuntu (APT-based), Kali Linux (Debian-derived offensive distro), Red Hat/CentOS/Fedora (RPM/DNF-based).",
            ],
          },
          {
            id: "s3-m1-2",
            title: "Package Management (APT, DNF, DPKG, PIP)",
            summary: "Installing, verifying, upgrading, and purging software packages.",
            keyPoints: [
              "APT (Debian/Ubuntu/Kali): `apt update` (refreshes repository package indices), `apt upgrade` (applies patches), `apt install <pkg>`, `apt purge <pkg>` (removes package and config files).",
              "DPKG: Low-level Debian packager (`dpkg -i file.deb`).",
              "PIP: Python package index installer (`pip install requests scapy`).",
            ],
            commandSnippets: [
              { label: "Install and purge curl lab", code: "sudo apt update && sudo apt install -y curl\ncurl --version\nsudo apt purge -y curl && sudo apt autoremove -y" },
            ],
          },
        ],
      },
      {
        id: "s3-m2",
        title: "Module 3 & 4 — CLI Essentials & Filesystem Navigation",
        description: "Commands, pathing, permissions, and directory hierarchies.",
        submodules: [
          {
            id: "s3-m2-1",
            title: "Filesystem Hierarchy Standard (FHS)",
            summary: "Root / and purposeful Linux directories.",
            keyPoints: [
              "/ (Root): Base of the entire system.",
              "/bin & /usr/bin: Essential user binary executables.",
              "/etc: Host-specific system-wide configuration files (e.g. /etc/passwd, /etc/shadow).",
              "/var: Variable files (logs in /var/log, web roots in /var/www).",
              "/home: User personal directories; /root: Home directory of the root superuser.",
              "/tmp: Temporary files, world-writable (frequent staging point for privilege escalation).",
            ],
          },
          {
            id: "s3-m2-2",
            title: "Core Commands & Permissions",
            summary: "CLI navigation, relative vs absolute paths, and chmod notation.",
            keyPoints: [
              "Navigation: `pwd`, `ls -la`, `cd ~`, `cd ..`, `cd /var/log`.",
              "File Operations: `touch`, `mkdir -p`, `cp -r`, `mv`, `rm -rf`.",
              "Permissions: `chmod 755 script.sh` (User: rwx [7], Group: r-x [5], Others: r-x [5]); `chown user:group file`.",
            ],
            commandSnippets: [
              { label: "Find SUID binaries for privesc", code: "find / -perm -4000 -type f 2>/dev/null" },
            ],
          },
        ],
      },
      {
        id: "s3-m3",
        title: "Module 5 & 6 — Bash Scripting & Python 101",
        description: "Writing automation scripts, argument handling, and Python socket basics.",
        submodules: [
          {
            id: "s3-m3-1",
            title: "Bash Scripting Structure",
            summary: "Shebang, variables, conditionals, loops, and user interaction.",
            keyPoints: [
              "Shebang: `#!/bin/bash` must be the first line.",
              "Variables: `TARGET_IP=$1`; Access: `echo \"Target is $TARGET_IP\"` (no spaces around `=`).",
              "Conditionals: `if [ -z \"$1\" ]; then echo \"Usage: $0 <ip>\"; exit 1; fi`.",
              "Looping: `for ip in $(cat targets.txt); do ping -c 1 $ip; done`.",
            ],
            commandSnippets: [
              {
                label: "Automated Host Check Bash Template",
                code: "#!/bin/bash\n# System Report Generator\necho \"=== SYSTEM AUDIT ===\"\necho \"Hostname: $(hostname)\"\necho \"Uptime: $(uptime -p)\"\necho \"Active Users: $(who | wc -l)\"",
              },
            ],
          },
          {
            id: "s3-m3-2",
            title: "Python 101 for Cybersecurity",
            summary: "Clean script structure, indentation, requests, and socket scripting.",
            keyPoints: [
              "Python relies on strict 4-space indentation rather than curly braces.",
              "Essential security libraries: `requests` (API & web probing), `socket` (port scanning), `argparse` (CLI parsing).",
            ],
          },
        ],
      },
      {
        id: "s3-m4",
        title: "Module 7 & 8 — Linux Services & Git Workflow",
        description: "Service management with systemctl, process tracking, and version control.",
        submodules: [
          {
            id: "s3-m4-1",
            title: "Service Management (systemctl & ps/top)",
            summary: "Daemons, background jobs, and operational resource inspection.",
            keyPoints: [
              "Systemd commands: `sudo systemctl status ssh`, `start`, `stop`, `restart`, `enable` (starts on boot), `disable`.",
              "Process monitoring: `ps aux | grep nginx`, `ps -ef --forest` (shows parent-child PID trees).",
              "Resource tracking: `top` (live monitoring; press 'M' to sort by memory, 'P' by CPU, 'q' to quit).",
            ],
          },
          {
            id: "s3-m4-2",
            title: "Git & GitHub Essential Workflow",
            summary: "Version controlling code and pushing to remote repositories.",
            keyPoints: [
              "The 4-step loop: `git status` → `git add .` → `git commit -m \"message\"` → `git push origin main`.",
              "Remote setup: `git init`, `git remote add origin <URL>`, `git branch -M main`.",
            ],
          },
        ],
      },
    ],
    learningOutcomes: [
      "Explain the fundamental Linux architecture (Kernel, Shell, Filesystem, Processes).",
      "Use APT and package managers to install, verify, and purge security tools.",
      "Navigate the Linux filesystem hierarchy effortlessly using both absolute and relative paths.",
      "Manage file permissions, ownership, and recognize high-risk SUID permission bits.",
      "Write, debug, and execute a modular Bash script featuring comments, conditionals, and variables.",
      "Write a basic Python script and understand its role in exploit tooling.",
      "Administer services using systemctl and audit live processes using ps aux and top.",
      "Execute the complete Git workflow (init → add → commit → push) confidently.",
    ],
    completionCriteria: [
      { id: "c3-1", task: "Navigate the CLI (file management, hidden files, relative paths, history)", category: "hands-on" },
      { id: "c3-2", task: "Write and execute a Bash script featuring arguments, conditional checks, and logging", category: "hands-on" },
      { id: "c3-3", task: "Explain the distinction between Kernel, Shell, Terminal, and Prompt without notes", category: "knowledge" },
      { id: "c3-4", task: "Use ps aux | grep and systemctl status to audit running system daemons", category: "hands-on" },
      { id: "c3-5", task: "Commit and push a repository to GitHub using the edit → add → commit → push flow", category: "verification" },
    ],
    quiz: [
      {
        question: "Which Linux command updates the local index of available packages from remote repositories without actually upgrading the installed packages?",
        options: ["sudo apt upgrade", "sudo apt update", "sudo apt install -y update", "dpkg -l"],
        correctIndex: 1,
        explanation: "`apt update` downloads package metadata from the configured repositories. `apt upgrade` actually downloads and applies the newer packages.",
      },
      {
        question: "In the Linux filesystem hierarchy, which directory contains host-specific system configuration files such as network interfaces, user databases, and cron tables?",
        options: ["/bin", "/etc", "/var", "/usr"],
        correctIndex: 1,
        explanation: "/etc is reserved exclusively for system-wide configuration files across all UNIX-like systems.",
      },
      {
        question: "Which systemctl command ensures that the SSH server daemon automatically starts up every time the Linux machine boots?",
        options: [
          "sudo systemctl start ssh",
          "sudo systemctl enable ssh",
          "sudo systemctl reload ssh",
          "sudo systemctl boot ssh",
        ],
        correctIndex: 1,
        explanation: "`enable` creates the systemd symlink so the service runs at boot. `start` only starts it for the current session.",
      },
    ],
  },
  {
    id: "section-4",
    number: 4,
    slug: "networking-fundamentals-part-1",
    title: "Networking Fundamentals (Part 1)",
    subtitle: "Topologies, Transmission Media (Fiber/Wireless), OSI 7 Layers & Encapsulation",
    week: 2,
    durationLabel: "Week 2 Core",
    summary:
      "The anatomical foundation of digital communication: network topologies, copper vs. single-mode/multi-mode fiber, Wi-Fi standards (802.11ax), the OSI 7-layer model vs. TCP/IP 4-layer model, Protocol Data Units (PDUs), and step-by-step packet encapsulation/decapsulation.",
    iconName: "Network",
    accentColor: "#06b6d4", // Cyan
    interactiveLabType: "osi-encapsulation",
    modules: [
      {
        id: "s4-m1",
        title: "Module 1 — Computer Network Basics & Topologies",
        description: "Network building blocks, architecture models, and hardware devices.",
        submodules: [
          {
            id: "s4-m1-1",
            title: "Network Definition & Scopes",
            summary: "Connecting nodes, transmission links, and communication protocols.",
            keyPoints: [
              "3 Building Blocks: End devices (computers, servers), Media/Links (cables, radio waves), Protocols (rules of formatting and routing).",
              "Scopes: LAN (Local Area Network - single building), MAN (Metropolitan - city), WAN (Wide Area Network - cross-country/global, e.g. the Internet).",
              "Extranet vs Intranet: Intranet is strictly internal for employees; Extranet provides controlled access to trusted external partners.",
            ],
          },
          {
            id: "s4-m1-2",
            title: "Topologies & Architecture",
            summary: "Physical and logical arrangements of communicating nodes.",
            keyPoints: [
              "Topologies: Star (most common, switch at center, single node failure does not crash network), Mesh (redundant, highly resilient, costly), Bus (single backbone cable, single break halts network), Ring, Tree, Hybrid.",
              "Architecture: Client-Server (centralized access management) vs Peer-to-Peer (decentralized, equal node rights).",
              "Hardware Devices: Switch (Layer 2 frame forwarding via MAC table), Router (Layer 3 packet routing via IP), Firewall (traffic filtering), Hub (obsolete Layer 1 broadcast repeater), Modem, NIC (Network Interface Card).",
            ],
          },
        ],
      },
      {
        id: "s4-m2",
        title: "Module 2 — Transmission Devices & Physical Media",
        description: "Copper cabling, fiber optics, and wireless communication standards.",
        submodules: [
          {
            id: "s4-m2-1",
            title: "Wired Media: Copper vs. Fiber Optics",
            summary: "Physical layer characteristics, interference resistance, and distance limits.",
            keyPoints: [
              "Copper: UTP (Unshielded Twisted Pair, Cat5e/Cat6, up to 100 meters, susceptible to EMI); STP (Shielded Twisted Pair, extra foil shield for industrial noise).",
              "Coaxial Cable: Copper core surrounded by insulation and braided shield (used in cable broadband).",
              "Single-Mode Fiber (SMF): Extremely thin glass core (9 µm), uses laser light, transmits across tens of kilometers (inter-city backbones).",
              "Multi-Mode Fiber (MMF): Wider glass core (50/62.5 µm), uses LED light, transmits up to ~550m (data center switches).",
            ],
          },
          {
            id: "s4-m2-2",
            title: "Wireless Media & Wi-Fi Standards",
            summary: "Radio spectrum bands and IEEE 802.11 specifications.",
            keyPoints: [
              "Frequencies: 2.4 GHz (longer range, penetrates walls better, crowded/slower) vs 5 GHz (higher bandwidth, shorter range, less interference).",
              "IEEE Standards: 802.11b (11 Mbps), 802.11g (54 Mbps), 802.11n (Wi-Fi 4 - 600 Mbps), 802.11ac (Wi-Fi 5 - Gigabit), 802.11ax (Wi-Fi 6/6E - high efficiency/OFDMA).",
              "Wireless Security: WEP (broken), WPA (deprecated), WPA2 (AES-CCMP, vulnerable to deauth/handshake capture), WPA3 (SAE handshake, resistant to offline dictionary attacks).",
            ],
          },
        ],
      },
      {
        id: "s4-m3",
        title: "Module 3 — Network Models & Encapsulation",
        description: "OSI 7-layer architecture, TCP/IP mapping, PDUs, and packet journey.",
        submodules: [
          {
            id: "s4-m3-1",
            title: "The 7 OSI Layers & TCP/IP Mapping",
            summary: "Standardized conceptual framework for data communication.",
            keyPoints: [
              "Layer 7 - Application: User interface protocols (HTTP, DNS, SSH, FTP).",
              "Layer 6 - Presentation: Data formatting, encryption/decryption, compression (SSL/TLS, ASCII, JPEG).",
              "Layer 5 - Session: Managing connections between apps (RPC, NetBIOS, session tokens).",
              "Layer 4 - Transport: End-to-end communication, port addressing (TCP reliable 3-way handshake, UDP lightweight).",
              "Layer 3 - Network: Logical addressing and path routing (IPv4, IPv6, ICMP, IPsec).",
              "Layer 2 - Data Link: Physical addressing, MAC frames, error detection (Ethernet, Wi-Fi 802.11, ARP).",
              "Layer 1 - Physical: Raw bit transmission over physical medium (voltages, radio waves, light pulses).",
              "TCP/IP 4-Layer Model: Application (L7, L6, L5) → Transport (L4) → Internet (L3) → Network Access (L2, L1).",
            ],
          },
          {
            id: "s4-m3-2",
            title: "PDUs & The Encapsulation Process",
            summary: "How data transforms as it travels down the stack.",
            keyPoints: [
              "PDU at Layer 7-5: Data / Message.",
              "PDU at Layer 4: Segment (TCP) or Datagram (UDP) - Adds source & destination ports.",
              "PDU at Layer 3: Packet - Adds source & destination IP addresses.",
              "PDU at Layer 2: Frame - Adds source & destination MAC addresses and CRC trailer.",
              "PDU at Layer 1: Bits (0s and 1s).",
              "Decapsulation: The reverse process performed at the receiving host.",
            ],
          },
        ],
      },
    ],
    learningOutcomes: [
      "Define a computer network and state its 3 core building blocks.",
      "Compare LAN, WAN, and MAN scales with practical examples.",
      "Identify 6 network topologies and cite the resilience advantage of Star and Mesh.",
      "Match 8 network devices (switches, routers, firewalls, bridges) to their operational layer.",
      "Contrast copper UTP/STP, single-mode fiber, and multi-mode fiber characteristics.",
      "Name all 7 OSI layers from memory in order and map them to the 4 TCP/IP layers.",
      "Explain packet encapsulation and name the exact Protocol Data Unit (PDU) at each layer.",
    ],
    completionCriteria: [
      { id: "c4-1", task: "Recite all 7 OSI layers from memory from Application to Physical", category: "knowledge" },
      { id: "c4-2", task: "Accurately map the 7 OSI layers to the 4 TCP/IP architecture layers", category: "knowledge" },
      { id: "c4-3", task: "Identify the correct PDU (Data, Segment, Packet, Frame, Bits) at each layer", category: "verification" },
      { id: "c4-4", task: "Explain the encapsulation journey of an HTTP GET request in your own words", category: "hands-on" },
      { id: "c4-5", task: "Match 8 network devices and 5 cabling types to their operational use case", category: "verification" },
    ],
    quiz: [
      {
        question: "What is the Protocol Data Unit (PDU) called at Layer 3 (Network Layer) of the OSI model?",
        options: ["Frame", "Packet", "Segment", "Bit"],
        correctIndex: 1,
        explanation: "Layer 4 produces Segments (TCP), Layer 3 packages them into Packets (with IP headers), and Layer 2 wraps them into Frames (with MAC headers).",
      },
      {
        question: "Why is Single-Mode Fiber (SMF) selected over Multi-Mode Fiber (MMF) for telecommunications backbones spanning across cities?",
        options: [
          "It uses cheaper LED lights",
          "Its narrow core eliminates modal dispersion, allowing laser light to travel tens of kilometers without degradation",
          "It is made of copper wiring instead of glass",
          "It requires no transceivers",
        ],
        correctIndex: 1,
        explanation: "Single-mode fiber features a tiny 9-micron core that restricts light to a single path, minimizing modal dispersion and enabling ultra-long distance transmission.",
      },
      {
        question: "Which network device operates primarily at OSI Layer 2 to forward data frames based on hardware MAC address tables?",
        options: ["Router", "Network Switch", "Hub", "Gateway"],
        correctIndex: 1,
        explanation: "Switches maintain a CAM/MAC address table to intelligently forward frames directly to the intended destination port at Layer 2.",
      },
    ],
  },
  {
    id: "section-5",
    number: 5,
    slug: "networking-fundamentals-part-2",
    title: "Networking Fundamentals (Part 2)",
    subtitle: "Network Services & Ports, IP Addressing, Subnetting, VLSM, NAT & Wireshark",
    week: 2,
    durationLabel: "Week 2 Core",
    summary:
      "Deep practical networking for penetration testing: essential service port mapping (FTP 21, SSH 22, DNS 53, SMB 445, RDP 3389), binary/hex conversion, IPv4 classes and private scopes, CIDR subnetting math, Variable-Length Subnet Masking (VLSM), NAT translation, and forensic PCAP packet analysis using Wireshark.",
    iconName: "Binary",
    accentColor: "#8b5cf6", // Purple
    interactiveLabType: "port-subnet",
    modules: [
      {
        id: "s5-m1",
        title: "Module 4 — Network Services & Port Mapping",
        description: "Standard ports, daemon protocols, and their cybersecurity exposure.",
        submodules: [
          {
            id: "s5-m1-1",
            title: "Core Service Ports Every Hacker Must Memorize",
            summary: "Standard IANA well-known ports (0–1023) and registered services.",
            keyPoints: [
              "File Transfer: FTP (20/21, unencrypted cleartext), SFTP (22, SSH tunnel), SCP (22), NFS (2049 Linux share), SMB (139/445 Windows shares - high exploit target!).",
              "Email: SMTP (25 plain, 587 secure submit), POP3 (110 plain, 995 SSL), IMAP (143 plain, 993 SSL).",
              "Web & Remote: HTTP (80), HTTPS (443 TLS), SSH (22), Telnet (23 plain), RDP (3389 Windows Remote Desktop).",
              "Infrastructure: DNS (53 UDP/TCP), DHCP (67/68 UDP), NTP (123 UDP), SNMP (161/162 UDP).",
              "Identity & Directory: LDAP (389 plain), LDAPS (636 SSL), Active Directory Kerberos (88).",
            ],
          },
          {
            id: "s5-m1-2",
            title: "DNS Resolution Mechanics",
            summary: "Recursive and iterative domain name resolution process.",
            keyPoints: [
              "Browser cache → OS hosts file & DNS resolver cache → Local Recursive Resolver (ISP or 1.1.1.1/8.8.8.8) → Root Nameserver (.) → TLD Nameserver (.com) → Authoritative Nameserver (example.com).",
              "DNS Record Types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail exchange), TXT (SPF/DKIM verification), PTR (reverse lookup).",
            ],
          },
        ],
      },
      {
        id: "s5-m2",
        title: "Module 5 — IP Addressing, Subnetting, VLSM & NAT",
        description: "Binary conversion, CIDR notation, subnet calculations, and private address spaces.",
        submodules: [
          {
            id: "s5-m2-1",
            title: "IPv4 Architecture & Private Address Ranges",
            summary: "32-bit addresses divided into 4 octets (0–255).",
            keyPoints: [
              "Class A: 1.0.0.0 – 126.255.255.255 (Default /8). RFC 1918 Private: 10.0.0.0/8 (10.0.0.0 – 10.255.255.255).",
              "Class B: 128.0.0.0 – 191.255.255.255 (Default /16). RFC 1918 Private: 172.16.0.0/12 (172.16.0.0 – 172.31.255.255).",
              "Class C: 192.0.0.0 – 223.255.255.255 (Default /24). RFC 1918 Private: 192.168.0.0/16 (192.168.0.0 – 192.168.255.255).",
              "Loopback Range: 127.0.0.0/8 (127.0.0.1); APIPA (Automatic Private IP): 169.254.0.0/16.",
              "IPv6: 128-bit hexadecimal notation separated by colons, eliminating the need for NAT.",
            ],
          },
          {
            id: "s5-m2-2",
            title: "Subnetting Math & VLSM",
            summary: "Borrowing host bits to create subnets and calculating usable hosts.",
            keyPoints: [
              "Usable Hosts Formula: 2^(host bits) - 2 (subtract Network ID and Broadcast address).",
              "/24 = 256 addresses (254 usable hosts).",
              "/27 = 32 addresses (30 usable hosts).",
              "/28 = 16 addresses (14 usable hosts).",
              "/30 = 4 addresses (2 usable hosts - classic point-to-point router link).",
              "VLSM (Variable Length Subnet Mask): Allocating subnets sized precisely to each department's headcount to eliminate IP waste.",
              "NAT (Network Address Translation): Maps private RFC 1918 addresses behind a single public IP, conserving IPv4 space.",
            ],
          },
        ],
      },
      {
        id: "s5-m3",
        title: "Module 5.5 — Wireshark Packet Forensics (http.cap Assignment)",
        description: "Hands-on analysis of network captures, TCP flags, and HTTP protocol inspection.",
        submodules: [
          {
            id: "s5-m3-1",
            title: "Wireshark Display Filters & Stream Inspection",
            summary: "Filtering noise to extract attack artifacts and cleartext credentials.",
            keyPoints: [
              "TCP 3-Way Handshake: SYN → SYN-ACK → ACK.",
              "Display filters: `http.request.method == \"POST\"`, `tcp.flags.syn == 1 and tcp.flags.ack == 0`, `dns.flags.response == 0`.",
              "Follow TCP Stream: Reconstructs the exact bidirectional cleartext conversation between client and server.",
            ],
          },
        ],
      },
    ],
    learningOutcomes: [
      "Match 10+ standard network service protocols to their default port numbers from memory.",
      "Explain the key architectural differences between SMTP, POP3, and IMAP.",
      "Describe the recursive and iterative DNS resolution tree from browser to authoritative server.",
      "Convert numerical representations smoothly between Binary, Decimal, and Hexadecimal.",
      "Identify the class, default mask, and public/private status of any IPv4 address.",
      "Calculate total subnets, subnet masks, and usable host ranges from any CIDR prefix (/24 to /30).",
      "Explain how Variable-Length Subnet Masking (VLSM) and Network Address Translation (NAT) operate.",
      "Analyze a raw PCAP capture file in Wireshark and inspect TCP flags, handshakes, and HTTP streams.",
    ],
    completionCriteria: [
      { id: "c5-1", task: "Match 10 critical network services (FTP, SSH, DNS, SMB, RDP, etc.) to ports without notes", category: "knowledge" },
      { id: "c5-2", task: "Convert 5 sample numbers between binary, decimal, and hexadecimal formats", category: "hands-on" },
      { id: "c5-3", task: "Identify the address class and default subnet mask for 5 given IP addresses", category: "knowledge" },
      { id: "c5-4", task: "Calculate usable host counts and subnet boundaries for /24, /27, /28, and /30 masks", category: "hands-on" },
      { id: "c5-5", task: "Inspect a packet capture file in Wireshark and isolate HTTP POST credential data", category: "verification" },
    ],
    quiz: [
      {
        question: "How many usable host IP addresses are available to client machines in a /27 IPv4 subnet?",
        options: ["32 hosts", "30 hosts", "14 hosts", "62 hosts"],
        correctIndex: 1,
        explanation: "A /27 has 32 - 27 = 5 host bits. 2^5 = 32 total addresses. Subtract 2 (Network ID and Broadcast) = 30 usable host IP addresses.",
      },
      {
        question: "Which port is utilized by Microsoft Active Directory for Kerberos ticket-granting service authentication?",
        options: ["Port 389", "Port 445", "Port 88", "Port 3389"],
        correctIndex: 2,
        explanation: "Kerberos operates on TCP/UDP Port 88 for issuing Ticket Granting Tickets (TGT) and service tickets.",
      },
      {
        question: "An IP address beginning with 172.24.10.5 belongs to which RFC 1918 private address allocation scope?",
        options: ["Class A Private Range", "Class B Private Range (172.16.0.0/12)", "Class C Private Range", "Public Internet Address"],
        correctIndex: 1,
        explanation: "The Class B RFC 1918 private range spans 172.16.0.0 through 172.31.255.255 (a /12 network prefix).",
      },
    ],
  },
  {
    id: "section-6",
    number: 6,
    slug: "metasploit-framework",
    title: "Metasploit Framework & Practical Exploitation",
    subtitle: "Console Navigation, Modules (Exploit vs Aux vs Payload), msfvenom & 3-Week Lab Plan",
    week: 3,
    durationLabel: "Week 3 Core",
    summary:
      "Operational offensive mastery of the world's most popular exploitation framework: msfconsole commands, distinguishing Exploit vs. Auxiliary vs. Payload vs. Encoder modules, target configuration (RHOSTS, LHOST, LPORT), post-exploitation sessions, PostgreSQL database integration, msfvenom payload generation, and the guided 3-Week Metasploitable2 challenge.",
    iconName: "Flame",
    accentColor: "#ef4444", // Crimson
    interactiveLabType: "msfconsole",
    modules: [
      {
        id: "s6-m1",
        title: "Module 1 — Metasploit Fundamentals & Architecture",
        description: "Console navigation, directory hierarchy, and module taxonomy.",
        submodules: [
          {
            id: "s6-m1-1",
            title: "Architecture & Core Module Taxonomies",
            summary: "Exploit, Auxiliary, Payload, Post, and Encoder modules explained.",
            keyPoints: [
              "Exploit Modules: Software tools that take advantage of a specific system vulnerability to gain execution.",
              "Auxiliary Modules: Non-payload actions such as vulnerability scanners, port scanners, fuzzers, and sniffers.",
              "Payloads: The malicious code executed on the target after an exploit succeeds (Staged vs Non-Staged / Singles).",
              "Post Modules: Scripts executed inside an active session (dumping hashes, enumerating credentials, looting).",
              "Encoders: Obfuscating payloads to bypass basic signature filters (e.g. `x86/shikata_ga_nai`).",
            ],
          },
          {
            id: "s6-m1-2",
            title: "msfconsole Core Command Set",
            summary: "Command line operations inside the interactive Metasploit console.",
            keyPoints: [
              "`help`: List available commands; `banner`: Display randomized ASCII banner.",
              "`search <term>`: Search modules by CVE, author, or service (e.g. `search type:exploit smb`).",
              "`use <module_path>`: Load a module; `show options`: Inspect mandatory and optional variables.",
              "`set <VARIABLE> <VALUE>` / `setg`: Configure options locally or globally.",
              "`exploit` or `run`: Fire the module against target.",
            ],
            commandSnippets: [
              { label: "Console launch and module load", code: "msfconsole -q\nsearch vsftpd\nuse exploit/unix/ftp/vsftpd_234_backdoor\nshow options" },
            ],
          },
        ],
      },
      {
        id: "s6-m2",
        title: "Module 2 — Configuration, Sessions & msfvenom",
        description: "Target parameterization, reverse shell handling, and standalone binary generation.",
        submodules: [
          {
            id: "s6-m2-1",
            title: "Target Parameters (RHOSTS, LHOST, LPORT)",
            summary: "Connecting offensive listeners to victim endpoints.",
            keyPoints: [
              "RHOSTS (Remote Hosts): IP address or subnet of the vulnerable target machine.",
              "LHOST (Local Host): The listener IP of your Kali Linux attacking machine (or Ngrok/VPN tunnel IP).",
              "LPORT (Local Port): The local listening port (e.g. 4444) where your handler waits for the reverse connection.",
              "Sessions: When a reverse shell lands, it spawns a background session (`sessions -l`, `sessions -i 1`).",
            ],
          },
          {
            id: "s6-m2-2",
            title: "msfvenom Payload Generation",
            summary: "Compiling custom stand-alone shellcode and executable payloads.",
            keyPoints: [
              "Combines msfpayload and msfencode into a single standalone CLI utility.",
              "Staged (`windows/meterpreter/reverse_tcp`) vs Inline (`windows/meterpreter_reverse_tcp`).",
              "Common format flags: `-f exe` (Windows), `-f elf` (Linux), `-f raw` (shellcode bytes).",
            ],
            commandSnippets: [
              { label: "Generate Windows meterpreter executable", code: "msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o payload.exe" },
            ],
          },
        ],
      },
      {
        id: "s6-m3",
        title: "Module 3 — The 3-Week Metasploit Lab Roadmap",
        description: "Prescriptive weekly progression to conquer the Metasploitable2 target machine.",
        submodules: [
          {
            id: "s6-m3-1",
            title: "Structured 3-Week Checkpoint Schedule",
            summary: "From console basics to independent full-chain exploitation.",
            keyPoints: [
              "Week 1: Fundamentals, msfconsole navigation, module taxonomy quiz, options review.",
              "Week 2: Auxiliary scanning against Metasploitable2, database integration (`db_nmap`), and session handling.",
              "Week 3: msfvenom binary generation, multi/handler listeners, and full end-to-end exploit documentation.",
            ],
          },
        ],
      },
    ],
    learningOutcomes: [
      "Explain the fundamental difference between Exploit, Auxiliary, and Payload modules without notes.",
      "Navigate msfconsole fluently using core commands (search, use, show options, set, run).",
      "Configure RHOSTS, LHOST, and LPORT correctly for local and tunneled network lab environments.",
      "Execute an auxiliary reconnaissance scan and save findings into the integrated PostgreSQL database.",
      "Explain the distinction between Staged and Non-staged (Single) payloads.",
      "Generate custom binary payloads using msfvenom and catch incoming reverse shells with multi/handler.",
      "Execute a complete end-to-end exploitation against an isolated vulnerable VM (e.g. Metasploitable2).",
    ],
    completionCriteria: [
      { id: "c6-1", task: "Explain the difference between Exploit, Auxiliary, and Payload modules without consulting notes", category: "knowledge" },
      { id: "c6-2", task: "Navigate msfconsole using core commands (help, search, use, show options, set, run)", category: "hands-on" },
      { id: "c6-3", task: "Configure and run an auxiliary port or vulnerability scan against a lab target", category: "hands-on" },
      { id: "c6-4", task: "Successfully catch a reverse Meterpreter shell and interact with the session", category: "hands-on" },
      { id: "c6-5", task: "Describe the complete exploitation workflow end-to-end from initial recon to post-exploitation", category: "verification" },
    ],
    quiz: [
      {
        question: "In Metasploit terminology, what distinguishes an Auxiliary module from an Exploit module?",
        options: [
          "Auxiliary modules execute payloads, while Exploit modules do not",
          "Auxiliary modules perform actions like scanning, fuzzing, and reconnaissance without executing payloads on the target",
          "Auxiliary modules only work on Windows targets",
          "There is no difference; they are aliases for the same code",
        ],
        correctIndex: 1,
        explanation: "Auxiliary modules perform supplementary tasks (port scanning, brute forcing, service discovery) without delivering a payload.",
      },
      {
        question: "When configuring a reverse TCP shell payload, what does the LHOST option designate?",
        options: [
          "The target machine's IP address that you wish to attack",
          "The attacker's local IP address where the incoming reverse shell connection should connect back to",
          "The default gateway of the local router",
          "The loopback IP address 127.0.0.1 exclusively",
        ],
        correctIndex: 1,
        explanation: "LHOST (Local Host) is your attacking machine's IP where the listener waits for the target payload to connect back.",
      },
    ],
  },
  {
    id: "section-7",
    number: 7,
    slug: "coursework-assignments-resources",
    title: "Coursework, Resources & Exam Readiness",
    subtitle: "Toolchain Verification, Curated Directories & 3-Week Exam Study Blueprint",
    week: 3,
    durationLabel: "Week 3 Core",
    summary:
      "Final operational readiness for the AfricaHackon practical certification: required lab toolchain verification (VMware/VirtualBox, Kali Linux, VS Code, Wireshark, Git), master resource directories, and a comprehensive 3-week study roadmap to ace the exam.",
    iconName: "BookOpen",
    accentColor: "#ec4899", // Pink
    interactiveLabType: "exam-planner",
    modules: [
      {
        id: "s7-m1",
        title: "Module 7.2 — Required Student Toolchain",
        description: "Verification checklist for mandatory software tools.",
        submodules: [
          {
            id: "s7-m1-1",
            title: "Mandatory Laboratory Environment",
            summary: "Ensure every tool is installed and tested prior to practical exam day.",
            keyPoints: [
              "Virtualization Hypervisor: VMware Workstation Player, VirtualBox 7, or UTM (Apple Silicon Mac).",
              "Operating System: Kali Linux 2024+ (primary offensive platform) configured with standard tool packages.",
              "Code Editor: Visual Studio Code with Python, Bash, and GitLens extensions installed.",
              "Version Control: Git installed locally with linked active GitHub account.",
              "Packet Analysis: Wireshark installed with non-root capture privileges (`sudo usermod -aG wireshark $USER`).",
            ],
          },
        ],
      },
      {
        id: "s7-m2",
        title: "Module 7.3 — Official & Recommended Resource Directory",
        description: "Authoritative references curated by AfricaHackon Academy mentors.",
        submodules: [
          {
            id: "s7-m2-1",
            title: "Curated Practice Platforms & Guides",
            summary: "Direct links to the best free training environments on the Internet.",
            keyPoints: [
              "AfricaHackon Linux Labs: https://learnlinux.africahackon.com/ (Interactive browser labs).",
              "OverTheWire Bandit: https://overthewire.org/wargames/bandit/ (Linux wargames 0–25).",
              "Kali Linux Tools Directory: https://www.kali.org/tools/ (Comprehensive documentation of every pre-installed tool).",
              "Sudheer's Linux Cheat Sheet: https://github.com/sudheerj/Linux-cheat-sheet.",
              "DevHints Bash Sheet: https://devhints.io/bash (Quick syntax reference).",
              "Steiner's Python Basics: https://github.com/Steiner-254/AH-Python-Basics (Python primer for AH students).",
              "GeeksforGeeks Computer Networks: https://www.geeksforgeeks.org/computer-networks/computer-network-cheat-sheet/.",
              "9tut Subnetting Tutorial: https://www.9tut.com/subnetting-tutorial (Master VLSM calculations).",
              "SANS Cybersecurity Fundamentals: https://www.sans.org/blog/cybersecurity-fundamentals.",
            ],
          },
        ],
      },
      {
        id: "s7-m3",
        title: "Module 7.4 — 3-Week Exam Preparation Blueprint",
        description: "Milestones and checkpoints to ensure 100% squad pass rate.",
        submodules: [
          {
            id: "s7-m3-1",
            title: "Exam Milestone Checkpoints",
            summary: "High-yield topics guaranteed to appear on the practical exam.",
            keyPoints: [
              "Network Services & Ports: Memorize FTP 21, SSH 22, SMTP 25, DNS 53, HTTP 80, Kerberos 88, SMB 445, RDP 3389.",
              "Number Systems: Convert effortlessly between Binary, Octal, Decimal, and Hexadecimal.",
              "IP Math: Calculate network ID, broadcast address, and usable host count for any CIDR mask (/24, /27, /28, /30).",
              "Packet Analysis: Filter Wireshark captures for HTTP credentials and isolate TCP 3-way handshakes.",
            ],
          },
        ],
      },
    ],
    learningOutcomes: [
      "Verify that all mandatory virtualized lab tools and hypervisors are operational.",
      "Access and utilize all curated AfricaHackon and open-source learning repositories.",
      "Execute the 3-week study roadmap to achieve full mastery of network ports, IP math, and Metasploit.",
      "Pass the practical hands-on exam checkpoints with zero unresolved knowledge gaps.",
    ],
    completionCriteria: [
      { id: "c7-1", task: "Verify Kali Linux VM, Wireshark, VS Code, and Git are operational on your machine", category: "hands-on" },
      { id: "c7-2", task: "Complete Levels 0 through 15 on OverTheWire Bandit wargame", category: "hands-on" },
      { id: "c7-3", task: "Complete all practice exercises on the AfricaHackon Linux Training Platform", category: "hands-on" },
      { id: "c7-4", task: "Pass the comprehensive 50-port networking quiz with 100% accuracy", category: "verification" },
      { id: "c7-5", task: "Participate in a squad peer-review session to resolve remaining exam blindspots", category: "verification" },
    ],
    quiz: [
      {
        question: "Which packet capture display filter in Wireshark displays all DNS queries sent to port 53?",
        options: [
          "dns.flags.response == 0",
          "tcp.port == 53 and http",
          "ip.proto == 1",
          "arp.opcode == 1",
        ],
        correctIndex: 0,
        explanation: "`dns.flags.response == 0` filters exclusively for outbound DNS query requests, whereas response == 1 filters for answers.",
      },
      {
        question: "Why should an aspiring cybersecurity professional practice the complete Git workflow (edit → add → commit → push)?",
        options: [
          "To satisfy HR compliance exclusively",
          "To maintain versioned, reproducible proof of security tooling, script automation, and documentation portfolios",
          "Because Kali Linux cannot run without Git",
          "To bypass network firewalls",
        ],
        correctIndex: 1,
        explanation: "Version control allows security engineers to version their exploits, document forensic writeups, collaborate on squad code, and demonstrate proven technical skills to employers.",
      },
    ],
  },
];
