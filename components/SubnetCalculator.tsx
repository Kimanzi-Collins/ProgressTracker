"use client";

import React, { useState } from "react";
import { tacticalAudio } from "./TacticalAudio";
import { Calculator, Check, ArrowRight } from "lucide-react";

export default function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.10.45");
  const [cidr, setCidr] = useState(27);

  // Calculate subnet parameters
  const hostBits = 32 - cidr;
  const totalAddresses = Math.pow(2, hostBits);
  const usableHosts = Math.max(0, totalAddresses - 2);

  // Subnet mask calculation
  const maskInt = (0xffffffff << hostBits) >>> 0;
  const maskParts = [
    (maskInt >>> 24) & 255,
    (maskInt >>> 16) & 255,
    (maskInt >>> 8) & 255,
    maskInt & 255,
  ];
  const subnetMask = maskParts.join(".");

  // IP parsing
  const ipParts = ip.split(".").map(Number);
  const isValidIp = ipParts.length === 4 && ipParts.every((p) => !isNaN(p) && p >= 0 && p <= 255);

  let networkIp = "Invalid IP";
  let broadcastIp = "Invalid IP";
  let firstHost = "Invalid IP";
  let lastHost = "Invalid IP";

  if (isValidIp) {
    const ipInt =
      ((ipParts[0] << 24) >>> 0) +
      ((ipParts[1] << 16) >>> 0) +
      ((ipParts[2] << 8) >>> 0) +
      (ipParts[3] >>> 0);

    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;

    networkIp = [
      (netInt >>> 24) & 255,
      (netInt >>> 16) & 255,
      (netInt >>> 8) & 255,
      netInt & 255,
    ].join(".");

    broadcastIp = [
      (bcastInt >>> 24) & 255,
      (bcastInt >>> 16) & 255,
      (bcastInt >>> 8) & 255,
      bcastInt & 255,
    ].join(".");

    if (usableHosts > 0) {
      firstHost = [
        (netInt >>> 24) & 255,
        (netInt >>> 16) & 255,
        (netInt >>> 8) & 255,
        (netInt & 255) + 1,
      ].join(".");

      lastHost = [
        (bcastInt >>> 24) & 255,
        (bcastInt >>> 16) & 255,
        (bcastInt >>> 8) & 255,
        (bcastInt & 255) - 1,
      ].join(".");
    } else {
      firstHost = "N/A";
      lastHost = "N/A";
    }
  }

  return (
    <div className="p-6 rounded-3xl bg-canvas-elevated border border-white/[0.08] space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-apple-teal font-semibold uppercase tracking-wider">
            Practical Network Tool
          </span>
          <h3 className="text-xl font-display font-semibold text-white mt-0.5">
            CIDR & VLSM Subnet Calculator
          </h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-apple-teal/10 border border-apple-teal/20 flex items-center justify-center text-apple-teal">
          <Calculator className="w-5 h-5" />
        </div>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 space-y-1.5">
          <label className="text-xs font-sans text-zinc-400">IPv4 Target Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => {
              setIp(e.target.value);
              tacticalAudio.playTerminalKey();
            }}
            placeholder="192.168.1.1"
            className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-sm font-mono text-white outline-none focus:border-apple-teal transition-colors"
          />
        </div>

        <div className="sm:col-span-4 space-y-1.5">
          <label className="text-xs font-sans text-zinc-400">Prefix (/CIDR)</label>
          <select
            value={cidr}
            onChange={(e) => {
              setCidr(Number(e.target.value));
              tacticalAudio.playBlip(800, 0.02);
            }}
            className="w-full px-4 py-2.5 rounded-2xl bg-canvas border border-white/[0.1] text-sm font-mono text-white outline-none focus:border-apple-teal transition-colors"
          >
            {[8, 12, 16, 20, 24, 25, 26, 27, 28, 29, 30].map((c) => (
              <option key={c} value={c}>
                /{c} ({Math.pow(2, 32 - c) - 2} hosts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Output Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Subnet Mask</span>
          <div className="text-xs sm:text-sm font-mono font-semibold text-white break-all">
            {subnetMask}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Usable Hosts</span>
          <div className="text-xs sm:text-sm font-mono font-semibold text-apple-green">
            {usableHosts} hosts
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Network ID</span>
          <div className="text-xs sm:text-sm font-mono font-semibold text-apple-blue break-all">
            {networkIp}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Broadcast Address</span>
          <div className="text-xs sm:text-sm font-mono font-semibold text-apple-orange break-all">
            {broadcastIp}
          </div>
        </div>
      </div>

      {/* Usable Host Range */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        <span className="text-zinc-400">Usable Range:</span>
        <span className="text-white font-semibold">
          {firstHost} <span className="text-zinc-500">→</span> {lastHost}
        </span>
      </div>
    </div>
  );
}
