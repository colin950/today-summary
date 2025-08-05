import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { summarizeNewsByKeyword } from '../../../libs/langchain/news'
dotenv.config()

const app = express()
app.use(cors())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/news-summaries', async (req, res) => {
  const keywords = (req.query.keywords as string)?.split(',') ?? []
  const results = await Promise.all(
    keywords.map(async (k) => ({
      keyword: k,
      summary: await summarizeNewsByKeyword(k),
    }))
  )
  res.json(results)
})

// 나중에 여기서 /api/news-summaries 만들 예정

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`)
})
