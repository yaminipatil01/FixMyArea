export const APP_NAME = 'FixMyArea';
export const APP_TAGLINE = 'Community-Powered Civic Issue Reporting & Resolution';

export const ROUTES = {
  HOME: '/',
  REPORTS: '/reports',
  NEW_REPORT: '/report/new',
  REPORT_DETAIL: (id = ':id') => `/report/${id}`,
  MAP: '/map',
  ANALYTICS: '/analytics',
  ADMIN: '/admin',
  ADMIN_COMPLAINTS: '/admin/complaints',
};

export const STATUS_CONFIG = {
  SUBMITTED: {
    label: 'Submitted',
    color: 'bg-stone-100 text-stone-800 border-stone-200',
    dotColor: 'bg-stone-500',
    step: 1,
  },
  IN_REVIEW: {
    label: 'Under Review',
    color: 'bg-amber-50 text-amber-900 border-amber-200',
    dotColor: 'bg-amber-500',
    step: 2,
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'bg-blue-50 text-blue-900 border-blue-200',
    dotColor: 'bg-blue-500',
    step: 3,
  },
  RESOLVED: {
    label: 'Resolved',
    color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    dotColor: 'bg-emerald-500',
    step: 4,
  },
};
