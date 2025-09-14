import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Merge new fields into existing JSON
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: sql`courseOutput || ${JSON.stringify(
          body.courseOutput
        )}::jsonb`,
      })
      .where(eq(CourseList.id, body.id))
      .returning({ id: CourseList.id });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
