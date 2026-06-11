// Skeleton placeholder za kartice med nalaganjem podatkov
export default function CardSkeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-white/5 bg-card p-5 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/10" />
        <div className="h-4 w-24 rounded bg-white/10" />
      </div>
      <div className="mt-5 space-y-3">
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-5/6 rounded bg-white/5" />
        <div className="h-3 w-2/3 rounded bg-white/5" />
      </div>
    </div>
  );
}
