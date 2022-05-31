import axios from "axios"
import { TCreateNotifcation, TGetNotifcation } from "./types"

export async function getNotifcationsAPI(id: string) {
  return (
    await axios.get<{ data: TGetNotifcation[] }>(`/api/notification?id=${id}`)
  ).data.data
}

export async function createNotifcationsAPI(id: TCreateNotifcation) {
  return (await axios.post(`/api/notification?id=${id}`)).data.data
}
