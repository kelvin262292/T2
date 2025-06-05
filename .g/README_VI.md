# 🤖 Browser-Use - Hướng dẫn Khởi động Dự án

## 📋 Tổng quan
Browser-Use là thư viện Python cho phép AI agents điều khiển trình duyệt web một cách tự động. Dự án này đã được cấu hình sẵn để sử dụng với DeepSeek API.

## 🚀 Khởi động Nhanh

### 1. Kiểm tra Môi trường
- ✅ Python 3.13.3 đã được cài đặt
- ✅ Browser-Use package đã được cài đặt
- ✅ Playwright Chromium đã được cài đặt
- ✅ Memory features đã được cài đặt
- ✅ DeepSeek API key đã được cấu hình

### 2. Cách Chạy Dự án

#### Phương pháp 1: Sử dụng Script Khởi động
```bash
py start_project.py
```

#### Phương pháp 2: Chạy Test DeepSeek
```bash
py test_deepseek.py
```

#### Phương pháp 3: Sử dụng CLI Interactive
```bash
browser-use
```

### 3. Cấu trúc Dự án
```
browser-use-main/
├── .env                    # API keys (đã cấu hình)
├── start_project.py        # Script khởi động chính
├── test_deepseek.py       # Script test DeepSeek API
├── SETUP_DEEPSEEK.md      # Hướng dẫn chi tiết DeepSeek
├── browser_use/           # Thư viện chính
├── examples/              # Các ví dụ sử dụng
│   ├── models/           # Ví dụ với các LLM khác nhau
│   ├── use-cases/        # Các use case thực tế
│   └── features/         # Tính năng nâng cao
└── docs/                 # Tài liệu
```

## 🎯 Các Task Có Sẵn

### 1. Tìm kiếm Google
- Truy cập google.com
- Thực hiện tìm kiếm
- Phân tích kết quả

### 2. So sánh Giá Sản phẩm
- Truy cập trang thương mại điện tử
- Tìm kiếm sản phẩm
- So sánh giá cả

### 3. Đọc Tin tức
- Truy cập trang tin tức
- Đọc các bài viết mới nhất
- Tóm tắt nội dung

### 4. Task Tùy chỉnh
- Định nghĩa task riêng
- Thực hiện automation phức tạp

## ⚙️ Cấu hình Nâng cao

### Thay đổi Model LLM
```python
# Trong file start_project.py
llm = ChatDeepSeek(
    model="deepseek-chat",      # Có thể thay đổi model
    temperature=0.1,            # Điều chỉnh creativity
    max_tokens=4000            # Số token tối đa
)
```

### Cấu hình Agent
```python
agent = Agent(
    task=task,
    llm=llm,
    use_vision=False,          # DeepSeek chưa hỗ trợ vision
    enable_memory=True,        # Bật tính năng memory
    max_actions_per_step=10,   # Số action tối đa mỗi bước
    browser_config={
        'headless': False,     # Hiển thị trình duyệt
        'viewport': {'width': 1920, 'height': 1080}
    }
)
```

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **Lỗi API Key**
   ```
   ❌ Không tìm thấy DEEPSEEK_API_KEY
   ```
   **Giải pháp:** Kiểm tra file `.env` có chứa API key đúng

2. **Lỗi Memory Features**
   ```
   ⚠️ Missing required packages for memory
   ```
   **Giải pháp:** Đã được khắc phục bằng cách cài `browser-use[memory]`

3. **Lỗi Playwright**
   ```
   ❌ Browser not found
   ```
   **Giải pháp:** Chromium đã được cài đặt sẵn

## 📚 Tài liệu Tham khảo

- [Tài liệu chính thức](https://docs.browser-use.com)
- [Hướng dẫn DeepSeek](./SETUP_DEEPSEEK.md)
- [Ví dụ sử dụng](./examples/)
- [Discord Community](https://link.browser-use.com/discord)

## 🎉 Bắt đầu Ngay

1. Mở terminal trong thư mục dự án
2. Chạy: `py start_project.py`
3. Chọn task từ menu
4. Xem AI agent làm việc!

---

**Lưu ý:** Dự án đã được cấu hình hoàn chỉnh và sẵn sàng sử dụng. Tất cả dependencies đã được cài đặt và API key đã được thiết lập.

**Hỗ trợ:** Nếu gặp vấn đề, hãy kiểm tra file `SETUP_DEEPSEEK.md` để biết hướng dẫn chi tiết.