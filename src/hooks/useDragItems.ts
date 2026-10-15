"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { AppId } from "@/lib/desk";

export type ItemId = "hd" | "cd" | "liner" | "music" | "note";

/** fx / fy are 0..1 positions inside the right-hand zone, so items can never leave it */
interface Item {
  fx: number;
  fy: number;
  z: number;
}

const INITIAL: Record<ItemId, Item> = {
  hd: { fx: 0, fy: 0, z: 1 },
  cd: { fx: 0, fy: 0.2, z: 1 },
  liner: { fx: 0, fy: 1, z: 2 },
  music: { fx: 1, fy: 0, z: 3 },
  note: { fx: 1, fy: 1, z: 4 },
};

interface Drag {
  id: ItemId;
  act?: AppId;
  sx: number;
  sy: number;
  moved: boolean;
  dx: number;
  dy: number;
  zl: number;
  zt: number;
  zw: number;
  zh: number;
  iw: number;
  ih: number;
}

/**
 * Draggable, overlapping desk items that are clamped to their parent zone.
 * A press that barely moves counts as a click and calls `onTap(act)`.
 */
export function useDragItems(onTap: (app: AppId) => void) {
  const [items, setItems] = useState(INITIAL);
  const zTop = useRef(10);
  const drag = useRef<Drag | null>(null);
  const tapRef = useRef(onTap);
  tapRef.current = onTap;

  const front = useCallback((id: ItemId) => {
    zTop.current += 1;
    const z = zTop.current;
    setItems((prev) => ({ ...prev, [id]: { ...prev[id], z } }));
  }, []);

  const startDrag = useCallback(
    (id: ItemId, e: ReactPointerEvent, act?: AppId) => {
      front(id);
      const item = (e.target as HTMLElement).closest<HTMLElement>("[data-item]");
      const zone = item?.parentElement;
      if (!item || !zone) return;
      const zr = zone.getBoundingClientRect();
      const ir = item.getBoundingClientRect();
      drag.current = {
        id,
        act,
        sx: e.clientX,
        sy: e.clientY,
        moved: false,
        dx: e.clientX - ir.left,
        dy: e.clientY - ir.top,
        zl: zr.left,
        zt: zr.top,
        zw: zr.width,
        zh: zr.height,
        iw: ir.width,
        ih: ir.height,
      };
      e.preventDefault();
    },
    [front]
  );

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 5) d.moved = true;
      const rx = d.zw - d.iw;
      const ry = d.zh - d.ih;
      const l = Math.max(0, Math.min(rx, e.clientX - d.dx - d.zl));
      const t = Math.max(0, Math.min(ry, e.clientY - d.dy - d.zt));
      setItems((prev) => ({
        ...prev,
        [d.id]: { ...prev[d.id], fx: rx > 0 ? l / rx : 0, fy: ry > 0 ? t / ry : 0 },
      }));
    };
    const up = () => {
      const d = drag.current;
      drag.current = null;
      if (d?.act && !d.moved) tapRef.current(d.act);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  /** absolute position style for an item of the given size */
  const place = (id: ItemId, w: number, h: number): CSSProperties => {
    const o = items[id];
    return {
      width: w,
      height: h,
      left: `max(0px, calc((100% - ${w}px) * ${o.fx.toFixed(4)}))`,
      top: `max(0px, calc((100% - ${h}px) * ${o.fy.toFixed(4)}))`,
      zIndex: o.z,
    };
  };

  return { place, front, startDrag };
}
