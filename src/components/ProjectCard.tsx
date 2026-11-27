import { IMG } from "@/lib/desk";
import { sx } from "@/lib/sx";

export interface Project {
  title: string;
  link?: string;
  award?: string;
  tech?: string;
  description?: string;
  /** file name in /public, e.g. "project-auri.png" */
  image?: string;
  /** optional multiple photos rendered side by side */
  images?: string[];
  /** how photos should fit inside the card frame */
  imageFit?: "cover" | "contain";
}

/** placeholder dot pattern shown when a card has no image yet */
const PLACEHOLDER = "radial-gradient(#2b1a14 22%,transparent 24%)";

/** picture strip at the top of a card (also used as the experience banner) */
export function Photo({
  image,
  images,
  imageFit = "cover",
  award,
  label,
  ratio,
}: {
  image?: string;
  images?: string[];
  imageFit?: "cover" | "contain";
  award?: string;
  label: string;
  ratio?: string;
}) {
  const list = images && images.length > 0 ? images : image ? [image] : [];
  const ribbon = award ? (
    <span className="ribbon" title={award}>
      🏆 WINNER
    </span>
  ) : null;

  if (list.length > 1) {
    return (
      <div
        className="ph"
        role="img"
        aria-label={label}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${list.length}, 1fr)`,
          backgroundColor: imageFit === "contain" ? "#191514" : "#f4b6c8",
          ...(ratio ? { aspectRatio: ratio } : {}),
        }}
      >
        {ribbon}
        {list.map((img, i) => (
          <div
            key={img}
            style={{
              minWidth: 0,
              borderLeft: i > 0 ? "3px solid #2b1a14" : undefined,
              backgroundImage: `url(${IMG(img)})`,
              backgroundSize: imageFit,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    );
  }

  const single = list[0];
  return (
    <div
      className="ph"
      role="img"
      aria-label={label}
      style={{
        backgroundColor: single && imageFit === "contain" ? "#191514" : "#f4b6c8",
        backgroundImage: single ? `url(${IMG(single)})` : PLACEHOLDER,
        backgroundSize: single ? imageFit : "12px 12px",
        backgroundRepeat: "no-repeat",
        ...(ratio ? { aspectRatio: ratio } : {}),
      }}
    >
      {ribbon}
    </div>
  );
}

export default function ProjectCard({ title, link, award, tech, description, image, images, imageFit }: Project) {
  return (
    <article className="card">
      <Photo image={image} images={images} imageFit={imageFit} award={award} label={title} />
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
