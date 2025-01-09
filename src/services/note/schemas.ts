import { t } from "elysia"

export const memo = t.Object({
  id: t.String(),
  title: t.String(),
})

export const createMemo = t.Object({
  title: t.String({ minLength: 1, maxLength: 100, error: "Title must be between 1 and 100 characters" }),
})

export const updateMemo = t.Object({
  title: t.String({ minLength: 1, maxLength: 100, error: "Title must be between 1 and 100 characters" }),
})

export type Memo = typeof memo.static
export type CreateMemo = typeof createMemo.static
export type UpdateMemo = typeof updateMemo.static
