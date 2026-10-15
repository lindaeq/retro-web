import { LINKS } from "@/lib/desk";
import { sx } from "@/lib/sx";

export default function About() {
  return (
    <div className="fc" style={sx("display:flex;flex-direction:column;justify-content:center")}>
      <div
        style={sx(
          "font:700 clamp(64px,9vw,128px)/.95 var(--vt),monospace;color:#2b1a14;margin:0 0 10px -.05em;letter-spacing:.01em"
        )}
      >
        LINDA QI
      </div>
      <div style={sx("font:400 clamp(18px,2.1vw,28px)/1.1 var(--vt),monospace;white-space:nowrap")}>
        <span className="typ">CS @ UNIVERSITY OF WATERLOO</span>
      </div>

      <div className="hw">
        <div className="htb">
          <i style={sx("width:12px;height:12px;background:#fff4ea;border:2px solid #2b1a14;box-sizing:border-box")} />
          <span className="lab" style={sx("flex:1;text-align:center;color:#fff4ea")}>
            HELLO.EXE
          </span>
        </div>
        <div style={sx("padding:12px 14px 14px")}>
          <div style={sx("font:400 32px/1 var(--vt),monospace;color:#8a5a38;margin-bottom:2px")}>SAY HELLO</div>
          <div className="tx" style={sx("font-size:13px;margin-bottom:8px;opacity:.8")}>
            [ CONNECT &amp; CHAT WITH ME ANYTIME! ]
          </div>
          <div style={sx("display:grid;grid-template-columns:auto 1fr;gap:2px 14px;align-items:baseline")}>
            {LINKS.map((l) => (
              <LinkRow key={l.label} label={l.label} value={l.value} href={l.href} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <>
      <span className="lab" style={sx("color:#8a5a38")}>
        {label}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={sx(
          "font:400 20px/1.2 var(--vt),monospace;color:#2b1a14;text-decoration:underline;text-underline-offset:3px;overflow-wrap:anywhere"
        )}
      >
        {value}
      </a>
    </>
  );
}
