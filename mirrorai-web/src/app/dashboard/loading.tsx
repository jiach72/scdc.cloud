export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-10 h-10 border-4 border-border border-t-orange rounded-full animate-spin mb-4" />
      <p className="text-dim text-sm">加载中...</p>
    </div>
  );
}

