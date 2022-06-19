import "../styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import "react-datepicker/dist/react-datepicker.css"
import "@fontsource/quicksand"
import "@fontsource/poppins"
import "react-toastify/dist/ReactToastify.css"
import type { AppProps } from "next/app"
import { ReactNode, useEffect, useRef, ReactElement } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from "store"
import { QueryClient, QueryClientProvider } from "react-query"
import { useRouter } from "next/router"
import { ReactQueryDevtools } from "react-query/devtools"
import { useGetCurrentUser } from "@/hooks/user"
import { useAppSelector } from "@/hooks/redux"
import PusherProvider from "@/hooks/pusher"
import { ToastContainer } from "react-toastify"
import type { NextPage } from "next"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    })
  ).current

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <PusherProvider>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App privatePage={pageProps.protected}>
              {getLayout(
                <>
                  <Component {...pageProps} />
                  <ToastContainer
                    style={{
                      width: "450px",
                    }}
                    className={"w-40"}
                    hideProgressBar
                  />
                </>
              )}
            </App>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </PusherProvider>
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
  const isModalVisible = useAppSelector((state) => !!state.modal.modalType)

  useEffect(() => {
    console.log("modal", isModalVisible)
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
    }
    if (!userQuery.data) return <div>Loading...</div>
  }

  return <div>{Children}</div>
}

export default MyApp
