import { db } from "@/lib/db";

export const getStremByUserId =async (userId:string)=>{
    const strem = await db.stream.findUnique({
        where:{userId}
    });
    return strem
}