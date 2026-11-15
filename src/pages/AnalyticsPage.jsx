import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Filter 
} from 'lucide-react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const MONTHLY_DATA = [
  { month: 'Jun', reported: 120, resolved: 98 },
  { month: 'Jul', reported: 145, resolved: 125 },
  { month: 'Aug', reported: 190, resolved: 160 },
  { month: 'Sep', reported: 230, resolved: 205 },
  { month: 'Oct', reported: 260, resolved: 240 },
  { month: 'Nov', reported: 180, resolved: 165 },
];

const CATEGORY_DISTRIBUTION = [
  { name: 'Potholes & Roads', value: 35, color: '#FFD43B' },
  { name: 'Garbage & Sanitation', value: 28, color: '#171717' },
  { name: 'Water & Drainage', value: 18, color: '#4B5563' },
  { name: 'Broken Streetlights', value: 12, color: '#9CA3AF' },
  { name: 'Public Infrastructure', value: 7, color: '#E5E7EB' },
];

export const AnalyticsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
            Civic Transparency & Public Accountability
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading mt-0.5">
            City Resolution Metrics
          </h1>
          <p className="text-sm text-[#666666]">
            Transparent data tracking municipal response times, resolved work orders, and complaint volumes.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={Download}
          onClick={() => alert('Exporting monthly civic transparency report PDF...')}
        >
          Download Report
        </Button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md" className="space-y-1">
          <span className="text-xs font-medium text-[#666666] uppercase tracking-wider">
            Resolution Rate
          </span>
          <div className="text-3xl font-extrabold text-[#171717] font-heading">
            88.4%
          </div>
          <p className="text-xs text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +4.2% from last quarter
          </p>
        </Card>

        <Card padding="md" className="space-y-1">
          <span className="text-xs font-medium text-[#666666] uppercase tracking-wider">
            Avg Time to Resolve
          </span>
          <div className="text-3xl font-extrabold text-[#171717] font-heading">
            42 hrs
          </div>
          <p className="text-xs text-emerald-700">6 hours faster than SLA target</p>
        </Card>

        <Card padding="md" className="space-y-1">
          <span className="text-xs font-medium text-[#666666] uppercase tracking-wider">
            Total Issues Logged
          </span>
          <div className="text-3xl font-extrabold text-[#171717] font-heading">
            1,482
          </div>
          <p className="text-xs text-[#666666]">Across 28 municipal wards</p>
        </Card>

        <Card padding="md" className="space-y-1">
          <span className="text-xs font-medium text-[#666666] uppercase tracking-wider">
            Citizen Satisfaction
          </span>
          <div className="text-3xl font-extrabold text-[#171717] font-heading">
            4.7 / 5
          </div>
          <p className="text-xs text-[#666666]">Based on post-resolution feedback</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Reported vs Resolved */}
        <Card padding="md" className="lg:col-span-2">
          <CardHeader
            title="Monthly Issue Volume vs Resolution"
            subtitle="Comparing citizen filings vs completed repairs over the last 6 months"
          />
          <div className="h-68 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #EAEAEA',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  }}
                />
                <Bar dataKey="reported" fill="#171717" radius={[4, 4, 0, 0]} name="Reported" />
                <Bar dataKey="resolved" fill="#FFD43B" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card padding="md">
          <CardHeader
            title="Issues by Category"
            subtitle="Distribution of complaint types"
          />
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-[#EAEAEA] text-xs">
            {CATEGORY_DISTRIBUTION.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#666666]">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </span>
                <span className="font-semibold text-[#171717]">{cat.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
