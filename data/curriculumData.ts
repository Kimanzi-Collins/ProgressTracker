export interface PracticalLab {
  name: string;
  url: string;
  type: "Free Platform" | "Open Source Lab" | "Cloud Sandbox" | "Wargame";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

export interface ToolRunbook {
  name: string;
  category: string;
  installCommand: string;
  configNotes: string;
  troubleshootingTip?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface InteractiveChallenge {
  title: string;
  instruction: string;
  targetCommand: string;
  initialOutput: string;
  successOutput: string;
  hint: string;
}

export interface CurriculumModule {
  id: string;
  sprint: "Sprint 1: Fundamentals" | "Sprint 2: Applied Security";
  number: string;
  title: string;
  tagline: string;
  instructors: string[];
  estimatedHours: number;
  status: "Completed" | "In Progress" | "Upcoming";
  topics: string[];
  practicalLabs: PracticalLab[];
  toolsAndRunbooks: ToolRunbook[];
  quiz: QuizQuestion[];
  interactiveChallenge: InteractiveChallenge;
  notesExcerpt?: string;
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: "mod-1",
    sprint: "Sprint 1: Fundamentals",
    number: "01",
    title: "Cybersecurity Primer & CIA Triad",
    tagline: "Foundations, Threats, Defense vs Offense & Information Security Processes",
    instructors: ["Fraiser Kilonzo", "Samuel Mutuku"],
    estimatedHours: 8,
    status: "Completed",
    topics: [
      "Introduction & Evolution of Cyber Security",
      "The CIA Triad: Confidentiality, Integrity, Availability mapping to real incidents",
      "Cybersecurity Threats, Threat Actors & Attack Surfaces",
      "Blue, Red & Purple Teams: Roles, responsibilities & collaboration workflows",
      "Legal and Ethical Readiness: Rules of engagement and responsible disclosure",
    ],
    practicalLabs: [
      {
        name: "Cisco Junior Cybersecurity Analyst",
        url: "https://www.netacad.com/courses/introduction-to-cybersecurity",
        type: "Free Platform",
        difficulty: "Beginner",
        description: "Official foundational course recognized across industry for core concepts and threat taxonomies.",
      },
      {
        name: "TryHackMe: Pre-Security Path",
        url: "https://tryhackme.com/path/outline/presecurity",
        type: "Free Platform",
        difficulty: "Beginner",
        description: "Interactive browser-based walkthroughs on networking, web basics, and fundamental defense.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Git & GitHub CLI",
        category: "Version Control",
        installCommand: "sudo apt update && sudo apt install git -y\ngit config --global user.name 'YourHandle'\ngit config --global user.email 'your@email.com'",
        configNotes: "Keep your notes, command cheatsheets, and lab writeups version controlled.",
      },
    ],
    quiz: [
      {
        id: "q-1-1",
        question: "A company’s customer database was altered by a malicious insider without authorization, changing bank account numbers. Which pillar of the CIA triad was directly violated?",
        options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation only"],
        correctAnswer: 1,
        explanation: "Integrity ensures data is accurate, authentic, and protected against unauthorized modification or deletion.",
      },
      {
        id: "q-1-2",
        question: "What is the primary operational distinction between a Red Team and a Blue Team?",
        options: [
          "Red Team builds software; Blue Team tests hardware",
          "Red Team simulates adversary attacks to test defense; Blue Team monitors, detects, and defends the environment",
          "Red Team handles compliance; Blue Team manages firewalls",
          "There is no difference; they are interchangeable terms",
        ],
        correctAnswer: 1,
        explanation: "Red Team acts as the adversarial attack force, while Blue Team operates defensive controls and incident response.",
      },
    ],
    interactiveChallenge: {
      title: "Hash Integrity Verification",
      instruction: "Verify the integrity of a downloaded payload file by computing its SHA256 checksum.",
      targetCommand: "sha256sum payload.bin",
      initialOutput: "user@kali:~$ ls -la\n-rw-r--r-- 1 user user 4096 Oct 24 10:00 payload.bin\nType the command to compute its SHA-256 hash:",
      successOutput: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  payload.bin\n[+] Integrity hash computed successfully! Matches trusted release vendor sign.",
      hint: "Use the utility sha256sum followed by the filename.",
    },
    notesExcerpt: "Core Principle from Repo: Always operate legally with explicit authorization. Build deep fundamentals before advanced exploitation. Practice consistently and document everything.",
  },
  {
    id: "mod-2",
    sprint: "Sprint 1: Fundamentals",
    number: "02",
    title: "Linux Fundamentals & OverTheWire Bandit",
    tagline: "CLI Mastery, File Hierarchy, User Permissions & SSH Wargaming",
    instructors: ["Alvin Mwambi", "Nyambura Njoroge", "Stacy Alwanga"],
    estimatedHours: 12,
    status: "Completed",
    topics: [
      "Linux File System Hierarchy (FHS): /etc, /var, /dev, /proc, /tmp",
      "Permissions & Ownership: chmod, chown, SUID/SGID bits and sticky bit exploits",
      "Pipes, Redirection and Text Processing: grep, awk, sed, cut, sort, uniq, tr",
      "Process Management: ps, top, htop, systemctl, crontab",
      "OverTheWire Bandit: Levels 0 to 20 wargames and flag hunting",
    ],
    practicalLabs: [
      {
        name: "OverTheWire Bandit Wargame",
        url: "https://overthewire.org/wargames/bandit/",
        type: "Wargame",
        difficulty: "Beginner",
        description: "The gold standard wargame for learning Linux CLI, SSH tunneling, base64 decoding, and privilege tricks.",
      },
      {
        name: "AfricaHackon Linux Labs",
        url: "https://learnlinux.africahackon.com/",
        type: "Free Platform",
        difficulty: "Beginner",
        description: "Official interactive Linux practice labs built by AfricaHackon Academy mentors.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "WSL2 + Kali Linux Setup",
        category: "Operating System",
        installCommand: "wsl --install -d kali-linux\n# Inside Kali terminal:\nsudo apt update && sudo apt install -y kali-linux-default",
        configNotes: "For Windows users, WSL2 gives near-native Linux performance with seamless Windows file interoperability.",
        troubleshootingTip: "If virtualization errors occur, enable Intel VT-x or AMD-V in your motherboard BIOS.",
      },
    ],
    quiz: [
      {
        id: "q-2-1",
        question: "Which chmod notation sets permissions to Read/Write/Execute for owner, Read/Execute for group, and Read-only for others?",
        options: ["chmod 754 file", "chmod 751 file", "chmod 644 file", "chmod 777 file"],
        correctAnswer: 0,
        explanation: "7 = rwx (4+2+1), 5 = r-x (4+0+1), 4 = r-- (4+0+0). Thus 754 matches the requirement perfectly.",
      },
      {
        id: "q-2-2",
        question: "In OverTheWire Bandit, which command finds files owned by user 'bandit7' and group 'bandit6' of size 33 bytes?",
        options: [
          "find / -user bandit7 -group bandit6 -size 33c 2>/dev/null",
          "grep -r 'bandit7' /var/log",
          "locate bandit7 --group bandit6",
          "cat /etc/passwd | grep 33",
        ],
        correctAnswer: 0,
        explanation: "find with `-user`, `-group`, and `-size 33c` (c = bytes) while suppressing permission denied errors (`2>/dev/null`) isolates the exact flag file.",
      },
    ],
    interactiveChallenge: {
      title: "Find SUID Binaries",
      instruction: "Find all binaries on the system that have the SUID bit set, discarding stderr errors.",
      targetCommand: "find / -perm -u=s -type f 2>/dev/null",
      initialOutput: "user@kali:~$ Ready to search for SUID privilege escalation candidates.\nType the command:",
      successOutput: "/usr/bin/passwd\n/usr/bin/pkexec\n/usr/bin/sudo\n/usr/bin/chfn\n/usr/bin/gpasswd\n[+] SUID search complete! Potential privilege escalation vectors enumerated.",
      hint: "Use find / -perm -u=s -type f 2>/dev/null",
    },
    notesExcerpt: "From Gh0stNode Bash Notes: Make scripts executable with chmod +x. Always quote variables `\"$LOG_FILE\"` to prevent whitespace splitting.",
  },
  {
    id: "mod-3",
    sprint: "Sprint 1: Fundamentals",
    number: "03",
    title: "Networking Fundamentals & Packet Inspection",
    tagline: "OSI/TCP-IP Models, CIDR Subnetting, Wireshark PCAPs & Routing",
    instructors: ["Stacy Alwanga", "Samuel Mutuku"],
    estimatedHours: 14,
    status: "Completed",
    topics: [
      "OSI 7 Layers vs TCP/IP 4 Layers: Encapsulation and decapsulation",
      "IPv4 Addressing, Subnetting, VLSM and CIDR math (/24, /27, /30)",
      "Core Network Services: DNS resolution tree, DHCP 4-way handshake, ARP and ICMP",
      "Routing & Switching Fundamentals: VLANs, Default Gateways, NAT traversal",
      "Packet Captures: Wireshark display filters and HTTP stream reconstruction",
    ],
    practicalLabs: [
      {
        name: "TryHackMe: Networking Core",
        url: "https://tryhackme.com/module/network-fundamentals",
        type: "Free Platform",
        difficulty: "Beginner",
        description: "Hands-on virtual rooms covering subnets, nmap discovery, and packet inspection.",
      },
      {
        name: "Wireshark Sample Captures",
        url: "https://wiki.wireshark.org/SampleCaptures",
        type: "Open Source Lab",
        difficulty: "Intermediate",
        description: "Analyze real malware traffic, cleartext credentials in HTTP, and SYN flood DoS attacks.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Wireshark & Tshark",
        category: "Packet Analysis",
        installCommand: "sudo apt update && sudo apt install -y wireshark tshark\nsudo usermod -aG wireshark $USER",
        configNotes: "Log out and back in after adding your user to the wireshark group to allow non-root packet captures.",
      },
    ],
    quiz: [
      {
        id: "q-3-1",
        question: "How many usable host IP addresses are available in a /28 IPv4 subnet?",
        options: ["14", "16", "30", "12"],
        correctAnswer: 0,
        explanation: "A /28 subnet has 32 - 28 = 4 host bits. 2^4 = 16 total addresses. Subtract 2 (network ID and broadcast address) = 14 usable hosts.",
      },
      {
        id: "q-3-2",
        question: "In Wireshark, which display filter isolates HTTP POST requests to find credential submissions?",
        options: ["http.request.method == \"POST\"", "tcp.port == 80 and post", "ip.proto == 6 && post", "http.data.contains(login)"],
        correctAnswer: 0,
        explanation: "`http.request.method == \"POST\"` filters the capture for all HTTP POST transactions.",
      },
    ],
    interactiveChallenge: {
      title: "Wireshark Display Filter",
      instruction: "Filter network traffic specifically for DNS queries or HTTP traffic on port 80.",
      targetCommand: "dns or http",
      initialOutput: "wireshark> Enter display filter syntax to isolate DNS or HTTP:",
      successOutput: "[+] Filter applied: displaying 142 packets matching (dns or http). Cleartext web requests and domain lookups visible.",
      hint: "Type: dns or http",
    },
    notesExcerpt: "From Repo Notes: HTTPS (Port 443) encrypts the payload via TLS handshake; URL components include Scheme, Host, Port, Path, Query String, and Fragment.",
  },
  {
    id: "mod-4",
    sprint: "Sprint 1: Fundamentals",
    number: "04",
    title: "Reconnaissance & OSINT",
    tagline: "Passive & Active Intelligence, Google Dorking, Subdomain Enumeration",
    instructors: ["Eric Muthengia", "Lena Ndanu", "Dr. Bright Gameli"],
    estimatedHours: 10,
    status: "Completed",
    topics: [
      "OSINT Methodology: Passive reconnaissance vs Active scanning",
      "Advanced Google Dorking: `filetype:env`, `site:target.com -www`, `intitle:\"index of\"`",
      "DNS Reconnaissance: Zone transfers (AXFR), WHOIS lookups, certificate transparency logs (crt.sh)",
      "Subdomain Enumeration: Sublist3r, Amass, assetfinder, subfinder",
      "Service & Port Scanning: Nmap timing templates (-T4), SYN stealth scan (-sS), service banners (-sV)",
    ],
    practicalLabs: [
      {
        name: "crt.sh Certificate Search",
        url: "https://crt.sh",
        type: "Free Platform",
        difficulty: "Beginner",
        description: "Query SSL/TLS certificate transparency logs to find forgotten subdomains and staging servers.",
      },
      {
        name: "TryHackMe: Passive Reconnaissance",
        url: "https://tryhackme.com/room/passiverecon",
        type: "Free Platform",
        difficulty: "Beginner",
        description: "Practice real-world OSINT techniques without sending a single packet to the target host.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Reconnaissance Toolkit (Subfinder, Amass, Nmap)",
        category: "Recon Tools",
        installCommand: "sudo apt update && sudo apt install -y nmap whois dnsutils sublist3r\n# Golang subfinder:\ngo install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest",
        configNotes: "Run passive reconnaissance before any active port scan to avoid triggering perimeter SOC alarms.",
      },
    ],
    quiz: [
      {
        id: "q-4-1",
        question: "Which Google Dork operator restricts results to a specific file format such as exposed environment variable configs?",
        options: ["format:env", "filetype:env", "ext:text", "mime:dotenv"],
        correctAnswer: 1,
        explanation: "`filetype:env` or `filetype:pdf` instructs Google's crawler index to only return files with that file extension.",
      },
      {
        id: "q-4-2",
        question: "What is the primary advantage of an Nmap TCP SYN scan (-sS) over a full TCP Connect scan (-sT)?",
        options: [
          "It never completes the 3-way handshake (sending RST after SYN-ACK), making it stealthier and faster",
          "It can bypass stateful firewalls automatically",
          "It resolves hostnames without DNS queries",
          "It works without root/sudo privileges",
        ],
        correctAnswer: 0,
        explanation: "SYN scanning sends a SYN and tears down the connection with RST upon receiving SYN-ACK, preventing standard application-level logging.",
      },
    ],
    interactiveChallenge: {
      title: "Stealth SYN Port Scan",
      instruction: "Run an Nmap stealth SYN scan on target 10.10.10.50 checking ports 80, 443, and 8080 with service version detection.",
      targetCommand: "nmap -sS -sV -p 80,443,8080 10.10.10.50",
      initialOutput: "user@kali:~$ Ready to scan target 10.10.10.50\nType the Nmap command:",
      successOutput: "PORT     STATE SERVICE VERSION\n80/tcp   open  http    Apache httpd 2.4.41\n443/tcp  open  ssl/http Apache httpd 2.4.41\n8080/tcp open  http    Apache Tomcat 9.0.31\n[+] Scan completed: 3 open services discovered with version banners.",
      hint: "Use nmap -sS -sV -p 80,443,8080 10.10.10.50",
    },
  },
  {
    id: "mod-5",
    sprint: "Sprint 1: Fundamentals",
    number: "05",
    title: "Windows Fundamentals & Active Directory Exploitation",
    tagline: "Active Directory Architecture, Domain Enumeration, LPE & DLL Hijacking",
    instructors: ["Samuel Mutuku", "Bryan Trevor"],
    estimatedHours: 16,
    status: "Completed",
    topics: [
      "Windows Architecture: SAM database, LSASS process, Registry hives, UAC mechanics",
      "Active Directory Core: Domain Controllers, Kerberos authentication (TGT/TGS), LDAP, Group Policies (GPO)",
      "Local Privilege Escalation (LPE): Unquoted service paths, AlwaysInstallElevated, Token Impersonation (PrintSpoofer)",
      "DLL Search Order Hijacking: Weaponizing missing DLLs in application execution paths",
      "Remote Exploitation: Metasploit framework with Ngrok port forwarding",
    ],
    practicalLabs: [
      {
        name: "TryHackMe: Active Directory Basics",
        url: "https://tryhackme.com/room/activedirectorybasics",
        type: "Free Platform",
        difficulty: "Intermediate",
        description: "Simulated Windows AD environment to practice bloodhound, user enum, and Kerberoasting.",
      },
      {
        name: "OffSec: Metasploit Unleashed",
        url: "https://www.offsec.com/metasploit-unleashed/",
        type: "Free Platform",
        difficulty: "Intermediate",
        description: "Official comprehensive guide on payload generation with msfvenom and multi-handler listeners.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Metasploit & Ngrok Integration",
        category: "Exploitation & Tunneling",
        installCommand: "sudo apt update && sudo apt install -y metasploit-framework\n# Install Ngrok:\ncurl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null\necho 'deb https://ngrok-agent.s3.amazonaws.com buster main' | sudo tee /etc/apt/sources.list.d/ngrok.list\nsudo apt update && sudo apt install ngrok\nngrok config add-authtoken <YOUR_TOKEN>",
        configNotes: "Run `ngrok tcp 4444` then set Metasploit LHOST to the Ngrok hostname and LPORT to the assigned port.",
      },
    ],
    quiz: [
      {
        id: "q-5-1",
        question: "Why is an unquoted service path with spaces (e.g. C:\\Program Files\\My Service\\app.exe) vulnerable to privilege escalation?",
        options: [
          "Windows interprets spaces as command separators and attempts to execute C:\\Program.exe first if it exists",
          "Unquoted paths disable Windows Defender antivirus automatically",
          "It forces the service to run with Guest permissions",
          "Spaces in paths corrupt the Windows SAM registry",
        ],
        correctAnswer: 0,
        explanation: "Windows searches for executables at each space delimited boundary (C:\\Program.exe, then C:\\Program Files\\My.exe) before reaching the full target, allowing malicious binary planting.",
      },
      {
        id: "q-5-2",
        question: "What Kerberos ticket is requested from the Key Distribution Center (KDC) to authenticate against a specific service?",
        options: ["TGS (Ticket Granting Service)", "TGT (Ticket Granting Ticket)", "SAM Hash", "Kerberos Golden Certificate"],
        correctAnswer: 0,
        explanation: "A client presents its TGT to the KDC to receive a TGS (Ticket Granting Service) ticket for a designated service SPN.",
      },
    ],
    interactiveChallenge: {
      title: "Active Directory User Query",
      instruction: "Use PowerShell commandlet to enumerate all active domain user accounts in Active Directory.",
      targetCommand: "Get-ADUser -Filter *",
      initialOutput: "PS C:\\Users\\Admin> Query AD domain user database:",
      successOutput: "DistinguishedName : CN=Administrator,CN=Users,DC=corp,DC=local\nEnabled           : True\nName              : Administrator\n\nDistinguishedName : CN=Beth Nyambura,CN=Users,DC=corp,DC=local\nEnabled           : True\nName              : Beth Nyambura\n[+] Enumerated 42 active domain accounts.",
      hint: "Type: Get-ADUser -Filter *",
    },
  },
  {
    id: "mod-6",
    sprint: "Sprint 1: Fundamentals",
    number: "06",
    title: "Network Security & Wireless Auditing",
    tagline: "Wireshark, Snort IDS/IPS Rules, 802.11 Monitor Mode & WPA2 Handshakes",
    instructors: ["Stacy Alwanga", "Samuel Mutuku"],
    estimatedHours: 12,
    status: "Completed",
    topics: [
      "Intrusion Detection & Prevention (IDS/IPS): Snort rule structure (alert tcp any any -> ...)",
      "Wireless Architecture: 802.11 standards, Beacons, SSIDs, BSSIDs, and Channels",
      "Monitor Mode & Packet Injection: Airmon-ng, Airodump-ng, Aireplay-ng",
      "WPA/WPA2 4-Way Handshake Capture: Deauthentication attacks and PMKID extraction",
      "Compatible Wireless Adapters: TP-Link TL-WN722N, TL-WN725N, TL-WN823N chipset setups",
    ],
    practicalLabs: [
      {
        name: "Snort Interactive Sandbox",
        url: "https://snort.org/",
        type: "Open Source Lab",
        difficulty: "Intermediate",
        description: "Write and validate custom Snort rules against live PCAP attack traffic.",
      },
      {
        name: "TryHackMe: Snort Room",
        url: "https://tryhackme.com/room/snort",
        type: "Free Platform",
        difficulty: "Intermediate",
        description: "Hands-on guided walkthrough configuring snort.conf and triggering intrusion alerts.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Aircrack-ng Suite & Monitor Mode Setup",
        category: "Wireless Pentest",
        installCommand: "sudo apt update && sudo apt install -y aircrack-ng wireless-tools\n# Check wireless adapter name:\nsudo airmon-ng\n# Enable monitor mode:\nsudo airmon-ng start wlan0",
        configNotes: "Compatible Wi-Fi Dongles recommended by AfricaHackon: TP-Link TL-WN722N (v1 preferred), TL-WN725N, TL-WN823N.",
        troubleshootingTip: "Kill interfering network manager processes with `sudo airmon-ng check kill` before starting monitor mode.",
      },
    ],
    quiz: [
      {
        id: "q-6-1",
        question: "Which component of the WPA/WPA2 4-way handshake must be captured to attempt an offline dictionary crack of the Pre-Shared Key (PSK)?",
        options: ["EAPOL packets (Messages 1 through 4)", "Only the broadcast Beacon Frame", "An ARP request", "A DNS response packet"],
        correctAnswer: 0,
        explanation: "The EAPOL (Extensible Authentication Protocol over LAN) 4-way handshake exchanges nonces from which the PMK and PTK can be verified offline.",
      },
    ],
    interactiveChallenge: {
      title: "Write a Snort Alert Rule",
      instruction: "Write a Snort rule that alerts on inbound TCP traffic to any server on port 21 (FTP) with msg 'FTP Connection Detected'.",
      targetCommand: "alert tcp any any -> any 21 (msg:\"FTP Connection Detected\"; sid:1000001;)",
      initialOutput: "snort.rules> Define signature for FTP connection attempt:",
      successOutput: "[+] Snort rule validated!\nRule: alert tcp any any -> any 21 (msg:\"FTP Connection Detected\"; sid:1000001;)\n[+] Traffic triggers alert successfully.",
      hint: "alert tcp any any -> any 21 (msg:\"FTP Connection Detected\"; sid:1000001;)",
    },
  },
  {
    id: "mod-7",
    sprint: "Sprint 1: Fundamentals",
    number: "07",
    title: "Coding Essentials, Scripting & MySQL Integration",
    tagline: "Bash CLI Automation, Python Socket Programming, Log Parsing & MySQL DB",
    instructors: ["Alvin Mwambi", "James Reed"],
    estimatedHours: 16,
    status: "Completed",
    topics: [
      "Bash Scripting: Variables, CLI arguments, loops, ANSI color coding, error trapping",
      "Python for Hackers: Requests library, socket connections, regex pattern extraction, argparse",
      "Database Integration: MySQL schemas, Python mysql-connector, prepared statements vs SQL injection",
      "Log Analysis Automation: Scripting custom parsers to filter malicious IPs from Apache/Nginx logs",
      "Elliot CLI Toolkit: Modular automation flows built by squad lead Gh0stNode",
    ],
    practicalLabs: [
      {
        name: "AfricaHackon Scripting Practicals",
        url: "https://github.com/Kimanzi-Collins/Cybersecurity",
        type: "Open Source Lab",
        difficulty: "Intermediate",
        description: "Analyze 5 enterprise breach logs (Meridian, Vantage, Kestrel, Bazario, Solstice) using custom scripts.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Python 3 & MySQL Dev Environment",
        category: "Scripting & DB",
        installCommand: "sudo apt update && sudo apt install -y python3 python3-pip python3-venv default-mysql-server\npip install requests beautifulsoup4 mysql-connector-python scapy",
        configNotes: "Always create virtual environments (`python3 -m venv venv`) when building custom exploit scripts.",
      },
    ],
    quiz: [
      {
        id: "q-7-1",
        question: "In Bash scripting, what does the variable `$#` evaluate to?",
        options: [
          "The number of positional arguments passed to the script",
          "The exit status of the last executed command",
          "The Process ID (PID) of the current shell",
          "The filename of the script itself",
        ],
        correctAnswer: 0,
        explanation: "`$#` stores the total count of command-line arguments passed to the script, while `$?` stores the exit status and `$$` stores the PID.",
      },
    ],
    interactiveChallenge: {
      title: "Bash Script Argument Validator",
      instruction: "Check if arguments were passed to a bash script and print an error if fewer than 1 argument is provided.",
      targetCommand: "if [ $# -lt 1 ]; then echo \"Usage: $0 <target_ip>\"; exit 1; fi",
      initialOutput: "bash$ Enter condition to verify at least 1 CLI argument is provided:",
      successOutput: "[+] Argument validator accepted! Script exits safely when arguments are missing.",
      hint: "if [ $# -lt 1 ]; then echo \"Usage: $0 <target_ip>\"; exit 1; fi",
    },
    notesExcerpt: "From Gh0stNode Bash Sheet: Use here-documents for ASCII banners; use printf \"\\r[%-20s] %d%%\" for fluid console progress bars.",
  },
  {
    id: "mod-8",
    sprint: "Sprint 2: Applied Security",
    number: "08",
    title: "Web & API Security (OWASP Top 10)",
    tagline: "Burp Suite Interception, OWASP Top 10, crAPI Labs, Broken Object Level Auth",
    instructors: ["Eric Muthengia", "Alvin Mwambi", "Samuel Mutuku"],
    estimatedHours: 20,
    status: "Completed",
    topics: [
      "OWASP Top 10 (2021) & OWASP API Security Top 10 (2023): BOLA, BOPLA, Mass Assignment",
      "Proxy Setup: Burp Suite Community/Pro, FoxyProxy Firefox extension, CA Certificate installation",
      "Injection Vulnerabilities: SQLi (In-band, Error, Blind, Time-based), Cross-Site Scripting (XSS)",
      "Authentication & Session Flaws: JWT tampering (none algorithm, weak HMAC secret), CSRF tokens",
      "Hands-on API Lab: OWASP crAPI (Completely Ridiculous API) vulnerability walkthroughs",
    ],
    practicalLabs: [
      {
        name: "PortSwigger Web Security Academy",
        url: "https://portswigger.net/web-security",
        type: "Free Platform",
        difficulty: "Intermediate",
        description: "World-leading interactive labs covering SQLi, SSRF, XSS, and business logic flaws.",
      },
      {
        name: "OWASP crAPI (Dockerized API Lab)",
        url: "https://github.com/OWASP/crAPI",
        type: "Open Source Lab",
        difficulty: "Intermediate",
        description: "Modern microservices app with vehicle management, shop, and community forums riddled with API flaws.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Burp Suite & FoxyProxy Configuration",
        category: "Web Pentest Proxy",
        installCommand: "sudo apt update && sudo apt install -y burpsuite\n# Set browser proxy to 127.0.0.1:8080\n# Visit http://burp/cert in browser to install and trust CA certificate",
        configNotes: "Make sure to check 'Trust this CA to identify websites' when importing PortSwigger CA into Firefox.",
      },
    ],
    quiz: [
      {
        id: "q-8-1",
        question: "In API security, what does BOLA (Broken Object Level Authorization) refer to?",
        options: [
          "An attacker modifies an object identifier (e.g. `/api/v1/orders/1029` to `1030`) and accesses another user's private data because the server lacks object-level ownership checks",
          "Encrypting API payloads with base64 instead of AES",
          "Exceeding rate limits on login endpoints",
          "Using HTTP instead of HTTPS",
        ],
        correctAnswer: 0,
        explanation: "BOLA (previously known as IDOR) occurs when an endpoint accepts user-supplied identifiers without validating whether the requesting user owns that object.",
      },
    ],
    interactiveChallenge: {
      title: "SQL Injection Payload Crafting",
      instruction: "Bypass a vulnerable login query `SELECT * FROM users WHERE user='$u' AND pass='$p'` using a classic authentication bypass string.",
      targetCommand: "admin' OR '1'='1'-- -",
      initialOutput: "Login Form Input:\nUsername: [                ]\nPassword: [  dummy_pass    ]\nEnter username bypass string:",
      successOutput: "[+] Query executed: SELECT * FROM users WHERE user='admin' OR '1'='1'-- -' AND pass='dummy_pass'\n[+] AUTHENTICATION BYPASS SUCCESSFUL! Logged in as: System Administrator (UID 0).",
      hint: "admin' OR '1'='1'-- -",
    },
  },
  {
    id: "mod-9",
    sprint: "Sprint 2: Applied Security",
    number: "09",
    title: "Mobile Application Security & Reverse Engineering",
    tagline: "Android Internals, Genymotion, MobSF, JADX Decompilation & Beetlebug VulnBank",
    instructors: ["Alvin Mwambi", "Stacy Alwanga"],
    estimatedHours: 18,
    status: "Completed",
    topics: [
      "Android Architecture: AndroidManifest.xml, Intents, Activities, Content Providers, Broadcast Receivers",
      "Static Analysis (SAST): JADX-GUI, apktool decompile/rebuild, MobSF automated scans",
      "Dynamic Analysis (DAST): Genymotion virtual device, Frida script hooks, Reqable/Burp certificate pinning bypass",
      "Common Mobile Vulnerabilities: Insecure local storage (SharedPreferences, SQLite), Exported components, WebView JS injection",
      "Beetlebug Squad Assignment: Complete audit and writeup of the VulnBank Android banking app",
    ],
    practicalLabs: [
      {
        name: "OWASP MSTG / MASVS Guides",
        url: "https://mas.owasp.org/",
        type: "Free Platform",
        difficulty: "Intermediate",
        description: "The authoritative standard for mobile application security verification and test cases.",
      },
      {
        name: "VulnBank Mobile Security Lab (AfricaHackon)",
        url: "https://github.com/Kimanzi-Collins/Cybersecurity",
        type: "Open Source Lab",
        difficulty: "Intermediate",
        description: "Decompile VulnBank.apk, exploit weak deeplinks, and recover hardcoded encryption keys.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Mobile Pentest Toolkit (JADX, APKTool, MobSF)",
        category: "Mobile Reverse Eng",
        installCommand: "sudo apt update && sudo apt install -y default-jdk apktool\n# Install JADX:\nwget https://github.com/skylot/jadx/releases/download/v1.5.0/jadx-1.5.0.zip\nunzip jadx-1.5.0.zip -d /opt/jadx\n# Run MobSF via Docker:\ndocker run -it --rm -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest",
        configNotes: "Use Genymotion with Android 9/10 image for best compatibility with Frida SSL unpinning scripts.",
      },
    ],
    quiz: [
      {
        id: "q-9-1",
        question: "When auditing an AndroidManifest.xml, what risk does `android:exported=\"true\"` on an Activity pose?",
        options: [
          "Any other app installed on the device can launch this Activity directly, potentially bypassing login screens or triggering privileged actions",
          "It exposes the phone's battery level to Google",
          "It forces the app to update automatically",
          "It removes root detection from the application",
        ],
        correctAnswer: 0,
        explanation: "Exported activities can be triggered via explicit intents by any third-party malware on the device unless guarded by custom permissions.",
      },
    ],
    interactiveChallenge: {
      title: "Decompile APK with APKTool",
      instruction: "Decompile the application VulnBank.apk into the output directory 'vulnbank_src' using apktool.",
      targetCommand: "apktool d VulnBank.apk -o vulnbank_src",
      initialOutput: "user@kali:~/mobile$ ls\nVulnBank.apk\nType the apktool command:",
      successOutput: "I: Using Apktool 2.9.0 on VulnBank.apk\nI: Loading resource table...\nI: Decoding AndroidManifest.xml with resources...\nI: Regular manifest package...\nI: Decoding file-resources...\nI: Decoding values */* XMLs...\nI: Baksmaling classes.dex...\nI: Copying assets and libs...\n[+] Decompilation complete! Extracted to vulnbank_src/.",
      hint: "apktool d VulnBank.apk -o vulnbank_src",
    },
  },
  {
    id: "mod-10",
    sprint: "Sprint 2: Applied Security",
    number: "10",
    title: "Penetration Testing & Report Writing",
    tagline: "Methodology, Privilege Escalation, Mini-Reports & Executive Summaries",
    instructors: ["Fraiser Kilonzo", "Jacklyne Mbuthia"],
    estimatedHours: 16,
    status: "Completed",
    topics: [
      "Penetration Testing Execution Standard (PTES): Pre-engagement, Intelligence, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation",
      "Vulnerability Scoring: CVSS v3.1 calculation (Attack Vector, Complexity, Privileges Required, Impact)",
      "Technical vs Executive Reporting: Structuring findings for C-level leadership vs engineering teams",
      "Remediation Guidance: Actionable patches, configuration changes, and compensating controls",
      "VulnBank Professional Mini-Report: The official squad deliverable analyzing findings and risk posture",
    ],
    practicalLabs: [
      {
        name: "VulnBank Security Assessment Deliverable",
        url: "https://github.com/Kimanzi-Collins/Cybersecurity",
        type: "Open Source Lab",
        difficulty: "Intermediate",
        description: "Official professional mini-report template covering executive summary, vulnerability table, and remediation roadmaps.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "Markdown & Pandoc Report Generator",
        category: "Reporting",
        installCommand: "sudo apt update && sudo apt install -y pandoc wkhtmltopdf texlive",
        configNotes: "Compile Markdown findings into PDF reports using `pandoc report.md -o report.pdf`.",
      },
    ],
    quiz: [
      {
        id: "q-10-1",
        question: "In a professional penetration testing report, what is the main goal of the Executive Summary?",
        options: [
          "To communicate overall business risk, high-level impact, and prioritized strategic recommendations to non-technical stakeholders",
          "To list raw Nmap terminal outputs and hex dumps",
          "To explain how to configure Linux iptables rules in detail",
          "To request additional budget for new hacking tools",
        ],
        correctAnswer: 0,
        explanation: "Executives need to understand the business implications and risk priorities without getting bogged down in terminal syntax.",
      },
    ],
    interactiveChallenge: {
      title: "Calculate CVSS Base Score Severity",
      instruction: "Given a vulnerability with CVSS score 9.8 (Network, Low Complexity, None Privileges, Critical CIA impact), classify its severity rating.",
      targetCommand: "CRITICAL",
      initialOutput: "CVSS v3.1 Score: 9.8\nSeverity Rating bands: LOW (0.1-3.9), MEDIUM (4.0-6.9), HIGH (7.0-8.9), CRITICAL (9.0-10.0)\nEnter severity band:",
      successOutput: "[+] Correct! CVSS 9.8 is classified as CRITICAL. Immediate executive escalation required.",
      hint: "Type: CRITICAL",
    },
  },
  {
    id: "mod-11",
    sprint: "Sprint 2: Applied Security",
    number: "11",
    title: "Governance, Risk & Compliance (GRC) & AI Engineering",
    tagline: "Security Frameworks, ISO 27001, NIST CSF, Risk Scoring & Audit Engineering",
    instructors: ["Alex Munene", "Lena Ndanu", "Nyambura Njoroge"],
    estimatedHours: 14,
    status: "Completed",
    topics: [
      "Fundamentals of GRC: Governance structures, Risk management lifecycles, and Regulatory Compliance",
      "Industry Frameworks: NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover), ISO/IEC 27001, SOC 2",
      "Risk Assessment & Scoring: Inherent Risk vs Residual Risk, Qualitative vs Quantitative metrics",
      "Cybersecurity Audits: Evidence collection, control gap analysis, and auditor interviews",
      "GRC Engineering & AI: Automating continuous compliance monitoring with policy-as-code and LLM auditing",
    ],
    practicalLabs: [
      {
        name: "NIST Cybersecurity Framework (CSF) 2.0",
        url: "https://www.nist.gov/cyberframework",
        type: "Free Platform",
        difficulty: "Intermediate",
        description: "Official implementation tier guidelines, core functions, and control profiles.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "OpenSCAP & Compliance Checker",
        category: "Compliance Automation",
        installCommand: "sudo apt update && sudo apt install -y libopenscap8 scap-security-guide\n# Run standard Ubuntu/Debian benchmark:\noscap xccdf eval --profile standard /usr/share/xml/scap/ssg/content/ssg-debian12-ds.xml",
        configNotes: "Automates verification of OS hardening against CIS benchmarks.",
      },
    ],
    quiz: [
      {
        id: "q-11-1",
        question: "What is the key difference between Inherent Risk and Residual Risk?",
        options: [
          "Inherent risk is the risk level before any security controls are applied; residual risk is the remaining risk after controls have been implemented",
          "Inherent risk applies only to software; residual risk applies only to hardware",
          "Inherent risk is measured in dollars; residual risk is measured in days",
          "There is no difference; they are synonymous in ISO 27001",
        ],
        correctAnswer: 0,
        explanation: "Inherent risk exists naturally without mitigating measures. Residual risk is what remains after controls are in place.",
      },
    ],
    interactiveChallenge: {
      title: "Calculate Residual Risk",
      instruction: "Given an Inherent Risk score of 20 (Likelihood 4 x Impact 5) and a Control Effectiveness reduction factor of 60%, calculate the Residual Risk score.",
      targetCommand: "8",
      initialOutput: "Inherent Risk: 20\nControl Effectiveness: 60% mitigation (remaining risk is 40% of 20)\nEnter Residual Risk score:",
      successOutput: "[+] Calculated successfully: 20 * 0.40 = 8. Risk lowered from Critical to Medium.",
      hint: "Type: 8",
    },
  },
  {
    id: "mod-12",
    sprint: "Sprint 2: Applied Security",
    number: "12",
    title: "Cloud Security & Multi-Cloud Pentesting",
    tagline: "AWS & Azure Free Tiers, IAM Hardening, ScoutSuite Audits & Cloud Assurance",
    instructors: ["Albertini Francis", "Beth Mithamo", "Jacklyne Mbuthia"],
    estimatedHours: 20,
    status: "Completed",
    topics: [
      "Cloud Shared Responsibility Model: IaaS vs PaaS vs SaaS security boundaries",
      "AWS & Azure Setup: Free Tier accounts, budget alerts ($0 spend limit), billing alerts",
      "Identity & Access Management (IAM): Least privilege principle, MFA enforcement, role assumption, IAM policy JSON analysis",
      "Cloud Networking: AWS VPCs, Security Groups vs NACLs, Azure Virtual Networks, Private Link",
      "Cloud Pentesting & Assurance: ScoutSuite automated multi-cloud assessment, S3 bucket misconfigurations, Pacu framework",
      "Kenya Identity Verification Troubleshooting: Resolving AWS SMS verification code delays with Airtel vs Safaricom",
    ],
    practicalLabs: [
      {
        name: "Practical Cloud Security Guide (Orca Security)",
        url: "https://orca.security/wp-content/uploads/2021/12/pracCloudSecurity.pdf",
        type: "Free Platform",
        difficulty: "Intermediate",
        description: "Official required reading for AfricaHackon Cohort 6 covering cloud threat vectors.",
      },
      {
        name: "AWS Free Tier Hands-On Labs",
        url: "https://aws.amazon.com/free/",
        type: "Cloud Sandbox",
        difficulty: "Intermediate",
        description: "Set up isolated EC2 instances, VPC peering, and S3 bucket security policies.",
      },
      {
        name: "Azure Free Account Labs",
        url: "https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account",
        type: "Cloud Sandbox",
        difficulty: "Intermediate",
        description: "Explore Microsoft Entra ID (Azure AD), Network Security Groups, and Azure Key Vault.",
      },
    ],
    toolsAndRunbooks: [
      {
        name: "AWS CLI & ScoutSuite Multi-Cloud Auditor",
        category: "Cloud Security Tools",
        installCommand: "# Install AWS CLI:\ncurl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'\nunzip awscliv2.zip && sudo ./aws/install\n# Install ScoutSuite:\npip install scoutsuite\n# Run audit against AWS:\nscout aws --profile default",
        configNotes: "Run `aws configure` to provide your Access Key ID and Secret Access Key.",
        troubleshootingTip: "Kenya Phone Verification Tip from AfricaHackon: AWS SMS verification OTPs often fail on Safaricom numbers. Use an Airtel number for instant OTP receipt, or open an immediate AWS support ticket requesting a verification callback.",
      },
    ],
    quiz: [
      {
        id: "q-12-1",
        question: "In AWS, what is the key difference between a Security Group and a Network Access Control List (NACL)?",
        options: [
          "Security Groups are stateful and operate at the instance level; NACLs are stateless and operate at the subnet level",
          "Security Groups apply only to S3; NACLs apply only to EC2",
          "Security Groups block outbound traffic by default; NACLs allow everything",
          "There is no difference; both are identical firewall layers",
        ],
        correctAnswer: 0,
        explanation: "Security Groups are stateful (inbound allowed traffic automatically permits response traffic) at the network interface level, while NACLs evaluate inbound and outbound rules statelessly at subnet boundaries.",
      },
      {
        id: "q-12-2",
        question: "When running ScoutSuite against an AWS account, what primary artifact does it generate for your audit report?",
        options: [
          "An interactive offline HTML dashboard detailing misconfigurations, non-compliant IAM policies, and exposed storage across all regions",
          "A live reverse shell to the root AWS account",
          "A bill for cloud usage",
          "An encrypted zip file requiring AWS support keys",
        ],
        correctAnswer: 0,
        explanation: "ScoutSuite inspects the cloud environment via APIs and compiles a comprehensive offline HTML report categorizing findings by severity.",
      },
    ],
    interactiveChallenge: {
      title: "Query Cloud Identities via AWS CLI",
      instruction: "Use the AWS CLI to retrieve the currently active IAM caller identity.",
      targetCommand: "aws sts get-caller-identity",
      initialOutput: "user@kali:~$ Query AWS Security Token Service (STS) credentials:",
      successOutput: "{\n    \"UserId\": \"AIDAEXAMPLEUSERKEYID\",\n    \"Account\": \"123456789012\",\n    \"Arn\": \"arn:aws:iam::123456789012:user/Kimanzi-SquadLead\"\n}\n[+] Current IAM identity confirmed: Account ID 123456789012.",
      hint: "Type: aws sts get-caller-identity",
    },
    notesExcerpt: "Cloud Pre-Class Action Item: Ensure ScoutSuite and AWS CLI are ready. Set up budgets to guarantee $0 spend during experiments.",
  },
];
