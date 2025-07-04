"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Menu,
  X,
  BarChart2,
  Settings,
  AlertCircle,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Footer from "@/components/Footer";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Simulate fetching notifications (replace this with an API call)
    setNotifications([
      { id: 1, message: "New booking received!" },
      { id: 2, message: "User signed up for an account." },
    ]);
  }, []);

  const navLinks = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      href: "/admin/bookings",
      label: "Bookings",
      icon: <CalendarDays className="w-5 h-5" />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      href: "/admin/reports",
      label: "Reports",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed right-2 top-16 z-50 p-2 text-white bg-gray-800 rounded-lg transition-colors md:hidden active:ring hover:bg-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white transform transition-transform duration-300 ease-in-out mt-10
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex flex-col p-4 h-full border-r border-gray-700">
          {/* Logo Section */}
          <div className="px-4 py-3 mb-4 rounded-lg bg-gray-700/20">
            <h2 className="flex gap-2 items-center text-xl font-bold">
              <AlertCircle className="w-6 h-6 text-blue-400" />
              Hilaac Admin
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  pathname === link.href
                    ? "bg-blue-600/80 text-white"
                    : "hover:bg-gray-700/30"
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Profile Section */}
          <div className="pt-4 mt-auto border-t border-gray-700">
            <div className="flex gap-3 items-center px-4 py-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-700/30">
              <div className="flex justify-center items-center w-8 h-8 bg-blue-600 rounded-full">
                <span className="text-sm font-medium">A</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@hilaac.com</p>
              </div>
              <UserButton className="ml-auto w-5 h-5" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="my-2 transition-all duration-300 md:ml-64">
        {/* Top Header */}
        <header className="fixed right-0 left-0 top-12 bg-white shadow-sm dark:bg-gray-800 md:left-64">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="relative">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Welcome back, Admin
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last login: 2 hours ago
              </p>
            </div>

            {/* Notification & Profile */}
            <div className="relative">
              <button
                className="p-2 pb-4 mr-5 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="sr-only">Notifications</span>
                <div className="relative">
                  {notifications.length > 0 && (
                    <span className="flex absolute top-0 right-0 justify-center items-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 p-4 mt-2 w-64 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-200">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((notif) => (
                      <p
                        key={notif.id}
                        className="p-2 border-b border-gray-300 dark:border-gray-700"
                      >
                        {notif.message}
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-3 mt-22">
          <div className="p-6 min-h-screen bg-white rounded-xl dark:bg-gray-800">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
