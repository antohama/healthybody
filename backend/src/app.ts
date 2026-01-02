import Fastify from 'fastify';
import healthRoutes from '../routes/health';
import weightRoutes from '../routes/weight';

export function buildApp() {
  const app = Fastify({
    logger: false,
  });

  app.register(healthRoutes);
  app.register(weightRoutes);

  return app;
}
