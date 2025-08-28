import Image from "next/image";
import Header from "./header";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* ===== Header ===== */}
      <Header/>

      {/* ===== Content Section ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8 w-full">
        <h1 className="text-2xl font-bold mb-2">Sign in</h1>
        <h2 className="text-3xl font-semibold border-b-2 border-red-700 inline-block mb-4">
          IRCC secure account
        </h2>
        <p className="text-gray-700 mb-3">
          We have different accounts for some applications.
        </p>
        <p className="font-semibold text-gray-800 mb-6">
          You may need a different account to apply, depending on the
          application you submit.
        </p>

        <h3 className="text-xl font-semibold mb-4">
          Check if this is the right account for you
        </h3>

        {/* Accordion style list */}
        <div className="space-y-2 mb-10">
          {[
            ["Apply", "for these applications"],
            ["Check the status", "of these applications"],
            ["Upload requested documents", "for these applications"],
          ].map(([title, subtitle], idx) => (
            <button
              key={idx}
              className="w-full flex justify-between items-center text-left border rounded px-4 py-3 bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium text-blue-700">{title}</span>
              <span className="text-gray-500">{subtitle}</span>
            </button>
          ))}
        </div>

        {/* Sign in / Create account */}
        <div className="border rounded shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
            {/* Sign in */}
            <div className="p-6 flex flex-col space-y-4">
              <h3 className="text-lg font-semibold">Sign in</h3>

              <button className="w-full bg-[#1a2d41] hover:bg-[#0f1b29] text-white font-medium px-4 py-3 rounded flex items-center gap-2 justify-center">
                <Image src="/icons/key.svg" alt="Key" width={20} height={20} />
                GCKey username and password
              </button>

              <button className="w-full bg-[#1a2d41] hover:bg-[#0f1b29] text-white font-medium px-4 py-3 rounded flex items-center gap-2 justify-center">
                <Image
                  src="/icons/bank.svg"
                  alt="Bank"
                  width={20}
                  height={20}
                />
                <span>
                  Canadian <i>Interac</i>® Sign-In Partner
                </span>
              </button>

              <button className="w-full border text-blue-700 px-4 py-2 rounded text-sm text-left">
                ▸ Not sure how to sign in?
              </button>
            </div>

            {/* Create account */}
            <div className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-4">Create an account</h3>
              <button className="w-full md:w-auto border px-6 py-3 rounded bg-gray-50 hover:bg-gray-100 font-medium text-blue-700 flex items-center gap-2 justify-center">
                <Image
                  src="/icons/user-plus.svg"
                  alt="Register"
                  width={20}
                  height={20}
                />
                Register for an account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Help with your account ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12 w-full">
        <h2 className="text-2xl font-bold mb-6">Help with your account</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            "Errors and issues when you sign in",
            "GCKey two-factor authentication",
            "Change your Sign-In Partner",
            "If your personal reference code doesn’t work",
            "You forgot your GCKey password or username",
            "GCKey revoked",
            "If you don’t find your application in your account",
            "More help options",
          ].map((item, idx) => (
            <button
              key={idx}
              className="flex items-center justify-between px-4 py-3 border rounded bg-gray-50 hover:bg-gray-100 text-left text-blue-700"
            >
              <span>▸ {item}</span>
            </button>
          ))}
        </div>

        {/* Find another government account */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            Find another government account
          </h2>
          <a
            href="#"
            className="text-purple-700 underline font-medium block mb-2"
          >
            All Government of Canada online accounts
          </a>
          <p className="text-gray-700">
            There are many accounts across the Government of Canada for
            different services. Find the service you need.
          </p>
        </div>

        {/* Did you find what you were looking for? */}
        <div className="border rounded bg-gray-50 p-4 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-medium">Did you find what you were looking for?</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black">
              Yes
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black">
              No
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500">Date modified: 2025-07-14</p>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#26374a] text-white mt-auto">
        {/* Top links */}
        <div className="border-b border-[#1b2a38]">
          <div className="max-w-6xl mx-auto px-6 sm:px-12 py-8">
            <h2 className="text-lg font-semibold mb-4">
              Immigration and citizenship
            </h2>
            <div className="flex flex-col sm:flex-row sm:gap-10 gap-2 text-sm">
              <a href="#" className="hover:underline">
                Contact us
              </a>
              <a href="#" className="hover:underline">
                Check processing times
              </a>
              <a href="#" className="hover:underline">
                How to open a form
              </a>
            </div>
          </div>
        </div>

        {/* Government of Canada section */}
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Government of Canada</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">All contacts</a></li>
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Immigration and citizenship</a></li>
              <li><a href="#" className="hover:underline">Travel and tourism</a></li>
              <li><a href="#" className="hover:underline">Business</a></li>
              <li><a href="#" className="hover:underline">Benefits</a></li>
              <li><a href="#" className="hover:underline">Health</a></li>
              <li><a href="#" className="hover:underline">Taxes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Departments and agencies</a></li>
              <li><a href="#" className="hover:underline">Environment and natural resources</a></li>
              <li><a href="#" className="hover:underline">National security and defence</a></li>
              <li><a href="#" className="hover:underline">Culture, history and sport</a></li>
              <li><a href="#" className="hover:underline">Policing, justice and emergencies</a></li>
              <li><a href="#" className="hover:underline">Transport and infrastructure</a></li>
              <li><a href="#" className="hover:underline">Canada and the world</a></li>
              <li><a href="#" className="hover:underline">Money and finances</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">About government</a></li>
              <li><a href="#" className="hover:underline">Science and innovation</a></li>
              <li><a href="#" className="hover:underline">Indigenous Peoples</a></li>
              <li><a href="#" className="hover:underline">Veterans and military</a></li>
              <li><a href="#" className="hover:underline">Youth</a></li>
              <li><a href="#" className="hover:underline">Manage life events</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-white text-black">
          <div className="max-w-6xl mx-auto px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="hover:underline">Social media</a>
              <a href="#" className="hover:underline">Mobile applications</a>
              <a href="#" className="hover:underline">About Canada.ca</a>
              <a href="#" className="hover:underline">Terms and conditions</a>
              <a href="#" className="hover:underline">Privacy</a>
            </div>
            <div className="flex items-center">
              <Image
                src="/footer.svg"
                alt="Canada wordmark"
                width={160}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
