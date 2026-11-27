import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";
import { sx } from "@/lib/sx";

const designs: Project[] = [
  {
    title: "women in cs",
    tech: "social media posts · event promotion",
    description:
      "Social media posts for University of Waterloo Women in Computer Science (WiCS), including promotion for the career panel.",
    image: "design-wics.png",
  },
  {
    title: "spark of luminosity",
    tech: "event poster · sponsor poster",
    description:
      "Event and sponsor poster designs for LunarHacks x SYRC's Spark of Luminosity hackathon.",
    image: "design-luminosity.png",
  },
  {
    title: "scrapyard ottawa",
    tech: "instagram posts · badges/lanyards",
    description:
      "Instagram posts plus hacker, organizer, mentor, and sponsor badges and lanyards for Scrapyard Ottawa.",
    image: "design-scrapyard.png",
  },
  {
    title: "neapolitan web",
    tech: "web design concept",
    description: "An alternate pastel Neapolitan concept for this portfolio site.",
    image: "design-neapolitan.png",
  },
  {
    title: "design four",
    tech: "tech stack tbd",
    description: "Details coming soon.",
  },
];

export default function Design() {
  return (
    <div className="fc">
      <h1 className="h1">misc</h1>
      <p className="sub">design, hobbies &amp; more...</p>
      <div style={sx("display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px;margin-bottom:30px")}>
        {designs.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
      <div className="lab" style={sx("border-bottom:3px solid #2b1a14;padding-bottom:8px;margin-bottom:16px")}>
        HOBBIES · MISC
      </div>
      <div
        style={sx(
          "display:flex;flex-wrap:wrap;gap:20px;align-items:center;background:#ff5fa2;border:4px solid #2b1a14;box-shadow:5px 5px 0 #2b1a14;padding:18px 22px"
        )}
      >
        <div style={sx("font:400 76px/.9 var(--righteous),sans-serif")}>721</div>
        <div style={sx("font:400 30px/1.1 var(--vt),monospace")}>
          duolingo streak
          <br />
          <span style={{ fontSize: 22 }}>[LANGUAGE]</span>
        </div>
      </div>
    </div>
  );
}
