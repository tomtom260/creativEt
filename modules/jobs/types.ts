import { Jobs, User } from "@prisma/client"

export type TJOb = Jobs & {
  employer: User
  employee: User
}
