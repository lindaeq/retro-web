import { IMG } from "@/lib/desk";
import { sx } from "@/lib/sx";

export interface Project {
  title: string;
  link?: string;
  tech?: string;
  description?: string;
  /** file name in /public, e.g. "project-auri.png" */
  image?: string;
}

/** placeholder dot pattern shown when a card has no image yet */
const PLACEHOLDER = "radial-gradient(#2b1a14 22%,transparent 24%)";

/** picture strip at the top of a card (also used as the experience banner) */
export function Photo({ image, label, ratio }: { image?: string; label: string; ratio?: string }) {
  return (
    <div
      className="ph"
      role="img"
      aria-label={label}
      style={{
        backgroundImage: image ? `url(${IMG(image)})` : PLACEHOLDER,
        backgroundSize: image ? "cover" : "12px 12px",
        ...(ratio ? { aspectRatio: ratio } : {}),
      }}
    />
  );
}

export default function ProjectCard({ title, link, tech, description, image }: Project) {
  return (
    <article className="card">
      <Photo image={image} label={title} />
      <div style={sx("padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px;flex:1")}>
        <div style={sx("display:flex;align-items:center;gap:8px")}>
          <span style={sx("font:400 22px/1.1 var(--righteous),sans-serif")}>{title}</span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} repository`}
              style={sx("font:700 14px/1 var(--silk),monospace;color:#8a5a38;text-decoration:none")}
            >
              ↗
            </a>
          )}
        </div>
        {tech && (
          <div className="lab" style={{ lineHeight: 1.6 }}>
            {tech}
          </div>
        )}
        {description && (
          <p className="tx" style={sx("margin:0;font-size:14px;line-height:1.55")}>
            {description}
          </p>
        )}
      </div>
    </article>
  );
}
