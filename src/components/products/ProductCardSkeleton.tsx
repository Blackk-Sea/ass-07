export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs animate-pulse flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="w-16 h-4 bg-slate-200 rounded-md" />
          <div className="w-12 h-4 bg-slate-200 rounded-full" />
        </div>

        <div className="flex items-center gap-3.5 my-2">
          <div className="w-12 h-12 bg-slate-200 rounded-xl" />
          <div className="space-y-2 flex-1">
            <div className="w-3/4 h-4 bg-slate-200 rounded" />
            <div className="w-1/2 h-3 bg-slate-200 rounded" />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="w-12 h-2.5 bg-slate-200 rounded" />
          <div className="w-20 h-5 bg-slate-200 rounded" />
        </div>
        <div className="w-8 h-8 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
}
