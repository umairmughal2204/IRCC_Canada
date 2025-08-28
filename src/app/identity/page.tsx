// app/identity-verification/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IdentityVerificationPage() {
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      alert("Please provide an answer to the security question.");
      return;
    }
    // ✅ After success, go to auth success
    router.push("/auth-success");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
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
      <div className="bg-gray-50 border-b border-gray-200 py-2">
        <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600">
          <a href="/" className="text-[#284162] hover:underline">
            Home
          </a>{" "}
          &gt; Identity Verification
        </div>
      </div>

      {/* User Info Bar */}
      <div className="bg-gray-100 border-b border-gray-300 text-sm">
        <div className="max-w-6xl mx-auto flex justify-end items-center px-4 py-2 space-x-3">
          <span>
            Signed in as <strong>AZEEM LIAQAT</strong>
          </span>
          <span>|</span>
          <a href="#" className="text-[#284162] hover:underline">
            Account home
          </a>
          <span>|</span>
          <a href="#" className="text-[#284162] hover:underline">
            Account profile
          </a>
          <span>|</span>
          <a href="#" className="text-[#284162] hover:underline">
            Help
          </a>
          <span>|</span>
          <button
            onClick={handleLogout}
            className="text-[#284162] hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
{/* Main Content */}
<main className="flex-grow w-full px-8 py-8">
  <h1 className="text-3xl font-semibold text-gray-800 border-b pb-2 mb-6">
    Identity Verification
  </h1>

  {/* Left aligned content */}
  <div className="bg-white p-6">
    <p className="mb-4">
      For security reasons, additional identification is required to
      access your account.
    </p>
    <p className="mb-6">Please answer the following secret question:</p>

    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-lg">
          "my favourite car"{" "}
          <span className="text-red-600">(required)</span>
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#284162]"
          required
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-[#284162] text-white px-6 py-2 rounded hover:bg-[#1e3250]"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-gray-100 px-6 py-2 rounded border hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </form>
  </div>

  {/* Report problem - aligned left */}
  <div className="mt-6">
    <a
      href="#"
      className="inline-block border px-6 py-2 rounded bg-gray-100 hover:bg-gray-200"
    >
      Report a problem or mistake on this page
    </a>
  </div>
</main>

     
      {/* Footer */}
      <footer className="mt-16">
        {/* Date Modified */}
        <div className="bg-white px-8 py-4 text-sm text-gray-800 w-full">
          Date modified: <strong>2024-07-20</strong>
        </div>

        {/* Footer Columns */}
        <div className="bg-[#e9ecef] w-full">
          <div className="w-full px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-gray-900">
            {/* About Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-blue-800 hover:underline">About GCKey</a></li>
                <li><a href="#" className="text-blue-800 hover:underline">Enabled Services</a></li>
                <li><a href="#" className="text-blue-800 hover:underline">Site Map</a></li>
              </ul>
            </div>

            {/* Transparency Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">Transparency</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-blue-800 hover:underline">Proactive Disclosure</a></li>
                <li><a href="#" className="text-blue-800 hover:underline">Terms and Conditions</a></li>
              </ul>
            </div>

            {/* Contact Us Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-blue-800 hover:underline">Phone Numbers</a></li>
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
      </footer>    </div>
  );
}
