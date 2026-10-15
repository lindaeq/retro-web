import { sx } from "@/lib/sx";

export default function Resume() {
  return (
    <div className="fc">
      <div style={sx("display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-bottom:18px")}>
        <h1 className="h1" style={{ margin: 0 }}>
          resume.pdf
        </h1>
        <div style={sx("display:flex;gap:10px")}>
          <a className="mb pk" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            OPEN PDF ↗
          </a>
          <a className="mb" href="/resume.pdf" download="linda-resume.pdf">
            DOWNLOAD
          </a>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/resume-1.png"
        alt="Linda's resume"
        style={sx("display:block;width:100%;max-width:560px;margin:0 auto;border:4px solid #2b1a14;box-shadow:6px 6px 0 #2b1a14;background:#fff")}
      />
    </div>
  );
}
