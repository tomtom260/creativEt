import "../styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
