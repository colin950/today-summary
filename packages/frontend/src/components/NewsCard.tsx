interface NewsItem {
  title: string
  summary: string
  url: string
  source: string
  publishedAt: string
}

interface NewsCardProps {
  news: NewsItem
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between h-full min-h-[240px]">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {news.title}
        </h2>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {news.summary}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
        <span>{news.source}</span>
        <span>{new Date(news.publishedAt).toLocaleString()}</span>
      </div>

      <div className="mt-4 text-right">
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          원문 보기
        </a>
      </div>
    </div>
  )
}

export default NewsCard
