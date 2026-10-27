"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CyberThreeCoreProps {
  velocityMultiplier?: number;
  activeMemberName?: string;
}

export default function CyberThreeCore({
  velocityMultiplier = 1,
  activeMemberName = "Squad Overview",
}: CyberThreeCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const velocityRef = useRef(velocityMultiplier);

  // Keep velocityRef in sync without triggering full re-mount
  useEffect(() => {
    velocityRef.current = velocityMultiplier;
  }, [velocityMultiplier]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check WebGL support safely
    try {
      const canvasTest = document.createElement("canvas");
      const gl = canvasTest.getContext("webgl") || canvasTest.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Ambient & Key Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const rimBlue = new THREE.DirectionalLight(0x2997ff, 2.5);
    rimBlue.position.set(-4, -2, -3);
    scene.add(rimBlue);

    const rimGreen = new THREE.DirectionalLight(0x30d158, 2.0);
    rimGreen.position.set(3, -4, 2);
    scene.add(rimGreen);

    // Master Artifact Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Apple-grade Sculpted Titanium Octahedron Core
    const coreGeo = new THREE.OctahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x242832,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x0a1018,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Inner Glowing Core (Pulsing Apple Green/Cyan center)
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x30d158,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // Polished Titanium Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.015, 24, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.12;
    masterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.01, 24, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x2997ff,
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.4;
    ring2.rotation.z = Math.PI * 0.25;
    masterGroup.add(ring2);

    // 7 Satellite Nodes (Squad Members in Orbit)
    const nodeCount = 7;
    const squadNodes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x30d158,
      emissiveIntensity: 0.9,
      metalness: 0.9,
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      masterGroup.add(node);
      squadNodes.push(node);
    }

    // Touch & Pointer Dynamics with Smooth Physics Easing
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouseX = ((clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      mouseY = -(((clientY - rect.top) / (rect.height || 1)) * 2 - 1);
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Inertial spring easing
      targetRotX += (mouseX * 0.35 - targetRotX) * 0.04;
      targetRotY += (mouseY * 0.35 - targetRotY) * 0.04;

      const currentMultiplier = velocityRef.current;
      const baseSpeed = 0.3 * currentMultiplier;
      coreMesh.rotation.y += baseSpeed * delta;
      coreMesh.rotation.x = Math.sin(time * 0.4) * 0.1;

      innerMesh.rotation.y -= baseSpeed * 1.5 * delta;
      innerMesh.rotation.z += baseSpeed * 0.8 * delta;

      ring1.rotation.z += 0.15 * delta;
      ring2.rotation.z -= 0.12 * delta;

      // Position the 7 squad member orbital nodes along the ring path
      squadNodes.forEach((node, idx) => {
        const angle = time * 0.4 + (idx * Math.PI * 2) / nodeCount;
        const radius = 1.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * Math.cos(Math.PI * 0.35);
        const z = Math.sin(angle) * radius * Math.sin(Math.PI * 0.35);
        node.position.set(x, y, z);
      });

      masterGroup.rotation.y = targetRotX;
      masterGroup.rotation.x = -targetRotY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, []); // Run ONCE on mount, zero context teardowns!

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-hidden">
      {/* Apple-style Soft Atmospheric Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-tr from-apple-blue/15 via-apple-green/10 to-transparent blur-3xl" />
      </div>

      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Apple-style Frosted Status Capsule */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-6 sm:right-6 flex items-center justify-between text-[11px] font-sans px-4 py-2.5 glass-pill rounded-full border border-white/10 text-zinc-300 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-apple-green shadow-[0_0_8px_rgba(48,209,88,0.8)]" />
          <span className="font-medium text-white tracking-tight">{activeMemberName}</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-zinc-400 text-[10px]">
          <span className="hidden sm:inline text-zinc-500">MOMENTUM</span>
          <span className="text-white font-semibold">
            {(velocityMultiplier * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {!isSupported && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-center p-6">
          <div className="text-xs text-zinc-400 font-sans">
            Spatial 3D Engine: Operating in low-power mode
          </div>
        </div>
      )}
    </div>
  );
}
