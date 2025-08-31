"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { fetchApplicationByIdAction } from "@/actions/applicationActions";

export default function TermsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetchApplicationByIdAction(id);
      if (res.data) {
        setApplicationData(res.data);
      }
    }
    fetchData();
  }, [id]);

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/identity/${id}`); // change route as needed
  };

  const handleDecline = () => {
    if (
      confirm(
        "If you do not accept the Terms and Conditions, you will not be able to access your account. Are you sure?"
      )
    ) {
      router.push("/");
    }
  };

  // Dynamic footer date
  const dateModified = applicationData?.lastModified
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

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b w-full">
        <div className="w-full flex items-center justify-between px-8 py-5 max-w-none">
          {/* Left: Logo and Gov Text */}
          <div className="flex items-center space-x-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg"
              alt="Canadian Flag"
              className="w-20 h-20"
            />
            <div className="leading-tight">
              <p className="text-lg font-bold">Government</p>
              <p className="text-lg font-bold">of Canada</p>
            </div>
            <div className="ml-6 border-l h-8 border-gray-300"></div>
            <div className="leading-tight">
              <p className="text-lg font-bold">Gouvernement</p>
              <p className="text-lg font-bold">du Canada</p>
            </div>
          </div>

          {/* Language */}
          <a
            href="#"
            className="text-base text-blue-900 hover:underline font-medium"
          >
            Français
          </a>
        </div>
        {/* Navigation Bar */}
        <nav className="w-screen bg-[#2f4b72] text-white text-sm border-t border-b border-white/20">
          <div className="grid grid-cols-[40px_1fr_1fr_1fr_40px] w-screen">
            <div className="border-r border-white/20"></div>
            <div className="flex items-center justify-center border-r border-white/20 py-3">
              <a href="#" className="hover:underline text-[16px]">
                Definitions
              </a>
            </div>
            <div className="flex items-center justify-center border-r border-white/20 py-3">
              <a href="#" className="hover:underline text-[16px]">
                Frequently Asked Questions (FAQ)
              </a>
            </div>
            <div className="flex items-center justify-center border-r border-white/20 py-3">
              <a href="#" className="hover:underline text-[16px]">
                Help
              </a>
            </div>
            <div></div>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2 text-sm">
          <a href="/" className="text-[#284162] hover:underline">
            Home
          </a>{" "}
          &gt; Terms and Conditions
        </div>
      </div>

      {/* Signed in */}
      <div className="max-w-6xl mx-auto px-4 mt-4 text-sm text-gray-700 flex justify-end items-center space-x-2">
        <span>
          Signed in as{" "}
          <strong>{applicationData?.userName || "Loading..."}</strong>
        </span>
        <a href="#" className="text-[#284162] hover:underline font-medium ml-4">
          Logout
        </a>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 my-8">
        <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">
          Terms and Conditions
        </h1>

        <div className="bg-white p-6 space-y-4">
          <p>
            By accessing your account, you are agreeing to abide by the
            following Terms and Conditions of Use:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              You agree to keep your identification number(s) confidential and
              to not share it (them) with anyone. If you suspect that others
              have obtained your identification number(s), contact us
              immediately.
            </li>
            <li>
              You certify that any information provided by you is true, accurate
              and complete.
            </li>
            <li>
              You understand and accept that as a security measure for
              administrative reasons, we can revoke your access if you fail to
              abide by the Terms and Conditions of Use.
            </li>
            <li>
              You understand and accept that we are not responsible for any
              losses or damages incurred by anyone because of:
            </li>
          </ul>

          <ol className="list-decimal pl-10 space-y-1">
            <li>The use of the information available in your account</li>
            <li>
              Any restrictions, delay, malfunction, or unavailability of your
              account
            </li>
          </ol>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              You understand and accept that by using your account and applying
              online, we can communicate with you (or your representative, if
              applicable) via e-mail.
            </li>
            <li>
              To continue, choose "I Accept" to indicate your acceptance. If you
              do not agree, choose "I Do Not Accept".
            </li>
          </ul>

          <p>
            It is important that you sign out and close your browser before
            leaving this computer unattended. This will prevent unauthorized
            access to your personal information.
          </p>

          {/* Buttons */}
          <form
            onSubmit={handleAccept}
            className="mt-6 flex flex-wrap justify-start gap-4"
          >
            <button
              type="submit"
              className="bg-[#284162] text-white px-6 py-2 rounded hover:bg-[#1e3250]"
            >
              I Accept
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="bg-gray-100 border border-gray-300 px-6 py-2 rounded hover:bg-gray-200"
            >
              I Do Not Accept
            </button>
          </form>
        </div>

        {/* Report a problem */}
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
      <footer className="mt-16">
        {/* Dynamic Date Modified */}
        <div className="bg-white px-8 py-4 text-sm text-gray-800 w-full">
          Date modified: <strong>{dateModified}</strong>
        </div>

        {/* Footer Columns */}
        <div className="bg-[#e9ecef] w-full">
          <div className="w-full px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-gray-900">
            {/* About Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-800 hover:underline">
                    About GCKey
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-800 hover:underline">
                    Enabled Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-800 hover:underline">
                    Site Map
                  </a>
                </li>
              </ul>
            </div>

            {/* Transparency Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">Transparency</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-800 hover:underline">
                    Proactive Disclosure
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-800 hover:underline">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-800 hover:underline">
                    Phone Numbers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Thick Dark Blue Divider */}
          <div className="h-[4px] bg-[#2f4b72] w-full"></div>
        </div>

        {/* Canada Wordmark Footer */}
        <div className="bg-white py-6 px-8 flex justify-end w-full">
          <img
            src="https://www.canada.ca/etc/designs/canada/cdts/gcweb/v4_0_43/wet-boew/assets/wmms-blk.svg"
            alt="Canada logo"
            className="h-8"
          />
        </div>
      </footer>
    </main>
  );
}
