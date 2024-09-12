import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: Schema.Types.ObjectId; // Añade el ID del usuario
      address?: string; // Ejemplo de agregar una dirección (como en el ejemplo)
    } & DefaultSession["user"];
  }
}
