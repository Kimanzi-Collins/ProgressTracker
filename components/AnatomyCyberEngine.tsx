"use client";

import React, { useState } from "react";
import { tacticalAudio } from "./TacticalAudio";

interface LayerDetail {
  layerNum: number;
  name: string;
  pdu: string;
  header: string;
  protocols: string[];
  description: string;
}

const LAYERS: LayerDetail[] = [
  {
    layerNum: 7,
    name: "Application",
    pdu: "Data / Message",
    header: "HTTP / DNS / SSH Payload",
    protocols: ["HTTP:80", "HTTPS:443", "DNS:53", "SSH:22", "FTP:21"],
    description: "User interaction interface and service protocol payloads before transport packaging.",
  },
  {
    layerNum: 4,
    name: "Transport",
    pdu: "Segment (TCP) / Datagram (UDP)",
    header: "Source Port + Dest Port + Flags",
    protocols: ["TCP", "UDP", "SYN", "ACK", "FIN"],
    description: "End-to-end logical communication with port addressing and flow sequencing.",
  },
  {
    layerNum: 3,
    name: "Network",
    pdu: "Packet",
    header: "Source IP (192.168.1.10) + Dest IP (10.0.0.1)",
    protocols: ["IPv4", "IPv6", "ICMP", "IPsec"],
    description: "Logical host-to-host addressing, subnet segmentation, and routing table lookup.",
  },
  {
    layerNum: 2,
    name: "Data Link",
    pdu: "Frame",
    header: "Source MAC + Dest MAC + CRC Trailer",
    protocols: ["Ethernet", "802.11 Wi-Fi", "ARP"],
    description: "Physical local link addressing and frame error detection (FCS/CRC).",
  },
  {
    layerNum: 1,
    name: "Physical",
    pdu: "Bits",
    header: "01001101 01100101 01110100 01100001",
    protocols: ["Cat6 Copper UTP", "Fiber 9µm Laser", "RF 2.4/5GHz"],
    description: "Raw electrical voltages, optical pulses, and radio waveforms traversing physical media.",
  },
];

export default function AnatomyCyberEngine() {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const activeLayer = LAYERS[activeLayerIndex];

  const handleSelectLayer = (idx: number) => {
    setActiveLayerIndex(idx);
    tacticalAudio.playBlip(700 + idx * 100, 0.03);
  };

  return (
    <div className="w-full rounded-3xl bg-canvas-elevated border border-white/[0.1] p-6 sm:p-8 shadow-apple-glass relative overflow-hidden text-zinc-100">
      {/* Subtle Specular Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-apple-blue/10 via-apple-green/5 to-transparent blur-3xl pointer-events-none" />

      {/* Card Header following Anatomy guidelines */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-apple-green font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-apple-green/10 border border-apple-green/30">
            FIG 01
          </span>
          <h3 className="font-display font-semibold text-base sm:text-lg text-white tracking-tight">
            Anatomy of the Packet Encapsulation Engine
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
          <span>INSPECTION RIG: ACTIVE</span>
        </div>
      </div>

      {/* Main Interactive Anatomy Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Left: Crafted Isometric Technical Vector Rig (SVG) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <svg
            viewBox="0 0 600 420"
            className="w-full max-w-lg select-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <linearGradient id="chassisGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22232a" />
                <stop offset="100%" stopColor="#101114" />
              </linearGradient>
              <linearGradient id="metalTop" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3a3d46" />
                <stop offset="100%" stopColor="#25272e" />
              </linearGradient>
              <linearGradient id="accentGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2997ff" />
                <stop offset="100%" stopColor="#30d158" />
              </linearGradient>
            </defs>

            {/* Heavy Anodized Base Chassis & Feet */}
            <path d="M 60 280 L 300 370 L 540 280 L 300 200 Z" fill="#0c0d10" stroke="#2a2c35" strokeWidth="1.5" />
            <path d="M 60 280 L 60 300 L 300 390 L 300 370 Z" fill="#14151a" />
            <path d="M 300 370 L 300 390 L 540 300 L 540 280 Z" fill="#08090b" />

            {/* Rubber Dampening Feet */}
            <ellipse cx="90" cy="298" rx="14" ry="7" fill="#050608" />
            <ellipse cx="510" cy="298" rx="14" ry="7" fill="#050608" />
            <ellipse cx="300" cy="385" rx="18" ry="9" fill="#050608" />

            {/* Machined Aluminum Rails */}
            <line x1="160" y1="230" x2="220" y2="80" stroke="#4a4e5a" strokeWidth="3" />
            <line x1="440" y1="230" x2="380" y2="80" stroke="#4a4e5a" strokeWidth="3" />

            {/* 5 Stacked Layer Stages (Clickable & Scrubbable) */}
            {LAYERS.map((layer, idx) => {
              const yOffset = idx * 36;
              const isSelected = activeLayerIndex === idx;
              const fillTop = isSelected ? "url(#accentGlow)" : "url(#metalTop)";
              const fillLeft = isSelected ? "#1b6bb8" : "#1f2229";
              const fillRight = isSelected ? "#0f4277" : "#14161b";

              // Isometric slab points
              const topPath = `M 200 ${230 - yOffset} L 300 ${270 - yOffset} L 400 ${230 - yOffset} L 300 ${190 - yOffset} Z`;
              const leftPath = `M 200 ${230 - yOffset} L 200 ${248 - yOffset} L 300 ${288 - yOffset} L 300 ${270 - yOffset} Z`;
              const rightPath = `M 300 ${270 - yOffset} L 300 ${288 - yOffset} L 400 ${248 - yOffset} L 400 ${230 - yOffset} Z`;

              return (
                <g
                  key={layer.layerNum}
                  onClick={() => handleSelectLayer(idx)}
                  className="cursor-pointer transition-transform duration-300 group"
                  transform={isSelected ? "translate(0, -6)" : "translate(0, 0)"}
                >
                  <path d={leftPath} fill={fillLeft} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <path d={rightPath} fill={fillRight} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <path d={topPath} fill={fillTop} stroke={isSelected ? "#ffffff" : "rgba(255,255,255,0.2)"} strokeWidth={isSelected ? 1.5 : 1} />

                  {/* Layer Label on Slab Face */}
                  <text
                    x="245"
                    y={266 - yOffset}
                    fill={isSelected ? "#ffffff" : "#a1a1aa"}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    transform="rotate(18, 250, 260)"
                  >
                    L{layer.layerNum}: {layer.name.toUpperCase()}
                  </text>

                  {/* Active PDU Indicator Dot */}
                  {isSelected && (
                    <circle cx="300" cy={230 - yOffset} r="4.5" fill="#ffffff" />
                  )}
                </g>
              );
            })}

            {/* Glowing Laser Measurement Sight Line */}
            <line x1="300" y1="50" x2="300" y2="350" stroke="#30d158" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </svg>

          {/* Hint text at bottom left */}
          <div className="text-[11px] font-sans text-zinc-500 pt-2 flex items-center gap-1.5">
            <span>Click any physical slab layer to inspect packet transformation</span>
          </div>
        </div>

        {/* Right: Live Telemetry & Header Inspector (Readout) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Layer Selector Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {LAYERS.map((layer, idx) => (
              <button
                key={layer.layerNum}
                onClick={() => handleSelectLayer(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeLayerIndex === idx
                    ? "bg-white text-black shadow-sm font-bold"
                    : "bg-white/[0.05] text-zinc-400 hover:text-white"
                }`}
              >
                L{layer.layerNum}
              </button>
            ))}
          </div>

          {/* Detailed Readout Container */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
            <div>
              <span className="text-[10px] font-mono text-apple-blue uppercase tracking-wider">
                Current Stack Level
              </span>
              <h4 className="text-xl font-display font-semibold text-white mt-0.5">
                Layer {activeLayer.layerNum} — {activeLayer.name}
              </h4>
              <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
                {activeLayer.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-zinc-400">PDU Unit:</span>
                <span className="font-mono text-white font-semibold text-apple-green">
                  {activeLayer.pdu}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-400">Header Attachment:</span>
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-[11px] text-zinc-200 break-all">
                  {activeLayer.header}
                </div>
              </div>

              <div>
                <span className="text-xs text-zinc-400">Common Protocols:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeLayer.protocols.map((proto, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-2 py-0.5 rounded-full bg-white/[0.06] font-mono text-[10px] text-zinc-300"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
