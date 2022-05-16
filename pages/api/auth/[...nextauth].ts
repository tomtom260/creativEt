import NextAuth from "next-auth"
import type { NextApiRequest, NextApiResponse } from "next"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../utils/db"
import bcrypt from "bcryptjs"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
      maxAge: !req.body["rememmberMe"] ? 30 * 24 * 60 * 60 : 60 * 10, // 30 days : 10min
    },
    jwt: {
      secret: process.env.SECRET,
    },
    callbacks: {
      async jwt({ token, account }) {
        // if (token) {
        // 1. add token.type = account.userType
        // }
        return token
      },
      async session({ session, token }) {
        if (session) {
          session.user.id = token.sub
          // add  user type to your session object
          // 2. add session.user.type = token.type
        }
        return session
      },
      async signIn({ profile, user, account }) {
        if (account.type === "oauth") {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: user.email,
            },
          })

          if (existingUser) {
            if (!existingUser.emailVerified) {
              if (account.provider === "google" && !profile.email_verified) {
                return false
              }
              await prisma.user.update({
                where: {
                  id: existingUser.id,
                },
                data: {
                  emailVerified: new Date(),
                },
              })
            }

            await prisma.account.upsert({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
              create: {
                ...account,
                userId: existingUser.id,
              },
              update: {},
            })
          }
        }
        return true
      },
    },
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: "/auth/signin",
    },
    events: {
      async createUser({ user }) {
        await prisma.profile.create({
          data: {
            userId: user.id,
            username: `${user.name?.replace(" ", "_")}_${Math.ceil(
              Math.random() * 10000
            )}`,
          },
        })
      },
    },
    providers: [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID!,
        clientSecret: process.env.FACEBOOK_SECRET!,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      CredentialsProvider({
        name: "Credentials",
        id: "credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
          },
          password: {
            label: "Password",
          },
        },
        authorize: async (
          credentials: Record<"email" | "password", string> | undefined
        ) => {
          const { email, password } = credentials!
          const user = await prisma.user.findUnique({
            include: {
              accounts: {
                select: {
                  password: true,
                  type: true,
                },
              },
            },
            where: {
              email,
            },
          })
          const credentialAccount = user?.accounts.find(
            (acc) => acc.type === "credentials"
          )
          if (credentialAccount) {
            if (bcrypt.compareSync(password, credentialAccount?.password!)) {
              const { accounts, ...userInfo } = user!
              return userInfo
            }
          }
          // If you return null or false then the credentials will be rejected
          return null
        },
      }),
    ],
  })
}
