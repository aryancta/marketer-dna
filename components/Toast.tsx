"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Toast = { id: number; message: string; tone?: "default" | "success" | "warn" };

const ToastCtx = createContext<{ push: (msg: string, tone?: Toast["tone"]) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: Toast["tone"] = "default") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const t = setTimeout(() => {
      setToasts((x) => x.slice(1));
    }, 2800);
    return () => clearTimeout(t);
  }, [toasts]);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto animate-pop rounded-lg px-4 py-3 text-sm font-medium outline-brutal hard-shadow-sm",
              t.tone === "success" && "bg-lime text-ink",
              t.tone === "warn" && "bg-amber text-ink",
              (!t.tone || t.tone === "default") && "bg-ink text-bone"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
