// src/modules/messages/messages.routes.ts

import { FastifyInstance } from 'fastify';
import { createMessage } from './message.service';
import { IMessage } from './message.model';

export async function messageRoutes(fastify: FastifyInstance) {

  fastify.post<{ Body: IMessage }>('/api/messages', async (request, reply) => {
    try {
      const message = await createMessage(request.body, reply);
      return { success: true, message };
    } catch (err) {
      console.error('Error processing message:', err);
      return reply.status(500).send({ success: false, error: 'Failed to process message' });
    }
  });

}