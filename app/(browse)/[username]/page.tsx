import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import Actions from "./_components/actions";
import UserNotFound from "./_components/usernotfound";
import { isBlockedByUser } from "@/lib/block-service";




interface UserPageProps{
    params:{
        username:string;
    }
}
export default async function UserPage({params}:UserPageProps){
    
    const user = await getUserByUsername(params.username);
    if(!user){
        return <UserNotFound/>
    }
    const isFollowing = await isFollowingUser(user.id);
    const isBlocked= await isBlockedByUser(user.id);
    if(isBlocked){
        return <UserNotFound/>
    }



    return(
        <div className="flex flex-col gap-y-4">
            <p>username:{user.username}</p>
            <p>user ID:{user.id}</p>
            <p>is following:{`${isFollowing}`}</p>
            <p>is blocked by this user :{`${isBlocked}`}</p>
            <Actions userId={user.id} isFollowing ={isFollowing} />
        </div>
    )
}