"use client";
import { useState } from "react";
import { FaSearch } from  "react-icons/fa";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("Taxes");

  // Menu structure
  const menuData: Record<
    string,
    { title: string; links: string[]; mostRequested: string[] }
  > = {
    "Jobs and the workplace": {
      title: "Jobs and the workplace",
      links: [
        "Find a job",
        "Training",
        "Employment Insurance",
        "Workplace standards",
      ],
      mostRequested: ["Apply for EI", "Job Bank"],
    },
    "Immigration and citizenship": {
      title: "Immigration and citizenship",
      links: [
        "My application",
        "Visit",
        "Immigrate",
        "Work",
        "Study",
        "Citizenship",
        "New immigrants",
      ],
      mostRequested: ["Check your application status", "Find an IRCC form"],
    },
    Taxes: {
      title: "Taxes",
      links: [
        "Income Tax",
        "GST/HST",
        "Payroll",
        "Business number",
        "Savings and pension plans",
        "Child and family benefits",
        "Excise taxes, duties, and levies",
        "Charities and giving",
      ],
      mostRequested: [
        "My Account",
        "My Business Account",
        "Represent a Client",
        "File a GST/HST return (NETFILE)",
        "Make a payment to the Canada Revenue Agency",
        "Find the next benefit payment date",
      ],
    },
  };

  return (
    <header className="border-b border-gray-300 relative">
      {/* Top bar: Wordmark + Search + Lang */}
      <div className="flex justify-between items-center px-6 py-3">
        {/* Wordmark (Canada logo + bilingual text) */}
        <img
          src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
          alt="Government of Canada"
          className="h-12"
        />

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search IRCC"
              className="border border-gray-300 px-3 py-1 text-sm w-56 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button className="bg-[#26374a] text-white px-3 flex items-center justify-center">
              <span className="sr-only">Search</span>
              <FaSearch/>
            </button>
          </div>

          {/* Language toggle */}
          <a href="#" className="text-sm text-blue-700 hover:underline">
            Français
          </a>
        </div>
      </div>

      {/* MENU Button (dark bar) */}
      <div className="border-t border-gray-300">
        <button
          onClick={() => setOpen(!open)}
          className="bg-[#26374a] text-white text-sm font-semibold px-6 py-2"
        >
          MENU {open ? "▲" : "▼"}
        </button>
      </div>

      {/* Mega Menu */}
      {open && (
        <div className="absolute left-0 w-full bg-white border-t border-gray-300 shadow-lg flex z-50 animate-fadeIn">
          {/* Left column: categories */}
          <div className="w-64 bg-gray-100 border-r border-gray-300">
            <ul className="text-sm">
              {Object.keys(menuData).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActive(cat)}
                    className={`w-full text-left px-4 py-2 block transition hover:bg-gray-50 ${
                      active === cat
                        ? "bg-white font-semibold border-l-4 border-[#26374a]"
                        : ""
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle + Right columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 text-sm">
            {active && (
              <>
                {/* Section Links */}
                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-3">
                    {menuData[active].title}
                  </h2>
                  <ul className="space-y-1">
                    {menuData[active].links.map((link, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-blue-700 hover:underline">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Most Requested */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Most requested
                  </h2>
                  <ul className="space-y-1">
                    {menuData[active].mostRequested.map((link, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-blue-700 hover:underline">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="bg-white">
        <div className="max-w-6xl mx-auto text-xs text-gray-700 px-4 sm:px-8 py-3 flex flex-wrap space-x-1">
          <a href="#" className="text-blue-700 hover:underline">
            Canada.ca
          </a>
          <span>›</span>
          <a href="#" className="text-blue-700 hover:underline">
            Immigration and citizenship
          </a>
          <span>›</span>
          <a href="#" className="text-blue-700 hover:underline">
            IRCC applications
          </a>
        </div>
      </nav>
    </header>
  );
}
