import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matchmind — Evidence beside the game",
  description: "A historical football replay with frozen evidence and a limited player-statistics assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
