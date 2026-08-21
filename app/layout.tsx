import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/components/providers/AppProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { inter, noto, themeInitScript } from "@/lib/fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#06101c" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Sharkari Guru — Sarkari Jobs, Results & Exam Updates",
    template: "%s | Sharkari Guru",
  },
  description:
    "A modern student portal for government jobs, results, admit cards, answer keys, syllabus, admissions, and scholarships. Always verify on the official site.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Sharkari Guru — Sarkari Jobs, Results & Exam Updates",
    description:
      "A modern student portal for government jobs, results, admit cards, and exam notices.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sharkari Guru" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${noto.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-cream font-sans text-navy-900 dark:bg-navy-950 dark:text-navy-50">
        <AppProvider>
          <div className="flex min-h-full flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
            <Header />
            <main id="main" className="min-w-0 flex-1 overflow-x-clip">
              {children}
            </main>
            <Footer />
            <MobileNav />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
