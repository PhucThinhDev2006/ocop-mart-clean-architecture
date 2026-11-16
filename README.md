# 🌾 DongThap AgriMart — Sàn Nông Sản & Đặc Sản OCOP Đồng Tháp

[![.NET Version](https://img.shields.io/badge/.NET-10.0%20%2F%208.0-purple?style=flat&logo=dotnet)](https://dotnet.microsoft.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture%204%20Layers-blue?style=flat)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[![Database](https://img.shields.io/badge/Database-SQL%20Server%202022-red?style=flat&logo=microsoftsqlserver)](https://www.microsoft.com/sql-server)
[![Security](https://img.shields.io/badge/Auth-Argon2id%20%2B%20JWT-green?style=flat&logo=jsonwebtokens)](https://jwt.io/)
[![Testing](https://img.shields.io/badge/Testing-xUnit%20%2B%20Moq%20(%E2%89%A550%25)-orange?style=flat&logo=testinglibrary)](https://xunit.net/)
[![Container](https://img.shields.io/badge/DevOps-Docker%20Compose-2496ED?style=flat&logo=docker)](https://www.docker.com/)

> **Đồ án môn học:** IN4309N04 LẬP TRÌNH WEB ASPX > **Đơn vị đào tạo:** Khoa Công nghệ và Kỹ thuật / Khoa Sư phạm Công nghệ và kỹ thuật — Trường Đại học Đồng Tháp.  
> **Giảng viên hướng dẫn:** ThS. Trần Kim Hương  
> **Nhóm thực hiện:** Nhóm 03 — Lớp ĐHCNTT24B-IT  

---

## 📖 1. GIỚI THIỆU ĐỀ TÀI

**DongThap AgriMart** là nền tảng thương mại điện tử chuyên biệt phục vụ chuyển đổi số trong chuỗi cung ứng nông sản sạch và đặc sản truyền thống của tỉnh Đồng Tháp cũng như các vùng miền trên cả nước. 

Hệ thống được xây dựng nhằm tôn vinh và phân phối các sản phẩm đạt chuẩn **OCOP (Mỗi xã một sản phẩm từ 3 đến 5 sao)**, tiêu chuẩn **VietGAP** và **Hữu cơ (Organic)** như: *Sen Tháp Mười, Nem Lai Vung, Xoài cát Chu Cao Lãnh, Quýt hồng Lai Vung, Gạo Huyết Rồng...*

### Điểm nhấn giải pháp:
- **Truy xuất nguồn gốc:** Liên kết trực tiếp thông tin Hợp tác xã, nhà vườn và quy trình đóng gói.
- **Phân loại vùng miền & Chuẩn OCOP:** Bộ lọc thông minh theo cấp bậc sao OCOP và bản đồ nông sản vùng miền.
- **Nông sản mùa vụ (Seasonal):** Ưu tiên hiển thị và gợi ý nông sản đang vào mùa thu hoạch rộ với giá tốt nhất.
- **Kiến trúc chịu tải cao & Bảo mật:** Áp dụng **Clean Architecture 4 lớp**, xác thực **JWT Kép (Access + Refresh Token trong HttpOnly Cookie)**, băm mật khẩu **Argon2id** và cơ chế **Khóa lạc quan (Optimistic Concurrency)** chống bán âm kho.

---

## 🏛️ 2. TỔNG QUAN KIẾN TRÚC HỆ THỐNG

Dự án áp dụng mô hình **Clean Architecture 4 lớp (Onion Architecture)** tuân thủ nguyên lý đảo ngược phụ thuộc (Dependency Inversion Principle - DIP).

```
DongThapAgriMart/
│
├── src/
│   ├── 1. Domain/                    # [LÕI TRUNG TÂM] Thực thể nghiệp vụ, Enums, Interfaces (Không có using ra ngoài)
│   │   ├── Entities/                 # Product, Category, Order, User, OcopStandard...
│   │   ├── Enums/                    # OrderStatus, PaymentMethod, OcopStarLevel...
│   │   └── Interfaces/               # IGenericRepository<T>, IUnitOfWork...
│   │
│   ├── 2. Application/               # [NGHIỆP VỤ CA SỬ DỤNG] Services, DTOs, Validation
│   │   ├── DTOs/                     # ProductDto, CreateOrderRequest, AuthResponse...
│   │   ├── Validators/               # FluentValidation độc lập (CreateOrderValidator...)
│   │   ├── Services/                 # OrderService, AuthService, ProductService...
│   │   └── Common/                   # PagedResult<T>, Result<T>
│   │
│   ├── 3. Infrastructure/            # [HẠ TẦNG & LƯU TRỮ] EF Core, DbContext, Fluent API, Security
│   │   ├── Data/                     # AppDbContext, Migrations, SeedData
│   │   ├── Repositories/             # GenericRepository<T>, UnitOfWork
│   │   ├── Security/                 # Argon2idPasswordHasher, JwtTokenGenerator
│   │   └── External/                 # SmtpEmailSender, VietQRPayment
│   │
│   └── 4. WebApi/                    # [CỔNG GIAO TIẾP] RESTful Controllers, Swagger, Middlewares
│       ├── Controllers/              # ProductsController, OrdersController, AuthController
│       ├── Middlewares/              # GlobalExceptionMiddleware (RFC 9457 ProblemDetails)
│       ├── wwwroot/                  # Client Frontend (HTML5, Bootstrap 5, JS)
│       └── Program.cs                # Dependency Injection Service Registration
│
└── tests/
    └── UnitTests/                    # [KIỂM THỬ TỰ ĐỘNG] xUnit + Moq (Coverage ≥ 50%)
        ├── Domain/                   # Test nghiệp vụ thực thể
        └── Application/              # Test nghiệp vụ Services (Mock Repository)
```

---

## 🛠️ 3. NGĂN XẾP CÔNG NGHỆ (TECH STACK)

| Thành phần | Công nghệ sử dụng | Chi tiết kỹ thuật nổi bật |
| :--- | :--- | :--- |
| **Backend** | C# (.NET 10 / .NET 8) | Clean Architecture 4 lớp, RESTful API, Dependency Injection, Thin Controllers |
| **Cơ sở dữ liệu** | SQL Server 2022 | Entity Framework Core (EF Core), Fluent API trong `OnModelCreating`, Data Seeding, Dapper |
| **Bảo mật** | Argon2id & JWT | Mật khẩu băm bằng Argon2id (Memory-hard chống GPU), JWT Access Token (15p) + Refresh Token (7d) |
| **Xử lý lỗi & Log** | ProblemDetails & Serilog | Báo lỗi toàn cục chuẩn RFC 9457 JSON, Logging có cấu trúc |
| **Xác thực dữ liệu**| FluentValidation | Tách biệt hoàn toàn tầng kiểm tra dữ liệu đầu vào ra khỏi Entity Domain |
| **Frontend** | Bootstrap 5, JS ES6+ | Responsive mọi thiết bị, Fetch/AJAX gắn Bearer Token, SweetAlert2 popup, Loading State Spinner |
| **Kiểm thử** | xUnit & Moq | Kiểm thử tự động theo mẫu Arrange – Act – Assert (AAA), giả lập Repository |
| **DevOps** | Docker Compose | Chạy toàn bộ Web API, SQL Server và Redis thông qua `docker-compose.yml` |

---

## 🗄️ 4. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

Hệ thống được thiết kế chuẩn hóa bậc 3 (3NF) gồm **12 bảng quan hệ chặt chẽ**:
1. `NguoiDung`: Lưu tài khoản khách hàng, nhân viên, quản trị viên.
2. `VaiTro`: Phân quyền RBAC (`Admin`, `Customer`, `Staff`).
3. `DanhMuc`: Phân loại nông sản (Rau củ, Trái cây, Trà & Bột sen, Bánh kẹo & Mứt...).
4. `VungMien`: Khu vực xuất xứ (Đồng Tháp, ĐBSCL, Tây Nguyên, Miền Trung, Miền Bắc).
5. `CoSoSanXuat`: Thông tin Hợp tác xã, nhà vườn uy tín.
6. `SanPham`: Tên, giá, mô tả, ảnh, số lượng tồn kho, hạng OCOP (`3-5 sao`), mã `RowVersion` (chống bán âm kho).
7. `GioHang`: Lưu giỏ hàng người dùng theo phiên/tài khoản.
8. `DonHang`: Mã đơn duy nhất, tổng tiền, trạng thái (`ChoXuLy`, `DaThanhToan`, `DangGiao`, `HoanThanh`, `DaHuy`).
9. `ChiTietDonHang`: Các mặt hàng, số lượng và đơn giá tại thời điểm đặt.
10. `LichSuGiaoDich`: Lưu vết thanh toán kèm `IdempotencyKey` chống trừ tiền hai lần.
11. `DanhGia`: Khách hàng đánh giá số sao và nhận xét kèm hình ảnh thật.
12. `MaGiamGia`: Voucher khuyến mãi theo phần trăm hoặc số tiền cố định.

---

## 🚀 5. HƯỚNG DẪN CÀI ĐẶT & CHẠY ỨNG DỤNG (GETTING STARTED)

### 5.1. Yêu cầu môi trường (Prerequisites)
- [.NET 8.0 SDK hoặc .NET 10.0 SDK](https://dotnet.microsoft.com/download)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (Tích hợp workload *ASP.NET and web development*) hoặc [VS Code](https://code.visualstudio.com/)
- [Microsoft SQL Server 2019/2022](https://www.microsoft.com/sql-server) hoặc Docker Desktop

---

### 5.2. Các bước cài đặt bằng dòng lệnh (.NET CLI)

#### Bước 1: Clone Repository về máy
```bash
git clone https://github.com/<tai-khoan-nhom>/dongthap-agrimart-web.git
cd dongthap-agrimart-web
```

#### Bước 2: Cấu hình chuỗi kết nối Database
Mở tệp `src/DongThapAgri.WebApi/appsettings.json` và điều chỉnh chuỗi kết nối SQL Server của máy em:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=DongThapAgriDb;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "Secret": "ChuoiKhoaBiMatRatDaiVaBaoMatDungChoDongThapAgriMart2026!",
    "Issuer": "DongThapAgriMart",
    "Audience": "DongThapAgriMartClients",
    "ExpiryMinutes": 15
  }
}
```

#### Bước 3: Khôi phục gói thư viện (Restore Dependencies)
```bash
dotnet restore
```

#### Bước 4: Chạy Migrations tạo Database & Nạp dữ liệu mẫu (Seeding)
```bash
dotnet ef database update --project src/DongThapAgri.Infrastructure --startup-project src/DongThapAgri.WebApi
```

#### Bước 5: Chạy ứng dụng Web API & Giao diện
```bash
dotnet run --project src/DongThapAgri.WebApi
```
- **Giao diện Client:** `https://localhost:5001`
- **Tài liệu API Swagger UI:** `https://localhost:5001/swagger`

---

### 5.3. Khởi chạy nhanh bằng Docker Compose
Nếu máy đã cài Docker Desktop, em chỉ cần chạy duy nhất 1 câu lệnh để dựng toàn bộ hệ thống (Web API + SQL Server + Redis):
```bash
docker-compose up -d --build
```

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

Theo quy định học phần **IN4211**, nhóm tuân thủ nghiêm ngặt chuẩn **Conventional Commits**:

### 7.1. Cấu trúc Commit Message:
$$\text{<type>(<scope>): <mô tả ngắn bằng tiếng Anh hoặc tiếng Việt không dấu>}$$

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
| **1** | `002xxxxxxx` | **Nguyễn Văn A** *(Trưởng nhóm)* | Backend Lead | Dựng Clean Architecture, Xác thực JWT + Argon2id, EF Core Migrations, Quản trị Admin Dashboard |
| **2** | `002xxxxxxx` | **Trần Thị B** | Frontend & UX | Dựng Master Layout, Giao diện Responsive Bootstrap 5, Danh mục OCOP & Chi tiết sản phẩm, Bộ lọc tìm kiếm |
| **3** | `002xxxxxxx` | **Lê Văn C** | Full-Stack & Testing | Nghiệp vụ Giỏ hàng, Đặt hàng Flash Sale, Tích hợp thanh toán, Unit Test xUnit/Moq và Docker |

---

## 📜 9. BẢN QUYỀN (LICENSE)

Dự án được phát triển phục vụ mục đích học tập và nghiên cứu trong khuôn khổ học phần **Lập trình Web Aspx** & **Phát triển phần mềm hướng đối tượng (IN4211)** tại **Trường Đại học Đồng Tháp**.  
Mã nguồn mở phát hành theo giấy phép [MIT License](LICENSE).
