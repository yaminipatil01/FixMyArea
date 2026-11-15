import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart3, 
  MapPin, 
  ArrowLeft, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Admin Overview', path: ROUTES.ADMIN, icon: LayoutDashboard },
    { label: 'Manage Complaints', path: ROUTES.ADMIN_COMPLAINTS, icon: ClipboardList, badge: '4 New' },
    { label: 'Live City Map', path: ROUTES.MAP, icon: MapPin },
    { label: 'Resolution Stats', path: ROUTES.ANALYTICS, icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#EAEAEA] min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        {/* Portal info badge */}
        <div className="p-3 bg-[#F7F7F5] rounded-[12px] border border-[#EAEAEA]">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-[#171717]" />
            <span className="text-xs font-bold text-[#171717]">Municipal Desk</span>
          </div>
          <p className="text-[11px] text-[#666666]">
            City Public Works & Urban Infrastructure Division
          </p>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#666666] tracking-wider px-3 mb-2">
            Operations
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-[10px] text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'text-[#666666] hover:text-[#171717] hover:bg-[#F7F7F5]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFD43B]' : 'text-[#888888]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      isActive ? 'bg-[#FFD43B] text-[#171717]' : 'bg-[#FFF5CC] text-[#171717]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Quick summary */}
      <div className="pt-4 border-t border-[#EAEAEA] space-y-3">
        <div className="px-3 py-2 bg-[#FFF5CC]/60 rounded-[10px] border border-[#FFD43B]/40 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-[#171717] mb-0.5">
            <Clock className="w-3.5 h-3.5 text-[#171717]" />
            <span>SLA Target: 48h</span>
          </div>
          <p className="text-[11px] text-[#666666]">Average response: 31 hrs</p>
        </div>

        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#666666] hover:text-[#171717] hover:bg-[#F7F7F5] rounded-[10px] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Citizen View</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
