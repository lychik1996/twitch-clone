import UrlCard from "./_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStremByUserId } from "@/lib/stream-service";
import KeyCard from "./_components/key-card";
import ConnectModal from "./_components/connect-modal";

export default async function KeysPage() {
    const self = await getSelf();
    const strem = await getStremByUserId(self.id);

    if(!strem){
        throw new Error("Strea not found")
    };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal/>
      </div>
      <div className="space-y-4">
            <UrlCard value={strem.serverUrl}/>
            <KeyCard value={strem.streamKey}/>
      </div>
    </div>
  );
}
