# Browser-Use Project - Website Testing Tool

## Mô tả dự án

Dự án này là một công cụ tự động kiểm tra website sử dụng Playwright và Python. Công cụ có thể:

- Khởi động server web trên localhost:3000
- Tự động duyệt qua tất cả các trang trong website
- Phát hiện và ghi lại các lỗi
- Tạo báo cáo chi tiết về hoạt động và lỗi
- Lưu kết quả vào thư mục `test`

## Cài đặt

### Yêu cầu hệ thống
- Python 3.7+
- Windows/macOS/Linux

### Cài đặt dependencies

```bash
# Cài đặt Playwright
pip install playwright

# Cài đặt browser cho Playwright
playwright install chromium

# Cài đặt các thư viện khác (nếu cần)
pip install asyncio
```

## Sử dụng

### Chạy công cụ kiểm tra website

```bash
python test_website_crawler.py
```

### Các tính năng chính

#### 1. Khởi động Server Tự động
- Tự động tạo server HTTP đơn giản trên port 3000
- Tạo các trang web mẫu để test:
  - Trang chủ (`/`)
  - Trang giới thiệu (`/about.html`)
  - Trang liên hệ (`/contact.html`)
  - Trang sản phẩm (`/products.html`)
  - Trang có lỗi JavaScript (`/error-page.html`)
  - Link không tồn tại (`/nonexistent.html`) - để test 404

#### 2. Crawler Tự động
- Bắt đầu từ trang chủ
- Tự động tìm và theo dõi tất cả các link nội bộ
- Kiểm tra từng trang một cách có hệ thống
- Ghi lại thời gian phản hồi của mỗi trang

#### 3. Phát hiện Lỗi
- HTTP errors (4xx, 5xx)
- JavaScript errors trong console
- Timeout errors
- Network errors
- Trang không tải được

#### 4. Báo cáo Chi tiết
- Tóm tắt tổng quan
- Danh sách trang thành công
- Danh sách trang có lỗi với chi tiết
- Thống kê thời gian thực hiện
- Tỷ lệ thành công

## Cấu trúc thư mục

```
browser-use-main/
├── test_website_crawler.py     # Script chính
├── README.md                   # File hướng dẫn này
├── static/                     # Thư mục chứa website test
│   ├── index.html             # Trang chủ
│   ├── about.html             # Trang giới thiệu
│   ├── contact.html           # Trang liên hệ
│   ├── products.html          # Trang sản phẩm
│   └── error-page.html        # Trang có lỗi
└── test/                      # Thư mục chứa báo cáo
    └── website_test_report_*.json
```

## Kết quả và Báo cáo

### Báo cáo JSON
Mỗi lần chạy sẽ tạo file báo cáo JSON trong thư mục `test/` với format:
```
website_test_report_YYYYMMDD_HHMMSS.json
```

### Cấu trúc báo cáo
```json
{
  "summary": {
    "base_url": "http://localhost:3000",
    "start_time": "2025-01-XX...",
    "end_time": "2025-01-XX...",
    "duration_seconds": 15.67,
    "total_pages_checked": 6,
    "successful_pages": 5,
    "error_pages": 1,
    "success_rate": 83.33
  },
  "successful_pages": [...],
  "error_pages": [...],
  "all_links_found": [...]
}
```

### Thông tin mỗi trang
- **URL**: Địa chỉ trang
- **Status**: Mã HTTP response
- **Response time**: Thời gian phản hồi (ms)
- **Title**: Tiêu đề trang
- **Links found**: Các link tìm thấy
- **Error**: Mô tả lỗi (nếu có)
- **Timestamp**: Thời gian kiểm tra

## Tùy chỉnh

### Thay đổi URL cơ sở
Sửa trong file `test_website_crawler.py`:
```python
crawler = WebsiteCrawler("http://your-website.com")
```

### Thay đổi timeout
```python
self.page.set_default_timeout(60000)  # 60 giây
```

### Thêm delay giữa các request
```python
await asyncio.sleep(2)  # Nghỉ 2 giây
```

## Xử lý sự cố

### Lỗi "Playwright chưa được cài đặt"
```bash
pip install playwright
playwright install chromium
```

### Lỗi "Port 3000 đã được sử dụng"
- Đóng các ứng dụng đang sử dụng port 3000
- Hoặc thay đổi port trong code

### Browser không hiển thị
Thay đổi `headless=False` thành `headless=True` nếu muốn chạy ẩn

## Tính năng nâng cao

### Chạy với website thật
1. Thay đổi `base_url` trong code
2. Tắt tính năng tạo server tự động
3. Chạy script

### Tích hợp CI/CD
Script có thể được tích hợp vào pipeline CI/CD để kiểm tra website tự động.

### Mở rộng kiểm tra
- Thêm kiểm tra SEO
- Kiểm tra accessibility
- Kiểm tra performance
- Screenshot các trang

## Liên hệ và Hỗ trợ

Nếu gặp vấn đề hoặc cần hỗ trợ, vui lòng:
1. Kiểm tra log chi tiết trong console
2. Xem file báo cáo JSON
3. Kiểm tra kết nối mạng và port

## Phiên bản
- **v1.0**: Phiên bản đầu tiên với đầy đủ tính năng cơ bản
- Hỗ trợ crawling tự động
- Phát hiện lỗi cơ bản
- Báo cáo JSON chi tiết

---

**Lưu ý**: Công cụ này được thiết kế để test và phát triển. Khi sử dụng với website production, hãy cẩn thận về tần suất request để tránh gây quá tải server.
