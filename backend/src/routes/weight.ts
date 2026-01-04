import { FastifyInstance } from 'fastify';
import { addWeight } from '../domain/weight';
import { InMemoryWeightRepository } from '../infra/inMemoryWeightRepository';

const weightResponseSchema = {
  type: 'object',
  required: ['value', 'date'],
  properties: {
    value: { type: 'number' },
    date: { type: 'string', format: 'date' },
  },
};

const errorResponseSchema = {
  type: 'object',
  required: ['error'],
  properties: {
    error: {
      type: 'object',
      required: ['code', 'message'],
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

const weightSchema = {
  body: {
    type: 'object',
    required: ['value'],
    properties: {
      value: { type: 'number', exclusiveMinimum: 0 },
      date: { type: 'string', format: 'date' },
    },
  },
  response: {
    201: weightResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

export default async function weightRoutes(app: FastifyInstance) {
  const repo = new InMemoryWeightRepository();

  app.post('/weight', { schema: weightSchema }, async (req, res) => {
    const entry = await addWeight(repo, req.body as any);
    return res.code(201).send(entry);
  });
}
