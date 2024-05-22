import { headers } from 'next/headers';
import { WebhookReceiver } from 'livekit-server-sdk';

import { db } from '@/lib/db';

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;

if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
  console.error('LiveKit API key or secret is missing');
} else {
  console.log('LiveKit API Key and Secret are loaded correctly');
}

const receiver = new WebhookReceiver(LIVEKIT_API_KEY!, LIVEKIT_API_SECRET!);


export async function POST(req: Request) {
  const body = await req.text();

  const headerPayload = headers();
  const authorization = headerPayload.get('Authorization');

  if (!authorization) {
    return new Response('No authorization header', { status: 400 });
  }

  const event = receiver.receive(body, authorization);

  if (event.event === 'ingress_started') {
    await db.stream.update({
      //need just update
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }
  if (event.event === 'ingress_ended') {
    await db.stream.update({
      //need just update
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }
  return new Response('',{status:200})
}
