import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";
import { sx } from "@/lib/sx";

const designs: Project[] = [
  {
    title: "neapolitan web",
    tech: "web design concept",
    description: "an alternate pastel neapolitan concept for this portfolio site.",
    image: "design-neapolitan.png",
  },
  {
    title: "spark of luminosity",
    tech: "event poster · sponsor poster",
    description:
      "event and sponsor poster designs for lunarhacks x syrc's spark of luminosity hackathon.",
    image: "design-luminosity.png",
  },
  {
    title: "scrapyard ottawa",
    tech: "instagram posts · badges/lanyards",
    description:
      "instagram posts plus hacker, organizer, mentor, and sponsor badges/lanyards for scrapyard ottawa.",
    image: "design-scrapyard.png",
  },
  {
    title: "merivale volleyball",
    tech: "[DESIGN TYPE]",
    description: "[SHORT DESCRIPTION.]",
    image: "design-volleyball.png",
  },
  {
    title: "8729 pins",
    tech: "[DESIGN TYPE]",
    description: "[SHORT DESCRIPTION.]",
    image: "design-8729-pins.png",
  },
];

export default function Design() {
  return (
    <div className="fc">
      <h1 className="h1">design + hobbies</h1>
      <p className="sub">what i&apos;ve been designing...</p>
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
        <div style={sx("font:400 76px/.9 var(--righteous),sans-serif")}>689</div>
        <div style={sx("font:400 30px/1.1 var(--vt),monospace")}>
          duolingo streak
          <br />
          <span style={{ fontSize: 22 }}>[LANGUAGE]</span>
        </div>
      </div>
    </div>
  );
}
