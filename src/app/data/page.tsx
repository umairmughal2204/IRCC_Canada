import Image from "next/image";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b px-4 sm:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/canada-flag.png"
            alt="Canada Flag"
            width={50}
            height={30}
          />
          <div>
            <p className="text-sm font-semibold">Government of Canada</p>
            <p className="text-sm text-gray-600">Gouvernement du Canada</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm underline text-blue-700">
            Français
          </a>
          <div className="flex border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search IRCC"
              className="px-2 py-1 text-sm outline-none"
            />
            <button className="bg-gray-800 px-3">
              <Image
                src="/icons/search.svg"
                alt="Search"
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Bar */}
      <div className="bg-gray-100 border-b px-4 sm:px-8 py-3 flex justify-between items-center">
        <button className="bg-[#1a2d41] text-white text-sm px-4 py-2 rounded">
          MENU ▼
        </button>
      </div>

      {/* Breadcrumb */}
      <nav className="text-xs text-blue-700 px-4 sm:px-8 py-3 space-x-1">
        <a href="#" className="hover:underline">
          Home
        </a>
        <span>›</span>
        <a href="#" className="hover:underline">
          Your account
        </a>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        {/* Top right info */}
        <div className="text-right text-sm text-gray-700 mb-4 space-x-2">
          <span>Signed in as AZEEM LIAQAT</span>
          <a href="#" className="text-purple-700 underline">
            Account home
          </a>
          <span>|</span>
          <a href="#" className="text-purple-700 underline">
            Account profile
          </a>
          <span>|</span>
          <a href="#" className="text-purple-700 underline">
            Help
          </a>
          <span>|</span>
          <a href="#" className="text-purple-700 underline">
            Logout
          </a>
        </div>

        {/* Account title */}
        <h1 className="text-2xl font-bold mb-2 border-b-2 border-red-700 inline-block">
          AZEEM LIAQAT&apos;s account
        </h1>

        {/* Section */}
        <h2 className="text-xl font-bold mt-6 mb-2">
          View the applications you submitted
        </h2>
        <p className="text-gray-700 mb-6">
          Review, check the status or read messages about your submitted
          application.
        </p>

        {/* Search + Show entries */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Search:</label>
            <input
              type="text"
              className="border px-2 py-1 text-sm rounded"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Showing 1 to 1 of 1 entries</span>
            <label className="ml-2">Show</label>
            <select className="border px-1 py-0.5 text-sm rounded">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto border rounded mb-6">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="border px-3 py-2 text-left">Application type ⇵</th>
                <th className="border px-3 py-2 text-left">Application number ⇵</th>
                <th className="border px-3 py-2 text-left">Applicant name ⇵</th>
                <th className="border px-3 py-2 text-left">Date submitted ⇵</th>
                <th className="border px-3 py-2 text-left">Current status ⇵</th>
                <th className="border px-3 py-2 text-left">Messages ⇵</th>
                <th className="border px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">Online Application</td>
                <td className="border px-3 py-2">W310094330</td>
                <td className="border px-3 py-2">AZEEM LIAQAT</td>
                <td className="border px-3 py-2">June 25, 2025</td>
                <td className="border px-3 py-2">Submitted</td>
                <td className="border px-3 py-2">New</td>
                <td className="border px-3 py-2">
                  <a href="#" className="text-purple-700 underline">
                    Check full application status
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-6">
          <button className="px-3 py-1 bg-blue-700 text-white text-sm rounded">
            1
          </button>
        </div>

        {/* Info message */}
        <p className="text-gray-700 mb-8 text-sm">
          Did you apply on paper or don&apos;t see your online application in
          your account?{" "}
          <a href="#" className="text-blue-700 underline">
            Add (link) your application to your account
          </a>{" "}
          to access it and check your status online.
        </p>

        {/* Continue section */}
        <h2 className="text-xl font-bold mb-2">
          Continue an application you haven&apos;t submitted
        </h2>
        <p className="text-gray-700 mb-6">
          Continue working on an application or profile you haven&apos;t submitted
          or delete it from your account.
        </p>

        {/* Search + Show entries */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Search:</label>
            <input
              type="text"
              className="border px-2 py-1 text-sm rounded"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Showing 0 to 0 of 0 entries</span>
            <label className="ml-2">Show</label>
            <select className="border px-1 py-0.5 text-sm rounded">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        {/* Empty Table */}
        <div className="overflow-x-auto border rounded mb-10">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="border px-3 py-2 text-left">Application type ⇵</th>
                <th className="border px-3 py-2 text-left">Date Created ⇵</th>
                <th className="border px-3 py-2 text-left">Days left to submit ⇵</th>
                <th className="border px-3 py-2 text-left">Date last saved ⇵</th>
                <th className="border px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Start an application */}
        <h2 className="text-xl font-bold mb-4">Start an application</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div>
            <a href="#" className="text-blue-700 underline font-medium">
              Apply to come to Canada
            </a>
            <p className="text-sm text-gray-700 mt-1">
              Includes applications for visitor visas, work and study permits,
              Express Entry and International Experience Canada. You will need
              your personal reference code if you have one.
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <strong>Note:</strong> You <strong>must</strong> apply through this
              portal (IRCC secure account) if you&apos;re applying with a family
              member who needs a work permit.
            </p>
          </div>

          <div>
            <a href="#" className="text-blue-700 underline font-medium">
              Refugees: Apply for temporary health care benefits
            </a>
            <p className="text-sm text-gray-700 mt-1">
              Use this application if you are a protected person or refugee
              claimant who wants to apply for the Interim Federal Health Program.
            </p>
          </div>

          <div>
            <a href="#" className="text-blue-700 underline font-medium">
              Citizenship: Apply for a search or proof of citizenship
            </a>
            <p className="text-sm text-gray-700 mt-1">
              Use this application to apply for proof of citizenship (citizenship
              certificate) or to search citizenship records.
            </p>
          </div>
        </div>

        {/* Account messages */}
        <h2 className="text-xl font-bold mb-2">Account messages</h2>
        <p className="text-sm text-gray-700 mb-6">
          Read messages related to your account. Messages about a submitted
          application are on your application status page.
        </p>
        <p className="text-sm text-gray-700 mb-10">You have no messages.</p>

        {/* Report button */}
        <button className="px-4 py-2 bg-gray-200 text-sm border rounded">
          Report a problem or mistake on this page
        </button>
      </main>

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
