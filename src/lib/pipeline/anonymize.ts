"use server";

import { ANONYMIZE_PROMPT, TREE_OF_THOUGHT_PROMPT } from "@/lib/constants";
import { AIPipelineOptions } from "@/lib/types";
import { getAgent } from "./agent-builder";

const anonymizeAgent = getAgent(ANONYMIZE_PROMPT);

export async function anonymize(text: string, options: AIPipelineOptions) {
    if (options?.chainOfThought) {
        text = TREE_OF_THOUGHT_PROMPT(text);
    }
    const response = await anonymizeAgent.invoke({
        input: text,
    });

    return response.output;
}
