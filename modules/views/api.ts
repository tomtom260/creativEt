import axios from "axios"

export async function createViewApi(contentId: string) {
  return await axios.post(`/api/view`, {
    contentId,
  })
}
