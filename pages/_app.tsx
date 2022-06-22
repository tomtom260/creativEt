import "../styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import "react-datepicker/dist/react-datepicker.css"
import "@fontsource/quicksand"
import "@fontsource/poppins"
import "react-toastify/dist/ReactToastify.css"
import "nprogress/nprogress.css"
import type { AppProps } from "next/app"
import { ReactNode, useEffect, useRef, ReactElement, useContext } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from "store"
import { QueryClient, QueryClientProvider } from "react-query"
import { Router, useRouter } from "next/router"
import { ReactQueryDevtools } from "react-query/devtools"
import { useGetCurrentUser } from "@/hooks/user"
import { useAppSelector } from "@/hooks/redux"
import PusherProvider, { PusherContext } from "@/hooks/pusher"
import { ToastContainer } from "react-toastify"
import type { NextPage } from "next"
import NProgress from "nprogress"
import LoadingIcon from "@/components/LoadingIcon"
import { useGetAllRoomsQuery } from "@/modules/chat/hooks"

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

  const rooms = useGetAllRoomsQuery().data

  useEffect(() => {
    console.log("modal", isModalVisible)
    if (isModalVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [isModalVisible])

  const userQuery = useGetCurrentUser()
  const pusherClient = useContext(PusherContext)

  useEffect(() => {
    if (rooms) {
      rooms?.forEach(({ id }) => {
        console.log("id", id)
        pusherClient.subscribe(`presence-room-${id}`)
      })
    }
  }, [rooms])

  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    NProgress.configure({
      showSpinner: false,
      easing: "ease",
      speed: 500,
    })
    Router.events.on("routeChangeStart", handleRouteStart)
    Router.events.on("routeChangeComplete", handleRouteDone)
    Router.events.on("routeChangeError", handleRouteDone)

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart)
      Router.events.off("routeChangeComplete", handleRouteDone)
      Router.events.off("routeChangeError", handleRouteDone)
    }
  }, [])
  if (privatePage) {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
    if (!userQuery.data)
      return (
        <div>
          <LoadingIcon></LoadingIcon>
        </div>
      )
  }

  return <div>{Children}</div>
}

export default MyApp
