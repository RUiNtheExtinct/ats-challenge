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
                return "reformatting";
            default:
                return name;
        }
    };

    if (state === "idle") return null;

    return (
        <Alert className="mb-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 animate-pulse">
            <AlertDescription className="text-sm">
                We are <strong>{getName(state)}</strong> your resume. Please
                wait{".".repeat(dotCount)}
            </AlertDescription>
        </Alert>
    );
}
