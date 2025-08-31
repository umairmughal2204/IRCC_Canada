"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { fetchApplicationByIdAction } from "@/actions/applicationActions";
import Header from "@/app/header";
import { logoutApplicationAction } from "@/actions/authActions";

export default function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [applicationData, setApplicationData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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

  const filtered = messages.filter((msg) =>
    msg.subject.toLowerCase().includes(search.toLowerCase())
  );
  const lastModified = applicationData?.lastModified
    ? new Date(applicationData.lastModified).toLocaleDateString("en-US", {
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
          Check the status, review the details and read messages for your application.
          <a href="#" className="text-blue-800 underline ml-2">
            View submitted application or upload documents
          </a>
        </p>



        <div className="border-l-4 border-black pl-5 mt-6 w-fit pr-6 py-3">
          <p className="text-lg">
            You have 0{" "}
            <a href="#" className="text-blue-800 underline">
              unread message(s).
            </a>
          </p>
        </div>

      </div>




      {/* Application + Applicant info */}
      <div className="flex gap-6 px-6 mt-4">

        {/* Application status */}
        <div className="border border-gray-300 rounded bg-white w-fit max-w-full">
          <h2 className="bg-gray-100 px-5 py-3 font-semibold text-xl">
            Application status
          </h2>
          <div className="p-5 text-lg leading-relaxed max-w-2xl">
            <p>
              We are processing your application. We will send you a message
              when there is an update or if we need more information from you.
            </p>
            <p className="mt-4 font-semibold">
              Latest update: <br />
              Biometrics -{" "}
              {applicationData?.biometrics?.enrolmentDate
                ? new Date(applicationData.biometrics.enrolmentDate).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )
                : "N/A"}{" "}
              : {applicationData?.biometrics?.status || "Pending"}.
            </p>
          </div>
        </div>

        {/* Applicant info */}
        <div className="border border-gray-300 rounded bg-white min-w-[420px]">
          <h2 className="bg-gray-100 px-5 py-3 font-semibold text-xl">
            Applicant information
          </h2>
          <div className="p-5 text-lg space-y-3 max-w-2xl leading-relaxed">
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
                ? new Date(applicationData.dateOfSubmission).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )
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
                  ? new Date(applicationData.biometrics.enrolmentDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                  : "Loading..."}
              </li>
              <li>
                <strong>Expiry Date:</strong>{" "}
                {applicationData?.biometrics?.expiryDate
                  ? new Date(applicationData.biometrics.expiryDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
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
      <span>📑</span>
      <div>
        <div className="flex items-center gap-1 font-bold">
          <span>Review of eligibility</span>
          <span className="text-blue-900">❓</span>
        </div>
        <ul className="list-disc ml-5 mt-1">
          <li>We are reviewing whether you meet the eligibility requirements.</li>
        </ul>
      </div>
    </li>

    <li className="flex items-start gap-3">
      <span>🧾</span>
      <div>
        <div className="flex items-center gap-1 font-bold">
          <span>Review of medical results</span>
          <span className="text-blue-900">❓</span>
        </div>
        <ul className="list-disc ml-5 mt-1">
          <li>You do not need a medical exam. We will send you a message if this changes.</li>
        </ul>
      </div>
    </li>

    <li className="flex items-start gap-3">
      <span>📂</span>
      <div>
        <div className="flex items-center gap-1 font-bold">
          <span>Review of additional documents</span>
          <span className="text-blue-900">❓</span>
        </div>
        <ul className="list-disc ml-5 mt-1">
          <li>We do not need additional documents.</li>
        </ul>
      </div>
    </li>

    <li className="flex items-start gap-3">
      <span>👥</span>
      <div>
        <div className="flex items-center gap-1 font-bold">
          <span>Interview</span>
          <span className="text-blue-900">❓</span>
        </div>
        <ul className="list-disc ml-5 mt-1">
          <li>You do not need an interview. We will send you a message if this changes.</li>
        </ul>
      </div>
    </li>

    <li className="flex items-start gap-3">
      <span>🖐</span>
      <div>
        <div className="flex items-center gap-1 font-bold">
          <span>Biometrics</span>
          <span className="text-blue-900">❓</span>
        </div>
        <ul className="list-disc ml-5 mt-1">
          <li>
            {applicationData?.biometrics?.enrolmentDate
              ? new Date(applicationData.biometrics.enrolmentDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Pending"}{" "}
            {applicationData?.biometrics?.status || ""}
          </li>
        </ul>
      </div>
    </li>

    <li className="flex items-start gap-3">
      <span>🔍</span>
      <div>
        <div className="flex items-center gap-1 font-bold">
          <span>Background check</span>
          <span className="text-blue-900">❓</span>
        </div>
        <ul className="list-disc ml-5 mt-1">
          <li>We are processing your background check. We will send you a message if we need more information.</li>
        </ul>
      </div>
    </li>

    <li className="flex items-start gap-3">
      <span>⚖️</span>
      <div>
        <div className="flex items-center gap-1 font-bold">
          <span>Final decision</span>
          <span className="text-blue-900">❓</span>
        </div>
        <ul className="list-disc ml-5 mt-1">
          <li>Your application is in progress. We will send you a message once the final decision has been made.</li>
        </ul>
      </div>
    </li>
  </ul>
</div>







      {/* Messages about application (UPDATED) */}
      <div className="mt-10 px-6">
        <h2 className="text-4xl font-semibold mb-4">
          Messages about your application
        </h2>
        <div className="flex items-center gap-2 text-gray-800 text-lg max-w-full whitespace-nowrap overflow-hidden">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">i</span>
          </div>
          <p className="truncate">
            Links and document titles are shown in the language you chose for your portal account when they were generated.
          </p>
        </div>
        <p className="mt-3 text-lg text-gray-700">
          ({messages.length} New message{messages.length !== 1 ? "s" : ""})
        </p>




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
            <tr className="border border-gray-300 hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300 text-blue-700 underline cursor-pointer">
                Biometrics Collection Letter
              </td>
              <td className="px-4 py-2 border border-gray-300">June 27, 2025</td>
              <td className="px-4 py-2 border border-gray-300">June 27, 2025</td>
            </tr>
            <tr className="border border-gray-300 hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300 text-blue-700 underline cursor-pointer">
                Confirmation of Online Application Transmission
              </td>
              <td className="px-4 py-2 border border-gray-300">June 25, 2025</td>
              <td className="px-4 py-2 border border-gray-300">New Message</td>
            </tr>
            <tr className="border border-gray-300 hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300 text-blue-700 underline cursor-pointer">
                Submission Confirmation
              </td>
              <td className="px-4 py-2 border border-gray-300">June 25, 2025</td>
              <td className="px-4 py-2 border border-gray-300">June 25, 2025</td>
            </tr>
          </tbody>
        </table>




        {/* Pagination */}
        <div className="flex justify-center mb-10">
          <button className="px-5 py-2 text-xl bg-blue-600 text-white rounded-lg transition-colors duration-200 hover:bg-gray-500">
            1
          </button>
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
