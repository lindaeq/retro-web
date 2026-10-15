import { FILE_ICONS } from "@/lib/desk";
import type { AppId } from "@/lib/desk";

export default function FileIcons({ app, onOpen }: { app: AppId; onOpen: (app: AppId) => void }) {
  return (
    <nav className="icons" aria-label="Files">
      {FILE_ICONS.map((f) => (
        <button key={f.label} className="ic" data-on={app === f.app} onClick={() => onOpen(f.app)}>
          <span className={`ico ${f.icon}`} />
          <span className="lbl">{f.label}</span>
        </button>
      ))}
    </nav>
  );
}
