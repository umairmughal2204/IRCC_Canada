"use client";

import { use, useEffect, useState } from "react";
import { fetchApplicationByIdAction } from "@/actions/applicationActions";

export default function AuthSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [applicationData, setApplicationData] = useState<any>(null);

  // Fetch application data dynamically
  useEffect(() => {
    async function fetchData() {
      const res = await fetchApplicationByIdAction(id);
      if (res.data) setApplicationData(res.data);
    }
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2f4b72]">
      {/* Header */}
      <header className="bg-white border-b w-full">
        <div className="w-full flex items-center justify-between px-8 py-5 max-w-none">
          <div className="flex items-center space-x-6">
            <img
              src="https://www.canada.ca/etc/designs/canada/cdts/gcweb/v4_0_43/wet-boew/assets/sig-blk-en.svg"
              alt="Government of Canada"
              className="h-12 md:h-14"
            />
          </div>
          <a href="#" className="text-base text-blue-900 hover:underline font-medium">
            Français
          </a>
        </div>

        <div className="bg-[#335075] text-white text-lg font-semibold px-6 py-3">
          Two-Factor Authentication
        </div>

        <nav className="w-full bg-[#E1E4E7] text-sm border-t border-b border-white/20">
          <div className="flex justify-start gap-8 px-6">
            <a href="#" className="py-3 hover:underline text-[16px] text-[#2f4b72]">Contact Us</a>
            <a href="#" className="py-3 hover:underline text-[16px] text-[#2f4b72]">FAQ</a>
            <a href="#" className="py-3 hover:underline text-[16px] text-[#2f4b72]">Help</a>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 border-b border-[#990000] w-fit pb-1 mb-6">
          Authentication Success
        </h1>

        {/* Success Alert */}
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6">
          You have successfully completed two-factor authentication.
        </div>

        <p className="mb-4 text-gray-800">
          Here are the details of your recent two-factor authentication activity:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>
            Your last two-factor authentication was on{" "}
            <b>{applicationData?.updatedAt|| "Loading..."}</b>
          </li>
          <li>
            The last failed authentication attempt was on{" "}
            <b>{applicationData?.updatedAt || "Loading..."}</b>
          </li>
          <li>
            You have <b>{applicationData?.updatedAt?? "Loading..."}</b> active recovery codes remaining.
          </li>
        </ul>

        {/* Continue Button */}
        <div className="mt-8">
          <a
            href={`/terms/${id}`}
            className="bg-[#335075] text-white px-6 py-2 rounded hover:bg-[#2a3d5a]"
          >
            Continue
          </a>
        </div>

        {/* Other options */}
        <section className="mt-8 space-y-4">
          <p>
            To change your device or method of two-factor authentication, return to the setup process:
          </p>
          <a
            href="/twofactor/setup"
            className="px-6 py-2 rounded border border-gray-400 text-gray-900 hover:bg-gray-100"
          >
            Change your two-factor authentication
          </a>

          <p className="mt-6">
            If you have lost or are running out of recovery codes, get a new set:
          </p>
          <a
            href="/twofactor/recovery"
            className="px-6 py-2 rounded border border-gray-400 text-gray-900 hover:bg-gray-100"
          >
            Get new recovery codes
          </a>
        </section>

        {/* Footer date */}
        <div className="mt-12 text-sm text-gray-600">
          Date modified: <strong>{applicationData?.updatedAt ? new Date(applicationData.updatedAt).toLocaleDateString() : "Loading..."}</strong>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-[#E1E4E7] text-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <nav className="flex gap-6">
            <a href="#" className="hover:underline text-[#2f4b72]">Terms and conditions</a>
            <a href="#" className="hover:underline text-[#2f4b72]">Privacy</a>
          </nav>
          <img
            src="https://www.canada.ca/etc/designs/canada/cdts/gcweb/v4_0_43/wet-boew/assets/wmms-blk.svg"
            alt="Canada logo"
            className="h-8"
          />
        </div>
      </footer>
    </div>
  );
}
