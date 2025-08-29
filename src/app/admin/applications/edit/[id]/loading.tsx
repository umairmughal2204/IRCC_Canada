export default function ApplicationLoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto shadow-lg bg-white dark:bg-gray-800 p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-56 bg-gray-300 rounded dark:bg-gray-600"></div>
        <div className="h-8 w-28 bg-gray-300 rounded dark:bg-gray-600"></div>
      </div>

      {/* Single-line fields */}
      {[
        "User Name",
        "Password",
        "Application Type",
        "Application Number",
        "Applicant Name",
        "Date of Submission",
        "Status",
        "UCI",
        "Biometrics Number",
        "Biometrics Enrolment Date",
        "Biometrics Expiry Date",
        "Biometrics Status",
      ].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-40 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="h-10 bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
      ))}

      {/* Messages textarea */}
      <div className="space-y-2">
        <div className="h-4 w-40 bg-gray-300 rounded dark:bg-gray-600"></div>
        <div className="h-20 bg-gray-300 rounded dark:bg-gray-600"></div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end mt-6">
        <div className="h-10 w-36 bg-gray-300 rounded dark:bg-gray-600"></div>
      </div>
    </div>
  );
}
