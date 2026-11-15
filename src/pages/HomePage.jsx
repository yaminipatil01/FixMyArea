import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { CATEGORIES } from '../data/categories';
import { useReports } from '../context/ReportsContext';
import { ROUTES } from '../utils/constants';

export const HomePage = () => {
  const { reports } = useReports();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#EAEAEA] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF5CC] border border-[#FFD43B]/60 text-xs font-semibold text-[#171717]">
              <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
              <span>FixMyArea — Real-Time Community Infrastructure Tracking</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#171717] font-heading leading-tight">
              Report local civic issues. <br />
              <span className="bg-[#FFF5CC] px-2 py-0.5 rounded-md inline-block mt-1">
                Watch your city fix them.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-2xl mx-auto">
              Empowering citizens to report potholes, overflowing trash, broken streetlights, and damaged public infrastructure directly to local municipal authorities.
            </p>

            {/* Strategic Yellow Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button
                to={ROUTES.NEW_REPORT}
                variant="primary"
                size="lg"
                leftIcon={PlusCircle}
                className="w-full sm:w-auto font-bold shadow-md"
              >
                Report an Issue
              </Button>
              <Button
                to={ROUTES.MAP}
                variant="secondary"
                size="lg"
                leftIcon={MapPin}
                className="w-full sm:w-auto"
              >
                Explore City Map
              </Button>
            </div>

            {/* Trust markers */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#666666]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Municipal Response
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#171717]" />
                24-48 hr field action
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#171717]" />
                Community Verified Resolutions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md" className="space-y-1">
            <span className="text-xs text-[#666666] font-medium uppercase tracking-wider">Reports Logged</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">{reports.length}</div>
            <div className="text-xs text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Live active reports
            </div>
          </Card>

          <Card padding="md" className="space-y-1">
            <span className="text-xs text-[#666666] font-medium uppercase tracking-wider">Resolved Issues</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              {reports.filter((r) => r.status === 'RESOLVED').length || 1}
            </div>
            <div className="text-xs text-[#666666]">Inspected and certified</div>
          </Card>

          <Card padding="md" className="space-y-1">
            <span className="text-xs text-[#666666] font-medium uppercase tracking-wider">In Progress</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              {reports.filter((r) => r.status === 'IN_PROGRESS').length || 3}
            </div>
            <div className="text-xs text-amber-700">Crews actively on-site</div>
          </Card>

          <Card padding="md" className="space-y-1">
            <span className="text-xs text-[#666666] font-medium uppercase tracking-wider">Avg Turnaround</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">36 hrs</div>
            <div className="text-xs text-emerald-700">Within response SLA</div>
          </Card>
        </div>
      </section>

      {/* Issue Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717] font-heading">
              Browse by Issue Category
            </h2>
            <p className="text-sm text-[#666666]">
              Select a category to view reports or file a targeted complaint.
            </p>
          </div>
          <Link
            to={ROUTES.REPORTS}
            className="text-xs font-semibold text-[#171717] hover:underline flex items-center gap-1"
          >
            View all categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.id}
              hoverEffect
              padding="md"
              className="group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF5CC] flex items-center justify-center text-[#171717] group-hover:bg-[#FFD43B] transition-colors">
                    <AlertTriangle className="w-5 h-5 text-[#171717]" />
                  </div>
                  <span className="text-xs font-medium text-[#666666] bg-[#F7F7F5] px-2.5 py-1 rounded-full border border-[#EAEAEA]">
                    {cat.count} reports
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#171717] group-hover:text-black">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-[#EAEAEA]/80 flex items-center justify-between">
                <Link
                  to={`${ROUTES.REPORTS}?category=${cat.id}`}
                  className="text-xs font-semibold text-[#171717] group-hover:text-black flex items-center gap-1"
                >
                  View issues <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to={`${ROUTES.NEW_REPORT}?category=${cat.id}`}
                  className="text-xs text-[#666666] hover:text-[#171717]"
                >
                  + Report
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Community Reports Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717] font-heading">
              Recent Community Reports
            </h2>
            <p className="text-sm text-[#666666]">
              Real-time civic updates submitted by citizens in your area.
            </p>
          </div>
          <Button to={ROUTES.REPORTS} variant="secondary" size="sm" rightIcon={ArrowRight}>
            View Feed
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {reports.slice(0, 2).map((report) => (
            <Card key={report.id} hoverEffect padding="md" className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-[#666666]">
                      {report.id}
                    </span>
                    <Badge status={report.status} />
                  </div>
                  <h3 className="font-bold text-base text-[#171717] leading-snug">
                    {report.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#666666] line-clamp-2">
                {report.description}
              </p>

              <div className="flex items-center justify-between text-xs text-[#666666] pt-3 border-t border-[#EAEAEA]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                  {report.location.area}
                </span>
                <Link
                  to={ROUTES.REPORT_DETAIL(report.id)}
                  className="font-semibold text-[#171717] hover:underline flex items-center gap-1"
                >
                  Track progress <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card padding="lg" className="bg-[#171717] text-white border-0 shadow-lg">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFD43B]">
              Transparent Civic Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              From report to resolution in 4 clear steps
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Every complaint is tracked publicly so citizens and authorities have complete clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-neutral-900/80 rounded-[12px] border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD43B] text-[#171717] font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-white">Snap & Pin Location</h4>
              <p className="text-xs text-neutral-400">
                Drop a pin on the city map, describe the issue, and upload photos in under a minute.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/80 rounded-[12px] border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD43B] text-[#171717] font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-white">Department Verification</h4>
              <p className="text-xs text-neutral-400">
                Local municipal officers verify the problem severity and assign repair crews.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/80 rounded-[12px] border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD43B] text-[#171717] font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Field Repair Dispatch</h4>
              <p className="text-xs text-neutral-400">
                Crews begin on-site asphalt patching, drain cleaning or light replacement.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/80 rounded-[12px] border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD43B] text-[#171717] font-bold flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="font-bold text-sm text-white">Public Verification</h4>
              <p className="text-xs text-neutral-400">
                Completion photographs are posted on the portal for community confirmation.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-300">
              Ready to report an infrastructure issue in your neighborhood?
            </span>
            <Button
              to={ROUTES.NEW_REPORT}
              variant="primary"
              size="md"
              leftIcon={PlusCircle}
            >
              Submit a Report
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
