import type { CSSProperties } from "react";

const cache = new Map<string, CSSProperties>();

/**
 * Turns a plain CSS declaration string into a React style object.
 * Used for one-off layout tweaks so the markup can stay readable.
 *   sx("display:flex;gap:8px") -> { display: "flex", gap: "8px" }
 */
export function sx(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;
  const out: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const rawKey = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!rawKey || !value) continue;
    const key = rawKey.startsWith("--")
      ? rawKey
      : rawKey.replace(/^-/, "").replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[key] = value;
  }
  cache.set(css, out as CSSProperties);
  return out as CSSProperties;
}
