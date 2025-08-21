import React from "react";
import Image from "next/image";
import {HiOutlinePuzzle} from "react-icons/hi";
import {Button} from '../../../../components/ui/button'
import EditCourseBasicInfo from "./EditCourseBasicInfo";

const CourseBasicInfo = ({ course }) => {
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">{course.courseOutput?.courseTitle}<EditCourseBasicInfo course={course}/></h2>
          <p className="text-sm text-gray-400 mt-3">{course.courseOutput?.description}</p>
          <h2 className="font-medium mt-2 flex gap-2 items-center"><HiOutlinePuzzle/>{course.category}</h2>
          <Button className='w-full mt-5'>Start</Button>
        </div>
        <div>
          <Image src={'/next.svg'} alt="Course Image" width={300} height={300} className="w-full rounded-xl h-[250px] object-cover" />
        </div>
      </div>
          
    </div>

  );
};

export default CourseBasicInfo;
