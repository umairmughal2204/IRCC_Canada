"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  // Messages data
  const messages = [
    {
      subject: "Biometrics Collection Letter",
      dateSent: "June 27, 2025",
      dateRead: "June 27, 2025",
      link: "#",
    },
    {
      subject: "Submission Confirmation",
      dateSent: "June 25, 2025",
      dateRead: "June 25, 2025",
      link: "#",
    },
    {
      subject: "Confirmation of Online Application Transmission",
      dateSent: "June 25, 2025",
      dateRead: "New Message",
      link: "#",
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
        › <span>Account profile</span>
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

      {/* Application + Applicant info */}
      <div className="grid md:grid-cols-2 gap-6 px-6 mt-4">
        {/* Application status */}
        <div className="border border-gray-300 rounded">
          <h2 className="bg-gray-100 px-4 py-2 font-semibold">
            Application status
          </h2>
          <div className="p-4 text-sm">
            <p>
              We are processing your application. We will send you a message
              when there is an update or if we need more information from you.
            </p>
            <p className="mt-3 font-semibold">
              Latest update: <br /> Biometrics - June 30, 2025: Completed.
            </p>
          </div>
        </div>

        {/* Applicant info */}
        <div className="border border-gray-300 rounded">
          <h2 className="bg-gray-100 px-4 py-2 font-semibold">
            Applicant information
          </h2>
          <div className="p-4 text-sm space-y-1">
            <p>
              <strong>Principal Applicant:</strong> AZEEM LIAQAT
            </p>
            <p>
              <strong>Unique Client Identifier (UCI):</strong> 1149120000
            </p>
            <p>
              <strong>Application number:</strong> W310094330
            </p>
            <p>
              <strong>Date Received:</strong> June 25, 2025
            </p>
            <p>
              <strong>Biometrics:</strong>
            </p>
            <ul className="ml-4 list-disc">
              <li>
                <strong>Biometrics Number:</strong> 00058020250630113926
              </li>
              <li>
                <strong>Date of Biometrics Enrolment:</strong> June 30, 2025
              </li>
              <li>
                <strong>Expiry Date:</strong> June 30, 2035
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Details about application */}
      <div className="mt-8 px-6">
        <h2 className="text-xl font-semibold mb-2">
          Details about your application status
        </h2>
        <p className="text-sm mb-4">
          When we get your application, there are a series of steps it may go
          through before we make a decision. Use the following table to find out
          the current status of each application step.
        </p>

        <ul className="space-y-4 text-sm">
          <li>
            <strong>📑 Review of eligibility:</strong>
            <br />
            We are reviewing whether you meet the eligibility requirements.
          </li>
          <li>
            <strong>🧾 Review of medical results:</strong>
            <br />
            You do not need a medical exam. We will send you a message if this
            changes.
          </li>
          <li>
            <strong>📂 Review of additional documents:</strong>
            <br />
            We do not need additional documents.
          </li>
          <li>
            <strong>👥 Interview:</strong>
            <br />
            You do not need an interview. We will send you a message if this
            changes.
          </li>
          <li>
            <strong>🖐 Biometrics:</strong>
            <br />
            June 30, 2025 Completed.
          </li>
          <li>
            <strong>🔍 Background check:</strong>
            <br />
            We are processing your background check. We will send you a message
            if we need more information.
          </li>
          <li>
            <strong>⚖️ Final decision:</strong>
            <br />
            Your application is in progress. We will send you a message once the
            final decision has been made.
          </li>
        </ul>
      </div>

      {/* Messages about application */}
      <div className="mt-10 px-6">
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
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>{" "}
            entries
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-left">
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
                    <a href={msg.link}>{msg.subject}</a>
                  </td>
                  <td className="px-3 py-2">{msg.dateSent}</td>
                  <td className="px-3 py-2">{msg.dateRead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-3">
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        </div>

        {/* Report Problem */}
        <div className="mt-4">
          <button className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100">
            Report a problem or mistake on this page
          </button>
        </div>
      </div>

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
              src="/images/canada-logo.png"
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
