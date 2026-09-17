import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { business } from "@/lib/business";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.spotlesscarpetcleaning.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Carpet & Upholstery Cleaning`,
    template: `%s | ${business.name}`,
  },
  description:
    "Professional carpet, upholstery, sofa and mattress cleaning. Serving selected areas across Scotland and England, including surrounding areas. Get a fast quote via WhatsApp or our contact form.",
  keywords: [
    "carpet cleaning",
    "upholstery cleaning",
    "sofa cleaning",
    "mattress cleaning",
    "carpet cleaning Scotland",
    "carpet cleaning England",
  ],
  openGraph: {
    type: "website",
    title: `${business.name} | Carpet & Upholstery Cleaning`,
    description: business.shortDescription,
    siteName: business.name,
    images: ["/images/logo/spotless-carpet-cleaning-logo-og.png"],
  },
  twitter: {
    card: "summary",
    title: `${business.name} | Carpet & Upholstery Cleaning`,
    description: business.shortDescription,
    images: ["/images/logo/spotless-carpet-cleaning-logo-og.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.shortDescription,
    areaServed: [
      ...business.serviceAreas.scotland,
      ...business.serviceAreas.england,
    ].map((area) => ({ "@type": "AdministrativeArea", name: area })),
    ...(business.phone.number ? { telephone: business.phone.number } : {}),
    ...(business.email.address ? { email: business.email.address } : {}),
    image: `${siteUrl}/images/logo/spotless-carpet-cleaning-logo-og.png`,
  };

  return (
    <html lang="en-GB">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
      </body>
    </html>
  );
}
