"use client"
import React, { useEffect, useState } from "react"
import CourseBasicInfo from "./_components/CourseBasicInfo"
import CourseDetail from "./_components/CourseDetail"
import ChapterList from "./_components/ChapterList"
import { Button } from "../../../components/ui/button";
import { GenerateChapterContent_AI } from "../../../configs/AIModel"
import LoadingDialog from "../_components/LoadingDialog"


const CoursePage = ({ params }) => {
  const unwrappedParams = React.use(params) // unwrap Promise
  const courseId = unwrappedParams.courseId
  const [course, setCourse] = useState(null)
  const [loading,setLoading] = useState(false);

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

  const GenerateChapterContent=()=>{
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async(chapter,index)=>{
      const PROMPT = 'Explain the concept in Detail on Topic : '+course?.name+' ,Chapter:'+chapter?.title+' in JSON Format with list of array with field as title , description and code example of given chapter in detail , Code Example(HTML Code format) if applicable'
      console.log(PROMPT)
      if(index<3){
        try{
          const chat = GenerateChapterContent_AI(course?.name, chapter?.title);

          const result = await chat.sendMessage(PROMPT);
          console.log(result?.response?.text())

          //Video URL


          //Save contect + url


          setLoading(false);
        }catch(e){
          setLoading(false);
          console.log(e)
        }
      }
    })

  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={loading}/>
      <CourseBasicInfo course={course} />
      <CourseDetail course={course}/>
      <ChapterList course={course}/>

      <Button onClick={GenerateChapterContent} className="my-10">Generate Course Content</Button>


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


