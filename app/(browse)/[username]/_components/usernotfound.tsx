'use client'
import { useParams } from "next/navigation"


 
 

export default function UserNotFound() {
    
  const params = useParams();
  return (
    <div className='flex justify-center items-center h-full'>
        <div className='flex justify-between gap-5 text-2xl'>
            <h1 className='font-semibold '>404</h1>
            <span>|</span>
            <p className="font-semibold"> This User: {params.username} cound not be found</p>
        </div>
      
    </div>
  )
}