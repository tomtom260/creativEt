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
  const { isModalVisible } = useAppSelector(state => state.modal)
  const [queryEnabled, setQueryEnabled] = useState(false)

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [isModalVisible])

  useEffect(() => {
    if (status === "authenticated") setQueryEnabled(true)
  }, [status])

  const userQuery = useGetCurrentUser(session?.user.id, queryEnabled)

  if (privatePage) {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return null
    }
  }

  if (
    status === "loading" ||
    userQuery.isFetching ||
    (privatePage && !queryEnabled)
  )
    return <div>Loading...</div>

  console.log(status, "privatePage", userQuery, queryEnabled)
  return <div>{Children}</div>
}

export default MyApp
