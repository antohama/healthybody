import { FastifyInstance } from 'fastify';
import { addWeight } from '../domain/weight';

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
      console.log(JSON.stringify(req.body));
      return addWeight(req.body);
    },
  );
}
