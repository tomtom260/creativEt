import { NextApiRequest, NextApiResponse } from "next"
import { wrongRequestMethodError } from "../../../utils/apiResponses"
import bcryptjs from "bcryptjs"
import { prisma } from "../../../utils/db"
import sendMail from "../../../utils/mail"
import crypto from "crypto"
import { create } from "domain"

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
      const { email, firstName, lastName, username, password } = req.body
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
          username: username,
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
                <a  style="text-decoration:none; color:white;" href="${process.env.NEXTAUTH_URL}/api/auth/verifyEmail?id=${account.id}&token=${verificationToken}">
                    Confirm your Email
                </a>
                </div>
            </div>
        </div>`,
      })
      return res.status(200).json({})
    case "GET":
      const userId = req.query.id as string
      console.log("userId", userId)
      return await prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          Profile: true,
        },
      })
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}
