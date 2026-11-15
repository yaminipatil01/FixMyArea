import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import AdminSidebar from '../components/navigation/AdminSidebar';
import { ShieldCheck, Bell } from 'lucide-react';
import { ROUTES } from '../utils/constants';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />

      {/* Admin top banner notice */}
      <div className="bg-[#171717] text-white text-xs px-4 py-2 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFD43B]" />
            <span className="font-semibold text-[#FFD43B]">Municipal Admin Console</span>
            <span className="hidden sm:inline text-neutral-400">
              — Public Works Department Internal Response Desk
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-300">
            <span>Logged in as: Officer Desk #12</span>
            <Link
              to={ROUTES.HOME}
              className="text-[#FFD43B] hover:underline"
            >
              Exit Console
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
