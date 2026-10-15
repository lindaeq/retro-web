import { TRACKS, TRACK_SECONDS } from "@/hooks/useChiptune";
import type { Chiptune } from "@/hooks/useChiptune";
import { sx } from "@/lib/sx";
import Equalizer from "./Equalizer";

const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  music: Chiptune;
  /** compact = the floating mini player, otherwise the full music page */
  compact?: boolean;
}

/** LCD readout, transport buttons and track list. Shared by the music page and the mini player. */
export default function MusicPlayer({ music, compact = false }: Props) {
  const time = `${pad(Math.floor(music.elapsed / 60))}:${pad(Math.floor(music.elapsed % 60))}`;
  return (
    <>
      <div
        style={
          compact
            ? sx("background:#2b1a14;color:#ff9ccd;padding:8px 12px;border:3px solid #fff4ea")
            : sx("background:#2b1a14;color:#ff9ccd;padding:12px 16px;border:3px solid #2b1a14;box-shadow:inset 0 0 0 3px #5a3320")
        }
      >
        <div style={sx(`display:flex;justify-content:space-between;font:400 ${compact ? 20 : 24}px/1 var(--vt),monospace`)}>
          <span>
            TRK 0{music.track + 1}/03 {music.playing ? "▶" : "II"}
          </span>
          <span>{time} / 01:30</span>
        </div>
        <div
          style={sx(
            `font:400 ${compact ? 28 : 34}px/1.1 var(--vt),monospace;color:#fff4ea;margin:${compact ? "2px 0 6px" : "4px 0 10px"}`
          )}
        >
          {TRACKS[music.track].name}
        </div>
        <Equalizer playing={music.playing} elapsed={music.elapsed} trackSeconds={TRACK_SECONDS} barHeight={compact ? 8 : 12} />
      </div>

      <div style={sx(compact ? "display:flex;gap:8px" : "display:flex;gap:10px;margin:14px 0")}>
        <button className="mb" onClick={music.prev} style={sx(compact ? "flex:1;padding:8px 0" : "flex:1")} aria-label="Previous">
          ◀◀
        </button>
        <button className="mb pk" onClick={music.toggle} style={sx(compact ? "flex:2;padding:8px 0" : "flex:2")}>
          {music.playing ? "II PAUSE" : "▶ PLAY"}
        </button>
        <button className="mb" onClick={music.next} style={sx(compact ? "flex:1;padding:8px 0" : "flex:1")} aria-label="Next">
          ▶▶
        </button>
      </div>

      <div style={sx(compact ? "border:3px solid #2b1a14;background:#fff4ea;overflow:hidden" : "border:3px solid #2b1a14")}>
        {TRACKS.map((t, i) => (
          <button
            key={t.name}
            className="row"
            data-on={music.track === i}
            onClick={() => music.pick(i)}
            style={compact ? sx("padding:6px 10px;font-size:19px") : undefined}
          >
            <span style={{ width: compact ? 28 : 30 }}>0{i + 1}</span>
            <span style={{ flex: 1 }}>{t.name}</span>
            <span>01:30</span>
          </button>
        ))}
      </div>
    </>
  );
}
