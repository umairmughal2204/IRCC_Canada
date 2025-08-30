"use client"; // Ensure this component is a client component
import { useRouter } from "next/navigation";
import Image from "next/image";
import { use, useActionState } from "react"; // ✅ updated import
import { verifyOtpAction } from "@/actions/authActions"; // adjust path if needed

export default function TwoFactorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  // ✅ useActionState instead of useFormState
  const [state, formAction] = useActionState(verifyOtpAction, {});

  // If OTP is verified successfully, redirect
  if (state?.data?.application) {
    router.push(`/auth-success/${id}`);
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b w-full">
        <div className="w-full flex items-center justify-between px-8 py-5 max-w-none">
          {/* Logo and text */}
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

          {/* Language Switch */}
          <a
            href="#"
            className="text-base text-blue-900 hover:underline font-medium"
          >
            Français
          </a>
        </div>

        {/* Two-factor heading bar */}
        <div className="bg-gray-800 text-white text-lg font-semibold px-6 py-3">
          Two-Factor authentication
        </div>

        {/* Navigation Bar */}
        <nav className="w-full bg-[#E1E4E7] text-sm border-t border-b border-white/20">
          <div className="flex justify-start gap-8 px-6">
            <a
              href="#"
              className="py-3 hover:underline text-[16px] text-[#2f4b72]"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="py-3 hover:underline text-[16px] text-[#2f4b72]"
            >
              FAQ
            </a>
            <a
              href="#"
              className="py-3 hover:underline text-[16px] text-[#2f4b72]"
            >
              Help
            </a>
          </div>
        </nav>
      </header>

      {/* Layout Container */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Heading + Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b border-[#990000] w-fit pb-1 mb-3">
            Two-Factor authentication
          </h1>
          <p className="text-[15px] text-gray-800">
            Enter the one-time passcode (OTP) that was sent to your registered
            email address in order to continue.
          </p>
        </div>

        {/* Info Section */}
        <div className="space-y-2 mb-6 text-[15px]">
          <p>
            An email with a one-time passcode has been sent to{" "}
            <span className="break-words font-medium">
              l*************@gmail.com
            </span>
            .
          </p>
          <p>
            The code will expire after <span className="font-medium">20</span>{" "}
            minutes. The one-time passcode is case sensitive.
          </p>

          <details className="bg-gray-50 border rounded-md p-3">
            <summary className="cursor-pointer font-medium text-blue-800">
              How do I obtain this code?
            </summary>
            <ol className="list-decimal ml-6 mt-2 space-y-1 text-gray-700 text-[14px]">
              <li>
                An email with a one-time passcode has been sent to your email.
              </li>
              <li>
                Copy or enter the one-time passcode from your email into the
                field below.
              </li>
              <li>Press enter or select Continue below.</li>
            </ol>
          </details>
        </div>

        {/* Form */}
        <form className="space-y-6" action={formAction}>
          <div>
            <label
              htmlFor="otp"
              className="block font-semibold mb-1 text-gray-900"
            >
              <span className="text-red-600">*</span> One-time passcode{" "}
              <span className="text-red-600 text-sm">(Required field)</span>
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              className="w-full border border-gray-400 rounded px-3 py-1"
            />
          </div>

          {/* Show error if OTP fails */}
          {state?.error && (
            <p className="text-red-600 text-sm">
              {typeof state.error.message === "string"
                ? state.error.message
                : (state.error.message || []).join(", ")}
            </p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#BC3331] text-white px-6 py-2 rounded hover:bg-[#A82C2A]"
            >
              Continue
            </button>
            <a
              href="/signin"
              className="px-6 py-2 rounded border border-gray-400 text-gray-900 hover:bg-gray-100"
            >
              Cancel
            </a>
          </div>
        </form>

        {/* Resend Section */}
        <div className="mt-8 text-[15px]">
          <h2 className="text-base font-semibold mb-2">
            Did not receive your one-time passcode or it has expired?
          </h2>
          <p className="mb-2">
            Please wait at least 2 minutes for the email to arrive and check
            that the email is not in your spam folder.
          </p>
          <button
            type="button"
            className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100"
          >
            Resend code
          </button>
        </div>

        {/* Recovery Section */}
        <div className="mt-8 text-[15px]">
          <p>
            Can’t complete email authentication? You can also log in with a
            recovery code.
          </p>
          <a
            href="/recovery"
            className="mt-3 inline-block border border-gray-400 px-6 py-2 rounded hover:bg-gray-100"
          >
            Recover account
          </a>
        </div>

        {/* Footer Date */}
        <div className="mt-12 text-sm text-gray-600">
          Date modified: <strong>2024-06-15</strong>
        </div>
      </div>
      <footer className="w-full border-t bg-[#E1E4E7] text-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <nav className="flex gap-6">
            <a href="#" className="hover:underline text-[#2f4b72]">
              Terms and conditions
            </a>
            <a href="#" className="hover:underline text-[#2f4b72]">
              Privacy
            </a>
          </nav>
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
