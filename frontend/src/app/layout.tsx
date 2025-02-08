import type { Metadata } from "next";
import React from "react";
// components
import Layout from "./components/layout";

export const metadata: Metadata = {
  title: "Infinite Events",
  description: "Create your events today",
  keywords: ["events", "meetings", "communication"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
