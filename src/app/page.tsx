import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 sm:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/image.svg"
            alt="Canada Flag"
            width={300}
            height={200}
          />

        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm underline text-blue-700">
            Français
          </a>
          <div className="flex border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search Canada.ca"
              className="px-2 py-1 text-sm outline-none"
            />
            <button className="bg-gray-800 px-3">
              <Image
                src="/icons/search.svg"
                alt="Search"
                width={20}
                height={20}
              />
            </button>
          </div>
          <button className="bg-gray-800 text-white px-4 py-1 text-sm">
            Sign in
          </button>
        </div>
      </header>

      {/* Menu bar */}
      <div className="border-b px-4 sm:px-8 py-3">
        <button className="text-sm font-semibold text-gray-800">MENU ▼</button>
      </div>

      {/* Hero */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Hero"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        <div className="absolute left-6 bottom-6 bg-gray-900/80 p-6 max-w-lg text-white">
          <h1 className="text-3xl font-semibold mb-2">Canada.ca</h1>
          <div className="h-1 w-16 bg-red-600 mb-3"></div>
          <p className="text-sm">
            The official website of the Government of Canada
          </p>
        </div>
      </section>

      {/* Most Requested */}
      <section className="bg-gray-50 py-8 px-6 sm:px-12">
        <h2 className="text-xl font-semibold mb-4">Most requested</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Sign in to an account
          </a>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Employment Insurance and leave
          </a>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Public pensions (CPP and OAS)
          </a>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Get a passport
          </a>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Jobs
          </a>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Visit Canada
          </a>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Disability Benefit
          </a>
          <a href="#" className="text-blue-700 underline hover:text-blue-900">
            Canadian Dental Care Plan
          </a>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="bg-white border-t px-6 sm:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-8 text-sm">
          {[
            {
              title: "Jobs",
              desc: "Find a job, training, hiring programs, work permits, Social Insurance Number (SIN)",
            },
            {
              title: "Immigration and citizenship",
              desc: "Visit, work, study, immigrate, refugees, permanent residents, apply, check status",
            },
            {
              title: "Travel and tourism",
              desc: "In Canada or abroad, advice, advisories, passports, visit Canada, events, attractions",
            },
            {
              title: "Business and industry",
              desc: "Starting a business, permits, copyright, business support, selling to government",
            },
            {
              title: "Benefits",
              desc: "EI, family and sickness leave, pensions, housing, student aid, disabilities",
            },
            {
              title: "Taxes",
              desc: "Income tax, payroll, GST/HST, contribution limits, tax credits, charities",
            },
            {
              title: "Health",
              desc: "Food, nutrition, diseases, vaccines, drugs, product safety and recalls",
            },
            {
              title: "Environment and natural resources",
              desc: "Weather, climate, agriculture, wildlife, pollution, conservation, fisheries",
            },
            {
              title: "Money and finances",
              desc: "Personal finance, credit reports, fraud protection, paying for education",
            },
          ].map((item, idx) => (
            <div key={idx}>
              <a
                href="#"
                className="font-semibold text-blue-700 hover:text-blue-900 block mb-1"
              >
                {item.title}
              </a>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="border border-black px-4 py-2 text-sm hover:bg-gray-100">
            All services
          </button>
        </div>
      </section>

      {/* Your Government Section */}
      <section className="bg-gray-50 border-t px-6 sm:px-12 py-10">
        <h2 className="text-xl font-semibold mb-6">Your government</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              "All contacts",
              "Prime Minister",
              "About government",
              "Working for the government",
              "News",
              "Departments and agencies",
              "Open government and data",
              "Treaties, laws and regulations",
            ].map((link, idx) => (
              <a
                key={idx}
                href="#"
                className="text-blue-700 underline hover:text-blue-900 transition"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="md:col-span-1 hidden md:block">
            <Image
              src="/images/building.jpg"
              alt="Government Building"
              width={400}
              height={300}
              className="rounded object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t px-6 sm:px-12 py-10">
        <h2 className="text-xl font-semibold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Canadian Dental Care Plan",
              desc: "Are you eligible? Applications now open to all eligible Canadians.",
              img: "/images/dental.jpg",
              link: "#",
            },
            {
              title: "Canada’s response to U.S. tariffs",
              desc: "A comprehensive plan to protect and defend Canada’s interests.",
              img: "/images/tariffs.jpg",
              link: "#",
            },
            {
              title: "Canada Strong Pass",
              desc: "Enjoy free or discounted admissions as you make Canada your travel destination.",
              img: "/images/strong-pass.jpg",
              link: "#",
            },
            {
              title: "Canada and Ukraine",
              desc: "Learn about Canada’s response to the Russian invasion of Ukraine.",
              img: "/images/ukraine.jpg",
              link: "#",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 shadow rounded overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                width={600}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <a
                  href={item.link}
                  className="font-semibold text-blue-700 hover:text-blue-900 block mb-1"
                >
                  {item.title}
                </a>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2d41] text-white mt-auto">
        <div className="px-6 sm:px-12 py-10">
          <p className="text-sm text-gray-300 mb-6">
            Date modified: 2025-08-27
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-3">Government of Canada</h3>
              <ul className="space-y-2">
                {[
                  "All contacts",
                  "Jobs",
                  "Immigration and citizenship",
                  "Travel and tourism",
                  "Business",
                  "Benefits",
                  "Health",
                  "Taxes",
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-2 mt-8 md:mt-0">
                {[
                  "Departments and agencies",
                  "Environment and natural resources",
                  "National security and defence",
                  "Culture, history and sport",
                  "Policing, justice and emergencies",
                  "Transport and infrastructure",
                  "Canada and the world",
                  "Money and finances",
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-2 mt-8 md:mt-0">
                {[
                  "About government",
                  "Science and innovation",
                  "Indigenous Peoples",
                  "Veterans and military",
                  "Youth",
                  "Manage life events",
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#13202e] px-6 sm:px-12 py-4 text-xs text-gray-300 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Social media
            </a>
            <a href="#" className="hover:underline">
              Mobile applications
            </a>
            <a href="#" className="hover:underline">
              About Canada.ca
            </a>
            <a href="#" className="hover:underline">
              Terms and conditions
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
          </div>
          <Image
            src="/images/canada-wordmark.png"
            alt="Canada Logo"
            width={120}
            height={40}
          />
        </div>
      </footer>
    </main>
  );
}
