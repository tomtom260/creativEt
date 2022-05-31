import Pusher from "pusher"

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var pusherServer: Pusher
}


export const pusherServer =
  global.pusherServer ||
  new Pusher({
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    key: process.env.NEXT_PUBLIC_KEY!,
    secret: process.env.NEXT_PUBLIC_SECRET!,
    cluster: process.env.NEXT_PUBLIC_CLUSTER!,
    useTLS: process.env.NEXT_PUBLIC_FORCETLS,
  })

if (process.env.NODE_ENV !== "production") global.pusherServer = pusherServer
