import { sx } from "@/lib/sx";

interface Props {
  playing: boolean;
  elapsed: number;
  trackSeconds: number;
  /** bar height in px */
  barHeight: number;
}

/** 20-bar level meter: filled bars show progress, all bars bounce while playing */
export default function Equalizer({ playing, elapsed, trackSeconds, barHeight }: Props) {
  const filled = Math.round(Math.min(1, elapsed / trackSeconds) * 20);
  return (
    <div style={sx("display:flex;gap:3px;align-items:center;height:22px")}>
      {Array.from({ length: 20 }, (_, i) => (
        <i
          key={i}
          style={{
            flex: 1,
            height: barHeight,
            background: i < filled ? "#ff5fa2" : "#5a3a2c",
            animation: "eq .5s ease-in-out infinite alternate",
            animationDelay: `${((i * 0.07) % 0.5).toFixed(2)}s`,
            animationPlayState: playing ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}
