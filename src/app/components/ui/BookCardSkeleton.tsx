export const BookCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden h-[440px] animate-pulse"
        >
          <div className="relative w-full h-60 bg-gray-200 shrink-0" />
          <div className="flex flex-col flex-1 p-4 justify-between min-h-0">
            <div className="space-y-2 min-h-0 overflow-hidden">
              {/* Title placeholder */}
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              {/* Author placeholder */}
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              {/* Summary placeholder */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
              {/* Download count placeholder */}
              <div className="h-5 w-12 bg-gray-200 rounded-md" />
              {/* Button placeholder */}
              <div className="h-7 w-24 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
