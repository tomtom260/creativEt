import { NextApiRequest, NextApiResponse } from "next"
import { wrongRequestMethodError } from "../../../utils/apiResponses"
import bcryptjs from "bcryptjs"
import { prisma } from "../../../utils/db"
import sendMail from "../../../utils/mail"
import crypto from "crypto"
import { getSession } from "next-auth/react"

type NextApiRequestType = Omit<NextApiRequest, "body"> & {
  body: {
    email: string
    firstName: string
    lastName: string
    username: string
    password: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { email, firstName, lastName, password } = req.body
      const verificationToken = crypto.randomBytes(16).toString("hex")
      const hashedVerificationToken = bcryptjs.hashSync(verificationToken, 10)
      const hashedPassword = bcryptjs.hashSync(password, 10)
      const user = await prisma?.user.upsert({
        where: {
          email,
        },
        create: {
          email,
          emailVerified: null,
          name: `${firstName} ${lastName}`,
        },
        update: {},
      })
      const account = await prisma?.account.create({
        data: {
          type: "credentials",
          provider: "user&Password",
          providerAccountId: user.id,
          userId: user.id,
          password: hashedPassword,
          verificationToken: hashedVerificationToken,
        },
      })
      await prisma?.profile.upsert({
        where: {
          userId: user.id,
        },
        create: {
          username: `${user.name?.replace(" ", "_")}_${Math.ceil(
            Math.random() * 10000
          )}`,
          userId: user.id,
        },
        update: {
          //   username: username,
        },
      })
      await sendMail({
        to: email,
        subject: "Welcome to creativeET! Confirm Your Email",
        message: `
        <div style="background-color:#fbf0f099; padding:50px;" >
            <div style="background-color:white; color:black; text-align:center; border-radius:30px; padding:30px;">
                <h2 style="margin:0px">You're on your way! Let's confirm your email address.</h2>
                <h3 style="margin:15px; font-weight:200;">By clicking on the following link, you are confirming your email address.</h3> 
                <div style="width:150px; pointer:cursor; background-color:skyblue; color:white; padding:15px; text-align:center;  margin:0 auto;">
                <a  style="text-decoration:none; color:white;" href="${process.env.NEXT_PUBLIC_URL}/api/auth/verifyEmail?id=${account.userId}&token=${verificationToken}">
                    Confirm your Email
                </a>
                </div>
            </div>
        </div>`,
      })
      return res.redirect("/auth/signin")

    case "GET":
      const session = await getSession({ req })
      if (!session?.user) {
        throw {
          status: "error",
          statusCode: 401,
          message: "unauthorized",
        }
      }

      const userId = req.query.id as string
      const User = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          Profile: true,
          followers: true,
        },
      })

      return User
    default:
      wrongRequestMethodError(res, ["POST", "GET"])
  }
}
