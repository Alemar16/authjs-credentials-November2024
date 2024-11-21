import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Definimos los roles posibles como un tipo literal
type UserRole = "admin" | "user";

// Este archivo extiende los tipos de sesión y JWT en la librería NextAuth.js
declare module "next-auth" {
  // La interfaz Session extiende la interfaz de usuario por defecto para incluir un rol
  interface Session {
    user: {
      role: UserRole; // Usamos el tipo UserRole en lugar de string
    } & DefaultSession["user"];
  }

  // Extendemos la interfaz User para incluir el rol
  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  // La misma propiedad 'role' se extiende en el JWT usando UserRole
  interface JWT {
    role: UserRole;
  }
}
