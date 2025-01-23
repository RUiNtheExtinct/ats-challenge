import { PipelineRequestAction, PollingState } from "@/lib/types";

export async function parseDocument(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/parse-document", {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("Failed to parse document");
    }
    const result: string = await response.json();
    return result;
}

export async function startPolling(
    text: string,
    pipelineRequest: PipelineRequestAction,
) {
    const response = await fetch("/api/polling/start", {
        method: "POST",
        body: JSON.stringify({ text, pipelineRequest }),
    });
    if (!response.ok) {
        throw new Error("Failed to start polling");
    }
    const result: string = await response.json();
    return result;
}

export async function getPollingState(runId: string) {
    const response = await fetch(`/api/polling/get/${runId}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Failed to get polling state");
    }
    const result: PollingState = await response.json();
    return result;
}
