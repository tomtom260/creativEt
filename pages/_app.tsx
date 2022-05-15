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
    const pusher = new Pusher("0c546e08fa8322bc1318", {
      cluster: "ap2",
      forceTLS: true,
      channelAuthorization: {
        endpoint: "http://localhost:5000/pusher/auth",
        transport: "ajax",
      },
    })

    const channel = pusher.subscribe("my-channel")
    channel.bind("my-event", function (data) {
      alert(JSON.stringify(data))
    })
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
      return null
    }
  }

  if (!userQuery.data) return <div>Loading...</div>

  return <div>{Children}</div>
}

export default MyApp
