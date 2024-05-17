import { getSelf } from "@/lib/auth-service"
import { getStremByUserId } from "@/lib/stream-service";
import ToggleCard from "./_components/toggle-card";

export default async function ChatPage(){
    const self =await getSelf();
    const stream = await getStremByUserId(self.id);

    if(!stream){
        throw new Error("stren not found");
    }
    return(
        <div className="p-6">
            <div className=" mb-4">
                <h1 className="text-2xl font-bold">
                Chat Settings
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                field = 'isChatEnabled'
                label="Enable chat"
                value={stream.isChatEnabled}
                />
                <ToggleCard
                field = 'isChatDelayed'
                label="Delay chat"
                value={stream.isChatDelayed}
                />
                <ToggleCard
                field = 'isChatFollowersOnly'
                label="Must be following to chat"
                value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}