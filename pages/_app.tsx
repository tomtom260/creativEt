import "../styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import type { AppProps } from "next/app"
import { ReactNode, useEffect, useRef, useState } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from "store"
import { QueryClient, QueryClientProvider } from "react-query"
import { useRouter } from "next/router"
import { ReactQueryDevtools } from "react-query/devtools"
import { useGetCurrentUser } from "@/hooks/user"
import Modal from "@/components/Dialog/Modal"
import { useAppSelector } from "@/hooks/redux"
import Script from "next/script"
import Pusher from "pusher-js"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    })
  ).current

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App privatePage={pageProps.protected}>
            <Component {...pageProps} />
          </App>
          <Modal />
          <Script src="https://js.pusher.com/7.0/pusher.min.js" />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

const App = ({
  children: Children,
  privatePage,
}: {
  children: ReactNode
  privatePage: boolean
}) => {
  const { status, data: session } = useSession()
  const router = useRouter()
  const { isModalVisible } = useAppSelector((state) => state.modal)

  useEffect(() => {
    Pusher.logToConsole = true
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY!, {
      cluster: process.env.NEXT_PUBLIC_CLUSTER,
      forceTLS: process.env.NEXT_PUBLIC_FORCETLS,
      channelAuthorization: {
        endpoint: `${process.env.NEXT_PUBLIC_URL}/api/auth/pusher`,
        transport: "ajax",
      },
    })
    const channel = pusher.subscribe("presence-quickstart")
    channel.bind("my-event", function (data) {
      alert(JSON.stringify(data))
    })
    channel.bind("pusher:member_added", (member) => console.log(member))
  }, [])

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [isModalVisible])

  const userQuery = useGetCurrentUser()

  if (privatePage) {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }
    if (!userQuery.data) return <div>Loading...</div>
  }

  return <div>{Children}</div>
}

export default MyApp
