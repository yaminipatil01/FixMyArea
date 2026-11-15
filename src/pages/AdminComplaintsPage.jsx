import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useReports } from '../context/ReportsContext';
import { ROUTES } from '../utils/constants';

export const AdminComplaintsPage = () => {
  const { reports, updateReportStatus } = useReports();
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const handleStatusChange = (id, newStatus) => {
    updateReportStatus(id, newStatus, `Status updated to ${newStatus.replace('_', ' ')} by Municipal Officer`);
  };

  const filtered = reports.filter((c) => {
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.location.address.toLowerCase().includes(search.toLowerCase()) ||
      c.location.area.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#171717] font-heading">
            Citizen Complaint Dispatch Queue
          </h1>
          <p className="text-xs text-[#666666]">
            Review incoming citizen reports, assign engineering work orders, and update public progress statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            to={ROUTES.MAP}
            variant="secondary"
            size="sm"
            leftIcon={MapPin}
          >
            City Map
          </Button>
          <Button
            to={ROUTES.ADMIN}
            variant="secondary"
            size="sm"
          >
            Dashboard Overview
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="sm" className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, keyword or street..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 text-[#171717]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter complaints by status"
              className="px-3 py-2 text-xs bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 cursor-pointer"
            >
              <option value="all">All Operational Statuses</option>
              <option value="SUBMITTED">Submitted (New)</option>
              <option value="IN_REVIEW">Under Review</option>
              <option value="IN_PROGRESS">In Progress (Field Squad)</option>
              <option value="RESOLVED">Resolved & Closed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Complaints Table / List */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F7F5] border-b border-[#EAEAEA] text-[#666666] uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3 px-4">Tracking ID</th>
                <th className="py-3 px-4">Issue Details</th>
                <th className="py-3 px-4">Area & Ward</th>
                <th className="py-3 px-4">Change Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#FDFDFD] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#171717] whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-[#171717]">{item.title}</div>
                    <div className="text-[11px] text-[#666666] line-clamp-1">{item.description}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="text-[#171717] font-medium">{item.location.area}</div>
                    <div className="text-[11px] text-[#888888]">{item.location.ward || 'Zone Division'}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        aria-label={`Change status for ${item.id}`}
                        className="px-2.5 py-1 text-xs font-semibold rounded-[8px] bg-[#FFF5CC] text-[#171717] border border-[#FFD43B]/60 focus:outline-none cursor-pointer"
                      >
                        <option value="SUBMITTED">Submitted</option>
                        <option value="IN_REVIEW">Under Review</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      to={ROUTES.REPORT_DETAIL(item.id)}
                      className="inline-flex items-center gap-1 font-semibold text-xs text-[#171717] hover:underline"
                    >
                      Inspect <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminComplaintsPage;
