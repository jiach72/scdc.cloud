"use client";

export default function SystemError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-6">
        <h2 className="text-xl font-bold text-white mb-3">系统模块加载失败</h2>
        <p className="text-slate-400 mb-6 text-sm">
          请稍后重试，如问题持续请联系管理员。
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  );
}
