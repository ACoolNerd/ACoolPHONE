import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:  "ACoolPHONE",
    template: "%s | ACoolPHONE",
  },
  description:
    "ACoolPHONE – centralized orchestration platform for mobile automation, device management, and multi-tenant operations.",
  keywords: ["mobile automation", "device management", "multi-tenant", "ACoolECOSYSTEM"],
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
