# 🔍 Website Checker Tools

## Mô tả
Bộ công cụ tự động kiểm tra website Client và Admin, phát hiện lỗi và tạo báo cáo chi tiết.

## 📁 Cấu trúc thư mục
```
kiem tra/
├── README.md                    # Hướng dẫn này
├── requirements.txt             # Danh sách thư viện cần thiết
├── setup_and_run.py            # Script cài đặt và chạy chính
├── website_checker.py          # Checker cơ bản (HTTP requests)
├── advanced_website_checker.py # Checker nâng cao (Playwright)
├── reports/                     # Thư mục chứa báo cáo
└── screenshots/                 # Thư mục chứa ảnh chụp màn hình


## 🚀 Cách sử dụng nhanh

### Bước 1: Chạy script chính
```bash
cd "c:\Users\AB\Documents\New folder\.g\kiem tra"
python setup_and_run.py
```

### Bước 2: Chọn menu
- **1**: Cài đặt dependencies (chạy lần đầu)
- **2**: Kiểm tra server có đang chạy không
- **3**: Chạy Basic Checker
- **4**: Chạy Advanced Checker
- **5**: Chạy cả hai
- **6**: Xem báo cáo đã tạo

## 📋 Yêu cầu hệ thống

### Python
- Python 3.8 trở lên
- pip (package manager)

### Server cần chạy
- **Client**: http://localhost:3001
- **Admin**: http://localhost:3002  
- **Backend**: http://localhost:3003

## 🔧 Cài đặt thủ công

### 1. Cài đặt Python packages
```bash
pip install -r requirements.txt
```

### 2. Cài đặt Playwright browser
```bash
playwright install chromium
```

## 📊 Các công cụ kiểm tra

### 1. Basic Website Checker (`website_checker.py`)
**Tính năng:**
- Kiểm tra HTTP status code
- Đo thời gian phản hồi
- Kiểm tra content cơ bản
- Tạo báo cáo JSON và HTML

**Các trang kiểm tra:**

**Client (localhost:3001):**
- `/` - Trang chủ
- `/products` - Danh sách sản phẩm
- `/cart` - Giỏ hàng
- `/checkout` - Thanh toán
- `/search` - Tìm kiếm
- `/categories` - Danh mục
- `/about` - Giới thiệu
- `/contact` - Liên hệ
- `/auth/login` - Đăng nhập
- `/auth/register` - Đăng ký
- `/account` - Tài khoản

**Admin (localhost:3002):**
- `/` - Dashboard
- `/products` - Quản lý sản phẩm
- `/orders` - Quản lý đơn hàng
- `/customers` - Quản lý khách hàng
- `/analytics` - Thống kê
- `/settings` - Cài đặt

### 2. Advanced Website Checker (`advanced_website_checker.py`)
**Tính năng:**
- Sử dụng Playwright (browser thật)
- Chụp ảnh màn hình
- Kiểm tra JavaScript errors
- Kiểm tra Console logs
- Kiểm tra Network requests
- Đo performance metrics
- Kiểm tra accessibility
- Tạo báo cáo HTML chi tiết

## 📈 Báo cáo được tạo

### Basic Checker
- `basic_website_report_YYYYMMDD_HHMMSS.json` - Dữ liệu thô
- `basic_website_report_YYYYMMDD_HHMMSS.html` - Báo cáo web

### Advanced Checker
- `advanced_website_report_YYYYMMDD_HHMMSS.html` - Báo cáo chi tiết
- `screenshots/` - Ảnh chụp màn hình từng trang

### Nội dung báo cáo
- ✅ **Trang hoạt động tốt**: Status 200, load nhanh, không lỗi
- ⚠️ **Trang có cảnh báo**: Load chậm, minor issues
- ❌ **Trang có lỗi**: Status 4xx/5xx, JavaScript errors, timeout

## 🛠️ Troubleshooting

### Lỗi thường gặp

**1. Server không chạy**
```
❌ Client (3001): Offline
```
**Giải pháp:** Khởi động server
```bash
cd client && npm run dev
cd admin && npm run dev  
cd backend && npm run dev
```

**2. Playwright không cài đặt**
```
playwright._impl._api_types.Error: Executable doesn't exist
```
**Giải pháp:**
```bash
playwright install chromium
```

**3. Permission denied**
```
PermissionError: [Errno 13] Permission denied
```
**Giải pháp:** Chạy với quyền admin hoặc thay đổi thư mục output

### Debug mode
Để xem chi tiết lỗi, chỉnh sửa trong script:
```python
DEBUG = True  # Thay vì False
```

## 📞 Hỗ trợ

### Kiểm tra log
- Console output hiển thị tiến trình real-time
- Báo cáo HTML chứa thông tin chi tiết
- Screenshots giúp debug UI issues

### Tùy chỉnh
- Thêm/bớt URL trong `CLIENT_URLS` và `ADMIN_URLS`
- Thay đổi timeout trong `REQUEST_TIMEOUT`
- Tùy chỉnh screenshot resolution

## 🔄 Tự động hóa

### Chạy định kỳ
Tạo batch file để chạy tự động:
```batch
@echo off
cd "c:\Users\AB\Documents\New folder\.g\kiem tra"
python advanced_website_checker.py
pause
```

### Tích hợp CI/CD
Có thể tích hợp vào pipeline để kiểm tra tự động sau mỗi lần deploy.

---

**Tác giả:** AI Assistant  
**Phiên bản:** 1.0  
**Cập nhật:** 2024