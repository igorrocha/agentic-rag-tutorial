import "dotenv/config"
import { Langbase } from "langbase"

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
})

export async function runMemoryAgent(query: string) {
  const chunks = await langbase.memories.retrieve({
    query,
    topK: 4,
    memory: [
      {
        name: "knowledge-base",
      },
    ],
  })

  return chunks
}
