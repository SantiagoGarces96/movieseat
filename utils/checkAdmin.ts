import jwt from "jsonwebtoken";

interface Payload {
  userId: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export function generateToken(payload: Payload, expiresIn = "1h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): Payload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as Payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
