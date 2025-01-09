import { Elysia, t } from "elysia"
import { auth } from "../plugins/auth"
import { note } from "../plugins/note"

export const customResponse = t.Object({
  code: t.Number(),
  data: t.Any(),
  status: t.Boolean(),
  message: t.String({ enum: ["OK", "ERROR"] }),
})

export type CustomResponse = typeof customResponse.static

export const apiRoutes = new Elysia({ prefix: "/api/v1" })
  .onAfterHandle((ctx) => {
    return Response.json({
      path: ctx.path,
      message: "OK",
      timestamp: new Date().toISOString(),
      status: ctx.set.status ?? 200,
      data: ctx.response,
    })
  })
  .onError((ctx) => {
    return Response.json({
      path: ctx.path,
      message: "ERROR",
      timestamp: new Date().toISOString(),
      status: ctx.code ?? 500,
      error: ctx.error,
    })
  })
  .use(auth)
  .use(note)
