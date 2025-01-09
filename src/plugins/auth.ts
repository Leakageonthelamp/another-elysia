import type { AuthSchema } from "../services/auth/schemas"
import jwt from "@elysiajs/jwt"
import { Elysia } from "elysia"
import { v4 as uuidv4 } from "uuid"
import { config } from "../config"
import { signKeyCreate, signKeyResponse } from "../services/auth/schemas"

export const authMiddlewareService = new Elysia({ prefix: "/auth", name: "auth.middleware" })
  .as("global")
  .use(jwt({ name: "jwt", secret: config.JWT_SECRET, exp: "1y" }))
  .state({
    jwtToken: {} as AuthSchema,
  })
  .macro({
    isAuthenticated: (enabled: boolean) => {
      if (!enabled)
        return

      return {
        beforeHandle: async (ctx) => {
          const authHeader = ctx.headers.authorization
          if (!authHeader)
            throw ctx.error(401, "Unauthorized")

          const token = authHeader.split(" ")[1]
          if (!token)
            throw ctx.error(401, "Unauthorized")

          const decoded = await ctx.jwt.verify(token)
          if (!decoded)
            throw ctx.error(401, "Unauthorized")

          ctx.store.jwtToken = decoded as AuthSchema
        },
      }
    },
  })

export const auth = new Elysia({ prefix: "/auth", name: "auth.service" })
  .as("plugin")
  .use(authMiddlewareService)
  .post("/", async (ctx) => {
    const key = await ctx.jwt.sign({
      id: uuidv4(),
      keyName: ctx.body.keyName,
    })

    return {
      name: ctx.body.keyName,
      key,
    }
  }, { body: signKeyCreate, response: signKeyResponse })
