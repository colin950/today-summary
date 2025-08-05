import NewsCard from './components/NewsCard'

const dummyNews = [
  {
    title: '이더리움 ETF 승인 임박?',
    summary: 'SEC의 긍정적 신호에 따라 이더리움 ETF 승인이 임박했다는 분석이 나옵니다.',
    url: 'https://example.com/news/eth',
    source: '코인데스크',
    publishedAt: '2025-08-05T09:00:00Z',
  },
  {
    title: '비트코인 7만 달러 재돌파',
    summary: '기관 투자 유입으로 비트코인이 7만 달러를 돌파했습니다.',
    url: 'https://example.com/news/btc',
    source: '블로터',
    publishedAt: '2025-08-05T08:00:00Z',
  },
  {
    title: '모건스탠리, 암호화폐 포트폴리오 확대',
    summary: '모건스탠리가 주요 암호화폐에 대한 포트폴리오 확장을 고려 중이라는 보도가 나왔습니다.',
    url: 'https://example.com/news/ms',
    source: '연합뉴스',
    publishedAt: '2025-08-04T23:00:00Z',
  },
]


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-screen-xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          오늘의 뉴스 요약
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-red-100">
        {dummyNews.map((news, idx) => (
            <NewsCard key={idx} news={news} />
          ))}
        </div>
      </div>
    </div>
  )
}
