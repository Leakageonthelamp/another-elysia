import { Elysia } from "elysia"
import { apiRoutes } from "./api"
import { publicRoutes } from "./public"

export const routes = new Elysia()
  .use(apiRoutes)
  .use(publicRoutes)
