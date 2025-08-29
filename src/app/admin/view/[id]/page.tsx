import { fetchApplicationByIdAction } from "@/actions/applicationActions"
import { notFound } from "next/navigation"

interface ApplicationType {
  _id: any
  userName: string
  password?: string
  applicationType: string
  applicationNumber: string
  applicantName: string
  dateOfSubmission?: string
  status?: string
  uniqueClientIdentifier: string
  biometrics?: {
    number: string
    enrolmentDate?: string
    expiryDate?: string
    status?: string
  }
  createdAt?: string
  updatedAt?: string
}

export default async function ApplicationViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await fetchApplicationByIdAction(id)

  if (!result || result.error || !result.data) return notFound()

  const application: ApplicationType = result.data

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        View Application
      </h2>

      <div className="space-y-4">
        {/* User Name */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">User Name</p>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {application.userName || "N/A"}
          </p>
        </div>

        {/* Application Type */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Application Type</p>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {application.applicationType || "N/A"}
          </p>
        </div>

        {/* Application Number */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Application Number</p>
          <p className="text-gray-700 dark:text-gray-300">
            {application.applicationNumber || "N/A"}
          </p>
        </div>

        {/* Applicant Name */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Applicant Name</p>
          <p className="text-gray-700 dark:text-gray-300">
            {application.applicantName || "N/A"}
          </p>
        </div>

        {/* Unique Client Identifier (UCI) */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Unique Client Identifier (UCI)
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {application.uniqueClientIdentifier || "N/A"}
          </p>
        </div>

        {/* Date of Submission */}
        {application.dateOfSubmission && (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Date of Submission</p>
            <p className="text-gray-700 dark:text-gray-300">
              {new Date(application.dateOfSubmission).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Status */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded text-sm font-medium ${
              application.status === "Approved"
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : application.status === "Pending"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            {application.status || "N/A"}
          </span>
        </div>

        {/* Biometrics */}
        {application.biometrics && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Biometrics
            </p>
            <div className="pl-4 space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Number</p>
              <p className="text-gray-700 dark:text-gray-300">
                {application.biometrics.number || "N/A"}
              </p>

              {application.biometrics.enrolmentDate && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enrolment Date</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {new Date(application.biometrics.enrolmentDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {application.biometrics.expiryDate && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expiry Date</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {new Date(application.biometrics.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {application.biometrics.status && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {application.biometrics.status}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Created At */}
        {application.createdAt && (
          <div className="text-sm text-gray-400 dark:text-gray-500">
            Created: {new Date(application.createdAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}
