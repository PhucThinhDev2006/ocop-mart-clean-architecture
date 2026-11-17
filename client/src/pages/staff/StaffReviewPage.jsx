import React from 'react';

export default function StaffReviewPage() {
  return (
    <div className="container py-5">
      <div className="p-5 bg-white rounded-4 shadow-sm border border-info border-opacity-50">
        <span className="badge bg-info-subtle text-info-emphasis fs-6 px-3 py-2 rounded-pill mb-3">
          🛡️ CỔNG NHÂN VIÊN CANH GÁC & VẬN HÀNH (STAFF / MODERATOR PORTAL)
        </span>
        <h2 className="fw-bold text-dark">Kiểm Duyệt Nông Sản OCOP & Canh Gác Hệ Thống</h2>
        <p className="text-muted">
          Thẩm định hồ sơ OCOP, soi giấy tờ chứng nhận trước khi duyệt lên trang chủ; lọc bình luận vi phạm và xử lý đơn hàng bị kẹt.
        </p>
        <div className="table-responsive mt-4">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Tên sản phẩm</th>
                <th>Cơ sở gửi</th>
                <th>Hạng OCOP</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold">Nem Lai Vung Truyền Thống</td>
                <td>HTX Nem Lai Vung</td>
                <td><span className="badge bg-warning text-dark">OCOP 4 Sao</span></td>
                <td><span className="badge bg-secondary">Chờ duyệt giấy tờ</span></td>
                <td>
                  <button className="btn btn-sm btn-success me-2">Phê Duyệt</button>
                  <button className="btn btn-sm btn-outline-danger">Từ Chối</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
