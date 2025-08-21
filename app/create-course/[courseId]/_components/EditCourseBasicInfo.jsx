"use-client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../@/components/ui/dialog";

import { HiPencilSquare } from "react-icons/hi2";
import { Input } from '../../../../@/components/ui/input'
import { Textarea } from "../../../../@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog";
import {Button} from "../../../../components/ui/button"


const EditCourseBasicInfo = ({course}) => {

  const[name,setName] = useState()
  const[description,setDescription] = useState()

const onUpdateHandler = () => {
    course.courseOutput.courseTitle = name;
    course.courseOutput.description = description;
    // console.log(course)
};


  return (
    <Dialog>
      <DialogTrigger><HiPencilSquare/></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Title & Description</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Course Title</label>
              <Input onChange={(e)=>setName(e.target.value)} defaultValue={course?.courseOutput.courseTitle}/>
            </div>
            <div>
              <label>Description</label>
              <Textarea className="h-40" defaultValue={course?.courseOutput.description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
