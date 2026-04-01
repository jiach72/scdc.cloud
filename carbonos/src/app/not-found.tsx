export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-300 mb-4">页面未找到</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          您访问的页面不存在或已被移除。
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
