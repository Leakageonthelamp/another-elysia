import type { CreateMemo, Memo, UpdateMemo } from "./schemas"
import { error } from "elysia"
import { v4 as uuidv4 } from "uuid"

class NoteService {
  constructor(
    public memoData: Memo[] = [
      {
        id: "0001",
        title: "Memo 1",
      },
    ],
  ) { }

  public getMemos(): Memo[] {
    return this.memoData
  }

  public async getMemoById(id: string): Promise<Memo> {
    const memo = await this.memoData.find(memo => memo.id === id)
    if (!memo) {
      throw error(404, "Memo not found")
    }

    return memo
  }

  public async createMemo(memo: CreateMemo): Promise<Memo> {
    const newMemo: Memo = {
      id: uuidv4(),
      title: memo.title,
    }
    this.memoData.push(newMemo)
    return newMemo
  }

  public async updateMemoById(id: string, memo: UpdateMemo): Promise<Memo> {
    const index = await this.memoData.findIndex(memo => memo.id === id)
    if (index === -1) {
      throw error(404, "Memo not found")
    }

    this.memoData[index] = {
      id,
      title: memo.title,
    }

    return this.memoData[index]
  }

  public async deleteMemoById(id: string): Promise<void> {
    const index = await this.memoData.findIndex(memo => memo.id === id)
    if (index === -1) {
      throw error(404, "Memo not found")
    }

    this.memoData.splice(index, 1)
  }
}

export const noteService = new NoteService()
