"use server";

import { REFORMAT_PROMPT, TREE_OF_THOUGHT_PROMPT } from "@/lib/constants";
import { AIPipelineOptions } from "@/lib/types";
import { getAgent } from "./agent-builder";

const reformatAgent = getAgent(REFORMAT_PROMPT);

export async function reformat(text: string, options: AIPipelineOptions) {
    if (options?.chainOfThought) {
        text = TREE_OF_THOUGHT_PROMPT(text);
    }
    const response = await reformatAgent.invoke({
        input: text,
    });

    return response.output;
}
