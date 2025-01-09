import { books } from "./book.schema"
import { users } from "./user.schema"

export const table = {
  users,
  books,
} as const

export type Table = typeof table
