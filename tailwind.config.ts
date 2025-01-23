import typography from "@tailwindcss/typography";
import tailwindScrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";
import tailwindCSSAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            maxHeight: {
                "1/2-screen": "50vh",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                light: {
                    primary: "#008ef4",
                    secondary: "#d6ff33",
                    background: "#f8f9fa",
                    surface: "#e9ecef",
                    "text-primary": "#333333",
                    "text-secondary": "#5c5c5c",
                    accent: "#4eb5ff",
                    error: "#ff4d4d",
                    success: "#28a745",
                    warning: "#ffc107",
                    info: "#17a2b8",
                    divider: "#e0e0e0",
                    "media-background": "#fafafa",
                    hover: "#e6f7ff",
                    "hover-secondary": "#d6ff33",
                    active: "#004b8d",
                    disabled: "#aaa",
                },
                dark: {
                    primary: "#005a9b",
                    secondary: "#7a9900",
                    background: "#121212",
                    surface: "#1e1e1e",
                    "text-primary": "#fcfcfc",
                    "text-secondary": "#c2c2c2",
                    accent: "#002642",
                    error: "#ff6666",
                    success: "#28a745",
                    warning: "#ffc107",
                    info: "#17a2b8",
                    divider: "#333333",
                    "media-background": "#0b0b0b",
                    hover: "#003366",
                    active: "#002642",
                    disabled: "#ccc",
                },
                whitesmoke: {
                    "100": "#303030",
                    "200": "#616161",
                    "300": "#919191",
                    "400": "#c2c2c2",
                    "500": "#f2f2f2",
                    "600": "#f5f5f5",
                    "700": "#f7f7f7",
                    "800": "#fafafa",
                    "900": "#fcfcfc",
                    DEFAULT: "#f2f2f2",
                },
                prussianblue: {
                    "100": "#00080d",
                    "200": "#000f1b",
                    "300": "#001728",
                    "400": "#001f35",
                    "500": "#002642",
                    "600": "#005a9b",
                    "700": "#008ef4",
                    "800": "#4eb5ff",
                    "900": "#a6daff",
                    DEFAULT: "#002642",
                },
                jet: {
                    "100": "#0a0a0a",
                    "200": "#141414",
                    "300": "#1f1f1f",
                    "400": "#292929",
                    "500": "#333333",
                    "600": "#5c5c5c",
                    "700": "#858585",
                    "800": "#adadad",
                    "900": "#d6d6d6",
                    DEFAULT: "#333333",
                },
                lime: {
                    "100": "#293300",
                    "200": "#526600",
                    "300": "#7a9900",
                    "400": "#a3cc00",
                    "500": "#ccff00",
                    "600": "#d6ff33",
                    "700": "#e0ff66",
                    "800": "#ebff99",
                    "900": "#f5ffcc",
                    DEFAULT: "#ccff00",
                },
                night: {
                    "100": "#040404",
                    "200": "#070707",
                    "300": "#0b0b0b",
                    "400": "#0e0e0e",
                    "500": "#111111",
                    "600": "#414141",
                    "700": "#717171",
                    "800": "#a0a0a0",
                    "900": "#d0d0d0",
                    DEFAULT: "#111111",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            animation: {
                first: "move-vertical 30s ease infinite",
                second: "move-in-circle 20s reverse infinite",
                third: "move-in-circle 40s linear infinite",
                fourth: "move-horizontal 40s ease infinite",
                fifth: "move-in-circle 20s ease infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            keyframes: {
                "move-horizontal": {
                    "0%": {
                        transform: "translateX(-50%) translateY(-10%)",
                    },
                    "50%": {
                        transform: "translateX(50%) translateY(10%)",
                    },
                    "100%": {
                        transform: "translateX(-50%) translateY(-10%)",
                    },
                },
                "move-in-circle": {
                    "0%": {
                        transform: "rotate(0deg)",
                    },
                    "50%": {
                        transform: "rotate(180deg)",
                    },
                    "100%": {
                        transform: "rotate(360deg)",
                    },
                },
                "move-vertical": {
                    "0%": {
                        transform: "translateY(-50%)",
                    },
                    "50%": {
                        transform: "translateY(50%)",
                    },
                    "100%": {
                        transform: "translateY(-50%)",
                    },
                },
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
        textShadow: {
            sm: "0 1px 2px var(--tw-shadow-color)",
            DEFAULT: "0 2px 4px var(--tw-shadow-color)",
            lg: "0 8px 16px var(--tw-shadow-color)",
        },
    },
    plugins: [
        tailwindCSSAnimate,
        tailwindScrollbar({
            nocompatible: true,
            // preferredStrategy: "pseudoelements",
        }),
        function ({
            matchUtilities,
            theme,
        }: {
            matchUtilities: any;
            theme: any;
        }) {
            matchUtilities(
                {
                    "text-shadow": (value: any) => ({
                        textShadow: value,
                    }),
                },
                { values: theme("textShadow") },
            );
        },
        typography,
    ],
};

export default config;
