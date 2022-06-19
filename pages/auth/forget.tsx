import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { checkifEmailIsValid } from "@/utils/emailRegex"
import { useForgetPasswordMutation } from "@/hooks/user"

export default function SignIn() {
  const router = useRouter()

  const { status } = useSession()
  const [sent, isSent] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const forgetPasswordMutation = useForgetPasswordMutation()

  if (status === "loading") {
    return "Loading"
  }

  if (status === "authenticated") {
    router.push("/")
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="relative">
            <Image alt="logo" src={`/assets/images/logo.png`} layout="fill" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {sent ? "Instructions Sent" : "Reset Your Password"}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {!sent ? (
              <>
                <p className="text-sm  font-medium text-red-500 text-center">
                  {emailError}
                </p>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address{" "}
                      <span className="text-red-600 text-lg">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        value={email}
                        onBlur={() => {
                          if (email && !checkifEmailIsValid(email)) {
                            setEmailError("Not a valid Email")
                          } else {
                            setEmailError("")
                          }
                        }}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!email) {
                          setEmailError("Insert a valid Email")
                          return
                        }
                        if (!emailError) {
                          forgetPasswordMutation.mutate({
                            email,
                          })
                          isSent(true)
                        }
                      }}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send Reset Instructions
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col gap-4 ">
                <Text varaint={TypographyVariant.Body1}>
                  If this email address was used to create an account,
                  instructions to reset your password will be sent to you.
                </Text>
                <Text varaint={TypographyVariant.Body1}>
                  Please check your email.
                </Text>
                <button
                  type="submit"
                  className="w-full mt-10 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
