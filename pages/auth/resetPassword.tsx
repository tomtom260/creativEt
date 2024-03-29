import { GetServerSidePropsContext } from "next"
import { Router, useRouter } from "next/router"
import {
  getCsrfToken,
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider,
  useSession,
} from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAccount, getVerificationToken } from "@/modules/user/server"
import bcryptjs from "bcryptjs"
import moment from "moment"
import { useResetPasswordMutation } from "@/hooks/user"

type SignInPropsType = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
  csrfToken: string | undefined
  eror?: string
}

export default function SignUp({ eror }: SignInPropsType) {
  const router = useRouter()
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [error, setError] = useState<string>("")

  const { status } = useSession()
  const resetPasswordMutation = useResetPasswordMutation()

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
            {eror || "Reset your Password"}
          </h2>
        </div>

        {!eror && (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <p className="text-sm  font-medium mb-4 text-red-500 text-center">
                {error}
              </p>
              <form autoComplete="off" className="space-y-6" method="POST">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password <span className="text-red-600 text-lg">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      onBlur={() => {
                        if (passwordConfirm && passwordConfirm !== password) {
                          setError("Passwords are not the same")
                        } else {
                          setError("")
                        }
                      }}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password{" "}
                    <span className="text-red-600 text-lg">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={passwordConfirm}
                      onBlur={() => {
                        if (passwordConfirm !== password) {
                          setError("Passwords are not the same")
                        } else {
                          setError("")
                        }
                      }}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value)
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      resetPasswordMutation.mutate({
                        password,
                        id: router.query.id as string,
                      })
                    }}
                    disabled={!!error}
                    className="w-full flex disabled:bg-opacity-40 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { verTokenid, id, token } = context.query as Record<string, string>

  const verToken = await getVerificationToken(verTokenid)
  if (!bcryptjs.compareSync(token, verToken?.token)) {
    return {
      props: {
        eror: "token invalid",
      },
    }
  } else if (moment(verToken?.expires).isBefore(moment())) {
    return {
      props: {
        eror: "token expired",
      },
    }
  }
  return {
    props: {},
  }
}
