import { Inter, Space_Mono } from "next/font/google";

export const MAIN_FONT = Inter({ subsets: ["latin"] });

export const LOGO_FONT = Space_Mono({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "700"],
});
