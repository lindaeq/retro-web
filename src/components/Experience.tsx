import { IMG } from "@/lib/desk";
import { sx } from "@/lib/sx";

interface Experience {
  date: string;
  role: string;
  org: string;
  description: string;
  /** banner photos shown above the card text (file names in /public); one or two work best */
  images?: string[];
  /** how many "[PHOTO]" placeholders to show while there are no images yet */
  photoSlots?: number;
}

const experiences: Experience[] = [
  {
    date: "july 2025 - august 2025",
    role: "testing & automation intern",
    org: "NOKIA — Ottawa, ON",
    description:
      "Built automated BDD and API test suites in Python (Radish framework), cutting manual regression time ~20% and surfacing 15+ defects while working across 4 cross-functional engineering teams.",
    images: ["exp-nokia.png"],
  },
  {
    date: "january 2024 - august 2025",
    role: "data analyst (fswep)",
    org: "RCMP — Ottawa, ON",
    description:
      "Processed and analyzed 500+ Access to Information and Privacy (ATIP) records across federal case files, reduced the departmental processing backlog by prioritizing high-volume record batches, and managed confidential records in line with federal privacy protocols.",
    photoSlots: 2,
  },
  {
    date: "month year - present",
    role: "role title",
    org: "organization name",
    description: "Details coming soon.",
    photoSlots: 1,
  },
];

/** photo banner attached to the top of an experience card */
function Banner({ images, slots, label }: { images?: string[]; slots: number; label: string }) {
  const cells = images && images.length > 0 ? images : Array.from({ length: slots }, () => undefined);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
        aspectRatio: "16/5",
        borderBottom: "3px solid #2b1a14",
      }}
    >
      {cells.map((img, i) => (
        <div
          key={i}
          role="img"
          aria-label={`${label} photo ${i + 1}`}
          style={{
            position: "relative",
            minWidth: 0,
            borderLeft: i > 0 ? "3px solid #2b1a14" : undefined,
            backgroundColor: "#f4b6c8",
            backgroundImage: img ? `url(${IMG(img)})` : "radial-gradient(#2b1a14 22%,transparent 24%)",
            backgroundSize: img ? "cover" : "12px 12px",
            backgroundPosition: "center",
          }}
        >
          {!img && (
            <span
              className="lab"
              style={sx("position:absolute;right:6px;bottom:6px;background:#fff4ea;border:2px solid #2b1a14;padding:3px 6px")}
            >
              [PHOTO]
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

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
              <Banner images={e.images} slots={e.photoSlots ?? 1} label={e.role} />
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
