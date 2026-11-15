import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, Heart } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#EAEAEA] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center text-white">
                <span className="w-2 h-2 rounded-full bg-[#FFD43B] mr-0.5"></span>
                <span className="font-bold text-xs">F</span>
              </div>
              <span className="text-base font-bold text-[#171717] font-heading">FixMyArea</span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              Empowering citizens and municipal departments to collaboratively report, track, and resolve neighborhood infrastructure problems.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                City Dispatch Active
              </span>
            </div>
          </div>

          {/* Quick Citizens Links */}
          <div>
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-3">
              Citizen Portal
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <Link to={ROUTES.REPORTS} className="hover:text-[#171717] transition-colors">
                  Browse Community Feed
                </Link>
              </li>
              <li>
                <Link to={ROUTES.NEW_REPORT} className="hover:text-[#171717] transition-colors">
                  Submit a Complaint
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MAP} className="hover:text-[#171717] transition-colors">
                  Interactive City Map
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ANALYTICS} className="hover:text-[#171717] transition-colors">
                  Resolution Metrics
                </Link>
              </li>
            </ul>
          </div>

          {/* Civic Issues Categories */}
          <div>
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-3">
              Issue Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <Link to={`${ROUTES.REPORTS}?category=potholes`} className="hover:text-[#171717] transition-colors">
                  Potholes & Asphalt Repair
                </Link>
              </li>
              <li>
                <Link to={`${ROUTES.REPORTS}?category=garbage`} className="hover:text-[#171717] transition-colors">
                  Garbage & Waste Disposal
                </Link>
              </li>
              <li>
                <Link to={`${ROUTES.REPORTS}?category=streetlights`} className="hover:text-[#171717] transition-colors">
                  Broken Streetlights
                </Link>
              </li>
              <li>
                <Link to={`${ROUTES.REPORTS}?category=water-leakage`} className="hover:text-[#171717] transition-colors">
                  Water & Pipeline Leaks
                </Link>
              </li>
            </ul>
          </div>

          {/* Municipality & Admin */}
          <div>
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-3">
              Administration
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <Link to={ROUTES.ADMIN} className="hover:text-[#171717] transition-colors inline-flex items-center gap-1">
                  Municipal Officers Portal
                  <ArrowUpRight className="w-3 h-3 text-[#666666]" />
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ADMIN_COMPLAINTS} className="hover:text-[#171717] transition-colors">
                  Complaint Dispatch Queue
                </Link>
              </li>
              <li className="pt-2">
                <div className="p-3 bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] text-[11px] text-[#666666]">
                  <div className="font-semibold text-[#171717] flex items-center gap-1 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#171717]" />
                    Verified Municipal System
                  </div>
                  Data synchronized with local civic engineering units.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-3">
          <p>© {new Date().getFullYear()} FixMyArea. Built for cleaner, safer, responsive neighborhoods.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for civic transparency
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
