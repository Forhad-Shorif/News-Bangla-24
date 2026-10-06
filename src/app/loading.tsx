const Loading = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 min-h-[60vh]">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="skeleton h-4 w-1/3"></div>
          <div className="skeleton h-4 w-1/2"></div>
        </div>
      </div>

      {/* Hero Banner Skeleton */}
      <div className="skeleton h-52 w-full rounded-2xl"></div>

      {/* Content Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-32 w-full rounded-xl"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-32 w-full rounded-xl"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-32 w-full rounded-xl"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;