import { Alert, AlertDescription } from "@/components/ui/alert";
import { PipelineAction } from "@/lib/types";
import { useEffect, useState } from "react";

export default function StateViewer({
    state,
}: {
    state: "idle" | "parsing" | PipelineAction;
}) {
    const [dotCount, setDotCount] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prevCount) => (prevCount + 1) % 4);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const getName = (name: string) => {
        switch (name) {
            case "anonymize":
                return "anonymizing";
            case "summarize":
                return "summarizing";
            case "reformat":
                return "formatting";
            default:
                return name;
        }
    };

    const getColorClass = (state: string) => {
        switch (state) {
            case "parsing":
                return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
            case "anonymize":
                return "border-green-500 bg-green-50 dark:bg-green-900/20";
            case "summarize":
                return "border-purple-500 bg-purple-50 dark:bg-purple-900/20";
            case "reformat":
                return "border-red-500 bg-red-50 dark:bg-red-900/20";
            default:
                return "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
        }
    };

    if (state === "idle") return null;

    return (
        <Alert
            className={`mb-4 border-l-4 ${getColorClass(state)} animate-pulse`}
        >
            <AlertDescription className="text-sm">
                We are <strong>{getName(state)}</strong> your resume. Please
                wait{".".repeat(dotCount)}
            </AlertDescription>
        </Alert>
    );
}
