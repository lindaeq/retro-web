import { Photo } from "./ProjectCard";
import { sx } from "@/lib/sx";

interface Experience {
  date: string;
  role: string;
  org: string;
  description: string;
  /** banner photo shown above the card text (file name in /public) */
  image?: string;
}

const experiences: Experience[] = [
  {
    date: "july 2025 - august 2025",
    role: "testing & automation intern",
    org: "NOKIA — Ottawa, ON",
    description:
      "built automated bdd and api test suites in python (radish framework), cutting manual regression time ~20% and surfacing 15+ defects while working across 4 cross-functional engineering teams.",
    image: "exp-nokia.png",
  },
  {
    date: "month year - present",
    role: "role title",
    org: "organization name",
    description: "details coming soon.",
  },
  {
    date: "month year - present",
    role: "role title",
    org: "organization name",
    description: "details coming soon.",
  },
];


export default function Experience() {
  return (
    <div className="fc">
      <h1 className="h1">experience</h1>
      <p className="sub">where i&apos;ve been...</p>
      <div>
        {experiences.map((e, i) => (
          <div key={i} style={sx("display:flex;gap:18px")}>
            <div style={sx("flex:none;display:flex;flex-direction:column;align-items:center")}>
              <i
                style={sx(
                  "margin-top:6px;width:14px;height:14px;border-radius:50%;background:#ff5fa2;border:3px solid #2b1a14;box-sizing:border-box;animation:pls 2s ease-in-out infinite"
                )}
              />
              <i style={sx("width:3px;flex:1;background:#2b1a14;opacity:.35")} />
            </div>
            <div className="card" style={sx("flex:1;min-width:0;margin-bottom:20px")}>
              {/* banner photo attached to the top of the card */}
              <div style={{ position: "relative" }}>
                <Photo image={e.image} label={`${e.role} photo`} ratio="16/5" />
                {!e.image && (
                  <span
                    className="lab"
                    style={sx("position:absolute;right:6px;bottom:9px;background:#fff4ea;border:2px solid #2b1a14;padding:3px 6px")}
                  >
                    [PHOTO]
                  </span>
                )}
              </div>
              <div style={sx("padding:14px 18px 16px")}>
                <div className="lab" style={sx("margin-bottom:6px")}>
                  {e.date}
                </div>
                <div style={sx("font:400 22px/1.15 var(--righteous),sans-serif")}>{e.role}</div>
                <div className="tx" style={sx("font-size:13px;font-style:italic;opacity:.75;margin:2px 0 8px")}>
                  {e.org}
                </div>
                <p className="tx" style={sx("margin:0;font-size:14px;line-height:1.55")}>
                  {e.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
