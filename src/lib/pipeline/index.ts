import { anonymize } from "@/lib/pipeline/anonymize";
import { reformat } from "@/lib/pipeline/reformat";
import { summarize } from "@/lib/pipeline/summarize";
import { PipelineAction, PipelineRequest } from "@/lib/types";
import { parseDocument } from "@/lib/utils";

export async function pipeline(file: File, pipelineRequest: PipelineRequest) {
    let resultText = await parseDocument(file);

    for (const action of pipelineRequest) {
        console.log(`Executing ${action.action} pipeline...`);
        const pipelineFunction = getPipeline(action.action);
        resultText = await pipelineFunction(resultText, action?.options);
    }

    return resultText;
}

export function getPipeline(pipelineAction: PipelineAction) {
    switch (pipelineAction) {
        case "anonymize":
            return anonymize;
        case "summarize":
            return summarize;
        case "reformat":
            return reformat;
        default:
            throw new Error("Invalid pipeline action");
    }
}

export function extractFormData(formData: FormData): {
    valid: boolean;
    file?: File;
    actions?: PipelineRequest;
    error?: string;
} {
    console.log("Extracted form data", formData);
    const file = formData.get("file") as File;
    const actions: PipelineRequest = JSON.parse(
        formData.get("actions") as string,
    );

    if (!file || !actions) {
        return {
            valid: false,
            error: "Missing required file information",
        };
    }

    return {
        valid: true,
        file,
        actions: actions,
    };
}
