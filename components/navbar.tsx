import { auth } from "@/auth";
import React from "react";
import LogoutButton from "./logout-button/logout-button";


const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="bg-gray-800 fixed w-full z-20 top-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-2xl font-bold">
              Logo
            </a>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              <a
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="/admin"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Page
              </a>
            </div>
            {session && <LogoutButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
