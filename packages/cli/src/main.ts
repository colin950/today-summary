import 'dotenv/config'
import { summarizeNewsByKeyword } from '../../../libs/langchain/news'

async function run() {
  const keywords = ['한국 관세', '스테이블 코인']

  for (const keyword of keywords) {
    console.log(`\n🔍 키워드: ${keyword}`)
    try {
      const summary = await summarizeNewsByKeyword(keyword)
      console.log('\n🧠 요약 결과:\n')
      console.log(summary)
    } catch (err) {
      console.error(`❌ ${keyword} 요약 실패:`, err)
    }
  }
}

run()
