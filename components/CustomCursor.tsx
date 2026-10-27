"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ah_custom_cursor");
    if (saved === "true") {
      setEnabled(true);
    }

    const handleCustomCursorToggle = (e: CustomEvent) => {
      setEnabled(e.detail.enabled);
    };

    window.addEventListener("toggle-cyber-cursor" as never, handleCustomCursorToggle);

    return () => {
      window.removeEventListener("toggle-cyber-cursor" as never, handleCustomCursorToggle);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("clickable"))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Reticle */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-cyber-green transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isPointer ? "scale-150 border-cyber-cyan bg-cyber-cyan/10" : "scale-100"
        } ${clicked ? "scale-90 bg-cyber-green/20" : ""}`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyber-green rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      />
    </div>
  );
}
