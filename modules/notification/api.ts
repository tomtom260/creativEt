import { Notification } from "@prisma/client"
import axios from "axios"
import { TGetNotifcation } from "./types"

export async function getNotifcationsAPI(id: string) {
  return (
    await axios.get<{ data: TGetNotifcation[] }>(`/api/notification?id=${id}`)
  ).data.data
}

export async function dismissNotifcationsAPI(id: string) {
  return (
    await axios.patch<{ data: Notification }>(`/api/notification?id=${id}`)
  ).data.data
}
