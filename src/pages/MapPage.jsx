import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Layers, 
  Filter, 
  ArrowRight, 
  AlertTriangle, 
  PlusCircle, 
  Maximize2,
  Navigation,
  ThumbsUp,
  X,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { CATEGORIES } from '../data/categories';
import { VADODARA_CENTER, VADODARA_AREAS } from '../data/mockReports';
import { useReports } from '../context/ReportsContext';
import { ROUTES } from '../utils/constants';

// Clean custom SVG pins for Leaflet based on status
const createCustomPin = (status) => {
  const colorMap = {
    RESOLVED: { bg: '#10B981', border: '#065F46', text: '#FFFFFF' },
    IN_PROGRESS: { bg: '#3B82F6', border: '#1E40AF', text: '#FFFFFF' },
    IN_REVIEW: { bg: '#F59E0B', border: '#B45309', text: '#FFFFFF' },
    SUBMITTED: { bg: '#FFD43B', border: '#171717', text: '#171717' },
  };

  const current = colorMap[status] || colorMap.SUBMITTED;

  return L.divIcon({
    className: 'custom-city-pin',
    html: `
      <div style="
        background-color: ${current.bg};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid ${current.border};
        box-shadow: 0 4px 12px rgba(0,0,0,0.28);
        transition: transform 0.15s ease;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: ${current.text};
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Map controller to fly smoothly to selected report / area
function MapController({ targetCenter, targetZoom }) {
  const map = useMap();
  useEffect(() => {
    if (targetCenter) {
      map.flyTo(targetCenter, targetZoom || 14, { duration: 1.2 });
    }
  }, [targetCenter, targetZoom, map]);
  return null;
}

export const MapPage = () => {
  const { reports, upvoteReport } = useReports();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [activeReport, setActiveReport] = useState(null);
  const [mapTarget, setMapTarget] = useState(VADODARA_CENTER);
  const [mapZoom, setMapZoom] = useState(13);

  // If a report ID was passed via query parameter (e.g. from /report/new), select and fly to it
  useEffect(() => {
    if (highlightId && reports.length > 0) {
      const found = reports.find((r) => r.id === highlightId);
      if (found) {
        setActiveReport(found);
        setMapTarget(found.location.coordinates);
        setMapZoom(15);
      }
    } else if (reports.length > 0 && !activeReport) {
      setActiveReport(reports[0]);
    }
  }, [highlightId, reports]);

  // Filtered reports list
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchCategory = selectedCategory === 'all' || r.category === selectedCategory;
      const matchStatus = selectedStatus === 'all' || r.status === selectedStatus;
      const matchArea = selectedArea === 'all' || r.location.area === selectedArea;
      const matchSearch =
        !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchStatus && matchArea && matchSearch;
    });
  }, [reports, selectedCategory, selectedStatus, selectedArea, searchQuery]);

  const handleLocateMe = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapTarget([pos.coords.latitude, pos.coords.longitude]);
          setMapZoom(15);
        },
        () => {
          setMapTarget(VADODARA_CENTER);
          setMapZoom(14);
        }
      );
    } else {
      setMapTarget(VADODARA_CENTER);
      setMapZoom(14);
    }
  };

  const handleAreaClick = (area) => {
    setSelectedArea(area.name);
    setMapTarget(area.coordinates);
    setMapZoom(14);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Top Map Control Bar */}
      <div className="bg-white border-b border-[#EAEAEA] px-4 py-2.5 z-10 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Header info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#171717] flex items-center justify-center text-white shrink-0">
              <MapPin className="w-4 h-4 text-[#FFD43B]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-[#171717] font-heading">
                  Interactive City Map
                </h1>
                <span className="text-[10px] uppercase font-bold bg-[#FFF5CC] text-[#171717] px-2 py-0.5 rounded-full border border-[#FFD43B]/60">
                  Live View
                </span>
              </div>
              <p className="text-[11px] text-[#666666]">
                {filteredReports.length} civic hazard pins plotted across city neighborhoods
              </p>
            </div>
          </div>

          {/* Quick Area Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            <span className="text-[11px] font-semibold text-[#888888] shrink-0">Area:</span>
            <button
              onClick={() => {
                setSelectedArea('all');
                setMapTarget(VADODARA_CENTER);
                setMapZoom(13);
              }}
              className={`px-2 py-1 rounded-[8px] transition-colors shrink-0 ${
                selectedArea === 'all'
                  ? 'bg-[#171717] text-white font-semibold'
                  : 'bg-[#F7F7F5] text-[#171717] hover:bg-[#EAEAEA]'
              }`}
            >
              All City Areas
            </button>
            {VADODARA_AREAS.slice(0, 5).map((a) => (
              <button
                key={a.name}
                onClick={() => handleAreaClick(a)}
                className={`px-2 py-1 rounded-[8px] transition-colors shrink-0 ${
                  selectedArea === a.name
                    ? 'bg-[#171717] text-white font-semibold'
                    : 'bg-[#F7F7F5] text-[#171717] hover:bg-[#EAEAEA]'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={Navigation}
              onClick={handleLocateMe}
              title="Locate my position on map"
            >
              Locate Me
            </Button>
            <Button
              to={ROUTES.NEW_REPORT}
              variant="primary"
              size="sm"
              leftIcon={PlusCircle}
              className="font-semibold shadow-sm"
            >
              Report Issue
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Filter & Search Strip */}
      <div className="bg-[#F7F7F5] border-b border-[#EAEAEA] px-4 py-2 z-10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#888888] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search street, area or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#EAEAEA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 text-[#171717]"
            />
          </div>

          {/* Category & Status Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="px-2.5 py-1.5 text-xs bg-white border border-[#EAEAEA] rounded-[8px] text-[#171717] focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by status"
              className="px-2.5 py-1.5 text-xs bg-white border border-[#EAEAEA] rounded-[8px] text-[#171717] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="SUBMITTED">Submitted (New)</option>
              <option value="IN_REVIEW">Under Review</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            {/* Pin legend */}
            <div className="hidden lg:flex items-center gap-3 text-[11px] text-[#666666] ml-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD43B] border border-[#171717]"></span>
                Submitted
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                In Progress
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                Resolved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Area + Slide-Over Drawer */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Leaflet Map */}
        <div className="flex-1 h-full z-0">
          <MapContainer
            center={VADODARA_CENTER}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController targetCenter={mapTarget} targetZoom={mapZoom} />

            {filteredReports.map((report) => (
              <Marker
                key={report.id}
                position={report.location.coordinates}
                icon={createCustomPin(report.status)}
                eventHandlers={{
                  click: () => {
                    setActiveReport(report);
                    setMapTarget(report.location.coordinates);
                  },
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1 text-xs max-w-xs">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#666666]">
                      <span>{report.id}</span>
                      <span>•</span>
                      <span>{report.location.area}</span>
                    </div>
                    <div className="font-bold text-[#171717]">{report.title}</div>
                    <div className="text-[11px] text-[#666666] line-clamp-2">{report.description}</div>
                    <div className="pt-2 flex items-center justify-between border-t border-[#EAEAEA] mt-1">
                      <span className="font-semibold text-xs text-[#171717]">
                        👍 {report.upvotes} upvotes
                      </span>
                      <Link
                        to={ROUTES.REPORT_DETAIL(report.id)}
                        className="text-xs font-bold text-[#171717] underline"
                      >
                        Track Details &rarr;
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Selected Complaint Inspection Drawer (Right Side) */}
        {activeReport && (
          <div className="absolute top-4 right-4 bottom-4 z-20 w-96 max-w-[calc(100vw-2rem)] flex flex-col">
            <Card padding="none" className="h-full flex flex-col shadow-2xl border-[#171717]/20 overflow-hidden bg-white">
              {/* Header */}
              <div className="p-4 border-b border-[#EAEAEA] flex items-start justify-between gap-3 bg-[#F7F7F5]/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#171717] bg-white px-2 py-0.5 rounded border border-[#EAEAEA]">
                      {activeReport.id}
                    </span>
                    <Badge status={activeReport.status} />
                  </div>
                  <span className="text-[11px] text-[#666666] block">
                    Reported {activeReport.reportedAt} in {activeReport.location.area}
                  </span>
                </div>
                <button
                  onClick={() => setActiveReport(null)}
                  className="p-1.5 rounded-lg text-[#666666] hover:text-[#171717] hover:bg-[#EAEAEA] transition-colors"
                  title="Close inspection drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Photo thumbnail */}
                {activeReport.images && activeReport.images.length > 0 && (
                  <div className="rounded-[12px] overflow-hidden border border-[#EAEAEA] aspect-video bg-neutral-100">
                    <img
                      src={activeReport.images[0]}
                      alt={activeReport.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-base text-[#171717] font-heading leading-snug">
                    {activeReport.title}
                  </h3>
                  <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                    {activeReport.description}
                  </p>
                </div>

                {/* Location & Jurisdiction */}
                <div className="p-3 bg-[#F7F7F5] rounded-[10px] border border-[#EAEAEA] space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#171717]">{activeReport.location.address}</div>
                      <div className="text-[11px] text-[#666666]">
                        {activeReport.location.area}, {activeReport.location.ward || 'Municipal Ward'}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#888888] pl-6 font-mono">
                    GPS: {activeReport.location.coordinates[0].toFixed(4)}, {activeReport.location.coordinates[1].toFixed(4)}
                  </div>
                </div>

                {/* Timeline snippet */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block">
                    Latest Activity:
                  </span>
                  <div className="p-3 bg-[#FFF5CC]/50 rounded-[10px] border border-[#FFD43B]/50 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                      <Clock className="w-3.5 h-3.5 text-[#171717]" />
                      <span>{activeReport.timeline?.[activeReport.timeline.length - 1]?.date || 'Today'}</span>
                    </div>
                    <p className="text-[11px] text-[#666666] mt-1">
                      {activeReport.timeline?.[activeReport.timeline.length - 1]?.note || 'Under active municipal inspection'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-[#EAEAEA] bg-white flex items-center justify-between gap-3 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={ThumbsUp}
                  onClick={() => upvoteReport(activeReport.id)}
                  title="Upvote to raise priority"
                >
                  Upvote ({activeReport.upvotes})
                </Button>

                <Button
                  to={ROUTES.REPORT_DETAIL(activeReport.id)}
                  variant="primary"
                  size="sm"
                  rightIcon={ArrowRight}
                  className="font-semibold shadow-sm"
                >
                  Full Tracking
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
