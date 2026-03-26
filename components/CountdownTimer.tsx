"use client";

import { useEffect, useState } from "react";

function getNextTuesday() {
  const now = new Date();
  const day = now.getDay();
  const daysUntil = (2 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntil);
  next.setHours(9, 0, 0, 0);
  return next;
}

export default function CountdownTimer() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const diff = getNextTuesday().getTime() - Date.now();
      if (diff <= 0) return;
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Next issue in {time.d}d {time.h}h {time.m}m {time.s}s
    </div>
  );
}
