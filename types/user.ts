export type User = {
  id: string
  image: string
  name: string
  email: string
  username: string
  isFollowedByCurrentUser: string
  isEmailVerified: boolean
  location: null | string
  bio: null | string
  balance?: number
}
