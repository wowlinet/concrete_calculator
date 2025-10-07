import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free Concrete Calculator | Estimate Volume, Mix & Cost Online",
    template: "%s | Concrete Calculator"
  },
  description: "Use our free Concrete Calculator to estimate concrete volume, mix ratios, and project cost in seconds. Ideal for slabs, driveways, and foundations.",
  keywords: ["concrete calculator", "concrete volume calculation", "construction engineering", "construction calculation", "cement calculation", "building materials", "concrete mix ratio", "construction tools"],
  authors: [{ name: "Concrete Calculator Team", url: "https://concretecalculator.me" }],
  creator: "Concrete Calculator",
  publisher: "Concrete Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://concretecalculator.me"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://concretecalculator.me",
    title: "Concrete Calculator - Professional Concrete Volume Calculation Tool",
    description: "Free online concrete calculator to help you accurately calculate concrete volume required for various construction projects. Supports different strength grades, mix ratio calculations, and provides professional construction advice.",
    siteName: "Concrete Calculator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Concrete Calculator - Professional Construction Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Calculator - Professional Concrete Volume Calculation Tool",
    description: "Free online concrete calculator to help you accurately calculate concrete volume required for various construction projects.",
    images: ["/twitter-image.jpg"],
    creator: "@concretecalc",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "construction",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Concrete Calculator",
    "description": "Professional concrete volume calculation tool for construction projects",
    "url": "https://concretecalculator.me",
    "applicationCategory": "ConstructionApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Concrete Calculator Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Concrete Calculator"
    },
    "featureList": [
      "Concrete volume calculation",
      "Material quantity estimation",
      "Cost calculation",
      "Multiple project types support",
      "Unit conversion (metric/imperial)"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <Breadcrumb />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* Google Analytics - Configured via NEXT_PUBLIC_GA_ID environment variable */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
