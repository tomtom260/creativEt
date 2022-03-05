import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import DefaultLayout from "../layouts/DefaultLayout"

export default function Component() {
  const { status, data } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return "Loading"
  }
  console.log(status)

  if (status === "unauthenticated") {
    router.push("/auth/signin")
  }

  return (
    <>
      <DefaultLayout>
        <>
          Signed in as {data?.user?.email} <br />
          <button className="bg-blue-200 w-[200px]" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      </DefaultLayout>
    </>
  )
}
