import {Webhook} from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import {db} from '@/lib/db'

export async function POST(req:Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if(!WEBHOOK_SECRET){
        throw new Error("Pleaseadd CLERK_WEBHOOK_SECRETT from Clerk")
    }

    const headerayload = headers();
    const svix_id = headerayload.get('svix-id');
    const svix_timestamp =headerayload.get("svix-timestamp");
    const svix_signature = headerayload.get('svix-signature');

    if(!svix_id || !svix_signature || !svix_timestamp){
        return new Response('Error occured -- no svix headers',{
            status:400
        })
    }
    const payload  =await req.json();
    const body = JSON.stringify(payload);
    

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt:WebhookEvent

    try{
        evt = wh.verify(body,{
            "svix-id":svix_id,
            "svix-timestamp":svix_timestamp,
            "svix-signature":svix_signature
        }) as WebhookEvent
    }catch(err){
        console.error('Error verifying webhook:',err);
        return new Response('Error occured',{
            status:400
        })
        
    }

    
    const eventType = evt.type;

    try {
        if (eventType === 'user.created') {
          await db.user.create({
            data: {
              externalUserId: payload.data.id,
              username: payload.data.username,
              imageUrl: payload.data.image_url,
              stream: {
                create: {
                  name: `${payload.data.username}'s stream`,
                }
              }
            }
          });
        } else if (eventType === 'user.updated') {
          await db.user.update({
            where: {
              externalUserId: payload.data.id
            },
            data: {
              username: payload.data.username,
              imageUrl: payload.data.image_url
            }
          });
        } else if (eventType === 'user.deleted') {
          await db.user.delete({
            where: {
              externalUserId: payload.data.id
            }
          });
        }
    
        return new Response('Webhook processed successfully', { status: 200 });
      } catch (err) {
        console.error('Error processing webhook event:', err);
        return new Response('Internal Server Error', { status: 500 });
      }
}