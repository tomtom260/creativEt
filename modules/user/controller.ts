import sendMail from "@/utils/mail"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { updateEmail, updatePassword, updateUsername } from "./server"
import { prisma } from "@/utils/db"
import moment from "moment"

export async function updatePasswordController(id: string, password: string) {
  const hashedPassword = bcryptjs.hashSync(password)
  await updatePassword(id, hashedPassword)
}

export async function updateEmailAndUsernameController(
  id: string,
  email?: string,
  username?: string
) {
  if (email) {
    const verificationToken = crypto.randomBytes(16).toString("hex")
    const hashedVerificationToken = bcryptjs.hashSync(verificationToken)
    prisma.verificationToken.create({
      data: {
        identifier: id,
        token: hashedVerificationToken,
        expires: moment().add(1, "hour").toDate(),
      },
    })

    await sendMail({
      to: email,
      subject: "creativeET account email change",
      message: `
        <div style="background-color:#fbf0f099; padding:50px;" >
            <div style="background-color:white; color:black; text-align:center; border-radius:30px; padding:30px;">
                <h2 style="margin:0px">Let's confirm your email address.</h2>
                <h3 style="margin:15px; font-weight:200;">By clicking on the following link, you are confirming your email address.</h3> 
                <div style="width:150px; pointer:cursor; background-color:skyblue; color:white; padding:15px; text-align:center;  margin:0 auto;">
                <a  style="text-decoration:none; color:white;" href="${process.env.NEXTAUTH_URL}/api/auth/verifyNewEmail?id=${id}&token=${verificationToken}">
                    Confirm your Email
                </a>
                </div>
            </div>
        </div>`,
    })
  }
  if (username) {
    return await updateUsername(id, username)
  }
  return {}
}
