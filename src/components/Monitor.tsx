import { TITLES } from "@/lib/desk";
import type { AppId } from "@/lib/desk";
import type { Chiptune } from "@/hooks/useChiptune";
import { sx } from "@/lib/sx";
import About from "./About";
import Contact from "./Contact";
import Design from "./Design";
import Experience from "./Experience";
import Misc from "./Misc";
import Projects from "./Projects";
import Resume from "./Resume";

interface Props {
  app: AppId;
  music: Chiptune;
  onOpen: (app: AppId) => void;
}

function Screen({ app, music }: { app: AppId; music: Chiptune }) {
  switch (app) {
    case "about":
      return <About />;
    case "projects":
      return <Projects />;
    case "experience":
      return <Experience />;
    case "resume":
      return <Resume />;
    case "design":
      return <Design />;
    case "music":
      return <Misc music={music} />;
    case "contact":
      return <Contact />;
  }
}

/** the beige monitor: finder-style window in the middle, bezel details underneath */
export default function Monitor({ app, music, onOpen }: Props) {
  return (
    <section className="mon" aria-label="Computer screen">
      <div style={sx("display:flex;justify-content:space-between;padding:0 4px")}>
        <span className="lab">LQ-128 PERSONAL COMPUTER</span>
        <span className="lab hm">COLOR DISPLAY · 640 × ∞</span>
      </div>

      <div className="screen" data-app={app}>
        <div className="fw">
          <div className="tb">
            <button className="cb" onClick={() => onOpen("about")} aria-label="Back to about" />
            <span className="tt">{`C:\\LINDA\\${TITLES[app]}`}</span>
            <i style={{ width: 18 }} />
          </div>
          <Screen app={app} music={music} />
        </div>
      </div>

      <div style={sx("display:flex;align-items:center;gap:14px;padding:0 4px")}>
        <div style={sx("font:700 14px/1 var(--silk),monospace;letter-spacing:.06em")}>
          MULTIMEDIA{" "}
          <span style={sx("font-size:10px;vertical-align:middle;border:2px solid #2b1a14;padding:2px 5px;border-radius:4px")}>128</span>
        </div>
        <div className="vent" style={{ flex: 1 }} />
        <div className="hm lab" style={sx("display:flex;align-items:center;gap:8px")}>
          BRIGHT <i className="kn" /> CONTRAST <i className="kn" style={{ transform: "rotate(50deg)" }} />
        </div>
        <div className="lab" style={sx("display:flex;align-items:center;gap:8px")}>
          <i className="led" />
          POWER
        </div>
      </div>
    </section>
  );
}
