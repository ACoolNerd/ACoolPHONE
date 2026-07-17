import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "building"
  | "chart"
  | "check"
  | "code"
  | "database"
  | "link"
  | "message"
  | "phone"
  | "shield"
  | "spark"
  | "workflow";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
      <path d="M2 21h20M8 7h2m3 0h1M8 11h2m3 0h1M8 15h2m3 0h1" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5m0 14h16" />
      <path d="m7 15 4-4 3 2 5-6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  code: <path d="m8 9-3 3 3 3m8-6 3 3-3 3m-3-9-2 12" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M8 9h8m-8 4h5" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 5h4m-3 14h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  spark: <path d="m12 3-1.4 4.1a5 5 0 0 1-3.1 3.1L3 12l4.5 1.8a5 5 0 0 1 3.1 3.1L12 21l1.4-4.1a5 5 0 0 1 3.1-3.1L21 12l-4.5-1.8a5 5 0 0 1-3.1-3.1L12 3Z" />,
  workflow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="2" />
      <rect x="15" y="15" width="6" height="6" rx="2" />
      <path d="M9 6h4a3 3 0 0 1 3 3v6M15 18h-4a3 3 0 0 1-3-3V9" />
    </>
  ),
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
