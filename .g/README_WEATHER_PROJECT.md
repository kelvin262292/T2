# 🌤️ Dự Án Thu Thập Thời Tiết và Tạo Landing Page

## 📋 Tổng Quan Dự Án

Dự án này được tạo ra để:
1. Thu thập thông tin dự báo thời tiết từ 10 trang web khác nhau
2. Sử dụng mô hình DeepSeek AI để tự động duyệt web và thu thập dữ liệu
3. Tạo một landing page đẹp mắt với màu sắc tự nhiên và hiệu ứng động phản ánh thời tiết ngày mai

## 🛠️ Công Nghệ Sử Dụng

- **AI Model**: DeepSeek Chat (thông qua API)
- **Web Automation**: Browser-Use (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Data Format**: JSON
- **Environment**: Windows PowerShell

## 📁 Cấu Trúc Dự Án

```
browser-use-main/
├── .env                           # Cấu hình API keys
├── weather_collector.py           # Script thu thập thời tiết chính (sử dụng DeepSeek)
├── simple_weather_collector.py    # Phiên bản đơn giản hóa
├── simple_deepseek_test.py        # Test API DeepSeek
├── weather_results/
│   ├── mock_weather_data.json     # Dữ liệu thời tiết mẫu
│   └── weather_data.json          # Dữ liệu thực tế (nếu có)
├── docs/
│   └── weather-landing.html       # Landing page thời tiết
└── README_WEATHER_PROJECT.md      # Tài liệu này
```

## ⚙️ Cài Đặt và Cấu Hình

### 1. Cài Đặt Dependencies

```powershell
# Cài đặt browser-use
pip install browser-use

# Cài đặt langchain-deepseek
pip install langchain-deepseek

# Cài đặt playwright
playwright install chromium --with-deps --no-shell

# Cài đặt các thư viện khác
pip install python-dotenv pydantic
```

### 2. Cấu Hình API Key

Trong file `.env`, đảm bảo có:
```
DEEPSEEK_API_KEY=sk-9c77041bd04a45bf9e34be7ddfee45e8
```

### 3. Test DeepSeek API

```powershell
python simple_deepseek_test.py
```

Kết quả mong đợi:
```
✅ DeepSeek API Key đã được tải: sk-9c77041...
✅ Model DeepSeek đã được khởi tạo thành công
✅ Phản hồi từ DeepSeek: [Phản hồi về thời tiết]
✅ DeepSeek API hoạt động tốt!
```

## 🚀 Cách Sử Dụng

### 1. Thu Thập Dữ Liệu Thời Tiết

#### Phiên bản đầy đủ (10 trang web):
```powershell
python weather_collector.py
```

#### Phiên bản đơn giản (3 trang web):
```powershell
python simple_weather_collector.py
```

### 2. Xem Landing Page

Mở file trong trình duyệt:
```
file:///c:/Users/AB/Downloads/browser-use-main/browser-use-main/docs/weather-landing.html
```

Hoặc sử dụng live server để xem với URL localhost.

## 📊 Dữ Liệu Thu Thập

### Các Trang Web Mục Tiêu:

1. **TimeAndDate.com** - Dự báo chi tiết cho Việt Nam
2. **AccuWeather** - Dự báo quốc tế uy tín
3. **Weather.com** - The Weather Channel
4. **Met Office UK** - Cơ quan khí tượng Anh
5. **Weather Underground** - Dữ liệu từ cộng đồng
6. **WorldWeatherOnline** - API thời tiết toàn cầu
7. **WeatherBase** - Dữ liệu lịch sử và dự báo
8. **Yr.no** - Dịch vụ thời tiết Na Uy
9. **NCHMF Vietnam** - Trung tâm Khí tượng VN
10. **Weather and Climate** - Dự báo 10 ngày

### Thông Tin Thu Thập:

- 🌡️ **Nhiệt độ**: Cao nhất và thấp nhất
- ☀️ **Tình trạng thời tiết**: Nắng/Mưa/Mây/Bão
- 💧 **Độ ẩm**: Phần trăm độ ẩm không khí
- 🌬️ **Tốc độ gió**: Km/h và hướng gió
- 🌧️ **Khả năng mưa**: Phần trăm xác suất
- 📝 **Mô tả chi tiết**: Thông tin bổ sung

## 🎨 Tính Năng Landing Page

### Thiết Kế:
- **Màu sắc tự nhiên**: Xanh da trời, trắng mây, vàng nắng
- **Gradient background**: Mô phỏng bầu trời
- **Typography**: Font hiện đại, dễ đọc

### Hiệu Ứng Động:
- ☁️ **Mây di chuyển**: Animation CSS cho mây trôi
- ☀️ **Mặt trời tỏa sáng**: Hiệu ứng glow và scale
- 🎯 **Hover effects**: Thẻ thông tin nổi lên khi hover
- 📱 **Responsive**: Tương thích mobile và desktop
- ⚡ **Loading animation**: Fade-in từng phần tử

### Tương Tác:
- 🖱️ **Click mặt trời**: Hiệu ứng tỏa sáng đặc biệt
- 📜 **Parallax scrolling**: Mây di chuyển theo scroll
- 🎨 **Smooth transitions**: Chuyển đổi mượt mà

## 🔧 Xử Lý Sự Cố

### Lỗi Thường Gặp:

1. **Timeout khi truy cập trang web**:
   ```
   Error: Page.goto: Timeout 30000ms exceeded
   ```
   **Giải pháp**: Sử dụng dữ liệu mock hoặc tăng timeout

2. **API Key không hợp lệ**:
   ```
   ValueError: DEEPSEEK_API_KEY is not set
   ```
   **Giải pháp**: Kiểm tra file .env và API key

3. **Browser không khởi động được**:
   ```
   Error launching browser
   ```
   **Giải pháp**: Cài đặt lại playwright
   ```powershell
   playwright install chromium --force
   ```

### Debug Mode:

Để bật logging chi tiết, thêm vào script:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📈 Kết Quả Mong Đợi

### Thu Thập Dữ Liệu:
- ✅ 5/10 trang web thu thập thành công
- ⏱️ Thời gian trung bình: 2-3 phút/trang
- 📊 Độ chính xác: 80-90% thông tin chính

### Landing Page:
- 🎨 Thiết kế đẹp mắt, chuyên nghiệp
- ⚡ Tải nhanh, mượt mà
- 📱 Responsive trên mọi thiết bị
- 🌈 Hiệu ứng phản ánh thời tiết thực tế

## 🔮 Phát Triển Tương Lai

### Cải Tiến Có Thể:
1. **Thêm nhiều nguồn dữ liệu**: API thời tiết trực tiếp
2. **Cập nhật real-time**: WebSocket cho dữ liệu trực tiếp
3. **Dự báo nhiều ngày**: Mở rộng từ 1 ngày lên 7 ngày
4. **Nhiều địa điểm**: Không chỉ Hà Nội
5. **Mobile app**: Phát triển ứng dụng di động
6. **AI insights**: Phân tích xu hướng thời tiết

### Tối Ưu Hóa:
- 🚀 **Performance**: Caching, lazy loading
- 🔒 **Security**: Rate limiting, input validation
- 📊 **Analytics**: Tracking user behavior
- 🌐 **SEO**: Meta tags, structured data

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra file `.env` và API keys
2. Đảm bảo đã cài đặt đầy đủ dependencies
3. Chạy test script trước khi chạy script chính
4. Sử dụng dữ liệu mock nếu không thể thu thập thực tế

## 📝 Ghi Chú Quan Trọng

- ⚠️ **Rate Limiting**: Một số trang web có giới hạn truy cập
- 🔄 **Retry Logic**: Script tự động thử lại khi thất bại
- 💾 **Data Backup**: Luôn lưu dữ liệu vào file JSON
- 🕐 **Timing**: Nghỉ giữa các lần thu thập để tránh bị chặn

---

**Tạo bởi**: Browser-Use + DeepSeek AI  
**Ngày tạo**: 04/06/2025  
**Phiên bản**: 1.0  
**Môi trường**: Windows PowerShell