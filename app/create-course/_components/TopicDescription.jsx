"use client"
import React, { useContext } from 'react'
import { Input } from '../../../@/components/ui/input'
import { Textarea } from "../../../@/components/ui/textarea"
import { UserInputContext } from '../../_context/UserInputContext'

const TopicDescription = () => {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext)
  const handleInputChange=(fieldName,value)=>{
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  return (
    <div className='mx-20 lg:mx-44'>
      {/* Topic */}
      
      <div className='mt-5'>
        <label>
          Write the topic for which you want to create a course.
          <Input placeholder={'Topic'} className="h-14 text-xl"
          onChange={(e) => handleInputChange('topic', e.target.value)} value={userCourseInput.topic || ''}
          />
        </label>
      </div>

      {/* TextArea Desc */}
            <div className='mt-5'>
        <label>
          Tell us more about your course topic.
         <Textarea placeholder={'About your course'} className="h-14 text-xl" 
         onChange={(e) => handleInputChange('description', e.target.value)} value={userCourseInput.description || ''}

         />
        </label>
      </div>
      
    </div>
  )
}

export default TopicDescription
