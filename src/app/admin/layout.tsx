"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Layers,
  Package,
  MessageSquare,
  ClipboardList,
  LogOut,
  Home,
  Trophy,
  Wallet,
  CreditCard,
  BadgeHelp,
} from "lucide-react";

type NavItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const safeLogout = React.useCallback(() => {
    if (onLogout) onLogout();
    else router.push("/login");
  }, [onLogout, router]);

  const navItems: NavItem[] = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/applications", label: "Applications", icon: Users },
  ];

  const isActive = (path: string) =>
    pathname === path || (path !== "/admin" && pathname.startsWith(path));

  const linkClasses = (path: string) =>
    `flex items-center gap-3 py-2 px-4 rounded-xl transition font-medium text-sm ${
      isActive(path)
        ? "bg-green-600 text-white shadow"
        : "text-gray-300 hover:text-white hover:bg-gray-700"
    }`;

  const SidebarContent = () => (
    <>
      <h2 className="text-3xl font-extrabold text-center mb-6 text-green-400 tracking-tight">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2 flex-1">
        <Link
          href="/"
          className="flex items-center gap-3 py-2 px-4 rounded-xl transition font-medium text-sm text-gray-300 hover:text-white hover:bg-gray-700"
          onClick={() => setDrawerOpen(false)}
        >
          <Home className="w-5 h-5" />
          Home
        </Link>

        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            href={path}
            className={linkClasses(path)}
            onClick={() => setDrawerOpen(false)}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}

        <button
          onClick={safeLogout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 shadow"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
      {/* Desktop sidebar (visible on sm+) */}
      <aside
        className="hidden sm:flex w-72 bg-gray-900/95 backdrop-blur border-r border-gray-800 text-white shadow-2xl p-6 flex-col rounded-tr-3xl rounded-br-3xl sticky top-0 h-screen"
        aria-label="Sidebar"
      >
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Mobile top bar (visible below sm) */}
        <header className="sm:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow">
          <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation drawer"
            aria-controls="mobile-drawer"
            aria-expanded={drawerOpen}
            className="rounded-lg p-1 hover:bg-gray-800 active:scale-[0.98] transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.aside
                id="mobile-drawer"
                key="mobileSidebar"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.22 }}
                className="fixed top-0 left-0 z-40 w-72 h-full bg-gray-900 text-white p-6 flex flex-col rounded-tr-2xl sm:hidden shadow-2xl"
                role="dialog"
                aria-modal="true"
              >
                <button
                  className="mb-4 ml-auto rounded-lg p-1 hover:bg-gray-800"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation drawer"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
                <SidebarContent />
              </motion.aside>

              <motion.button
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-30 sm:hidden"
                aria-label="Close drawer overlay"
                onClick={() => setDrawerOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)] bg-white/80 backdrop-blur rounded-3xl shadow-inner border border-gray-200 p-4 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
