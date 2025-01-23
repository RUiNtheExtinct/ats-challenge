"use server";

import {
    PipelineAction,
    PipelineRequestAction,
    PollingState,
} from "@/lib/types";
import { initializeRedisClient } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { anonymize } from "./anonymize";
import { reformat } from "./reformat";
import { summarize } from "./summarize";

async function updatePollingState(
    runId: string,
    partialState: Partial<PollingState>,
) {
    const redis = await initializeRedisClient();
    const key = `pipelineState:${runId}`;
    const currentStateRaw = await redis.get(key);

    let currentState: PollingState;
    if (currentStateRaw) {
        currentState = JSON.parse(currentStateRaw) as PollingState;
    } else {
        currentState = {
            status: "idle",
        };
    }

    const newState = {
        ...currentState,
        ...partialState,
    };

    await redis.set(key, JSON.stringify(newState));
}

export async function startPipelineWithPolling(
    text: string,
    pipelineRequest: PipelineRequestAction,
): Promise<string> {
    const redis = await initializeRedisClient();
    const runId = uuidv4();

    const initialState: PollingState = {
        status: "in-progress",
        runId: runId,
        action: pipelineRequest.action,
    };
    await redis.set(`pipelineState:${runId}`, JSON.stringify(initialState));

    (async () => {
        try {
            const options = pipelineRequest?.options;
            const action = pipelineRequest.action;
            const fn = getPipeline(action);
            const resultText = await fn(text, options);

            await updatePollingState(runId, {
                status: "completed",
                result: resultText,
            });
        } catch (err: any) {
            await updatePollingState(runId, {
                status: "error",
                error: err.message ?? String(err),
            });
        }
    })();

    return runId;
}

export async function getPollingState(runId: string): Promise<PollingState> {
    const redis = await initializeRedisClient();
    const key = `pipelineState:${runId}`;
    const currentStateRaw = await redis.get(key);

    if (!currentStateRaw) {
        throw new Error(`Pipeline state not found for runId: ${runId}`);
    }

    return JSON.parse(currentStateRaw) as PollingState;
}

function getPipeline(pipelineAction: PipelineAction) {
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
