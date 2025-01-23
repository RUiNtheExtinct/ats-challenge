"use server";

import { SUMMARIZE_PROMPT, TREE_OF_THOUGHT_PROMPT } from "@/lib/constants";
import { AIPipelineOptions } from "@/lib/types";
import { getAgent } from "./agent-builder";

const summarizeAgent = getAgent(SUMMARIZE_PROMPT);

export async function summarize(text: string, options: AIPipelineOptions) {
    if (options?.chainOfThought) {
        text = TREE_OF_THOUGHT_PROMPT(text);
    }
    const response = await summarizeAgent.invoke({
        input: text,
    });

    return response.output;
}
