import { extractFormData, pipeline } from "@/lib/pipeline";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json("Method not allowed", { status: 405 });
    }
    const formData = await request.formData();

    try {
        const { valid, file, actions, error } = extractFormData(formData);

        if (!valid) {
            return NextResponse.json({ error }, { status: 400 });
        }
        const result = await pipeline(file, actions);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
