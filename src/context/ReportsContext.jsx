import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_REPORTS } from '../data/mockReports';

const ReportsContext = createContext(null);

const STORAGE_KEY = 'fixmyarea_reports_v2';

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load reports from localStorage', e);
    }
    return MOCK_REPORTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to persist reports to localStorage', e);
    }
  }, [reports]);

  // Add a new complaint from /report/new
  const addReport = (newReportData) => {
    const id = `FMA-${1050 + reports.length}`;
    const newReport = {
      id,
      title: newReportData.title,
      category: newReportData.category,
      categoryLabel: newReportData.categoryLabel || 'Civic Issue',
      location: {
        address: newReportData.address,
        area: newReportData.area,
        ward: newReportData.ward || 'Municipal Ward',
        coordinates: newReportData.coordinates || [22.3072, 73.1812],
      },
      status: 'SUBMITTED',
      priority: newReportData.priority || 'MEDIUM',
      reportedBy: newReportData.reportedBy || 'Citizen',
      reportedAt: 'Just now',
      upvotes: 1,
      commentsCount: 0,
      description: newReportData.description,
      images: newReportData.images && newReportData.images.length > 0 ? newReportData.images : [
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      ],
      timeline: [
        {
          status: 'SUBMITTED',
          date: 'Just now',
          note: 'Civic complaint submitted by citizen via FixMyArea portal',
        },
      ],
    };

    setReports((prev) => [newReport, ...prev]);
    return newReport;
  };

  // Upvote report
  const upvoteReport = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  };

  // Update status (e.g. from Admin Console)
  const updateReportStatus = (id, newStatus, note = '') => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const newTimeline = [...r.timeline];
        newTimeline.push({
          status: newStatus,
          date: 'Just now',
          note: note || `Status updated to ${newStatus.replace('_', ' ')} by Municipal Officer`,
        });
        return {
          ...r,
          status: newStatus,
          timeline: newTimeline,
        };
      })
    );
  };

  // Reset to default mock reports
  const resetToDefaults = () => {
    setReports(MOCK_REPORTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        addReport,
        upvoteReport,
        updateReportStatus,
        resetToDefaults,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

export default ReportsContext;
