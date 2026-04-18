"use client";

import { useToast } from "@/components/Toast";

export function LeaderboardShareButton({ top, percent }: { top: string; percent: number }) {
  const toast = useToast();
  const caption = `${percent.toFixed(1)}% of marketers are ${top} right now. That's either hilarious or worrying. Take Marketer DNA →`;
  async function go() {
    try {
      await navigator.clipboard.writeText(caption);
      toast.push("Stat copied to clipboard", "success");
    } catch {
      toast.push("Couldn't copy, long-press to grab the stat", "warn");
    }
  }
  return (
    <button
      onClick={go}
      className="rounded-lg border-2 border-ink bg-bone px-4 py-2 text-sm font-semibold hover:-translate-y-0.5 hard-shadow-sm"
    >
      Copy shareable stat
    </button>
  );
}
