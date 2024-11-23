import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import db from "@/lib/db"
import type { JWT } from "next-auth/jwt"
import type { Session, User as AuthUser } from "next-auth"
import { Role } from "./types/enums" // Importar Role desde nuestros enums

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as any,
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id!
        token.role = user.role as Role // Asegurar el tipo aquí también
        token.email = user.email ?? ''
        token.name = user.username || (user.email ? user.email.split('@')[0] : '')
        token.username = user.username
        token.image = user.image
      }
      return token
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.username = token.username as string | null
        session.user.image = token.image as string | null
      }
      return session
    },
  },
})