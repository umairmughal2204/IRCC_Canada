export default function SignInPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Header */}
            {/* Header */}
            <header className="bg-white border-b w-full">
                <div className="w-full flex items-center justify-between px-8 py-5 max-w-none">
                    {/* Left: Logo and Gov Text */}
                    <div className="flex items-center space-x-6">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg"
                            alt="Canadian Flag"
                            className="w-20 h-20"   // ⬅️ Increased logo size (from w-8 h-8)
                        />
                        <div className="leading-tight">
                            <p className="text-lg font-bold">Government</p>   {/* ⬅️ Larger text */}
                            <p className="text-lg font-bold">of Canada</p>
                        </div>
                        <div className="ml-6 border-l h-8 border-gray-300"></div>
                        <div className="leading-tight">
                            <p className="text-lg font-bold">Gouvernement</p>
                            <p className="text-lg font-bold">du Canada</p>
                        </div>
                    </div>

                    {/* Language */}
                    <a href="#" className="text-base text-blue-900 hover:underline font-medium">
                        Français
                    </a>
                </div>
                {/* Navigation Bar */}
                <nav className="w-screen bg-[#2f4b72] text-white text-sm border-t border-b border-white/20">
                    <div className="grid grid-cols-[40px_1fr_1fr_1fr_40px] w-screen">

                        {/* Empty Left */}
                        <div className="border-r border-white/20"></div>

                        {/* Definitions */}
                        <div className="flex items-center justify-center border-r border-white/20 py-3">
                            <a href="#" className="hover:underline text-[16px]">Definitions</a>
                        </div>

                        {/* FAQ */}
                        <div className="flex items-center justify-center border-r border-white/20 py-3">
                            <a href="#" className="hover:underline text-[16px]">Frequently Asked Questions (FAQ)</a>
                        </div>

                        {/* Help */}
                        <div className="flex items-center justify-center border-r border-white/20 py-3">
                            <a href="#" className="hover:underline text-[16px]">Help</a>
                        </div>

                        {/* Empty Right */}
                        <div></div>
                    </div>
                </nav>

            </header>

            {/* Breadcrumb and Title */}
            <div className="w-full max-w-[1400px] mx-auto px-8 pt-6 text-left">
                <p className="text-sm text-gray-700 mb-2">
                    Home ➜ <span className="text-blue-800">Sign In / Sign Up</span>
                </p>
                <h1 className="text-3xl font-bold text-gray-900 border-b border-[#990000] w-fit pb-1">
                    Welcome to GCKey
                </h1>
            </div>

            {/* Main Content */}
            <main className="w-full max-w-[1400px] mx-auto px-8 py-10">
                <div className="bg-white border rounded shadow-sm flex flex-col lg:flex-row p-8">
                    {/* Left: Sign In Form */}
                    <div className="w-full lg:w-1/2 pr-0 lg:pr-8 border-r border-gray-300 mb-8 lg:mb-0">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
                        <form className="space-y-4">
                            {/* Username */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1">
                                    Username: <span className="text-red-600">(required)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1">
                                    Password: <span className="text-red-600">(required)</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-4 mt-4">
                                <button
                                    type="submit"
                                    className="bg-[#2f4b72] text-white px-6 py-2 rounded hover:bg-[#1f3555]"
                                >
                                    Sign In
                                </button>
                                <button
                                    type="reset"
                                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap space-x-4 text-sm mt-4">
                                <a href="#" className="text-blue-800 hover:underline">
                                    Forgot your username?
                                </a>
                                <span className="text-gray-400">•</span>
                                <a href="#" className="text-blue-800 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </form>
                    </div>

                    {/* Right: Info Panel */}
                    <div className="w-full lg:w-1/2 pl-0 lg:pl-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Simple Secure Access
                        </h3>
                        <p className="text-sm text-gray-800 mb-4">
                            A simple way to securely access Government of Canada online services.
                        </p>
                        <p className="text-sm text-gray-800 mb-4">One username.<br />One password.</p>

                        <button className="bg-[#2f4b72] text-white px-6 py-2 rounded hover:bg-[#1f3555] mb-4">
                            Sign Up
                        </button>

                        <p className="text-sm text-gray-800">
                            Your GCKey can be used to access multiple Government of Canada online{" "}
                            <a href="#" className="text-blue-800 underline">
                                Enabled Services.
                            </a>
                        </p>
                    </div>
                </div>

                {/* Exit Section */}
                <div className="mt-12 text-center">
                    <p className="text-md text-gray-800 mb-4">
                        Please select <strong>Exit</strong> to leave the GCKey service and return to the Government of Canada online service.
                    </p>
                    <button className="bg-gray-200 border border-gray-400 px-8 py-2 rounded text-gray-900 hover:bg-gray-300">
                        Exit
                    </button>
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
            </footer>
        </div>
    );
}
