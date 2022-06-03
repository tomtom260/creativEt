import { Jobs, User } from "@prisma/client"

export type TJOb = Jobs & {
  employer: User
  employee: User
}

export enum FilterOptions {
  "All" = "All",
  "Pending" = "Pending",
  "In Progress" = "In Progress",
  "Success" = "Success",
  "Cancelled" = "Cancelled",
}

