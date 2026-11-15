import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ThumbsUp, 
  MessageSquare, 
  PlusCircle, 
  Map, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { CATEGORIES } from '../data/categories';
import { VADODARA_AREAS } from '../data/mockReports';
import { useReports } from '../context/ReportsContext';
import { ROUTES } from '../utils/constants';

export const ReportsPage = () => {
  const { reports, upvoteReport } = useReports();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter((report) => {
    const matchesCategory =
      selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' || report.status === selectedStatus;
    const matchesArea =
      selectedArea === 'all' || report.location.area === selectedArea;
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesArea && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <Link to={ROUTES.HOME} className="hover:text-[#171717]">Home</Link>
            <span>/</span>
            <span className="text-[#171717] font-medium">Community Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Community Civic Reports
            </h1>
          </div>
          <p className="text-sm text-[#666666] mt-0.5">
            Monitor real-time infrastructure complaints filed across city neighborhoods.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            to={ROUTES.MAP}
            variant="secondary"
            size="sm"
            leftIcon={Map}
          >
            City Map
          </Button>
          <Button
            to={ROUTES.NEW_REPORT}
            variant="primary"
            size="sm"
            leftIcon={PlusCircle}
            className="font-semibold shadow-sm"
          >
            Report an Issue
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="sm" className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, landmark or report ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 focus:bg-white transition-all text-[#171717]"
            />
          </div>

          {/* Area & Category Dropdowns */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              aria-label="Filter by Area"
              className="px-3 py-2 text-xs font-medium bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 cursor-pointer"
            >
              <option value="all">All Neighborhoods</option>
              {VADODARA_AREAS.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name} ({a.ward})
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by issue category"
              className="px-3 py-2 text-xs font-medium bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by status"
              className="px-3 py-2 text-xs font-medium bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="IN_REVIEW">Under Review</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>

        {/* Quick status pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#EAEAEA] text-xs overflow-x-auto">
          <span className="text-[#666666] font-medium text-[11px] shrink-0">Quick Filter:</span>
          {['all', 'SUBMITTED', 'IN_REVIEW', 'IN_PROGRESS', 'RESOLVED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors shrink-0 ${
                selectedStatus === st
                  ? 'bg-[#171717] text-white font-medium'
                  : 'bg-[#F7F7F5] text-[#666666] hover:text-[#171717] border border-[#EAEAEA]'
              }`}
            >
              {st === 'all' ? 'All Issues' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </Card>

      {/* Reports Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#666666]">
          <span>Showing <strong>{filteredReports.length}</strong> complaints</span>
          <span>Sorted by latest activity</span>
        </div>

        {filteredReports.length === 0 ? (
          <Card padding="lg" className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF5CC] mx-auto flex items-center justify-center text-[#171717]">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#171717]">No reports found</h3>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              No civic issues match your selected filter criteria. Try resetting your search filters or file a new report.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                  setSelectedArea('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
              <Button
                to={ROUTES.NEW_REPORT}
                variant="primary"
                size="sm"
              >
                Report Problem
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                hoverEffect
                padding="md"
                className="flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#666666]">
                        {report.id}
                      </span>
                      <Badge status={report.status} />
                    </div>
                    <span className="text-[11px] text-[#888888]">
                      {report.reportedAt}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#171717] leading-snug">
                      {report.title}
                    </h3>
                    <p className="text-xs text-[#666666] mt-1 line-clamp-2 leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#666666] bg-[#F7F7F5] px-2.5 py-1.5 rounded-[8px] border border-[#EAEAEA]">
                    <MapPin className="w-3.5 h-3.5 text-[#171717] shrink-0" />
                    <span className="truncate">{report.location.address}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => upvoteReport(report.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] bg-[#F7F7F5] hover:bg-[#FFF5CC] text-[#171717] border border-[#EAEAEA] transition-colors"
                      title="Upvote issue priority"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-[#171717]" />
                      <span className="font-semibold text-xs">{report.upvotes}</span>
                    </button>
                    <span className="inline-flex items-center gap-1 text-[#666666]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{report.commentsCount}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/map?highlight=${report.id}`}
                      className="text-xs text-[#666666] hover:text-[#171717] hover:underline"
                    >
                      Map Pin
                    </Link>
                    <Link
                      to={ROUTES.REPORT_DETAIL(report.id)}
                      className="inline-flex items-center gap-1 font-semibold text-[#171717] hover:underline"
                    >
                      Track Progress
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
