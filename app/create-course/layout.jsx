// app/create-course/layout.jsx
"use client";
import React from "react";
import Header from "../dashboard/_components/Header";
import { UserInputContext } from "../_context/UserInputContext";
import { useState } from "react";
export default function CreateCourseLayout({ children }) {
  const[userCourseInput, setUserCourseInput] = useState([]);

  return (
    <div className="">
      <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
        <>
          <Header />
          {children}
        </>
      </UserInputContext.Provider>
    </div>
  );
}
