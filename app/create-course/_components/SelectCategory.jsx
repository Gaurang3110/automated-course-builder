import CategoryList from '../../_shared/CategoryList'
import React from 'react'
import Image from 'next/image'
import { useContext } from 'react'
import { UserInputContext } from '../../_context/UserInputContext'

const SelectCategory = () => {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext)

  const handleCategoryChange=(category)=>{
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }))
    // console.log("Selected Category:", category)
  }

  return (
    <div className='px-10 md:px-20'><h2 className='my-5'>Select the Course Category</h2>
    <div className='grid grid-cols-3 gap-10'>
      
      {CategoryList.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center justify-center gap-3 p-5 border rounded-xl hover:border-gray-500 hover:bg-gray-200 cursor-pointer ${userCourseInput.category === item.name ? 'border-gray-500 bg-gray-200' : 'border-gray-300'}`}
          onClick={()=>handleCategoryChange(item.name)}
        >
          <Image
            src={item.icon}
            width={50}
            height={50}
            alt={item.name}
            className="rounded-full"
          />
          <h2 className="text-sm font-medium">{item.name}</h2>
        </div>
      ))}
    </div></div>
  )
}

export default SelectCategory
