import React from 'react';
import Swal from 'sweetalert2';

export default function HomePage() {
  const handleAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Chào mừng quý khách!',
      text: 'Hệ thống nông sản OCOP Đồng Tháp kết nối trực tiếp Nhà Vườn - Khách Hàng.',
      confirmButtonColor: '#198754'
    });
  };

  return (
    <div className="container py-5">
      <div className="text-center p-5 bg-white rounded-4 shadow-sm border border-success border-opacity-25">
        <span className="badge bg-success-subtle text-success fs-6 px-3 py-2 rounded-pill mb-3">
          🌾 CỔNG THÔNG TIN KHÁCH HÀNG (CUSTOMER PORTAL)
        </span>
        <h1 className="fw-bold text-success display-5">Sàn Nông Sản & Đặc Sản OCOP Đồng Tháp</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
          Khám phá các sản phẩm đạt chứng nhận OCOP 3 sao, 4 sao, 5 sao: Sen Tháp Mười, Nem Lai Vung, Xoài cát Chu Cao Lãnh, Quýt hồng Lai Vung...
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-success btn-lg px-4 shadow-sm" onClick={handleAlert}>
            Xem Ưu Đãi OCOP Hôm Nay
          </button>
          <a href="/vendor" className="btn btn-outline-secondary btn-lg px-4">
            Dành Cho Nhà Vườn
          </a>
        </div>
      </div>
    </div>
  );
}
