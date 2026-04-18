"use client";

import { useEffect, useState } from "react";
import { formatNumber } from "@/lib/utils";

export function LiveCounter({ start = 1047 }: { start?: number }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const loop = () => {
      if (cancelled) return;
      const delay = 2200 + Math.random() * 4200;
      timer = setTimeout(() => {
        setCount((c) => c + (Math.random() < 0.15 ? 2 : 1));
        loop();
      }, delay);
    };
    loop();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span className="mono inline-flex items-center gap-2">
      <span className="relative inline-flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hot opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-hot" />
      </span>
      <span className="tabular-nums">{formatNumber(count)}</span>
    </span>
  );
}
