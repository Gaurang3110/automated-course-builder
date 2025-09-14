import { NextResponse } from "next/server";
import { GenerateCourseLayout_AI } from "../../../configs/AIModel"; // adjust path

export async function GET() {
  try {
    const prompt = "Say hello in JSON format like {\"message\": \"Hello from Gemini!\"}";
    
    const result = await GenerateCourseLayout_AI.sendMessage(prompt);
    const text = result.response?.text();

    return NextResponse.json({ success: true, response: text });
  } catch (err) {
    console.error("❌ Gemini test error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
