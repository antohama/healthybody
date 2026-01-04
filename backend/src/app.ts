import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import healthRoutes from './routes/health';
import weightRoutes from './routes/weight';
import { DomainError } from './domain/errors';
import { ApiErrorCodes } from './http/errorCodes';
import { FastifyError } from 'fastify';

export function buildApp() {
  const app = Fastify({
    logger: false,
  });

  app.setErrorHandler((error, _req, reply) => {
    if (error instanceof DomainError) {
      return reply.status(400).send({
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    if (isFastifyError(error) && (error as FastifyError).code === 'FST_ERR_VALIDATION') {
      return reply.status(400).send({
        error: {
          code: ApiErrorCodes.INVALID_INPUT,
          message: error.message,
        },
      });
    }

    return reply.status(500).send({
      error: {
        code: ApiErrorCodes.INTERNAL_ERROR,
        message: 'Internal server error',
      },
    });
  });

  app.register(swagger, {
    openapi: {
      info: {
        title: 'HealthyBody API',
        description:
          'Your personal nutrition coaching companion for tracking progress, building custom meal plans, and achieving lasting weight loss results.',
        version: '0.1.0',
      },
    },
  });

  app.register(swaggerUI, {
    routePrefix: '/docs',
  });

  app.register(healthRoutes);
  app.register(weightRoutes);

  return app;
}

function isFastifyError(error: unknown): error is FastifyError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as any).code === 'string'
  );
}
