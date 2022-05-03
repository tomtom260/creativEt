import { User } from "./user"

export type Content = {
  id: string
  image: string
  title: string
  description: string
  tags: {
    id: string
    name: string
  }[]
  createdBy: User
  likes: number
  views: number
  isBoughtByCurrentUser: boolean
  totalLikes: number
  isLikedByCurrentUser: boolean
}
