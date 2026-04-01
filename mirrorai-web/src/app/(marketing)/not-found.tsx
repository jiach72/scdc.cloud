import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-8 pt-28 pb-12">
      <div className="text-8xl mb-6">🪞</div>
      <h1 className="text-6xl font-black mb-4 text-orange">404</h1>
      <h2 className="text-2xl font-bold mb-2">页面未找到</h2>
      <p className="text-dim mb-8 max-w-[400px]">
        你要找的页面不存在或已被移动。<br />
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange to-red-500 text-[#ffffff] font-bold shadow-[0_0_15px_rgba(255,107,53,0.25)] shadow-[0_0_30px_rgba(255,140,90,0.25)] hover:-translate-y-0.5 transition-transform"
      >
        🏠 返回首页 / Back to Home
      </Link>
    </section>
  );
}

