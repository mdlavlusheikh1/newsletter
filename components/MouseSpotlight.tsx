"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[3] pointer-events-none"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(37,99,235,0.10), transparent 80%)`,
      }}
    />
  );
}
