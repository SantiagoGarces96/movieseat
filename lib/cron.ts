// Vercel envía CRON_SECRET en cada tarea programada. Sin esa variable, nadie
// puede ejecutar las tareas desde afuera.
export const isCronRequest = (request: Request): boolean => {
  const secret = process.env.CRON_SECRET;
  return (
    Boolean(secret) &&
    request.headers.get("authorization") === `Bearer ${secret}`
  );
};
