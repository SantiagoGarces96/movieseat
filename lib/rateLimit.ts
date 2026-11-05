import RateLimit from "@/models/RateLimit";

// Los contadores viven en MongoDB porque en Vercel cada petición puede
// ejecutarse en una instancia distinta, sin memoria compartida.
export const getAttempts = async (key: string): Promise<number> => {
  const record = await RateLimit.findOne({
    _id: key,
    expiresAt: { $gt: new Date() },
  });
  return record?.count ?? 0;
};

export const addAttempt = async (
  key: string,
  windowMs: number,
): Promise<number> => {
  const now = new Date();
  const active = await RateLimit.findOneAndUpdate(
    { _id: key, expiresAt: { $gt: now } },
    { $inc: { count: 1 } },
    { new: true },
  );
  if (active) return active.count;

  await RateLimit.updateOne(
    { _id: key },
    { count: 1, expiresAt: new Date(now.getTime() + windowMs) },
    { upsert: true },
  );
  return 1;
};

export const clearAttempts = async (key: string): Promise<void> => {
  await RateLimit.deleteOne({ _id: key });
};

// Vercel define este encabezado con la IP real de quien hace la petición.
export const getClientIp = (request: Request): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
