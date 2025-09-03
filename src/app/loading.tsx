export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
        </div>
      </div>
    </div>
  )
}