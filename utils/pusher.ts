import Pusher from "pusher"

export default class PusherUtil {
  private static pusherServer?: Pusher

  private constructor() {
    console.log("pusher run")
    return new Pusher({
      appId: process.env.NEXT_PUBLIC_APP_ID!,
      key: process.env.NEXT_PUBLIC_KEY!,
      secret: process.env.NEXT_PUBLIC_SECRET!,
      cluster: process.env.NEXT_PUBLIC_CLUSTER!,
      useTLS: process.env.NEXT_PUBLIC_FORCETLS,
    })
  }

  public static getInstance(): Pusher {
    if (!this.pusherServer) {
      this.pusherServer = new PusherUtil()
    }

    return this.pusherServer!
  }
}
