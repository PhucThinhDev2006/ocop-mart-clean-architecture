# Hiến Pháp Thiết Kế Giao Diện UI — OcopMart (Nông Sản & Đặc Sản Vùng Miền Chuẩn OCOP 3 Miền)
<!-- OcopMart React UI Design & Architecture Constitution -->

## 1. Nguyên Tắc Cốt Lõi (Core Principles)

### I. Phân Định Giao Diện Theo 4 Vai Trò (Role-Based Layout Isolation)
- Giao diện được tổ chức độc lập theo 4 nhóm người dùng, không trộn lẫn layout:
  1. **Khách hàng (`/customer`):** Tối ưu trải nghiệm mua sắm mượt mà, tìm kiếm nhanh, lọc sao OCOP (3-5 sao), lọc vùng miền, giỏ hàng trực quan, thanh toán an toàn chống trừ tiền 2 lần.
  2. **Nhà vườn / Hợp tác xã (`/vendor`):** Bảng quản trị hàng hóa, theo dõi đơn hàng nông sản, cập nhật số lượng tồn kho theo lô, tải lên giấy chứng nhận OCOP và hồ sơ chất lượng.
  3. **Nhân viên canh gác (`/staff`):** Màn hình thẩm định hồ sơ pháp lý, duyệt/từ chối nông sản kèm lý do rõ ràng, kiểm duyệt đánh giá/bình luận, cảnh báo đơn hàng ứ đọng.
  4. **Quản trị viên tối cao (`/admin`):** Biểu đồ doanh thu tổng thể (Chart.js), quản lý nhân sự, thiết lập hoa hồng sàn, cấu hình Flash Sale, nhật ký hệ thống (Audit Logs).
- Mỗi vai trò có thanh điều hướng (Navbar/Sidebar) và vùng làm việc riêng biệt.

### II. Hệ Nhận Diện Thương Hiệu OCOP & Đất Sen Hồng (Brand Identity & Color Tokens)
- **Màu chủ đạo (Primary - Nông nghiệp xanh sạch):** `#198754` (Bootstrap Success) / `#2E7D32`. Đại diện cho nông sản hữu cơ, phát triển bền vững.
- **Màu điểm nhấn (Accent - Hoa sen Đồng Tháp):** `#E91E63` / `#F06292`. Dành riêng cho đặc sản trứ danh Đồng Tháp (Trà sen, rượu sen, hạt sen sấy, nem Lai Vung).
- **Màu định vị sao OCOP (OCOP Stars & Badges):** `#F59E0B` / `#FFC107` (Vàng óng lúa chín). Phải hiển thị nổi bật số lượng sao (⭐ 3 Sao, ⭐ 4 Sao, ⭐ 5 Sao) trên mọi thẻ sản phẩm.
- **Màu nền (Backgrounds):** Nền chính `#F8F9FA` nhẹ dịu mắt; thẻ nội dung (Card) nền trắng `#FFFFFF` với bóng đổ nhẹ `box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)`.

### III. Chuẩn Hóa Thành Phần React (Component Architecture & Modularity)
- Mọi component đặt tên theo định dạng `PascalCase.jsx` (ví dụ: `ProductCard.jsx`, `OcopBadge.jsx`, `OrderStatusBadge.jsx`).
- Tách bạch cấu trúc:
  - `src/components/common/`: Các thành phần dùng chung (Navbar, Footer, Button, Badge, Modal, Pagination).
  - `src/components/cards/`: Thẻ sản phẩm, thẻ hợp tác xã, thẻ chứng nhận OCOP.
  - `src/pages/{customer|vendor|staff|admin}/`: Màn hình giao diện phân theo vai trò.
  - `src/services/`: Tầng gọi API qua Axios, tuyệt đối không viết fetch/axios trực tiếp bừa bãi trong JSX.
- Sử dụng bộ icon vector đồng nhất: **`lucide-react`** (gọn nhẹ, sắc nét, tương thích hoàn toàn React 19).

### IV. Trải Nghiệm Tương Tác & Chống Gian Lận (Resilient UX & Interaction Safety)
- **Nút bấm hành động (Action Buttons):** Luôn có trạng thái `isLoading` và tự động `disabled` ngay khi bấm (đặc biệt là nút Đặt hàng, Thanh toán, Duyệt sản phẩm) để chống hiện tượng spam click gửi 2 request cùng lúc.
- **Thông báo & Hộp thoại xác nhận:** Dùng **SweetAlert2** (`Swal.fire`) cho các thao tác quan trọng (xóa, hủy đơn, duyệt sản phẩm, thanh toán thành công).
- **Trạng thái dữ liệu rỗng (Empty States):** Luôn có hình minh họa hoặc icon kèm lời nhắn thân thiện khi giỏ hàng trống, không tìm thấy sản phẩm, hoặc chưa có đơn hàng.
- **Ảnh dự phòng (Fallback Images):** Mọi thẻ ảnh `<img src="..." />` phải có `onError` fallback về ảnh placeholder chuẩn của OcopMart nếu link ảnh nông sản bị lỗi.

### V. Thiết Kế Thích Ứng (Responsive & Mobile-First)
- Sử dụng 100% hệ thống lưới Bootstrap 5 (`container`, `row`, `col-12 col-md-6 col-lg-4 col-xl-3`).
- Giao diện chạy mượt mà từ màn hình điện thoại (Mobile $\ge 375\text{px}$) đến máy tính bàn (Desktop $\ge 1200\text{px}$).

---

## 2. Tiêu Chuẩn Kỹ Thuật (Technical Stack & Requirements)

- **Frontend Core:** React 19 (`react`, `react-dom`).
- **Build Tool:** Vite tốc độ cao (`vite.config.js`).
- **Styling & CSS:** Bootstrap 5.3 (`bootstrap`) + Bootstrap Icons / Lucide React (`lucide-react`).
- **Routing:** React Router v7 (`react-router-dom`).
- **Biểu đồ & Thống kê:** `chart.js` + `react-chartjs-2`.
- **Thông báo:** SweetAlert2 (`sweetalert2`).
- **Realtime (cho thông báo đơn hàng & kiểm duyệt):** `@microsoft/signalr`.

---

## 3. Quy Trình Duyệt Code & Kiểm Thử (Quality Gates)

1. **Kiểm tra biên dịch:** Trước khi commit, bắt buộc chạy `npm run build` tại thư mục `client/` và đạt `0 errors`.
2. **Tuân thủ quy chuẩn mã nguồn:** Không để sót `console.log` rác, không dùng `style={{ ... }}` nội dòng cho các thuộc tính đã có trong Bootstrap.
3. **Quy tắc commit:** Đặt tên commit theo chuẩn Conventional Commits (ví dụ: `feat(client): implement ocop star badge component`).

---

**Version**: 1.0.0 | **Ratified**: 2026-11-17 | **Dự án**: OcopMart — Khoa CNTT Trường ĐH Đồng Tháp
