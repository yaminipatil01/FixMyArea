import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  ThumbsUp, 
  Share2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Send,
  MessageSquare
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useReports } from '../context/ReportsContext';
import { ROUTES } from '../utils/constants';

export const ReportDetailPage = () => {
  const { id } = useParams();
  const { reports, upvoteReport } = useReports();
  const report = reports.find((r) => r.id === id) || reports[0];

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { author: 'Vikram P.', time: '3 hours ago', text: 'Traffic police had to divert vehicles away from the hazard.' },
    { author: 'Meera R.', time: '1 hour ago', text: 'Municipal survey team was spotted marking the perimeter this morning.' },
  ]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      { author: 'You (Citizen)', time: 'Just now', text: commentText.trim() },
    ]);
    setCommentText('');
  };

  const timelineSteps = [
    { title: 'Submitted', desc: 'Complaint registered by citizen with media and GPS location' },
    { title: 'Under Review', desc: 'Verified by local municipal inspector & engineer' },
    { title: 'In Progress', desc: 'Field repair squads mobilized on site' },
    { title: 'Resolved', desc: 'Work certified and verified by community inspection' },
  ];

  const currentStep = report.status === 'RESOLVED' ? 4 : report.status === 'IN_PROGRESS' ? 3 : report.status === 'IN_REVIEW' ? 2 : 1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Navigation & Header */}
      <div>
        <Link
          to={ROUTES.REPORTS}
          className="inline-flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#171717] mb-3 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Reports Feed
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#171717] bg-[#FFF5CC] px-2.5 py-0.5 rounded border border-[#FFD43B]/60">
                {report.id}
              </span>
              <Badge status={report.status} />
              <span className="text-xs text-[#666666]">
                Reported {report.reportedAt} by {report.reportedBy}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              {report.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              leftIcon={ThumbsUp}
              onClick={() => upvoteReport(report.id)}
            >
              Upvote Issue ({report.upvotes})
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={Share2}
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Complaint link copied to clipboard!');
                }
              }}
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Status Progress Stepper */}
      <Card padding="md" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
            Resolution Progress Tracker
          </h3>
          <span className="text-xs font-semibold text-[#171717] bg-[#FFF5CC] px-2 py-0.5 rounded border border-[#FFD43B]/40">
            Current Stage: {report.status.replace('_', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {timelineSteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum <= currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={step.title}
                className={`p-3.5 rounded-[12px] border transition-all ${
                  isCurrent
                    ? 'border-[#FFD43B] bg-[#FFF5CC]/40 shadow-sm'
                    : isCompleted
                    ? 'border-[#EAEAEA] bg-white'
                    : 'border-[#EAEAEA]/60 bg-[#F7F7F5]/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-[#171717] text-white'
                        : 'bg-[#EAEAEA] text-[#666666]'
                    }`}
                  >
                    {stepNum}
                  </div>
                  <span className="text-xs font-bold text-[#171717]">{step.title}</span>
                </div>
                <p className="text-[11px] text-[#666666] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Content & Details Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Description & Community Discussion */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="md" className="space-y-4">
            <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
              Issue Description
            </h3>
            <p className="text-sm text-[#171717] leading-relaxed">
              {report.description}
            </p>

            {/* Photo Preview */}
            {report.images && report.images.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-[#666666] block mb-2">
                  Uploaded Evidence Photographs:
                </span>
                <div className="rounded-[12px] overflow-hidden border border-[#EAEAEA] max-h-80 bg-neutral-100">
                  <img
                    src={report.images[0]}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Citizen Comments & Discussion */}
          <Card padding="md" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#171717]" />
                Community Updates & Field Notes ({comments.length})
              </h3>
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Share an on-the-ground update or comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 focus:bg-white text-[#171717]"
              />
              <Button type="submit" variant="primary" size="sm" leftIcon={Send}>
                Post
              </Button>
            </form>

            <div className="space-y-3 pt-2">
              {comments.map((c, i) => (
                <div key={i} className="p-3 rounded-[10px] bg-[#F7F7F5] border border-[#EAEAEA] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#171717]">{c.author}</span>
                    <span className="text-[#888888] text-[11px]">{c.time}</span>
                  </div>
                  <p className="text-xs text-[#666666] leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Location & Administrative Information */}
        <div className="space-y-6">
          <Card padding="md" className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
              Location & Jurisdiction
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#171717]">{report.location.address}</div>
                  <div className="text-[#666666]">{report.location.area}</div>
                </div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-[10px] border border-[#EAEAEA] text-[11px] text-[#666666] space-y-1">
                <div><strong>Jurisdiction:</strong> {report.location.ward || 'Municipal Engineering Division'}</div>
                <div><strong>Coordinates:</strong> {report.location.coordinates[0].toFixed(4)}, {report.location.coordinates[1].toFixed(4)}</div>
              </div>
            </div>

            <Button
              to={`/map?highlight=${report.id}`}
              variant="secondary"
              size="sm"
              className="w-full justify-center"
              leftIcon={MapPin}
            >
              View on Map
            </Button>
          </Card>

          <Card padding="md" className="space-y-3 bg-[#171717] text-white border-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FFD43B]" />
              <span className="text-xs font-bold text-[#FFD43B] uppercase tracking-wider">
                Municipal Action Team
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Assigned to <strong>{report.location.ward || 'Rapid Infrastructure Squad'}</strong>. Target turnaround estimate: 24-48 hours.
            </p>
            <div className="pt-2 border-t border-neutral-800">
              <Link
                to={ROUTES.ADMIN_COMPLAINTS}
                className="text-xs text-[#FFD43B] hover:underline"
              >
                Access Municipal Console &rarr;
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
