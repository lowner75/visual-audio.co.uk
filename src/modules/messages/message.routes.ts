// src/modules/messages/messages.routes.ts

import { FastifyInstance } from 'fastify';
import { createMessage } from './message.service';
import { IMessage } from './message.model';

export interface CreateMessageInput {
  firstName: string;
  lastName: string;
  email: string;
  telephone: number;
  message: string;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function messageRoutes(fastify: FastifyInstance) {

  fastify.post<{ Body: CreateMessageInput }>('/api/messages', async (request, reply) => {
    try {
      const message = await createMessage(
        {
          ...request.body,
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        },
        reply 
      );
      return { success: true, message };
    } catch (err) {
      console.error('Error processing message:', err);
      return reply.status(500).send({ success: false, error: 'Failed to process message' });
    }
  });

}