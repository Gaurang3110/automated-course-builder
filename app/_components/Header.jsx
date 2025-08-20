import React from 'react'
import Image from "next/image";
import { Button } from '../../components/ui/button'; 
// import { Button } from "@components/ui/button";


const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      <Image src="/next.svg" width={100} height={100} alt="Next.js logo" />
      <Button>Get Started</Button>
    </div>
  )
}

export default Header
