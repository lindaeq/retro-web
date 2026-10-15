import { LINKS } from "@/lib/desk";
import { sx } from "@/lib/sx";

export default function Contact() {
  return (
    <div className="fc">
      <h1 className="h1">contact</h1>
      <p className="sub">say hello...</p>
      <div style={sx("border:3px solid #2b1a14;background:#fff4ea")}>
        {LINKS.map((l) => (
          <a key={l.label} className="lk" href={l.href} target="_blank" rel="noopener noreferrer">
            <span className="lab" style={{ width: 84 }}>
              {l.label}
            </span>
            <span style={sx("flex:1;font:400 24px/1.1 var(--vt),monospace")}>{l.value}</span>
            <span style={sx("font:700 14px/1 var(--silk),monospace")}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
