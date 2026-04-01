'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#ffffff] mb-4">出了点问题</h2>
        <p className="text-dim mb-6">{error.message || '请稍后重试'}</p>
        <button onClick={reset} className="px-6 py-3 bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] rounded-lg">重试</button>
      </div>
    </div>
  );
}

