"use client";
import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";
interface ActionsProps{
    isFollowing:boolean;
    
    userId:string;
}
export default function Actions({isFollowing,userId}:ActionsProps){
    const [isPending, startTransition]= useTransition();
    const handleFollow = ()=>{
        startTransition(()=>{
            onFollow(userId)
            .then((data)=>toast.success(`You are not following ${data.following.username}`))
            .catch(()=>toast.error("Something went wrong"))
        })
    }
    const handleUnfollow = ()=>{
        startTransition(()=>{
            onUnfollow(userId)
            .then((data)=>toast.success(`You have unfollowed ${data.following.username}`))
            .catch(()=>toast.error("Something went wrong"))
        })
    }
    const onClick = ()=>{
        if(isFollowing){
            handleUnfollow()
        }else{
            handleFollow()
        }
    }
    const handleBlock = ()=>{
        startTransition(()=>{
            onBlock(userId)
            .then((data)=>toast.success(`Blocked the user ${data.blocked.username}`))
            .catch(()=>toast.error("something went wrong"))
        })
    }
    const handleUnblock = ()=>{
        startTransition(()=>{
            onUnblock(userId)
            .then((data)=>toast.success(`Unblocked the user ${data.blocked.username}`))
            .catch(()=>toast.error("something went wrong"))
        })
    }
    // const onClickBlock = ()=>{
    //     if(isBlocked){
    //         handleUnblock()
    //     }else{
    //         handleBlock()
    //     }
    // }
    //todo to end block
    return(
        <>
        <Button disabled={isPending} onClick={onClick} variant='primary'>
        {isFollowing?"Unfollow":"Follow"}
       </Button> 
       <Button onClick={handleUnblock} disabled={isPending}>
        Unblock
       </Button>
        </>
       
    )
}