import "@/app/globals.css";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { MAIN_FONT } from "@/lib/constants/fonts";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: `${APP_NAME} - ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    keywords: ["resume", "pdf editor", "AI resume", "resume parser"],
    authors: [{ name: `${APP_NAME} Team` }],
    openGraph: {
        title: `${APP_NAME} - ${APP_TAGLINE}`,
        description: APP_DESCRIPTION,
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <title>{`${APP_NAME} ${APP_TAGLINE}`}</title>
                <meta name="mobile-web-app-capable" content="yes" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body
                className={`${MAIN_FONT.className} scroll-smooth antialiased bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary`}
            >
                <Toaster position="bottom-right" reverseOrder={false} />
                <div className="flex flex-col min-h-svh">
                    <Navbar />
                    <main className="flex-1 flex">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
