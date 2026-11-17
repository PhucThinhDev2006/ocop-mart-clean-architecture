# 🎨 QUY TẮC THIẾT KẾ GIAO DIỆN UI (OcopMart Design System)
> **Dành cho:** Thành viên phụ trách Frontend & UX (**Phạm Quốc Bảo**) và toàn bộ thành viên nhóm.  
> **Áp dụng cho:** Thư mục `client/` (React 19 + Bootstrap 5.3 + Lucide Icons).

---

## 1. 🌈 BẢNG MÀU THƯƠNG HIỆU (COLOR PALETTE)

| Tên màu | Mã Hex | Class Bootstrap tương đương | Mục đích sử dụng |
| :--- | :---: | :---: | :--- |
| **Nông nghiệp Xanh (Primary)** | `#198754` | `btn-success`, `bg-success`, `text-success` | Màu chủ đạo: Nút bấm chính, Header giỏ hàng, Nông sản tươi |
| **Đặc sản Sen Hồng (Accent)** | `#E91E63` | `text-danger`, custom badge | Điểm nhấn sản phẩm Sen Tháp Mười, nhãn Flash Sale, Quà tặng |
| **Sao OCOP Vàng (Gold Star)** | `#F59E0B` | `badge bg-warning text-dark` | Huy hiệu phân hạng 3 sao, 4 sao, 5 sao |
| **Nền sáng sạch (Clean Light)** | `#F8F9FA` | `bg-light` | Màu nền chung toàn bộ trang web |
| **Thẻ khối (Card Background)** | `#FFFFFF` | `bg-white`, `card shadow-sm` | Nền cho thẻ sản phẩm, form đăng nhập, bảng dữ liệu |
| **Cảnh báo từ chối (Danger)** | `#DC3545` | `btn-danger`, `text-danger` | Nút Từ chối kiểm duyệt, Hủy đơn, Xóa sản phẩm |

---

## 2. 🧩 QUY CHUẨN ĐẶT TÊN & TỔ CHỨC THÀNH PHẦN (COMPONENTS)

```text
client/src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx            # Thanh điều hướng chuyển đổi 4 vai trò
│   │   ├── Footer.jsx            # Chân trang thông tin liên hệ & bản quyền DTHU
│   │   ├── OcopBadge.jsx         # Component hiển thị số sao OCOP (3⭐ - 5⭐)
│   │   ├── LoadingButton.jsx     # Nút bấm có hiệu ứng xoay spinner khi submit
│   │   └── EmptyState.jsx        # Hiển thị khi giỏ hàng hoặc danh sách rỗng
│   └── cards/
│       ├── ProductCard.jsx       # Thẻ hiển thị sản phẩm nông sản
│       └── CertificateCard.jsx   # Thẻ xem ảnh chứng nhận OCOP của nhà vườn
├── pages/
│   ├── customer/                 # Giao diện Khách hàng (HomePage, Cart, Checkout)
│   ├── vendor/                   # Giao diện Nhà vườn (Dashboard, ProductUpload)
│   ├── staff/                    # Giao diện Nhân viên kiểm duyệt (StaffReviewPage)
│   └── admin/                    # Giao diện Quản trị viên (AdminDashboard)
└── services/
    ├── api.js                    # Cấu hình Axios Client gọi về ASP.NET Core Web API
    ├── productService.js         # Các hàm gọi API sản phẩm
    └── orderService.js           # Các hàm giỏ hàng & thanh toán
```

---

## 3. 🛡️ QUY TẮC BẢO VỆ GIAO DIỆN (DEFENSIVE UX)

1. **Chống Spam Click (Double-Submit):**
   ```jsx
   // Luôn quản lý state loading cho các nút bấm tác động dữ liệu
   <button 
     className="btn btn-success" 
     disabled={isSubmitting} 
     onClick={handleCheckout}>
     {isSubmitting ? (
       <><span className="spinner-border spinner-border-sm me-2" /> Đang xử lý...</>
     ) : (
       "Xác nhận đặt hàng"
     )}
   </button>
   ```

2. **Ảnh Nông sản có Fallback:**
   ```jsx
   <img 
     src={product.imageUrl} 
     alt={product.name}
     onError={(e) => { e.target.src = "/placeholder-product.png"; }}
   />
   ```

3. **Hộp thoại xác nhận thao tác nguy hiểm bằng SweetAlert2:**
   ```javascript
   import Swal from 'sweetalert2';

   const confirmReject = (productId) => {
     Swal.fire({
       title: 'Từ chối kiểm duyệt nông sản này?',
       input: 'textarea',
       inputPlaceholder: 'Nhập lý do từ chối (vd: Giấy kiểm dịch hết hạn)...',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#dc3545',
       cancelButtonColor: '#6c757d',
       confirmButtonText: 'Xác nhận từ chối',
       cancelButtonText: 'Đóng'
     }).then((result) => {
       if (result.isConfirmed) {
         // Gọi API từ chối kèm lý do
       }
     });
   };
   ```

---

## 4. 🚀 LỆNH KIỂM TRA CHẤT LƯỢNG CODE TRƯỚC KHI COMMIT

Mở terminal trong thư mục `client/` và chạy:
```bash
npm run build
```
Đảm bảo kết quả trả về `✓ built in ...ms` và **không có bất kỳ lỗi cú pháp hay thiếu import nào**.
