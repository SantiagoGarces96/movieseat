import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Ejemplo con Google

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     // Puedes añadir más proveedores como GitHub, Facebook, etc.
//   ],
//   callbacks: {
//     async session({ session, token, user }) {
//       // Puedes agregar lógica personalizada aquí, como token o datos del usuario.
//       session.user.id = token.sub; // Ejemplo de añadir el ID del usuario a la sesión
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
