import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active fw-bold' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span>🌾</span> DongThap AgriMart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                Khách Hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/vendor')}`} to="/vendor">
                Nhà Vườn
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/staff')}`} to="/staff">
                Nhân Viên Canh Gác
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/admin')}`} to="/admin">
                Quản Trị Viên
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
