'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserNotFound() {
    
  return (
    <div className='flex  justify-center items-center h-full '>
        <div className='flex flex-col justify-between items-center gap-5 text-2xl text-muted-foreground'>
        <h1 className="text-4xl">404</h1>
            <p>
                We couldn&apos;t find the user you were looking for.
            </p>
            <Button variant="secondary" asChild>
                <Link href="/">Go back home</Link>
            </Button>
        </div>
      
    </div>
  )
}