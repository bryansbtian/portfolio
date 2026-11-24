/* eslint-disable react/prop-types */
const Bone = ({ className = "" }) => (
  <div className={`rounded-md bg-neutral-800/80 ${className}`} />
);

export default function AdminSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading admin"
      className="h-dvh overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    >
      <div aria-hidden="true" className="flex h-full animate-pulse flex-col motion-reduce:animate-none lg:flex-row">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950 lg:flex">
          <div className="space-y-2 px-5 pb-6 pt-5">
            <Bone className="h-6 w-28" />
            <Bone className="h-3 w-20" />
          </div>
          <div className="flex-1 space-y-2 px-3">
            {[0, 1, 2, 3].map((item) => (
              <Bone key={item} className="h-10 w-full" />
            ))}
          </div>
          <div className="space-y-2 border-t border-neutral-800 p-3">
            <Bone className="h-10 w-full" />
            <Bone className="h-10 w-full" />
          </div>
        </aside>

        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-3 lg:hidden">
          <Bone className="h-6 w-28" />
          <Bone className="h-11 w-11" />
        </div>

        <main className="min-w-0 flex-1 space-y-6 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Bone className="h-7 w-40" />
              <Bone className="h-4 w-56 max-w-full" />
            </div>
            <div className="hidden gap-2 sm:flex">
              <Bone className="h-10 w-20" />
              <Bone className="h-10 w-20" />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60">
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex items-center gap-3 border-b border-neutral-800 p-4 last:border-b-0">
                <Bone className="h-10 w-10 shrink-0" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Bone className="h-4 w-2/3 max-w-xs" />
                  <Bone className="h-3 w-1/2 max-w-[12rem]" />
                </div>
                <Bone className="h-6 w-12 shrink-0" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
