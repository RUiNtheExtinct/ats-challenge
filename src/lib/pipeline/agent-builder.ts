import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";

const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
});

export function getAgent(promptTemplate: string) {
    const systemPrompt = ChatPromptTemplate.fromMessages([
        ["system", promptTemplate],
        ["placeholder", "{agent_scratchpad}"],
        ["human", "{input}"],
    ]);
    const agent = createToolCallingAgent({
        llm,
        prompt: systemPrompt,
        tools: [],
    });
    const agentExecutor = new AgentExecutor({
        agent,
        tools: [],
    });
    return agentExecutor;
}
