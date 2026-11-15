import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Wrench,
  FileCheck
} from 'lucide-react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { MOCK_REPORTS } from '../data/mockReports';
import { ROUTES } from '../utils/constants';

export const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#171717] font-heading">
            Municipal Operations Dashboard
          </h1>
          <p className="text-xs text-[#666666]">
            Welcome, Officer Desk. 14 new citizen reports require review or crew dispatch today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            to={ROUTES.ADMIN_COMPLAINTS}
            variant="primary"
            size="sm"
            rightIcon={ArrowRight}
          >
            Open Dispatch Queue
          </Button>
        </div>
      </div>

      {/* Key Operational KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md" className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#666666]">
            <span>Pending Review</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717] font-heading">
            8
          </div>
          <p className="text-[11px] text-amber-700 font-medium">Needs initial verification</p>
        </Card>

        <Card padding="md" className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#666666]">
            <span>Active Field Crews</span>
            <Wrench className="w-3.5 h-3.5 text-[#171717]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717] font-heading">
            12 Teams
          </div>
          <p className="text-[11px] text-emerald-700 font-medium">Dispatched on site</p>
        </Card>

        <Card padding="md" className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#666666]">
            <span>Resolved This Week</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717] font-heading">
            64
          </div>
          <p className="text-[11px] text-emerald-700 font-medium">94% within 48h SLA</p>
        </Card>

        <Card padding="md" className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#666666]">
            <span>Critical Escalations</span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717] font-heading">
            2
          </div>
          <p className="text-[11px] text-red-600 font-medium">Requires immediate response</p>
        </Card>
      </div>

      {/* Critical Action Items List */}
      <Card padding="md">
        <CardHeader
          title="High Priority Citizen Reports"
          subtitle="Complaints marked urgent by community upvotes or severity"
          action={
            <Link
              to={ROUTES.ADMIN_COMPLAINTS}
              className="text-xs font-semibold text-[#171717] hover:underline"
            >
              View all &rarr;
            </Link>
          }
        />

        <div className="space-y-3">
          {MOCK_REPORTS.map((report) => (
            <div
              key={report.id}
              className="p-3.5 rounded-[12px] bg-[#F7F7F5] border border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#CCCCCC] transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#171717]">
                    {report.id}
                  </span>
                  <Badge status={report.status} />
                  <span className="text-xs text-[#666666]">
                    {report.location.area}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#171717]">
                  {report.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={ROUTES.REPORT_DETAIL(report.id)}
                  className="px-3 py-1.5 rounded-[8px] bg-white text-xs font-medium text-[#171717] border border-[#EAEAEA] hover:bg-[#F7F7F5]"
                >
                  View Details
                </Link>
                <Link
                  to={ROUTES.ADMIN_COMPLAINTS}
                  className="px-3 py-1.5 rounded-[8px] bg-[#171717] text-xs font-medium text-white hover:bg-neutral-800"
                >
                  Manage Status
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
