"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppId } from "@/lib/desk";
import { useChiptune } from "@/hooks/useChiptune";
import FileIcons from "./FileIcons";
import Nav from "./Nav";
import Monitor from "./Monitor";
import DeskWidgets from "./DeskWidgets";

function formatClock(d: Date) {
  const h = d.getHours() % 12 || 12;
  return `${h}:${String(d.getMinutes()).padStart(2, "0")} ${d.getHours() >= 12 ? "PM" : "AM"}`;
}

/** the whole "little computer" desktop: one screen, no page scroll */
export default function Desk() {
  const [app, setApp] = useState<AppId>("about");
  const [shots, setShots] = useState(0);
  const [flash, setFlash] = useState(false);
  const [clock, setClock] = useState("");
  const music = useChiptune();
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => setClock(formatClock(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  useEffect(
    () => () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    },
    []
  );

  const shoot = useCallback(() => {
    music.shutter();
    setShots((n) => n + 1);
    setFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(false), 380);
  }, [music]);

  return (
    <div className="desk">
      <Nav app={app} shots={shots} clock={clock} onOpen={setApp} onShoot={shoot} />
      <div className="main">
        <FileIcons app={app} onOpen={setApp} />
        <Monitor app={app} music={music} onOpen={setApp} />
        <DeskWidgets music={music} onOpen={setApp} />
      </div>
      {flash && <div className="fl" style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 9999, pointerEvents: "none" }} />}
    </div>
  );
}
