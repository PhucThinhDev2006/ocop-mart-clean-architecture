import React from 'react';

export default function VendorDashboard() {
  return (
    <div className="container py-5">
      <div className="p-5 bg-white rounded-4 shadow-sm border border-warning border-opacity-50">
        <span className="badge bg-warning-subtle text-warning-emphasis fs-6 px-3 py-2 rounded-pill mb-3">
          🚜 CỔNG DÀNH CHO NHÀ VƯỜN & HỢP TÁC XÃ (VENDOR PORTAL)
        </span>
        <h2 className="fw-bold text-dark">Quản Lý Cơ Sở Sản Xuất & Nông Sản</h2>
        <p className="text-muted">
          Đăng ký thông tin nhà vườn, mã số vùng trồng, tải lên giấy chứng nhận OCOP và quản lý kho hàng theo mùa thu hoạch.
        </p>
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <div className="card border-0 bg-light p-3 rounded-3">
              <h5>Nông sản đang bán</h5>
              <h2 className="text-success fw-bold">12</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 bg-light p-3 rounded-3">
              <h5>Đơn hàng cần đóng gói</h5>
              <h2 className="text-warning fw-bold">5</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 bg-light p-3 rounded-3">
              <h5>Giấy chứng nhận OCOP</h5>
              <span className="badge bg-success">Đã xác minh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
