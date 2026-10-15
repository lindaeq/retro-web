import { DIAL, KEYS, MENU } from "@/lib/desk";
import type { AppId } from "@/lib/desk";
import { sx } from "@/lib/sx";

function MenuBar({ clock, onOpen }: { clock: string; onOpen: (app: AppId) => void }) {
  return (
    <div className="mbar">
      <button className="mi" onClick={() => onOpen("about")} style={sx("background:#ff5fa2;border-right:3px solid #2b1a14")}>
        ▲ DESK
      </button>
      {MENU.map((m) => (
        <button key={m.app} className="mi" onClick={() => onOpen(m.app)}>
          {m.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <div style={sx("padding:0 16px;font:700 12px/1 var(--silk),monospace")} suppressHydrationWarning>
        {clock}
      </div>
    </div>
  );
}

interface Props {
  app: AppId;
  shots: number;
  onOpen: (app: AppId) => void;
  onShoot: () => void;
}

/** the camera-plate header: dial, name plate, file keys (same order as the left icons), frame counter, shutter */
function CameraPlate({ app, shots, onOpen, onShoot }: Props) {
  return (
    <header className="plate">
      <div className="pin">
        <div className="dial" aria-hidden="true" style={{ transform: `rotate(${DIAL[app] * 60}deg)` }}>
          <i />
          <b />
        </div>
        <div style={sx("font:700 26px/1 var(--silk),monospace;letter-spacing:.08em;border:4px solid #2b1a14;padding:8px 14px;background:#fff4ea")}>
          LINDA
        </div>
        <nav aria-label="Main" style={sx("display:flex;flex-wrap:wrap;gap:8px;flex:1;justify-content:center")}>
          {KEYS.map((k) => (
            <button key={k.app} className="kb" data-on={app === k.app} onClick={() => onOpen(k.app)}>
              <b>{k.letter}</b>
              {k.label}
            </button>
          ))}
        </nav>
        <div
          className="hm"
          style={sx("background:#2b1a14;color:#ff9ccd;padding:6px 12px;font:400 24px/1 var(--vt),monospace;border-radius:4px;white-space:nowrap")}
        >
          FRAME {String((shots % 36) + 1).padStart(2, "0")}/36
        </div>
        <button className="shut" onClick={onShoot} aria-label="Shutter" />
      </div>
    </header>
  );
}

interface NavProps {
  app: AppId;
  shots: number;
  clock: string;
  onOpen: (app: AppId) => void;
  onShoot: () => void;
}

/** top of the desk: the menubar plus the camera plate (dial, name, file keys, shutter) */
export default function Nav({ app, shots, clock, onOpen, onShoot }: NavProps) {
  return (
    <>
      <MenuBar clock={clock} onOpen={onOpen} />
      <CameraPlate app={app} shots={shots} onOpen={onOpen} onShoot={onShoot} />
    </>
  );
}
