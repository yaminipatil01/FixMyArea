import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  PlusCircle, 
  MapPin, 
  BarChart3, 
  ListFilter, 
  ShieldAlert, 
  Menu, 
  X,
  Search
} from 'lucide-react';
import Button from '../ui/Button';
import { ROUTES } from '../../utils/constants';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Explore Reports', path: ROUTES.REPORTS, icon: ListFilter },
    { label: 'City Map', path: ROUTES.MAP, icon: MapPin },
    { label: 'Transparency', path: ROUTES.ANALYTICS, icon: BarChart3 },
    { label: 'Municipal Portal', path: ROUTES.ADMIN, icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#171717] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD43B] mr-0.5"></span>
                <span className="font-extrabold text-sm tracking-tight text-white font-heading">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#171717] font-heading leading-tight flex items-center gap-1.5">
                  FixMyArea
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FFF5CC] text-[#171717] border border-[#FFD43B]/40">
                    Live
                  </span>
                </span>
                <span className="text-[11px] text-[#666666] -mt-0.5 font-normal hidden sm:inline">
                  Civic Action Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#171717] bg-[#F7F7F5] font-semibold'
                        : 'text-[#666666] hover:text-[#171717] hover:bg-[#F7F7F5]/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#171717]' : 'text-[#888888]'}`} />
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to={ROUTES.REPORTS}
              className="p-2 text-[#666666] hover:text-[#171717] hover:bg-[#F7F7F5] rounded-lg transition-colors"
              title="Search reports"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Button
              to={ROUTES.NEW_REPORT}
              variant="primary"
              size="sm"
              leftIcon={PlusCircle}
              className="shadow-sm font-semibold"
            >
              Report an Issue
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              to={ROUTES.NEW_REPORT}
              variant="primary"
              size="xs"
              leftIcon={PlusCircle}
            >
              Report
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] rounded-lg hover:bg-[#F7F7F5] border border-[#EAEAEA]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAEAEA] bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-[#171717] bg-[#F7F7F5] font-semibold'
                    : 'text-[#666666] hover:text-[#171717] hover:bg-[#F7F7F5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#EAEAEA]">
            <Button
              to={ROUTES.NEW_REPORT}
              onClick={() => setMobileMenuOpen(false)}
              variant="primary"
              className="w-full justify-center"
              leftIcon={PlusCircle}
            >
              Report Civic Issue
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
