export default function ApplicationViewLoading() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg animate-pulse dark:bg-gray-800">
      {/* Page title */}
      <div className="h-8 w-60 bg-gray-300 rounded mb-8 dark:bg-gray-700"></div>

      {/* Application details */}
      {[...Array(15)].map((_, i) => (
        <div key={i} className="mb-6">
          {/* Label */}
          <div className="h-4 w-40 bg-gray-300 rounded mb-2 dark:bg-gray-700"></div>
          {/* Value */}
          <div className="h-6 w-full max-w-lg bg-gray-300 rounded dark:bg-gray-700"></div>
        </div>
      ))}

      {/* Messages section */}
      <div className="mt-10 mb-4 h-6 w-48 bg-gray-300 rounded dark:bg-gray-700"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 w-full bg-gray-300 rounded dark:bg-gray-700"></div>
        ))}
      </div>
    </div>
  );
}
