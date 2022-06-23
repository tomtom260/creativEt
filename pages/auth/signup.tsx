import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
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
import { checkifEmailExists } from "@/modules/user/api"
import { EyeIcon } from "@heroicons/react/outline"
import { EyeOffIcon } from "@heroicons/react/outline"

type SignInPropsType = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
  csrfToken: string | undefined
}

export default function SignUp({ providers, csrfToken }: SignInPropsType) {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)
  const [emailExists, setEmailExists] = useState<boolean>(false)
  const { status } = useSession()

  useEffect(() => {
    email
      ? setIsValidEmail(
          // eslint-disable-next-line no-control-regex
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            email
          )
        )
      : setIsValidEmail(true)
  }, [email])

  const [showPassword, setShowPassword] = useState(false)

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
            Create your new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              autoComplete="off"
              className="space-y-6"
              action="/api/auth/user"
              method="POST"
            >
              <input hidden name="csrfToken" defaultValue={csrfToken} />
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name <span className="text-red-600 text-lg">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    autoComplete="email"
                    required
                    className="d-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name <span className="text-red-600 text-lg">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="user"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username <span className="text-red-600 text-lg">*</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div> */}

              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address{" "}
                    <span className="text-red-600 text-lg">*</span>
                  </label>
                  {email &&
                    (isValidEmail ? (
                      emailExists ? (
                        <span className="text-red-600 text-sm">
                          Email Already Exists
                        </span>
                      ) : (
                        <span className="text-green-600 text-sm">
                          Email is Available
                        </span>
                      )
                    ) : (
                      <span className="text-red-600 text-sm">
                        Not a valid Email
                      </span>
                    ))}
                </div>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={async (e) => {
                      setEmail(e.target.value)
                      isValidEmail &&
                        email &&
                        setEmailExists(await checkifEmailExists(e.target.value))
                    }}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="none"
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
                  Password <span className="text-red-600 text-lg">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={!showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {showPassword ? (
                    <EyeIcon
                      onClick={() => setShowPassword(false)}
                      className="w-5 h-5 absolute right-2 top-2 text-gray-dark"
                    />
                  ) : (
                    <EyeOffIcon
                      onClick={() => setShowPassword(true)}
                      className="w-5 h-5 absolute right-2 top-2 text-gray-dark"
                    />
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={emailExists}
                  className="w-full flex disabled:bg-opacity-40 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  //   onClick={() =>
                  //     signIn(providers?.credentials.id).then(() => {
                  //       router.push("/")
                  //     })
                  //   }
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-10">
                <div>
                  <button
                    onClick={() => {
                      signIn(providers?.facebook.id)
                    }}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => {
                      signIn(providers?.google.id)
                    }}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-gray-600">
                Have an account?{" "}
                <Link passHref href="/auth/signin">
                  <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                    Signin
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken,
    },
  }
}
