import { createContext } from "react"
import PusherJs from "pusher-js"

export const PusherContext = createContext<PusherJs>({} as PusherJs)

function PusherProvider({ children }) {
  PusherJs.logToConsole = true
  const pusherClient = new PusherJs(process.env.NEXT_PUBLIC_KEY!, {
    cluster: process.env.NEXT_PUBLIC_CLUSTER,
    forceTLS: process.env.NEXT_PUBLIC_FORCETLS,
    channelAuthorization: {
      endpoint: `${process.env.NEXT_PUBLIC_URL}/api/auth/pusher`,
      transport: "ajax",
    },
  })

  return (
    <PusherContext.Provider value={pusherClient}>
      {children}
    </PusherContext.Provider>
  )
}

export default PusherProvider