import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tablekun - Il miglior modo per soddisfare le fantasie di Nina",
  description: "In tutta franchezza non sapevo cosa significasse il titolo fino a che non fosse troppo tardi.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-tablekun-950 text-tablekun-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen antialiased">
              <div className="container max-w-5xl p-5">
                {children}
              </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
