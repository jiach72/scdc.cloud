"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-4">出了点问题</h2>
        <p className="text-slate-400 mb-6 max-w-md">
          页面加载时发生了错误，请稍后重试。
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  );
}
