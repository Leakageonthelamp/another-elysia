import { logger } from "@bogeychan/elysia-logger"
import { cors } from "@elysiajs/cors"
import { jwt } from "@elysiajs/jwt"
import { serverTiming } from "@elysiajs/server-timing"
import { swagger } from "@elysiajs/swagger"
import { Elysia } from "elysia"
import { config } from "./config.ts"
import { routes } from "./routes/index.ts"

export const app = new Elysia()
  .use(logger())
  .use(swagger())
  .use(cors())
  .use(serverTiming())
  .use(routes)
