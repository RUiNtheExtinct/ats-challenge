"use server";

import { REFORMAT_PROMPT, TREE_OF_THOUGHT_PROMPT } from "@/lib/constants";
import { OpenAIClient } from "@/lib/pipeline/openai-client";
import { AIPipelineOptions } from "@/lib/types";

const client = OpenAIClient;

export async function reformat(text: string, options: AIPipelineOptions) {
    let prompt = REFORMAT_PROMPT(text);
    if (options?.chainOfThought) {
        prompt = TREE_OF_THOUGHT_PROMPT(prompt);
    }
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        response_format: {
            type: options?.chainOfThought ? "json_object" : "text",
        },
    });

    return response.choices[0].message.content;
}
