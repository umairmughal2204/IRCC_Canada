"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import { fetchApplicationByIdAction } from "@/actions/applicationActions";
import Header from "@/app/header";
import { logoutApplicationAction } from "@/actions/authActions";

export default function AccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [application, setApplication] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  // Fetch application by ID
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetchApplicationByIdAction(id);
        if (res.data) {
          setApplication(res.data);
          setMessages(res.data.messages || []);
        }
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

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

  // Dynamic last modified date
  const lastModified = application?.lastModified
    ? new Date(application.lastModified).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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
      <div className="text-base text-gray-700 px-6 py-2">
        <a href="/" className="text-blue-700 hover:underline">
          Home
        </a>{" "}
        › <span>Your account</span>
      </div>

      {/* Signed in */}
      <div className="text-right text-base px-6">
        Signed in as{" "}
        <span className="font-semibold">
          {application?.applicantName || "User"}
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

      {/* Main content */}
      <main className="px-6 mt-6 max-w-6xl mx-auto text-lg">
        <div className="border-b-2 border-red-700 mb-4">
          <h1 className="text-4xl font-bold">
            {application?.applicantName || "User"}'s account
          </h1>
        </div>

        {/* Applications section */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          View the applications you submitted
        </h2>
        <p className="text-base mb-4">
          Review, check the status, or read messages about your submitted
          application.
        </p>
        {loading ? (
          <p>Loading application data...</p>
        ) : application ? (
          <div className="mb-6 p-4 bg-white">
            {/* Top controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 text-base text-gray-700">
              {/* Left: search + entries */}
              <div className="flex items-center gap-6 mb-2 md:mb-0">
                <div className="flex items-center gap-2">
                  <label htmlFor="search" className="font-medium">
                    Search:
                  </label>
                  <input
                    id="search"
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 text-base"
                  />
                </div>
                <div className="text-base text-gray-600">
                  Showing 1 to 1 of 1 entries
                </div>
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-base">
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                  </select>
                  <span>entries</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr>
                    {[
                      "Application type",
                      "Application number",
                      "Applicant name",
                      "Date submitted",
                      "Current status",
                      "Messages",
                      "Action",
                    ].map((header) => {
                      const [firstWord, ...rest] = header.split(" ");
                      return (
                        <th
                          key={header}
                          className="px-3 py-2 font-semibold text-left bg-white cursor-pointer align-top"
                          onClick={(e) => {
                            // reset all headers
                            const headers = e.currentTarget.parentElement?.children;
                            if (headers) {
                              Array.from(headers).forEach((h) =>
                                h.classList.remove("bg-gray-200")
                              );
                            }
                            // set clicked header
                            e.currentTarget.classList.add("bg-gray-200");
                          }}
                        >
                          <div className="flex flex-col leading-tight">
                            {/* First line: first word */}
                            <span className="font-bold">{firstWord}</span>

                            {/* Second line: rest of the header + arrow */}
                            <span className="text-sm">
                              {rest.join(" ")}{" "}
                              <span className="text-gray-400">⇅</span>
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* Main row */}
                  <tr className="bg-gray-100">
                    <td className="px-3 py-2 whitespace-nowrap">
                      {application.applicationType}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {application.applicationNumber}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {application.applicantName}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {new Date(
                        application.dateOfSubmission
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {application.status || "Submitted"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {messages.length > 0 ? "New" : "None"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <a
                        href={`/profile/${id}`}
                        className="text-blue-700 hover:underline"
                      >
                        Check full application status
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No application data found.</p>
        )}
        <div className="flex justify-center mb-10">
          <button className="px-5 py-2 text-xl bg-blue-600 text-white rounded-lg transition-colors duration-200 hover:bg-gray-500">
            1
          </button>
        </div>

        <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          Did you apply on paper or don&apos;t see your online application in
          your account?{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Add your application to your account
          </a>
          <br />
          to access it and check your status online.
        </p>

        {/* Messages Table */}
        <h2 className="my-5 text-2xl font-semibold mb-2">
          Continue an application you haven't submitted
        </h2>
        <p className="text-base text-gray-800">
          Continue working on an application or profile you haven't submitted or
          delete it from your account.
        </p>
        {loading ? (
          <p>Loading application data...</p>
        ) : application ? (
          <div className="mb-6 p-4 bg-white">
            {/* Top controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 text-base text-gray-700">
              {/* Left: search + entries */}
              <div className="flex items-center gap-6 mb-2 md:mb-0">
                <div className="flex items-center gap-2">
                  <label htmlFor="search" className="font-medium">
                    Search:
                  </label>
                  <input
                    id="search"
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 text-base"
                  />
                </div>
                <div className="text-base text-gray-600">
                  Showing 1 to 1 of 1 entries
                </div>
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-base">
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                  </select>
                  <span>entries</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr>
                    {[
                      "Application type",
                      "Date Created",
                      "Days left to submit",
                      "Date last saved",
                      "Action",
                    ].map((header) => {
                      const [firstWord, ...rest] = header.split(" ");
                      return (
                        <th
                          key={header}
                          className="px-3 py-2 font-semibold text-left bg-white cursor-pointer align-top"
                          onClick={(e) => {
                            // reset all headers
                            const headers = e.currentTarget.parentElement?.children;
                            if (headers) {
                              Array.from(headers).forEach((h) =>
                                h.classList.remove("bg-gray-200")
                              );
                            }
                            // set clicked header
                            e.currentTarget.classList.add("bg-gray-200");
                          }}
                        >
                          <div className="flex flex-col leading-tight">
                            {/* First line: first word */}
                            <span className="font-bold">{firstWord}</span>

                            {/* Second line: rest of the header + arrow */}
                            <span className="text-sm">
                              {rest.join(" ")}{" "}
                              <span className="text-gray-400">⇅</span>
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No application data found.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center mb-10">
          <button className="px-5 py-2 text-xl bg-blue-600 text-white rounded-lg transition-colors duration-200 hover:bg-gray-500">
            1
          </button>
        </div>

        <div className="px-6 py-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Start an application</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <a
                href="#"
                className="text-blue-800 font-semibold underline block mb-2 text-lg"
              >
                Apply to come to Canada
              </a>
              <p className="text-base">
                Includes applications for visitor visas, work and study permits,
                Express Entry and International Experience Canada. You will need
                your personal reference code if you have one.
              </p>
              <p className="mt-4 font-semibold text-base">
                Note: <span className="font-bold">You must</span> apply through
                this portal (IRCC secure account) if you're applying with a
                family member who needs a work permit.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <a
                href="#"
                className="text-blue-800 font-semibold underline block mb-2 text-lg"
              >
                Refugees: Apply for temporary health care benefits
              </a>
              <p className="text-base">
                Use this application if you are a protected person or refugee
                claimant who wants to apply for the Interim Federal Health
                Program.
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <a
                href="#"
                className="text-blue-800 font-semibold underline block mb-2 text-lg"
              >
                Citizenship: Apply for a search or proof of citizenship
              </a>
              <p className="text-base">
                Use this application to apply for proof of citizenship
                (citizenship certificate) or to search citizenship records.
              </p>
            </div>
          </div>
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
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {msg.readAt
                        ? new Date(msg.readAt).toLocaleDateString("en-US", {
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
      </main>

      {/* Footer */}
      <footer className="mt-12">
        <div className="px-4 sm:px-8 py-3 text-base text-gray-600">
          Date modified: <span className="font-medium">{lastModified}</span>
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
