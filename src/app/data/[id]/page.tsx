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
    msg.subject.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="text-sm text-gray-700 px-6 py-2">
        <a href="/" className="text-blue-700 hover:underline">
          Home
        </a>{" "}
        › <span>Your account</span>
      </div>

      {/* Signed in */}
      <div className="text-right text-sm px-6">
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
      <main className="px-6 mt-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-red-700 inline-block">
          {application?.applicantName || "User"}'s account
        </h1>

        {/* Applications section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">
          View the applications you submitted
        </h2>
        <p className="text-sm mb-4">
          Review, check the status, or read messages about your submitted
          application.
        </p>

        {loading ? (
          <p>Loading application data...</p>
        ) : application ? (
          <div className="overflow-x-auto border border-gray-300 mb-6">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 border-b border-gray-300 text-left">
                <tr>
                  <th className="px-3 py-2 font-semibold">Application type</th>
                  <th className="px-3 py-2 font-semibold">Application number</th>
                  <th className="px-3 py-2 font-semibold">Applicant name</th>
                  <th className="px-3 py-2 font-semibold">Date submitted</th>
                  <th className="px-3 py-2 font-semibold">Current status</th>
                  <th className="px-3 py-2 font-semibold">Messages</th>
                  <th className="px-3 py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2">{application.applicationType}</td>
                  <td className="px-3 py-2">{application.applicationNumber}</td>
                  <td className="px-3 py-2">{application.applicantName}</td>
                  <td className="px-3 py-2">
                    {new Date(application.dateOfSubmission).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </td>
                  <td className="px-3 py-2">{application.status || "Submitted"}</td>
                  <td className="px-3 py-2">{messages.length > 0 ? "New" : "None"}</td>
                  <td className="px-3 py-2">
                    <a
                      href={`/profile/${id}`}
                      className="text-blue-700 underline"
                    >
                      Check full application status
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>No application data found.</p>
        )}

        {/* Messages Table */}
        <h2 className="text-xl font-semibold mb-2">
          Messages about your application
        </h2>
        <p className="text-sm text-gray-800">
          ℹ️ Links and document titles are shown in the language you chose for
          your portal account when they were generated.
        </p>
        <p className="mt-2 text-sm">({messages.length} New message(s))</p>

        <div className="flex flex-wrap justify-between items-center mt-4 mb-2 text-sm">
          <div>
            Search:{" "}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-400 rounded px-2 py-1 ml-1 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 mb-6">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b border-gray-300 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Subject</th>
                <th className="px-3 py-2 font-semibold">Date sent</th>
                <th className="px-3 py-2 font-semibold">Date read</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-3 py-2 text-blue-700 underline">
                      {msg.subject}
                    </td>
                    <td className="px-3 py-2">{msg.dateSent}</td>
                    <td className="px-3 py-2">{msg.dateRead}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-4 text-gray-600"
                  >
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-10">
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
        </div>

        {/* Report Problem */}
        <div className="mt-4">
          <button className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100">
            Report a problem or mistake on this page
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12">
        <div className="px-4 sm:px-8 py-3 text-sm text-gray-600">
          Date modified: <span className="font-medium">{lastModified}</span>
        </div>
        <div className="bg-[#26374a] text-white py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8">
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
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
        <div className="bg-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center text-sm text-gray-700 space-x-4">
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
          <div className="mt-6 flex justify-center">
            <Image src="/footer.svg" alt="Canada Logo" width={150} height={40} />
          </div>
        </div>
      </footer>
    </div>
  );
}
