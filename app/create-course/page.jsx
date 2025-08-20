"use client";
import React from "react";
import { useState } from "react";
import uuid4 from "uuid4";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import { Button } from "../../components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { useEffect, useContext } from "react";
import { GenerateCourseLayout_AI } from "../../configs/AIModel";
import LoadingDialog from "./_components/LoadingDialog";
import { useUser } from "@clerk/nextjs";
import { db } from "../../configs/db";
// import { CourseList } from "../../configs/schema";
import { CourseList } from "../../configs/schema.jsx"; // Adjust the import path if needed

const CreateCourse = () => {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const {user} = useUser();

  useEffect(() => {
    console.log("User Course Input:", userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (activeIndex === 0) {
      return (
        !userCourseInput?.category || userCourseInput?.category?.length === 0
      );
    }

    if (activeIndex === 1) {
      return (
        !userCourseInput?.topic ||
        userCourseInput?.topic?.length === 0 ||
        !userCourseInput?.description ||
        userCourseInput?.description?.length === 0
      );
    }

    if (activeIndex === 2) {
      return (
        !userCourseInput?.difficulty ||
        !userCourseInput?.duration ||
        !userCourseInput?.displayVideo ||
        userCourseInput?.noOfChapters === "" ||
        userCourseInput?.noOfChapters === undefined
      );
    }

    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    const BASIC_PROMPT = `
Create a course layout with the following details:

- Topic: "${userCourseInput.topic}"
- Description: "${userCourseInput.description}"
- Category: "${userCourseInput.category}"
- Difficulty: "${userCourseInput.difficulty}"
- Duration: "${userCourseInput.duration}"
- Number of Chapters: ${userCourseInput.noOfChapters}
- Display Video: ${userCourseInput.displayVideo}

⚠️ Return ONLY valid JSON in the following format (no extra text, no markdown):

{
  "courseTitle": "...",
  "description": "...",
  "category": "...",
  "difficulty": "...",
  "duration": "...",
  "displayVideo": true/false,
  "chapters": [
    {
      "title": "...",
      "description": "...",
      "recommendedReadings": ["...", "..."],
      "videoTitle": "..."
    }
  ]
}
`;

    console.log("Generating Course Layout with prompt:", BASIC_PROMPT);

try {
  const result = await GenerateCourseLayout_AI.sendMessage(BASIC_PROMPT);
  const text = result.response?.text();

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.warn("⚠️ Model returned invalid JSON, raw text was:", text);
    const match = text.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : null;
  }

  if (parsed) {
    console.log("✅ Parsed Course Layout:", parsed);
    await SaveCourseLayoutInDb(parsed);
  } else {
    console.warn("⚠️ Parsed course layout is null, skipping DB save.");
  }
} catch (err) {
  console.error("❌ Error generating course layout:", err);
} finally {
  setLoading(false);
}

  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
  if (!courseLayout) return; // skip if invalid
  try {
    var id = uuid4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      category: userCourseInput?.category,
      level: userCourseInput?.difficulty,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    });
    console.log("Course saved in DB:", result);
  } catch (err) {
    console.error("❌ Error saving course to DB:", err);
  } finally {
    setLoading(false);
  }
};



//   const SaveCourseLayoutInDb=async(courseLayout)=>{
//     var id = uuid4();
//     setLoading(true);
//     const result=await db.insert(CourseList).values({
//       courseId: id,
//       name: userCourseInput?.topic,
//       category: userCourseInput?.category,
//       level: userCourseInput?.difficulty,
//       courseOutput: courseLayout,
//       createdBy: user?.primaryEmailAddress?.emailAddress,
//       userName: user?.fullName,
//       userProfileImage: user?.imageUrl,
//   })
//   console.log("Course saved in DB:", result);
//   setLoading(false);
// }



  return (
    <div>
      {/* Steppers */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-gray-600"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-gray-600"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Components */}
        {activeIndex == 0 ? <SelectCategory /> : null}
        {activeIndex == 1 ? <TopicDescription /> : null}
        {activeIndex == 2 ? <SelectOption /> : null}

        {/* Next Previous Button */}
        <div className="flex justify-between items-center mt-10">
          <Button
            disabled={activeIndex == 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Back
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCourseLayout()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;
