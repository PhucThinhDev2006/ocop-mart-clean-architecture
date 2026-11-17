import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="container py-5">
      <div className="p-5 bg-white rounded-4 shadow-sm border border-danger border-opacity-50">
        <span className="badge bg-danger-subtle text-danger fs-6 px-3 py-2 rounded-pill mb-3">
          👑 CỔNG QUẢN TRỊ VIÊN TỐI CAO (SUPER ADMIN PORTAL)
        </span>
        <h2 className="fw-bold text-dark">Quản Trị Toàn Sàn & Báo Cáo Tài Chính</h2>
        <p className="text-muted">
          Cấp quyền nhân viên canh gác, cấu hình tỷ lệ chiết khấu sàn, quản lý Flash Sale giờ vàng và giám sát an ninh hệ thống.
        </p>
        <div className="row g-3 mt-3">
          <div className="col-md-3">
            <div className="card border-0 bg-light p-3 rounded-3 text-center">
              <h6>Tổng Doanh Thu Sàn</h6>
              <h3 className="text-danger fw-bold">158.400.000 đ</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 bg-light p-3 rounded-3 text-center">
              <h6>Nhà Vườn Tham Gia</h6>
              <h3 className="text-primary fw-bold">48 Cơ sở</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 bg-light p-3 rounded-3 text-center">
              <h6>Nhân Viên Canh Gác</h6>
              <h3 className="text-info fw-bold">6 Nhân sự</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 bg-light p-3 rounded-3 text-center">
              <h6>Nhật Ký An Ninh</h6>
              <span className="badge bg-success">Hệ thống an toàn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
