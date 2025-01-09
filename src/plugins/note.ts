import { Elysia, t } from "elysia"
import { noteService } from "../services/note/note.service"
import { createMemo, updateMemo } from "../services/note/schemas"
import { authMiddlewareService } from "./auth"

export const note = new Elysia({ prefix: "/note", name: "note.plugin" })
  .as("plugin")
  .decorate("noteService", noteService)
  .use(authMiddlewareService)
  .get("/", (ctx) => {
    return ctx.noteService.getMemos()
  }, { isAuthenticated: true })
  .get("/:id", (ctx) => {
    return ctx.noteService.getMemoById(ctx.params.id)
  }, { params: t.Object({ id: t.String() }) })
  .post("/", (ctx) => {
    return ctx.noteService.createMemo(ctx.body)
  }, { body: createMemo })
  .put("/:id", (ctx) => {
    return ctx.noteService.updateMemoById(ctx.params.id, ctx.body)
  }, { params: t.Object({ id: t.String() }), body: updateMemo })
  .delete("/:id", (ctx) => {
    return ctx.noteService.deleteMemoById(ctx.params.id)
  }, { params: t.Object({ id: t.String() }) })
