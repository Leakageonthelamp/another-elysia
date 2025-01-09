import { JWTPayloadSpec } from "@elysiajs/jwt"
import { t } from "elysia"

export const authSchema = t.Object({
  id: t.String({ format: "uuid" }),
  keyName: t.String(),
})

export const signKeyCreate = t.Omit(authSchema, ["id"])

export const signKeyResponse = t.Object({
  name: t.String(),
  key: t.String(),
})

export type AuthSchema = typeof authSchema.static
export type SignKeyCreate = typeof signKeyCreate.static
export type SignKeyResponse = typeof signKeyResponse.static
