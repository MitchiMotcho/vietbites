import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Be_Vietnam_Pro, Source_Sans_3 } from "next/font/google";

const beVietnam = Be_Vietnam_Pro({
    subsets: ["latin"],
    variable: "--font-be-vietnam",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
    subsets: ["latin"],
    variable: "--font-source-sans",
    display: "swap",
});

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Viet Bites - Canada",
    description: "Authentic Vietnamese cuisine in Canada",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html data-scroll-behavior="smooth" lang="en">
            <body
                className={`${beVietnam.variable} ${sourceSans.variable} antialiased`}
            >
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
