import nodemailer from 'nodemailer';
import { getStremByUserId } from './stream-service';
import { db } from './db';
import { sentNotificationStartStream } from '@/lib/cache/sentNotification';
import { log } from 'console';

export const sentToFollowersStartStream = async (
  participalIdentity: string | undefined
) => {
  if (sentNotificationStartStream.has(participalIdentity)) {
    console.log('Notification already sent for this stream');
    return;
  }
  
  
  let self = await db.user.findUnique({
    where: {
      id: participalIdentity,
    },
  });

  if (!self) {
    return;
  }
  let stream;
  try {
    stream = await getStremByUserId(self.id);
  } catch (error) {
    console.error('Error getting stream data:', error);
    return;
  }

  if (!stream?.isLive) {
    console.log('Stream is not live, skipping email sending');
    return;
  }

  const followersUsers = await db.follow.findMany({
    where: {
      followingId: self.id,
    },
    include: {
      follower: true,
    },
  });
  
  if (followersUsers.length === 0) {
    console.log('No followed users found, skipping email sending');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASSWORD!,
    },
  });

  const userStream = self?.username;
  const link = `https://twitch-clone-flame.vercel.app/${userStream}`;

  for (const followersUser of followersUsers) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER!,
        to: followersUser.follower.email,
        subject: `Started stream ${userStream}`,
        text: '',
        html: `
                    <div>
                        <h1>Stream has been started </h1>
                        <a href="${link}">${link}</a>
                        <p>You can join</p>
                    </div>`,
      });
    } catch (error) {
      console.error(
        `Failed to send mail to ${followersUser.follower.email}: ${error}`
      );
    }
  }
  sentNotificationStartStream.add(participalIdentity);
};
