import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";

const projects: Project[] = [
  {
    title: "brighteye",
    link: "https://github.com/lindaeq/BrightEye",
    award: "🏆 WINNER · HACK WESTERN 13",
    tech: "raspberry pi 5 · qnx · arduino · opencv · react · typescript · web serial · flask · node.js · postgresql · gemini api",
    description:
      "30-second space arcade game that tracks eye movements and reaction times to help pre-assess ADHD and dyspraxia in children.",
    image: "project-brighteye.jpg",
  },
  {
    title: "bumpitup",
    link: "https://github.com/lindaeq/BUMPitup",
    award: "🏆 OVERALL WINNER · UW WIE HACKS",
    tech: "react 19 · typescript · tailwind css · firebase · node.js · openai api · recharts",
    description:
      "Mobile-first prenatal physio app that helps women stay active during pregnancy and rebuild strength after birth.",
    images: ["project-bumpitup-1.jpg", "project-bumpitup-2.png"],
    imageFit: "contain",
  },
  {
    title: "auri",
    link: "https://github.com/lindaeq/auri",
    tech: "figma · react · next.js · typescript · edge impulse · google gemini api · arduino · socket.io",
    description:
      "AI-powered wearable that turns important sounds into vibrations and LED alerts for deaf and hard-of-hearing users.",
    image: "project-auri.png",
  },
  {
    title: "digdeep",
    link: "https://github.com/SuhanaAkhter/DigDeep",
    tech: "html · css · python · js · sqlite",
    description:
      "Web app for volleyball coaches and players to track and analyze team and individual performance stats, with role-based dashboards, player and game management, and per-set stat tracking.",
    image: "project-digdeep.png",
  },
  {
    title: "project five",
    link: "#",
    tech: "tech stack tbd",
    description: "Details coming soon.",
  },
];

export default function Projects() {
  return (
    <div className="fc">
      <h1 className="h1">projects</h1>
      <p className="sub">what i&apos;ve been making...</p>
      <div className="proj-grid">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}
