import "../styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import type { AppProps } from "next/app"
import { ReactNode } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from "store"
import { QueryClient, QueryClientProvider } from "react-query"
import { useRouter } from "next/router"
import { useGetUserQuery } from "api/user"
import { ReactQueryDevtools } from "react-query/devtools"
import { useGetCurrentUser } from "hooks/user"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <App privatePage={pageProps.protected}>
            <Component {...pageProps} />
          </App>
        </SessionProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
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
  const userQuery = useGetCurrentUser()

  if (privatePage) {
    if (status === "loading" || userQuery.isLoading)
      return <div>Loading...</div>

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return null
    }
  }

  return <>{Children}</>
}

export default MyApp
