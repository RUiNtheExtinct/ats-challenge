import { getPollingState } from "@/lib/pipeline";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ runId: string }>;

export async function GET(
    request: NextRequest,
    segmentData: { params: Params },
) {
    if (request.method !== "GET") {
        return NextResponse.json("Method not allowed", { status: 405 });
    }
    const params = await segmentData.params;
    const runId = params.runId;

    try {
        const pollingState = await getPollingState(runId);
        return NextResponse.json(pollingState, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
