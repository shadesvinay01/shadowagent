import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Investor Deck | ShadowAgent",
  description: "Confidential investor presentation for ShadowAgent.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
