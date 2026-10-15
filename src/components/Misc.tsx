import type { Chiptune } from "@/hooks/useChiptune";
import { sx } from "@/lib/sx";
import MusicPlayer from "./MusicPlayer";

export default function Misc({ music }: { music: Chiptune }) {
  return (
    <div className="fc">
      <h1 className="h1">music</h1>
      <p className="sub">currently playing...</p>
      <div style={sx("border:3px solid #2b1a14;background:#fff;margin-bottom:6px")}>
        <iframe
          title="honeybee by Olivia Rodrigo on Spotify"
          src="https://open.spotify.com/embed/track/4kX7xkopoXZCfE1D6fNwl2?utm_source=generator&theme=0"
          width="100%"
          height="80"
          style={{ border: 0, display: "block" }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <a
        href="https://open.spotify.com/track/4kX7xkopoXZCfE1D6fNwl2"
        target="_blank"
        rel="noopener noreferrer"
        className="lab"
        style={sx("color:#8a5a38;text-decoration:none")}
      >
        OPEN HONEYBEE ON SPOTIFY ↗
      </a>
      <div className="lab" style={sx("border-bottom:3px solid #2b1a14;padding-bottom:8px;margin:28px 0 14px")}>
        8-BIT MIXTAPE
      </div>
      <MusicPlayer music={music} />
    </div>
  );
}
