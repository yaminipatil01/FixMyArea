import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReportsProvider } from './context/ReportsContext';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';
import NewReportPage from './pages/NewReportPage';
import ReportDetailPage from './pages/ReportDetailPage';
import MapPage from './pages/MapPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminComplaintsPage from './pages/AdminComplaintsPage';
import NotFoundPage from './pages/NotFoundPage';

export function App() {
  return (
    <ReportsProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Citizen Routes */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/report/new" element={<NewReportPage />} />
            <Route path="/report/:id" element={<ReportDetailPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Municipal Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="complaints" element={<AdminComplaintsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReportsProvider>
  );
}

export default App;
