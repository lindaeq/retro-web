import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";
import { sx } from "@/lib/sx";

const projects: Project[] = [
  {
    title: "auri",
    link: "https://github.com/lindaeq/auri",
    tech: "figma · react · next.js · typescript · edge impulse · google gemini api · arduino · socket.io",
    description:
      "ai-powered wearable that turns important sounds into vibrations and led alerts for deaf and hard-of-hearing users",
    image: "project-auri.png",
  },
  {
    title: "digdeep",
    link: "https://github.com/SuhanaAkhter/DigDeep",
    tech: "html · css · python · js · sqlite",
    description:
      "web app for volleyball coaches and players to track and analyze team and individual performance stats, with role-based dashboards, player and game management, and per-set stat tracking.",
    image: "project-digdeep.png",
  },
  {
    title: "codemap",
    link: "https://github.com/lindaeq/codemap",
    tech: "python · fastapi · uvicorn · ast · vanilla js · html/css · render",
    description:
      "static analysis tool that parses python codebases with ast to map imports, functions, classes, and complexity, then renders it as an interactive dependency graph",
    image: "project-codemap.png",
  },
  {
    title: "project four",
    link: "#",
    tech: "tech stack tbd",
    description: "details coming soon.",
  },
];

export default function Projects() {
  return (
    <div className="fc">
      <h1 className="h1">projects</h1>
      <p className="sub">what i&apos;ve been making...</p>
      <div style={sx("display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px")}>
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}
