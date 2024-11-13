import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";

import db from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //jwt: se ejecuta cada vez que se crea o se actualiza el token de sesión JWT
    //Aquí es dode puedes agregar informacion adicional al token de sesión
    jwt({ token, user }) {
      if (user && "role" in user) {
        token.role = user.role as string;
      }
      return token;
    },
    //seccion: se utiliza para agregar la información del token a la sesión del usuario
    //Lo que hace que este disponible en el cliente
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
