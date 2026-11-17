import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/customer/HomePage';
import VendorDashboard from './pages/vendor/VendorDashboard';
import StaffReviewPage from './pages/staff/StaffReviewPage';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/staff" element={<StaffReviewPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <footer className="bg-white border-top py-3 text-center text-muted">
          <div className="container">
            <small>© 2026 DongThap AgriMart — Đồ Án Lập Trình Web C# & IN4211 (Đại học Đồng Tháp)</small>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
