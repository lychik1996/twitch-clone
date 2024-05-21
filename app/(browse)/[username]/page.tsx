import { getUserByUsername } from "@/lib/user-service";
import UserNotFound from "./_components/not-found";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import StreamPlayer from "@/components/stream-player";




interface UserPageProps{
    params:{
        username:string;
    }
}
export default async function UserPage({params}:UserPageProps){
    const user = await getUserByUsername(params.username);
    if(!user || !user.stream){
       return <UserNotFound/>
    }
    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if(isBlocked){
        return <UserNotFound/>
    }
    return(
        <StreamPlayer
        user ={user}
        stream={user.stream}
        isFollowing={isFollowing}
        />
    )
}