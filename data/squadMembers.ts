export interface SquadMember {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  currentStreak: number;
  longestStreak: number;
  totalTasksCompleted: number;
  lastActive: string;
  badge: string;
  weaknessScores: {
    linuxScripting: number; // 0-100
    networkingPackets: number;
    windowsAD: number;
    webAppSec: number;
    mobileAppSec: number;
    cloudSec: number;
    grcReporting: number;
  };
  recommendedFocus: string[];
  completedTasks: string[]; // task IDs
}

export const INITIAL_SQUAD_MEMBERS: SquadMember[] = [
  {
    id: "mem-1",
    name: "Collins Kimanzi",
    handle: "Gh0stNode",
    role: "Squad Lead // Red Team & Scripting",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    currentStreak: 19,
    longestStreak: 24,
    totalTasksCompleted: 42,
    lastActive: "Just now",
    badge: "Vanguard Lead",
    weaknessScores: {
      linuxScripting: 92,
      networkingPackets: 85,
      windowsAD: 78,
      webAppSec: 88,
      mobileAppSec: 72,
      cloudSec: 70,
      grcReporting: 84,
    },
    recommendedFocus: ["AWS IAM Policy Auditing", "Genymotion Mobile Deeplink Patching"],
    completedTasks: ["task-c1-1", "task-c1-2", "task-c2-1", "task-c3-1", "task-c4-1", "task-c5-1", "task-c7-1", "task-c8-1"],
  },
  {
    id: "mem-2",
    name: "Kestrel Brian",
    handle: "KestrelSec",
    role: "Cloud Security Specialist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    currentStreak: 14,
    longestStreak: 18,
    totalTasksCompleted: 35,
    lastActive: "2 hours ago",
    badge: "Cloud Sentinel",
    weaknessScores: {
      linuxScripting: 74,
      networkingPackets: 80,
      windowsAD: 65,
      webAppSec: 82,
      mobileAppSec: 58,
      cloudSec: 94,
      grcReporting: 79,
    },
    recommendedFocus: ["Mobile Static Analysis with MobSF", "Active Directory DLL Hijacking"],
    completedTasks: ["task-c1-1", "task-c2-1", "task-c3-1", "task-c12-1", "task-c12-2"],
  },
  {
    id: "mem-3",
    name: "Faith Alwanga",
    handle: "ViperNet",
    role: "AppSec & Exploitation",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    currentStreak: 16,
    longestStreak: 21,
    totalTasksCompleted: 38,
    lastActive: "1 hour ago",
    badge: "Exploit Specialist",
    weaknessScores: {
      linuxScripting: 88,
      networkingPackets: 82,
      windowsAD: 70,
      webAppSec: 96,
      mobileAppSec: 84,
      cloudSec: 62,
      grcReporting: 75,
    },
    recommendedFocus: ["AWS CLI Resource Budgeting", "ScoutSuite Multi-Cloud Audits"],
    completedTasks: ["task-c1-1", "task-c8-1", "task-c8-2", "task-c9-1"],
  },
  {
    id: "mem-4",
    name: "Trevor Trevor",
    handle: "CipherByte",
    role: "Reverse Engineering & Mobile",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    currentStreak: 11,
    longestStreak: 15,
    totalTasksCompleted: 31,
    lastActive: "4 hours ago",
    badge: "Binary Breaker",
    weaknessScores: {
      linuxScripting: 81,
      networkingPackets: 73,
      windowsAD: 85,
      webAppSec: 76,
      mobileAppSec: 92,
      cloudSec: 54,
      grcReporting: 68,
    },
    recommendedFocus: ["GRC Risk Scoring Frameworks", "AWS IAM Verification via Kenya SMS"],
    completedTasks: ["task-c1-1", "task-c5-1", "task-c9-1", "task-c9-2"],
  },
  {
    id: "mem-5",
    name: "Brenda Lena",
    handle: "AegisShield",
    role: "GRC & Security Assurance",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    currentStreak: 18,
    longestStreak: 22,
    totalTasksCompleted: 40,
    lastActive: "30 mins ago",
    badge: "Audit Architect",
    weaknessScores: {
      linuxScripting: 68,
      networkingPackets: 75,
      windowsAD: 72,
      webAppSec: 74,
      mobileAppSec: 60,
      cloudSec: 78,
      grcReporting: 98,
    },
    recommendedFocus: ["OverTheWire Bandit L10-20", "Burp Suite API Token Interception"],
    completedTasks: ["task-c1-1", "task-c10-1", "task-c11-1", "task-c11-2"],
  },
  {
    id: "mem-6",
    name: "Joseph Alex",
    handle: "ShadowTrace",
    role: "Blue Team & Packet Forensics",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80",
    currentStreak: 12,
    longestStreak: 19,
    totalTasksCompleted: 33,
    lastActive: "5 hours ago",
    badge: "Traffic Hunter",
    weaknessScores: {
      linuxScripting: 77,
      networkingPackets: 95,
      windowsAD: 73,
      webAppSec: 70,
      mobileAppSec: 64,
      cloudSec: 68,
      grcReporting: 76,
    },
    recommendedFocus: ["Android WebView JS Injection", "ScoutSuite Cloud Compliance"],
    completedTasks: ["task-c1-1", "task-c3-1", "task-c6-1", "task-c6-2"],
  },
  {
    id: "mem-7",
    name: "Nyambura Beth",
    handle: "NexusZero",
    role: "Automation & Threat Intelligence",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    currentStreak: 15,
    longestStreak: 20,
    totalTasksCompleted: 36,
    lastActive: "3 hours ago",
    badge: "Script Engine",
    weaknessScores: {
      linuxScripting: 94,
      networkingPackets: 78,
      windowsAD: 69,
      webAppSec: 81,
      mobileAppSec: 66,
      cloudSec: 75,
      grcReporting: 82,
    },
    recommendedFocus: ["Windows Active Directory Kerberoasting", "Genymotion Root Bypassing"],
    completedTasks: ["task-c1-1", "task-c7-1", "task-c7-2"],
  },
];
