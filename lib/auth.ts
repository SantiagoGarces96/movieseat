import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userRole } from "@/types/user";
import { SESSION_COOKIE, SessionUser, verifySessionToken } from "./session";

export const getSession = async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
};

// Llamar fuera de cualquier try/catch: redirect() funciona lanzando una excepción.
export const requireAdmin = async (): Promise<SessionUser> => {
  const session = await getSession();
  if (session?.role !== userRole.ADMIN) {
    redirect("/login");
  }
  return session;
};
