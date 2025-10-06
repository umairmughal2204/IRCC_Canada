"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { fetchApplicationByIdAction } from "@/actions/applicationActions";
import Header from "@/app/header";
import { logoutApplicationAction } from "@/actions/authActions";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [applicationData, setApplicationData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  // Fetch application by ID on mount
  useEffect(() => {
    async function fetchData() {
      const res = await fetchApplicationByIdAction(id);
      if (res.data) {
        setApplicationData(res.data);
        setMessages(res.data.messages || []);
      }
    }
    fetchData();
  }, [id]);

  // Filtered messages based on search
  const filteredMessages = messages.filter((msg) =>
    msg.subject?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastMessage = currentPage * entriesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - entriesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / entriesPerPage);

  const handleLogout = async () => {
    try {
      await logoutApplicationAction(); // Call server action
      window.location.href = "/signin"; // Redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="bg-white text-black font-sans min-h-screen">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="text-sm text-gray-700 px-6 py-2">
        <a href="/" className="text-blue-700 hover:underline">
          Home
        </a>{" "}
        › <span>Account profile</span>
      </div>

      {/* Signed in */}
      <div className="text-right text-sm px-6">
        Signed in as{" "}
        <span className="font-semibold">
          {applicationData?.applicantName || "Loading..."}
        </span>
        <a href="#" className="ml-2 text-blue-700 hover:underline">
          Account home
        </a>{" "}
        |{" "}
        <a href="#" className="text-blue-700 hover:underline">
          Account profile
        </a>{" "}
        |{" "}
        <a href="#" className="text-blue-700 hover:underline">
          Help
        </a>{" "}
        |{" "}
        <button
          onClick={handleLogout}
          className="text-blue-700 hover:underline"
        >
          Logout
        </button>
      </div>
      <div className="mb-4 px-6">
        <div className="border-b-2 border-red-700 w-full pb-2">
          <h1 className="text-4xl font-bold pt-6">
            Application status and messages
          </h1>
        </div>
      </div>

      {/* Match content with heading alignment */}
      <div className="pl-10 pr-6 py-6">
        <p className="text-lg flex items-center whitespace-nowrap">
          Check the status, review the details and read messages for your
          application.
          <a href="#" className="text-blue-800 underline ml-2">
            View submitted application or upload documents
          </a>
        </p>

        <div className="border-l-4 border-black pl-5 mt-6 w-fit pr-6 py-3">
          <p className="text-lg">
            You have{" "}
            {messages.filter((msg) => !msg.read).length}{" "}
            <a href="#" className="text-blue-800 underline">
              unread message(s).
            </a>
          </p>
        </div>
      </div>

      {/* Application + Applicant info */}
      <div className="flex gap-6 px-6 mt-4 items-start flex-wrap">
        {/* Application status */}
        <div className="border border-gray-300 rounded bg-white flex-1 min-w-[420px] max-w-[600px]">
          <h2 className="bg-gray-100 px-5 py-3 font-semibold text-xl">
            Application status
          </h2>
          <div className="p-5 text-lg leading-relaxed">
            <p>
              We are processing your application. We will send you a message
              when there is an update or if we need more information from you.
            </p>
            <p className="mt-4 font-semibold">
              Latest update: <br />
              Biometrics -{" "}
              {applicationData?.biometrics?.enrolmentDate
                ? new Date(
                  applicationData.biometrics.enrolmentDate
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
                : "N/A"}{" "}
              : {applicationData?.biometrics?.status || "Pending"}.
            </p>
          </div>
        </div>

        {/* Applicant info */}
        <div className="border border-gray-300 rounded bg-white flex-1 min-w-[420px] max-w-[600px]">
          <h2 className="bg-gray-100 px-5 py-3 font-semibold text-xl">
            Applicant information
          </h2>
          <div className="p-5 text-lg space-y-3 leading-relaxed">
            <p>
              <strong>Principal Applicant:</strong>{" "}
              {applicationData?.applicantName || "Loading..."}
            </p>
            <p>
              <strong>Unique Client Identifier (UCI):</strong>{" "}
              {applicationData?.uniqueClientIdentifier || "Loading..."}
            </p>
            <p>
              <strong>Application number:</strong>{" "}
              {applicationData?.applicationNumber || "Loading..."}
            </p>
            <p>
              <strong>Date Received:</strong>{" "}
              {applicationData?.dateOfSubmission
                ? new Date(
                  applicationData.dateOfSubmission
                ).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
                : "Loading..."}
            </p>
            <p>
              <strong>Biometrics:</strong>
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>Biometrics Number:</strong>{" "}
                {applicationData?.biometrics?.number || "Loading..."}
              </li>
              <li>
                <strong>Date of Biometrics Enrolment:</strong>{" "}
                {applicationData?.biometrics?.enrolmentDate
                  ? new Date(
                    applicationData.biometrics.enrolmentDate
                  ).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  : "Loading..."}
              </li>
              <li>
                <strong>Expiry Date:</strong>{" "}
                {applicationData?.biometrics?.expiryDate
                  ? new Date(
                    applicationData.biometrics.expiryDate
                  ).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  : "Loading..."}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Details about application */}
      <div className="mt-8 px-6">
        <h2 className="text-4xl font-semibold mb-3">
          Details about your application status
        </h2>
        <p className="text-base mb-6 leading-relaxed">
          When we get your application, there are a series of steps it may go through before we make a decision. Use the following table to find out the current status of each application step.
        </p>

        <ul className="space-y-6 text-[17px] leading-relaxed">
          <li className="flex items-start gap-3">
            <Image src="/icons/img1.png" alt="Eligibility" width={28} height={28} className="object-contain" />
            <div>
              <div className="flex items-center gap-1 font-bold">
                <span>Review of eligibility</span>
                <i className="fa fa-lg fa-question-circle text-blue-900" aria-hidden="true"></i>
              </div>
              <ul className="list-disc ml-5 mt-1">
                <li>{applicationData?.reviewOfEligibility || "N/A"}</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <Image src="/icons/img2.png" alt="Medical" width={28} height={28} className="object-contain" />
            <div>
              <div className="flex items-center gap-1 font-bold">
                <span>Review of medical results</span>
                <i className="fa fa-lg fa-question-circle text-blue-900" aria-hidden="true"></i>
              </div>
              <ul className="list-disc ml-5 mt-1">
                <li>{applicationData?.medical || "N/A"}</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <Image src="/icons/img3.png" alt="Documents" width={28} height={28} className="object-contain" />
            <div>
              <div className="flex items-center gap-1 font-bold">
                <span>Review of additional documents</span>
                <i className="fa fa-lg fa-question-circle text-blue-900" aria-hidden="true"></i>
              </div>
              <ul className="list-disc ml-5 mt-1">
                <li>{applicationData?.documents || "N/A"}</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <Image src="/icons/img4.png" alt="Interview" width={28} height={28} className="object-contain" />
            <div>
              <div className="flex items-center gap-1 font-bold">
                <span>Interview</span>
                <i className="fa fa-lg fa-question-circle text-blue-900" aria-hidden="true"></i>
              </div>
              <ul className="list-disc ml-5 mt-1">
                <li>{applicationData?.interview || "N/A"}</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <Image src="/icons/img5.png" alt="Biometrics" width={28} height={28} className="object-contain" />
            <div>
              <div className="flex items-center gap-1 font-bold">
                <span>Biometrics</span>
                <i className="fa fa-lg fa-question-circle text-blue-900" aria-hidden="true"></i>
              </div>
              <ul className="list-disc ml-5 mt-1">
                <li>{applicationData?.biometricsStatusText || "N/A"}</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <Image src="/icons/img6.png" alt="Background Check" width={28} height={28} className="object-contain" />
            <div>
              <div className="flex items-center gap-1 font-bold">
                <span>Background check</span>
                <i className="fa fa-lg fa-question-circle text-blue-900" aria-hidden="true"></i>
              </div>
              <ul className="list-disc ml-5 mt-1">
                <li>{applicationData?.backgroundCheck || "N/A"}</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <Image src="/icons/img7.png" alt="Final Decision" width={28} height={28} className="object-contain" />
            <div>
              <div className="flex items-center gap-1 font-bold">
                <span>Final decision</span>
                <i className="fa fa-lg fa-question-circle text-blue-900" aria-hidden="true"></i>
              </div>
              <ul className="list-disc ml-5 mt-1">
                <li>{applicationData?.finalDecision || "N/A"}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* ===================== Messages Section ===================== */}
      <div className="mt-10 px-6">
        <h2 className="text-4xl font-semibold mb-4">
          Messages about your application
        </h2>
        <div className="flex items-center gap-2 text-gray-800 text-lg max-w-full whitespace-nowrap overflow-hidden">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">i</span>
          </div>
          <p className="truncate">
            Links and document titles are shown in the language you chose for
            your portal account when they were generated.
          </p>
        </div>
        <p className="mt-3 text-lg text-gray-700">
          ({filteredMessages.length} New message
          {filteredMessages.length !== 1 ? "s" : ""})
        </p>

        {/* Filters */}
        <div className="flex items-center gap-6 mb-2 md:mb-0 mt-4">
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="font-medium">
              Search:
            </label>
            <input
              id="search"
              type="text"
              className="border border-gray-300 rounded px-2 py-1 text-base"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
            />
          </div>
          <div className="text-base text-gray-600">
            Showing {indexOfFirstMessage + 1} to{" "}
            {Math.min(indexOfLastMessage, filteredMessages.length)} of{" "}
            {filteredMessages.length} entries
          </div>
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-base"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-300 text-left my-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-semibold border border-gray-300 cursor-pointer">
                Subject <span>⇅</span>
              </th>
              <th className="px-4 py-2 font-semibold border border-gray-300 cursor-pointer">
                Date sent <span>⇅</span>
              </th>
              <th className="px-4 py-2 font-semibold border border-gray-300 cursor-pointer">
                Date read <span>⇅</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.length > 0 ? (
              currentMessages.map((msg, index) => (
                <tr
                  key={index}
                  className="border border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border border-gray-300 text-blue-700 underline cursor-pointer">
                    {msg.subject || "N/A"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {msg.sentAt
                      ? new Date(msg.sentAt).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {msg.readAt
                      ? new Date(msg.readAt).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "New Message"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center px-4 py-2 border border-gray-300"
                >
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`px-5 py-2 text-xl rounded-lg transition-colors duration-200 ${num === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Report Problem */}
        <div className="mt-4">
          <button
            className="border border-gray-300 px-4 py-2 rounded text-base 
                     bg-gray-100 text-blue-600 
                     hover:bg-gray-300 hover:text-blue-700 
                     active:bg-gray-400"
          >
            Report a problem or mistake on this page
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12">
        <div className="px-4 sm:px-8 py-3 text-base text-gray-600">
          Date modified: {applicationData?.updatedAt
            ? new Date(applicationData.updatedAt).toISOString().split("T")[0]
            : "Loading..."}
        </div>

        <div className="bg-[#26374a] text-white py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8">
            <div className="space-y-2 text-base">
              <a href="#" className="block hover:underline">
                Contact us
              </a>
              <a href="#" className="block hover:underline">
                Departments and agencies
              </a>
              <a href="#" className="block hover:underline">
                Public service and military
              </a>
            </div>
            <div className="space-y-2 text-base">
              <a href="#" className="block hover:underline">
                News
              </a>
              <a href="#" className="block hover:underline">
                Treaties, laws and regulations
              </a>
              <a href="#" className="block hover:underline">
                Government-wide reporting
              </a>
            </div>
            <div className="space-y-2 text-base">
              <a href="#" className="block hover:underline">
                Prime Minister
              </a>
              <a href="#" className="block hover:underline">
                About government
              </a>
              <a href="#" className="block hover:underline">
                Open government
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between text-base text-gray-700">
            {/* Left: Links */}
            <div className="space-x-4">
              <a href="#" className="hover:underline">
                Social media
              </a>
              <span>•</span>
              <a href="#" className="hover:underline">
                Mobile applications
              </a>
              <span>•</span>
              <a href="#" className="hover:underline">
                About Canada.ca
              </a>
              <span>•</span>
              <a href="#" className="hover:underline">
                Terms and conditions
              </a>
              <span>•</span>
              <a href="#" className="hover:underline">
                Privacy
              </a>
            </div>

            {/* Right: Logo */}
            <div>
              <Image src="/footer.svg" alt="Canada Logo" width={180} height={50} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
