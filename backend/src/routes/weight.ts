import { FastifyInstance } from 'fastify';
import { addWeight } from '../domain/weight';
import { InMemoryWeightRepository } from '../infra/inMemoryWeightRepository';

const repo = new InMemoryWeightRepository();

const weightSchema = {
  body: {
    type: 'object',
    required: ['value'],
    properties: {
      value: { type: 'number', exclusiveMinimum: 0 },
      date: { type: 'string', format: 'date' },
    },
  },
};

export default async function weightRoutes(app: FastifyInstance) {
  app.post<{ Body: { value: number; date?: string } }>(
    '/weight',
    { schema: weightSchema },
    async (req) => {
      return addWeight(repo, req.body);
    },
  );
}
