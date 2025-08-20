import { db } from "../../../configs/db";
import { CourseList } from "../../../configs/schema";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await db.insert(CourseList).values({
      courseId: body.courseId,           // use frontend ID
      name: body.topic,
      category: body.category,
      level: body.difficulty,
      courseOutput: body.courseLayout,
      createdBy: body.email,
      userName: body.userName,
      userProfileImage: body.userImage || null,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error saving course:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
