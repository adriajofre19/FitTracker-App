import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      // Inserta el usuario en la base de datos si no existe
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              avatar: user.image,
              externalId: account?.providerAccountId || "",
              password: "", // Provide a default value for password
              age: 0, // Provide a default value for age
              height: 0, // Provide a default value for height
              weight: 0, // Provide a default value for weight
            },
          });
        }
      } catch (error) {
        console.error("Error al insertar el usuario en la base de datos:", error);
        return false; // Retorna false si hay un error
      }
      return true; // Permite iniciar sesión
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirige a la página principal después de iniciar sesión
      return baseUrl + "/workouts";
    },

    async session({ session, token }: { session: any; token: any }) {
      // Agrega más datos al objeto de sesión si es necesario
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        session.user.id = dbUser.id; // Agrega el ID del usuario a la sesión
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
