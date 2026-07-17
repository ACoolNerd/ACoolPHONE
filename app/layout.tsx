import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:  "ACoolPHONE",
    template: "%s | ACoolPHONE",
  },
  description:
    "One secure command center for business messaging, managed devices, workflow automation, and multi-tenant operations.",
  keywords: [
    "business messaging",
    "workflow automation",
    "device operations",
    "multi-tenant platform",
    "ACoolECOSYSTEM",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "ACoolPHONE — Business operations, orchestrated",
    description:
      "Connect approved channels, coordinate workflows, manage devices, and prove every outcome from one tenant-isolated command center.",
    type: "website",
    siteName: "ACoolPHONE",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACoolPHONE — Business operations, orchestrated",
    description: "A consent-first command center for communication and operations.",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#0b0d10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
