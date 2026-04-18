"use client";

const KEYS_NS = "marketerdna_api_keys";
const RESULT_NS = "marketerdna_last_result";
const ANSWERS_NS = "marketerdna_answers";
const STATS_NS = "marketerdna_local_stats";

export type UserKeys = {
  anthropic?: string;
  umami?: string;
};

export function getUserKeys(): UserKeys {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEYS_NS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function setUserKeys(keys: UserKeys) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS_NS, JSON.stringify(keys));
}

export function clearUserKeys() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEYS_NS);
}

export type LastResult = {
  archetypeId: string;
  blurb: string;
  fingerprint: string;
  at: number;
};

export function getLastResult(): LastResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(RESULT_NS);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setLastResult(res: LastResult) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RESULT_NS, JSON.stringify(res));
}

export function getAnswers(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ANSWERS_NS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setAnswers(a: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANSWERS_NS, JSON.stringify(a));
}

export function clearAnswers() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ANSWERS_NS);
}

export function bumpLocalStat(archetypeId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STATS_NS);
    const stats: Record<string, number> = raw ? JSON.parse(raw) : {};
    stats[archetypeId] = (stats[archetypeId] ?? 0) + 1;
    window.localStorage.setItem(STATS_NS, JSON.stringify(stats));
  } catch {}
}

export function getLocalStats(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STATS_NS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
