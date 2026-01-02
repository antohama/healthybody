import Fastify from 'fastify';

const app = Fastify();

app.get('/health', async () => {
  return { status: 'ok' };
});

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 3000 }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}
