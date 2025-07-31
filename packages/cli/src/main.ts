import 'dotenv/config'
import { TavilySearch } from '@langchain/tavily'
import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate } from '@langchain/core/prompts'

async function run() {
  // 여러 키워드를 여기 정의
  const keywords = [
    '한국 관세',
    '스테이블 코인'
  ]

  const searchTool = new TavilySearch({
    maxResults: 3,
    topic: 'news',
    timeRange: 'week',
    includeRawContent: false,
  })

  const model = new ChatGroq({
    model: 'llama3-70b-8192',
    temperature: 0.4,
  })

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', '다음은 뉴스 기사 정보입니다. 각 기사마다 Title, Date, Summary, Link 순으로 정리해 주세요. 전부 한국어로 요약해 주세요.'],
    ['human', '{input}'],
  ])

  const chain = prompt.pipe(model)

  for (const keyword of keywords) {
    console.log(`\n키워드: ${keyword}`)

    try {
      const results = await searchTool.invoke({ query: keyword }) as any

      if (!results?.results?.length) {
        console.log('검색 결과 없음')
        continue
      }

      const summaryInput = results.results
        .map((r: any, i: number) => {
          const published = r.published_date
            ? new Date(r.published_date).toLocaleString('ko-KR')
            : r.relative_published_time ?? '날짜 없음'

          return `${i + 1}. [${published}] ${r.title}\n${r.content}\n🔗 ${r.url}`
        })
        .join('\n\n')

      const summary = await chain.invoke({ input: summaryInput })

      console.log('\n요약 결과:\n')
      console.log(summary.content)
    } catch (err) {
      console.error(`${keyword} 요약 실패:`, err)
    }
  }
}

run()
