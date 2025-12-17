// src/modules/messages/messages.service.ts

import { MessageModel, IMessage } from './message.model';
import { FastifyReply } from 'fastify';

export async function createMessage(data: IMessage, reply: FastifyReply) {
  const message = new MessageModel(data);
  
  try {

    // Save to DB
    await message.save();

    // Send email via Nodemailer plugin
    await reply.sendEmail({
      to: '"Bryan Lown" <hello@bryanlown.com>', //process.env.SMTP_USER!,
      subject: `New Contact Form Message from ${message.firstName} ${message.lastName}`,
      html: `
        <p><strong>Name:</strong> ${message.firstName} ${message.lastName}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Phone:</strong> ${message.telephone}</p>
        <p><strong>Message:</strong> ${message.message}</p>
        <p><strong>Source:</strong> ${message.source ?? 'website'}</p>
        <p><strong>IP:</strong> ${message.ipAddress ?? 'unknown'}</p>
        <p><strong>User Agent:</strong> ${message.userAgent ?? 'unknown'}</p>
      `,
    });

  } catch (err) {
    console.error('Failed to save/send message:', err);
    return { success: false, error: 'Message could not be processed.' };
  }

  return message;
}