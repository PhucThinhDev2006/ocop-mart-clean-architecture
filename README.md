# 🌾 OcopMart — Sàn Nông Sản & Đặc Sản Vùng Miền Chuẩn OCOP Đồng Tháp

[![.NET Version](https://img.shields.io/badge/.NET-10.0%20%2F%208.0-purple?style=flat&logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/FrontEnd-React%2019%20%2B%20Vite-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture%204%20Layers-blue?style=flat)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[![Database](https://img.shields.io/badge/Database-SQL%20Server%202022-red?style=flat&logo=microsoftsqlserver)](https://www.microsoft.com/sql-server)
[![Security](https://img.shields.io/badge/Auth-Argon2id%20%2B%20JWT-green?style=flat&logo=jsonwebtokens)](https://jwt.io/)
[![Testing](https://img.shields.io/badge/Testing-xUnit%20%2B%20Moq%20(%E2%89%A550%25)-orange?style=flat&logo=testinglibrary)](https://xunit.net/)
[![Container](https://img.shields.io/badge/DevOps-Docker%20Compose-2496ED?style=flat&logo=docker)](https://www.docker.com/)

> **Đồ án môn học:** IN4309N04 — Lập trình Web ASPX & Phát triển phần mềm hướng đối tượng (IN4211)  
> **Đơn vị đào tạo:** Khoa Công nghệ và Kỹ thuật — Trường Đại học Đồng Tháp (DTHU)  
> **Giảng viên hướng dẫn:** ThS. Trần Kim Hương & ThS. Nguyễn Tuấn Kiệt  
> **Nhóm thực hiện:** Nhóm 03 — Lớp ĐHCNTT24B-IT  

---

## 📖 1. GIỚI THIỆU ĐỀ TÀI

**OcopMart (DongThap AgriMart)** là nền tảng thương mại điện tử chuyên biệt phục vụ chuyển đổi số trong chuỗi cung ứng nông sản sạch và đặc sản truyền thống của tỉnh Đồng Tháp cũng như các vùng miền trên cả nước. 

Hệ thống được xây dựng nhằm tôn vinh và phân phối các sản phẩm đạt chuẩn **OCOP (Mỗi xã một sản phẩm từ 3 đến 5 sao)**, tiêu chuẩn **VietGAP** và **Hữu cơ (Organic)** như: *Sen Tháp Mười, Nem Lai Vung, Xoài cát Chu Cao Lãnh, Quýt hồng Lai Vung, Gạo Huyết Rồng...*

### Điểm nhấn giải pháp:
- **Mô hình 4 vai trò độc lập:** Phân định rạch ròi giữa *Khách hàng*, *Nhà vườn hợp tác*, *Nhân viên canh gác kiểm duyệt* và *Quản trị viên tối cao*.
- **Truy xuất nguồn gốc:** Liên kết trực tiếp thông tin Hợp tác xã, nhà vườn và mã số vùng trồng.
- **Phân loại vùng miền & Chuẩn OCOP:** Bộ lọc thông minh theo cấp bậc sao OCOP và bản đồ nông sản vùng miền.
- **Nông sản mùa vụ (Seasonal):** Ưu tiên hiển thị và gợi ý nông sản đang vào mùa thu hoạch rộ với giá tốt nhất.
- **Kiến trúc Client-Server hiện đại:** FrontEnd phát triển bằng **React 19 (Vite SPA)** kết nối BackEnd C# qua **Clean Architecture 4 lớp**, bảo mật **Argon2id + JWT Kép** và cơ chế **Khóa lạc quan (Optimistic Concurrency)** chống bán âm kho.

---

## 🏛️ 2. TỔNG QUAN KIẾN TRÚC HỆ THỐNG

Dự án áp dụng mô hình phân tách độc lập **Client — Server (Single Page Application & RESTful API)** tuân thủ nguyên lý đảo ngược phụ thuộc (Dependency Inversion Principle - DIP):

```
ocop-mart-clean-architecture/
│
├── client/                               # [FRONT-END REACT (VITE)] Giao diện SPA hiện đại
│   ├── src/
│   │   ├── components/                   # Navbar, Footer, Sidebar, ProtectedRoute
│   │   ├── services/                     # Gọi API C# qua Axios (api.js, authService.js)
│   │   ├── pages/                        # PHÂN HỆ GIAO DIỆN CỦA 4 VAI TRÒ
│   │   │   ├── customer/                 # [1. KHÁCH HÀNG] HomePage, ProductDetail, Cart, Checkout
│   │   │   ├── vendor/                   # [2. NHÀ VƯỜN] VendorDashboard, ManageProducts
│   │   │   ├── staff/                    # [3. NHÂN VIÊN CANH GÁC] StaffReviewPage, ModerateReviews
│   │   │   └── admin/                    # [4. QUẢN TRỊ VIÊN] AdminDashboard, ManageStaff
│   │   ├── App.jsx                       # Cấu hình React Router điều hướng 4 vai trò
│   │   └── main.jsx                      # Điểm khởi chạy React tích hợp Bootstrap 5
│   └── package.json                      # Quản lý thư viện Front-End bằng npm
│
├── src/                                  # [BACK-END C# (.NET 10)] Clean Architecture 4 Lớp
│   ├── OcopMart.Domain/                  # [LÕI TRUNG TÂM] Entities, Enums 4 vai trò, Interfaces
│   ├── OcopMart.Application/             # [NGHIỆP VỤ] DTOs, FluentValidation, Services, PagedResult
│   ├── OcopMart.Infrastructure/          # [CSDL & BẢO MẬT] EF Core Fluent API, Argon2id, JWT, Dapper
│   └── OcopMart.WebApi/                  # [RESTful API SERVER] Controllers phân quyền 4 vai trò, Swagger
│       └── wwwroot/uploads/              # Nơi lưu ảnh nông sản và giấy chứng nhận OCOP nhà vườn tải lên
│
├── tests/                                # [KIỂM THỬ TỰ ĐỘNG]
│   └── OcopMart.UnitTests/               # Unit Test xUnit + Moq (Coverage ≥ 50%)
│
├── database/                             # [DATABASE ASSETS]
│   └── script.sql                        # Kịch bản CSDL SQL Server nộp Hội đồng chấm thi
│
└── OcopMart.sln                          # Solution gốc quản lý toàn bộ hệ thống
```

---

## 🛠️ 3. NGĂN XẾP CÔNG NGHỆ (TECH STACK)

| Tầng hệ thống | Công nghệ sử dụng | Chi tiết kỹ thuật nổi bật |
| :--- | :--- | :--- |
| **FrontEnd (Client)** | React 19, Vite | Bootstrap 5.3, React Router v7, Axios, SweetAlert2, Lucide React, Chart.js, SignalR Client |
| **BackEnd (Server)** | C# (.NET 10 / .NET 8) | Clean Architecture 4 lớp, RESTful API, Dependency Injection, Controller-based routing |
| **Cơ sở dữ liệu** | SQL Server 2022 | Entity Framework Core (EF Core), Fluent API trong `OnModelCreating`, Data Seeding, Dapper |
| **Bảo mật (Security)**| Argon2id & JWT | Băm mật khẩu Argon2id (Memory-hard chống GPU), JWT Access Token (15p) + Refresh Token (7d) |
| **Xử lý lỗi & Log** | ProblemDetails & Serilog | Báo lỗi toàn cục chuẩn RFC 9457 JSON, Logging có cấu trúc chuyên nghiệp |
| **Xác thực dữ liệu**| FluentValidation | Tách biệt hoàn toàn tầng kiểm tra dữ liệu đầu vào ra khỏi Entity Domain |
| **Kiểm thử** | xUnit & Moq | Kiểm thử tự động theo chuẩn Arrange – Act – Assert (AAA), giả lập Repository |
| **DevOps** | Docker Compose | Chạy toàn bộ Web API, SQL Server và Redis thông qua `docker-compose.yml` |

---

## 🗄️ 4. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

Hệ thống được thiết kế chuẩn hóa bậc 3 (3NF) gồm **13 bảng quan hệ chặt chẽ** phục vụ đúng 4 vai trò:
1. `VaiTro`: Lưu 4 vai trò hệ thống (`Customer`, `Vendor`, `Staff`, `Admin`).
2. `NguoiDung`: `MaNguoiDung`, `Email`, `PasswordHash` (Argon2id), `Salt`, `HoTen`, `SoDienThoai`, `MaVaiTro`.
3. `VungMien`: Khu vực xuất xứ (Đồng Tháp, ĐBSCL, Tây Nguyên, Miền Trung, Miền Bắc).
4. `CoSoSanXuat`: Thông tin Hợp tác xã, nhà vườn (`MaNguoiDung` liên kết với vai trò Vendor).
5. `DanhMuc`: Phân loại nông sản (Rau củ, Trái cây, Trà & Bột sen, Bánh kẹo & Mứt...).
6. `SanPham`: Tên, giá, mô tả, ảnh, số lượng tồn kho, hạng OCOP (`3-5 sao`), mã `RowVersion` (chống bán âm kho), `MaCoSoSanXuat`.
7. `LichSuKiemDuyet`: Lưu vết **Nhân viên canh gác nào duyệt sản phẩm nào, thời gian nào, lý do từ chối**.
8. `GioHang`: Lưu giỏ hàng người dùng theo phiên/tài khoản.
9. `DonHang`: Mã đơn duy nhất, tổng tiền, trạng thái (`ChoXuLy`, `DaThanhToan`, `DangGiao`, `HoanThanh`, `DaHuy`).
10. `ChiTietDonHang`: Các mặt hàng, số lượng và đơn giá tại thời điểm đặt.
11. `LichSuGiaoDich`: Lưu vết thanh toán kèm `IdempotencyKey` (UNIQUE - chống trừ tiền hai lần).
12. `DanhGia`: Khách hàng đánh giá số sao và nhận xét (được kiểm duyệt bởi Nhân viên canh gác).
13. `MaGiamGia`: Voucher khuyến mãi theo phần trăm hoặc số tiền cố định.

---

## 🚀 5. HƯỚNG DẪN CÀI ĐẶT & CHẠY ỨNG DỤNG (GETTING STARTED)

### 5.1. Yêu cầu môi trường (Prerequisites)
- [Node.js v20+ hoặc v24+](https://nodejs.org/) & npm
- [.NET 8.0 SDK hoặc .NET 10.0 SDK](https://dotnet.microsoft.com/download)
- [Visual Studio 2022](https://visualstudio.microsoft.com/), [VS Code](https://code.visualstudio.com/) hoặc [JetBrains Rider](https://www.jetbrains.com/rider/)
- [Microsoft SQL Server 2019/2022](https://www.microsoft.com/sql-server) hoặc Docker Desktop

---

### 5.2. Các bước khởi chạy chi tiết

#### Bước 1: Clone Repository về máy
```bash
git clone https://github.com/PhucThinhDev2006/ocop-mart-clean-architecture.git
cd ocop-mart-clean-architecture
```

#### Bước 2: Chạy BackEnd C# Web API
1. Cấu hình chuỗi kết nối SQL Server trong `src/OcopMart.WebApi/appsettings.json`.
2. Khôi phục thư viện và cập nhật CSDL:
```bash
dotnet restore
dotnet ef database update --project src/OcopMart.Infrastructure --startup-project src/OcopMart.WebApi
```
3. Khởi chạy Web API:
```bash
dotnet run --project src/OcopMart.WebApi
```
- **Tài liệu API Swagger UI:** `https://localhost:5001/swagger` (hoặc cổng hiển thị trên Terminal).

#### Bước 3: Chạy FrontEnd React (Mở cửa sổ Terminal thứ 2)
```bash
cd client
npm install
npm run dev
```
- **Giao diện Web:** `http://localhost:5173`

---

## 🧪 6. CHẠY KIỂM THỬ TỰ ĐỘNG (RUNNING TESTS)

Dự án áp dụng Framework **xUnit** và **Moq** để kiểm thử logic nghiệp vụ tự động:
```bash
# Chạy toàn bộ các bài kiểm thử
dotnet test

# Chạy kiểm thử và xuất báo cáo độ bao phủ (Coverage >= 50%)
dotnet test --collect:"XPlat Code Coverage"
```

---

## 🌿 7. QUY CHUẨN ĐÓNG GÓP CODE (GIT & PULL REQUEST WORKFLOW)

Theo quy định học phần **IN4309N04 / IN4211**, nhóm tuân thủ nghiêm ngặt chuẩn **Conventional Commits**:

### 7.1. Cấu trúc Commit Message:

```text
<type>(<scope>): <mô tả ngắn bằng tiếng Anh hoặc tiếng Việt không dấu>
```

- `feat:` Thêm tính năng mới (Ví dụ: `feat(auth): integrate argon2id password hasher`)
- `fix:` Sửa lỗi (Ví dụ: `fix(order): prevent overselling race condition in flash sale`)
- `refactor:` Tối ưu hóa code mà không thay đổi nghiệp vụ
- `test:` Bổ sung hoặc chỉnh sửa Unit Test xUnit
- `docs:` Cập nhật tài liệu, README

### 7.2. Quy trình nhánh (Branching Strategy):
- `main`: Nhánh chứa mã nguồn sạch, ổn định dùng để báo cáo và demo.
- `develop`: Nhánh tích hợp mã nguồn chung của cả nhóm.
- `feat/<ten-tinh-nang>`: Nhánh làm việc riêng của từng thành viên (Ví dụ: `feat/shopping-cart`, `feat/argon2id-auth`).
- Mọi thay đổi vào nhánh `develop`/`main` bắt buộc phải thông qua **Pull Request (PR)** có mô tả rõ: *(What, Why, How to test)* và được ít nhất 1 thành viên review chấp thuận.

---

## 👥 8. THÀNH VIÊN THỰC HIỆN ĐỀ TÀI

| STT | Mã số SV | Họ và tên | Vai trò | Phân hệ phụ trách chính |
| :-: | :---: | :--- | :---: | :--- |
| **1** | `0024417329` | **Nguyễn Huỳnh Phúc Thịnh** *(Leader)* | Backend Lead & Leader | Dựng Clean Architecture, Xác thực JWT + Argon2id, EF Core Migrations, Quản trị Admin Dashboard, Nghiệp vụ Giỏ hàng, Đặt hàng Flash Sale, Tích hợp thanh toán, Unit Test xUnit/Moq và Docker |
| **2** | `0024416442` | **Phạm Quốc Bảo** | Frontend & UX | Dựng Master Layout, Giao diện Responsive Bootstrap 5, Danh mục OCOP & Chi tiết sản phẩm, Bộ lọc tìm kiếm |
| **3** | `0024417853` | **Nguyễn Thành Lộc** | Testing | Hoàn thành tài liệu báo cáo: Tổng hợp phụ lục mã nguồn Word, kịch bản test và video demo. |
| **4** | `0024419329` | **Phan Thanh Phú** | Testing | Hoàn thành tài liệu báo cáo: Thiết kế Slide PowerPoint báo cáo và kịch bản thuyết trình. |

---

## 📜 9. BẢN QUYỀN (LICENSE)

Dự án được phát triển phục vụ mục đích học tập và nghiên cứu trong khuôn khổ học phần **Lập trình Web Aspx (IN4309N04)** & **Phát triển phần mềm hướng đối tượng (IN4211)** tại **Trường Đại học Đồng Tháp**.  
Mã nguồn mở phát hành theo giấy phép [MIT License](LICENSE).
