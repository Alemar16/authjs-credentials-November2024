import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Este archivo extiende los tipos de sesión y JWT en la librería NextAuth.js
declare module "next-auth" {
  // La interfaz Session extiende la interfaz de usuario por defecto para incluir un rol
  interface Session {
    user: {
      role: string; // Se agrega la propiedad 'role'
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  // La misma propiedad 'role' se extiende en el JWT
  interface JWT {
    role: string;
  }
}
