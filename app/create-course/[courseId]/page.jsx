"use client"
import React, { useEffect, useState } from "react"
import CourseBasicInfo from "./_components/CourseBasicInfo"
import CourseDetail from "./_components/CourseDetail"
import ChapterList from "./_components/ChapterList"

const CoursePage = ({ params }) => {
  const unwrappedParams = React.use(params) // unwrap Promise
  const courseId = unwrappedParams.courseId
  const [course, setCourse] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${params.courseId}`)
        const data = await res.json()
        console.log("Fetched course:", data)
        setCourse(data[0]) // because query returns array
      } catch (err) {
        console.error("Error fetching course:", err)
      }
    }

    fetchCourse()
  }, [params.courseId])

  if (!course) {
    return <div>Loading course...</div>
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <CourseBasicInfo course={course} />
      <CourseDetail course={course}/>
      <ChapterList course={course}/>



      <pre>{JSON.stringify(course.courseLayout, null, 2)}</pre>
    </div>
  )
}

export default CoursePage





// import React, { useEffect, useState } from "react"
// import CourseBasicInfo from "./_components/CourseBasicInfo"
// import CourseDetail from "./_components/CourseDetail"
// import ChapterList from "./_components/ChapterList"

// const CoursePage = ({ params }) => {
//   const unwrappedParams = React.use(params) // unwrap Promise
//   const courseId = unwrappedParams.courseId

//   const [course, setCourse] = useState(null)

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await fetch(`/api/course/${courseId}`)
//         const data = await res.json()
//         console.log("Fetched course:", data)
//         setCourse(data[0]) // because query returns array
//       } catch (err) {
//         console.error("Error fetching course:", err)
//       }
//     }

//     fetchCourse()
//   }, [courseId])

//   if (!course) {
//     return <div>Loading course...</div>
//   }

//   return (
//     <div className="mt-10 px-7 md:px-20 lg:px-44">
//       <h2 className="font-bold text-center text-2xl">Course Layout</h2>
//       <CourseBasicInfo course={course} />
//       <CourseDetail course={course} />
//       <ChapterList course={course} />

//       <pre>{JSON.stringify(course.courseLayout, null, 2)}</pre>
//     </div>
//   )
// }

// export default CoursePage


