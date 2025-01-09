import { Elysia } from "elysia"
import { config } from "../config"

export const publicRoutes = new Elysia()
  .get("/", () => {
    return `Server is up and running at ${config.PORT}`
  })
  .get("/health", () => {
    return {
      status: "ok",
      serverTime: new Date().toISOString(),
    }
  })
  .get("/ping", () => {
    return {
      message: "pong",
    }
  })
