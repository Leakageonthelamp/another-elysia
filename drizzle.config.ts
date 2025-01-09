import { defineConfig } from "drizzle-kit"
import { dbConfig } from "./src/config"

export default defineConfig({
  schema: "./src/db/schemas",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?schema=public`,
  },
})
