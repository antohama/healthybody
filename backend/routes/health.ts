import { FastifyInstance } from 'fastify';
import { getHealth } from '../domain/health';

export default async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    return getHealth();
  });
}
