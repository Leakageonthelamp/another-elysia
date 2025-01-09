import env from "env-var"

export const config = {
  NODE_ENV: env
    .get("NODE_ENV")
    .default("development")
    .asEnum(["production", "test", "development"]),

  PORT: env.get("PORT").default(3000).asPortNumber(),
  API_URL: env.get("API_URL").default(`https://${env.get("PUBLIC_DOMAIN").asString()}`).asString(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),
}

export const dbConfig = {
  host: env.get("DB_HOST").required().asString(),
  port: env.get("DB_PORT").required().asPortNumber(),
  user: env.get("DB_USER").required().asString(),
  password: env.get("DB_PASSWORD").required().asString(),
  database: env.get("DB_NAME").required().asString(),
}
