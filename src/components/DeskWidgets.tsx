import type { Chiptune } from "@/hooks/useChiptune";
import { useDragItems } from "@/hooks/useDragItems";
import type { AppId } from "@/lib/desk";
import { IMG } from "@/lib/desk";
import { sx } from "@/lib/sx";
import MusicPlayer from "./MusicPlayer";

interface Props {
  music: Chiptune;
  onOpen: (app: AppId) => void;
}

/**
 * Overlapping desk items on the right. They can be dragged around but never closed,
 * and they stay clamped inside this zone.
 */
export default function DeskWidgets({ music, onOpen }: Props) {
  const { place, front, startDrag } = useDragItems(onOpen);
  const lblFont = "font:400 17px/1 var(--vt),monospace;letter-spacing:0";

  return (
    <aside className="rz" aria-label="Desk widgets">
      {/* this pc */}
      <div
        className="it"
        data-item="1"
        onPointerDown={(e) => startDrag("hd", e, "about")}
        style={{ ...place("hd", 112, 104), ...sx("cursor:grab;display:flex;flex-direction:column;align-items:center;gap:8px") }}
      >
        <div style={sx("width:64px;height:54px;background:#fff4ea;border:3px solid #2b1a14;position:relative;margin-top:4px")}>
          <i style={sx("position:absolute;left:8px;right:8px;top:12px;height:5px;background:#2b1a14")} />
          <i
            style={sx(
              "position:absolute;right:8px;bottom:6px;width:9px;height:9px;border-radius:50%;background:#3fbf4a;border:2px solid #2b1a14;animation:blink 2.2s steps(1) infinite"
            )}
          />
        </div>
        <span className="lbl" style={sx(lblFont)}>
          This PC
        </span>
      </div>

      {/* music cd */}
      <div
        className="it"
        data-item="1"
        onPointerDown={(e) => startDrag("cd", e, "music")}
        style={{ ...place("cd", 112, 104), ...sx("cursor:grab;display:flex;flex-direction:column;align-items:center;gap:8px") }}
      >
        <span
          className="ico i-cd"
          style={{ marginTop: 2, animation: "spin 3s linear infinite", animationPlayState: music.playing ? "running" : "paused" }}
        />
        <span className="lbl" style={sx(lblFont)}>
          music
        </span>
      </div>

      {/* liner notes */}
      <div
        className="it"
        data-item="1"
        onPointerDown={(e) => startDrag("liner", e)}
        style={{
          ...place("liner", 285, 430),
          ...sx("cursor:grab;background:#f6e0ec;border:3px solid #2b1a14;box-shadow:5px 5px 0 #2b1a14;padding:14px 16px;display:flex;flex-direction:column;gap:12px"),
        }}
      >
        <div className="lab">LINER NOTES</div>
        <div
          role="img"
          aria-label="Linda"
          style={{ ...sx("flex:1;min-height:0;border:3px solid #2b1a14"), background: `#f4b6c8 url(${IMG("about-photo.png")}) center/cover` }}
        />
        <div>
          <div style={sx("font:400 22px/1 var(--righteous),sans-serif")}>linda</div>
          <div className="lab" style={sx("margin-top:6px;color:#8a5a38")}>
            ENTJ • RAVENCLAW • CS @ UWATERLOO
          </div>
        </div>
        <div
          style={sx(
            "position:relative;overflow:hidden;height:34px;border:3px solid #fff4ea;outline:3px solid #2b1a14;background:repeating-linear-gradient(90deg,#2b1a14 0 3px,transparent 3px 5px,#2b1a14 5px 6px,transparent 6px 10px)"
          )}
        >
          <i style={sx("position:absolute;top:0;bottom:0;width:3px;background:#ff5fa2;animation:scan 2.4s linear infinite")} />
        </div>
      </div>

      {/* mini music player */}
      <div
        className="it"
        data-item="1"
        onPointerDown={() => front("music")}
        style={{
          ...place("music", 330, 318),
          ...sx("background:#f4b6c8;border:3px solid #2b1a14;box-shadow:5px 5px 0 #2b1a14;display:flex;flex-direction:column"),
        }}
      >
        <div
          onPointerDown={(e) => startDrag("music", e)}
          style={sx("flex:none;height:26px;background:#8a5a38;border-bottom:3px solid #2b1a14;display:flex;align-items:center;gap:8px;padding:0 8px;cursor:grab")}
        >
          <i style={sx("width:14px;height:14px;background:#fff4ea;border:3px solid #2b1a14;box-sizing:border-box")} />
          <span className="lab" style={sx("flex:1;text-align:center;color:#fff4ea")}>
            MUSIC
          </span>
          <span className="eqm" aria-hidden="true">
            {[0, 0.12, 0.24, 0.06].map((d) => (
              <i key={d} style={{ animationDelay: `${d}s`, animationPlayState: music.playing ? "running" : "paused" }} />
            ))}
          </span>
        </div>
        <div style={sx("flex:none;background:#fff4ea;border-bottom:3px solid #2b1a14;padding:2px 10px;font:400 18px/1.3 var(--vt),monospace")}>
          A:\LINDA\MUSIC\PLAYER.PRG
        </div>
        <div style={sx("flex:1;min-height:0;padding:12px 14px;display:flex;flex-direction:column;gap:10px")}>
          <MusicPlayer music={music} compact />
        </div>
      </div>

      {/* sticky note */}
      <div
        className="it"
        data-item="1"
        onPointerDown={(e) => startDrag("note", e)}
        style={{
          ...place("note", 300, 190),
          ...sx("cursor:grab;background:#ffe3a8;border:4px solid #2b1a14;box-shadow:8px 8px 0 #2b1a14;padding:22px 22px 18px"),
        }}
      >
        <i
          aria-hidden="true"
          style={sx(
            "position:absolute;top:-12px;left:50%;margin-left:-11px;width:22px;height:22px;border-radius:50%;background:#e5333d;border:3px solid #2b1a14;animation:pls 1.8s ease-in-out infinite"
          )}
        />
        <div className="lab" style={sx("margin-bottom:8px")}>
          STICKY NOTE
        </div>
        <div style={sx("font:400 28px/1.15 var(--vt),monospace")}>
          current obsession:
          <br />
          <b style={sx("font-weight:400;background:#ff9ccd;padding:0 4px")}>ur mother</b>
          <br />
          duolingo streak: 689
        </div>
      </div>
    </aside>
  );
}
