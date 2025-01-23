import { startPipelineWithPolling } from "@/lib/pipeline/polling";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json("Method not allowed", { status: 405 });
    }

    const { text, pipelineRequest } = await request.json();

    try {
        const runId = await startPipelineWithPolling(text, pipelineRequest);
        return NextResponse.json(runId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
