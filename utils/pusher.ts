import Pusher from "pusher"
import PusherJs from "pusher-js"

export const pusherServer = new Pusher({
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  key: process.env.NEXT_PUBLIC_KEY!,
  secret: process.env.NEXT_PUBLIC_SECRET!,
  cluster: process.env.NEXT_PUBLIC_CLUSTER!,
  useTLS: process.env.NEXT_PUBLIC_FORCETLS,
})

export const pusherClient = new PusherJs(process.env.NEXT_PUBLIC_KEY!, {
  cluster: process.env.NEXT_PUBLIC_CLUSTER,
  forceTLS: process.env.NEXT_PUBLIC_FORCETLS,
  channelAuthorization: {
    endpoint: `${process.env.NEXT_PUBLIC_URL}/api/auth/pusher`,
    transport: "ajax",
  },
})
