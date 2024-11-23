import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/zod";
import db from "./lib/db";
import bcrypt from "bcryptjs";
import { Role } from "./types/enums";
import { User } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
     
      authorize: async (credentials): Promise<User | null> => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Invalid credentials");
        }
      
        // Find the user in the database
        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });
        
        if (!user || !user.password) {
          throw new Error("no user found");
        }
      
        // Compare the password
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
      
        // Convertir el rol de Prisma a nuestro enum Role
        const userRole = user.role === "admin" ? Role.admin : Role.user;
        
        // Asegurarse de que todos los campos requeridos estén presentes
        return {
          id: user.id,
          email: user.email,
          role: userRole,
          username: user.username || user.firstName || user.email.split('@')[0],
          name: user.firstName || user.username || user.email.split('@')[0],
          image: user.image
        } as User;
      },
    }),
  ],
} satisfies NextAuthConfig;
