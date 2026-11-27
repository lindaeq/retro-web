// shared desk config: which screens exist, their order, titles and contact links
export type AppId =
  | "about"
  | "projects"
  | "experience"
  | "resume"
  | "design"
  | "music"
  | "contact";

export const LINKS = [
  { label: "EMAIL", value: "linda [dot] qi [at] uwaterloo.ca", href: "#" },
  { label: "GITHUB", value: "github.com/lindaeq", href: "https://github.com/lindaeq" },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/lnda-qi",
    href: "https://www.linkedin.com/in/lnda-qi/",
  },
];

export const TITLES: Record<AppId, string> = {
  about: "about.txt",
  projects: "projects",
  experience: "experience",
  resume: "resume.pdf",
  design: "misc",
  music: "music",
  contact: "contact",
};

/** order shared by the left file icons, the camera keys and the menubar */
export const DIAL: Record<AppId, number> = {
  about: 0,
  projects: 1,
  experience: 2,
  resume: 3,
  design: 4,
  music: 5,
  contact: 5,
};

export const KEYS: { label: string; app: AppId }[] = [
  { label: "ABOUT", app: "about" },
  { label: "PROJECTS", app: "projects" },
  { label: "EXPERIENCE", app: "experience" },
  { label: "RESUME", app: "resume" },
  { label: "MISC", app: "design" },
  { label: "MUSIC", app: "music" },
];

export const MENU: { label: string; app: AppId }[] = [
  ...KEYS.map((k) => ({ label: k.label, app: k.app })),
  { label: "CONTACT", app: "contact" },
];

export const FILE_ICONS: { label: string; icon: string; app: AppId }[] = [
  { label: "about.txt", icon: "i-doc", app: "about" },
  { label: "projects", icon: "i-folder", app: "projects" },
  { label: "experience", icon: "i-case", app: "experience" },
  { label: "resume.pdf", icon: "i-doc", app: "resume" },
  { label: "misc", icon: "i-pal", app: "design" },
];

/** images live in /public (same as the old site) */
export const IMG = (name: string) => `/${name}`;
