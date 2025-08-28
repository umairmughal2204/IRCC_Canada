"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function AccountPage() {
  // Messages data
  const messages = [
    {
      subject: "Biometrics Collection Letter",
      dateSent: "June 27, 2025",
      dateRead: "June 27, 2025",
    },
    {
      subject: "Submission Confirmation",
      dateSent: "June 25, 2025",
      dateRead: "June 25, 2025",
    },
    {
      subject: "Confirmation of Online Application Transmission",
      dateSent: "June 25, 2025",
      dateRead: "New Message",
    },
  ];

  const [search, setSearch] = useState("");

  const filtered = messages.filter((msg) =>
    msg.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white text-black font-sans min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-gray-300 px-6 py-2">
        <img
          src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
          alt="Government of Canada"
          className="h-10"
        />
        <a href="#" className="text-sm text-blue-700 hover:underline">
          Français
        </a>
      </header>

      {/* Menu */}
      <nav className="bg-gray-800 px-6 py-2">
        <button className="text-white text-sm">MENU ▼</button>
      </nav>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-700 px-6 py-2">
        <a href="#" className="text-blue-700 hover:underline">
          Home
        </a>{" "}
        › <span>Your account</span>
      </div>

      {/* Signed in */}
      <div className="text-right text-sm px-6">
        Signed in as <span className="font-semibold">AZEEM LIAQAT</span>
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
        <a href="#" className="text-blue-700 hover:underline">
          Logout
        </a>
      </div>

      {/* Main content */}
      <main className="px-6 mt-6 max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-red-700 inline-block">
          AZEEM LIAQAT&apos;s account
        </h1>

        {/* Applications section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">
          View the applications you submitted
        </h2>
        <p className="text-sm mb-4">
          Review, check the status or read messages about your submitted
          application.
        </p>

        {/* Search + Entries */}
        <div className="flex flex-wrap justify-between items-center mb-3 text-sm">
          <div>
            Search:{" "}
            <input
              type="text"
              className="border border-gray-400 rounded px-2 py-1 ml-1 text-sm"
            />
          </div>
          <div>
            Showing 1 to 1 of 1 entries | Show{" "}
            <select className="border border-gray-400 rounded px-1 py-0.5">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>{" "}
            entries
          </div>
        </div>

        {/* Applications Table */}
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
                <td className="px-3 py-2">Online Application</td>
                <td className="px-3 py-2">W310094330</td>
                <td className="px-3 py-2">AZEEM LIAQAT</td>
                <td className="px-3 py-2">June 25, 2025</td>
                <td className="px-3 py-2">Submitted</td>
                <td className="px-3 py-2">New</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-700 underline">
                    Check full application status
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-6">
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
        </div>

        {/* Info */}
        <p className="text-sm mb-8">
          Did you apply on paper or don&apos;t see your online application in
          your account?{" "}
          <a href="#" className="text-blue-700 underline">
            Add (link) your application to your account
          </a>{" "}
          to access it and check your status online.
        </p>

        {/* Continue Application */}
        <h2 className="text-xl font-semibold mb-2">
          Continue an application you haven&apos;t submitted
        </h2>
        <p className="text-sm mb-4">
          Continue working on an application or profile you haven&apos;t
          submitted or delete it from your account.
        </p>

        {/* Empty Table */}
        <div className="overflow-x-auto border border-gray-300 mb-6">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b border-gray-300 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Application type</th>
                <th className="px-3 py-2 font-semibold">Date created</th>
                <th className="px-3 py-2 font-semibold">Days left to submit</th>
                <th className="px-3 py-2 font-semibold">Date last saved</th>
                <th className="px-3 py-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-600">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Start Application */}
        <h2 className="text-xl font-semibold mb-4">Start an application</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10 text-sm">
          <div>
            <a href="#" className="text-blue-700 underline font-medium">
              Apply to come to Canada
            </a>
            <p className="mt-1">
              Includes applications for visitor visas, work and study permits,
              Express Entry and International Experience Canada. You will need
              your personal reference code if you have one.
            </p>
            <p className="mt-1">
              <strong>Note:</strong> You <strong>must</strong> apply through
              this portal (IRCC secure account) if you&apos;re applying with a
              family member who needs a work permit.
            </p>
          </div>
          <div>
            <a href="#" className="text-blue-700 underline font-medium">
              Refugees: Apply for temporary health care benefits
            </a>
            <p className="mt-1">
              Use this application if you are a protected person or refugee
              claimant who wants to apply for the Interim Federal Health
              Program.
            </p>
          </div>
          <div>
            <a href="#" className="text-blue-700 underline font-medium">
              Citizenship: Apply for a search or proof of citizenship
            </a>
            <p className="mt-1">
              Use this application to apply for proof of citizenship
              (citizenship certificate) or to search citizenship records.
            </p>
          </div>
        </div>

        {/* Messages */}
        <h2 className="text-xl font-semibold mb-2">
          Messages about your application
        </h2>
        <p className="text-sm text-gray-800">
          ℹ️ Links and document titles are shown in the language you chose for
          your portal account when they were generated.
        </p>
        <p className="mt-2 text-sm">(1 New message)</p>

        {/* Search + entries */}
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
          <div>
            Showing 1 to {filtered.length} of {messages.length} entries | Show{" "}
            <select className="border border-gray-400 rounded px-1 py-0.5">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>{" "}
            entries
          </div>
        </div>

        {/* Messages Table */}
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
              {filtered.map((msg, idx) => (
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
              ))}
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
        <button className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100">
          Report a problem or mistake on this page
        </button>
      </main>

      {/* Footer */}
      <footer className="mt-12">
        <div className="px-4 sm:px-8 py-3 text-sm text-gray-600">
          Date modified: <span className="font-medium">2025-07-31</span>
        </div>

        {/* Dark blue section */}
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

        {/* Bottom section */}
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

          {/* Canada logo */}
          <div className="mt-6 flex justify-center">
            <Image
              src="/footer.svg"
              alt="Canada Logo"
              width={150}
              height={40}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
