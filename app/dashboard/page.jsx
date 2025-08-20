// import React from 'react'

// const page = () => {
//   return (
//     <div>
//       hi
//     </div>
//   )
// }

// export default page

// app/dashboard/page.tsx
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import AddCourse from './_components/AddCourse';

export default async function Dashboard() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <div>
      {/* <UserButton/> */}
      <AddCourse/>
    </div>
  );
}

