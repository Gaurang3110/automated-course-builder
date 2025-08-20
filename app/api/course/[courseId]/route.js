// // app/api/course/[courseId]/route.js
// import { db } from '../../../../configs/db'
// import { CourseList } from '../../../../configs/schema'
// import { and, eq } from "drizzle-orm"
// import { auth } from "@clerk/nextjs/server"

// export async function GET(req, { params }) {
//   const { userId } = auth()

//   // Debug: check values
//   console.log("Params:", params.courseId, "UserId:", userId)
//   const allCourses = await db.select().from(CourseList)
// console.log("All courses:", allCourses)


//   const result = await db
//     .select()
//     .from(CourseList)
//     .where(
//       and(
//         eq(CourseList.courseId, params.courseId),  // varchar
//         eq(CourseList.createdBy, userId)           // must match what you stored
//       )
//     )

//   console.log("DB result:", result)
//   return Response.json(result)
// }


import { db } from "../../../../configs/db"
import { CourseList } from "../../../../configs/schema"
import { and, eq } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs/server"

export async function GET(req, { params }) {
  const user = await currentUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress

  // Debugging
  console.log("Params:", params.courseId, "UserEmail:", userEmail)

  // Optional: check all courses
  const allCourses = await db.select().from(CourseList)
  console.log("All courses:", allCourses)

  const result = await db
    .select()
    .from(CourseList)
    .where(
      and(
        eq(CourseList.courseId, params.courseId),  // varchar id
        eq(CourseList.createdBy, userEmail)        // match by email
      )
    )

  console.log("DB result:", result)
  return Response.json(result)
}
