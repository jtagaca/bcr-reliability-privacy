import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "BCR Reliability + Privacy | Unofficial Android call recorder preview",
    description:
      "An unofficial BCR preview for rooted Android phones with safer failure handling, retention cleanup, and backup privacy.",
    icons: {
      icon: "/bcr-icon.svg",
      shortcut: "/bcr-icon.svg",
    },
    openGraph: {
      type: "website",
      title: "BCR Reliability + Privacy",
      description: "Call recording that fails safer. An unofficial preview for rooted Android devices.",
      images: [new URL("/og.png", base).toString()],
    },
    twitter: {
      card: "summary_large_image",
      title: "BCR Reliability + Privacy",
      description: "Call recording that fails safer. An unofficial preview for rooted Android devices.",
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
