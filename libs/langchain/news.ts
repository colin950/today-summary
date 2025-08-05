import { TavilySearch } from '@langchain/tavily'
import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import 'dotenv/config'
import { MessageContentComplex } from '@langchain/core/messages'

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
  ['system', '다음은 뉴스 기사 정보입니다. 한국어로 요약해 주세요. 각 기사마다 발행일, 제목, 요약, 링크 순으로 정리해 주세요.'],
  ['human', '{input}'],
])

const chain = prompt.pipe(model)

export async function summarizeNewsByKeyword(keyword: string): Promise<string | MessageContentComplex[]> {
  const result = await searchTool.invoke({ query: keyword }) as any

  if (!result?.results?.length) return '검색 결과 없음'

  const summaryInput = result.results
    .map((r: any, i: number) => {
      let published = '발행일: '
      if (r.published_date) {
        published += new Date(r.published_date).toLocaleString('ko-KR')
      } else if (r.relative_published_time) {
        published += r.relative_published_time
      } else {
        published += '알 수 없음'
      }

      return `${i + 1}. ${published}\n제목: ${r.title}\n${r.content}\n🔗 ${r.url}`
    })
    .join('\n\n')

  const summary = await chain.invoke({ input: summaryInput })
  return summary.content
}
