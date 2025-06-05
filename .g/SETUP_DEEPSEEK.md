# Hướng dẫn Setup và Sử dụng DeepSeek với Browser-Use

## 📋 Tổng quan

Hướng dẫn này sẽ giúp bạn thiết lập và sử dụng DeepSeek API với thư viện Browser-Use để tự động hóa các tác vụ trên trình duyệt web.

## 🔧 Yêu cầu hệ thống

- **Python**: >= 3.11, < 4.0
- **Hệ điều hành**: Windows (đã được tối ưu cho PowerShell)
- **RAM**: Tối thiểu 4GB (khuyến nghị 8GB+)
- **Kết nối Internet**: Ổn định để gọi API

## 📦 Cài đặt Dependencies

### 1. Cài đặt Browser-Use

```powershell
# Cài đặt browser-use cơ bản
pip install browser-use

# Hoặc cài đặt với memory support (khuyến nghị)
pip install "browser-use[memory]"

# Hoặc cài đặt full với tất cả tính năng
pip install "browser-use[all]"
```

### 2. Cài đặt DeepSeek LangChain Integration

```powershell
pip install langchain-deepseek
```

### 3. Cài đặt Playwright Browser

```powershell
# Cài đặt Chromium với dependencies
playwright install chromium --with-deps --no-shell

# Kiểm tra cài đặt
playwright --version
```

### 4. Cài đặt các dependencies bổ sung

```powershell
pip install python-dotenv asyncio
```

## 🔑 Cấu hình API Key

### 1. File .env đã được tạo

File `.env` đã được tạo tự động với DeepSeek API key của bạn:

```env
DEEPSEEK_API_KEY=sk-9c77041bd04a45bf9e34be7ddfee45e8
```

### 2. Kiểm tra API Key

```powershell
# Kiểm tra xem API key đã được load chưa
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('API Key:', os.getenv('DEEPSEEK_API_KEY')[:10] + '...' if os.getenv('DEEPSEEK_API_KEY') else 'Not found')"
```

## 🚀 Chạy Test Script

### 1. Chạy script test cơ bản

```powershell
# Chạy test script
python test_deepseek.py
```

### 2. Kết quả mong đợi

```
🧪 Bắt đầu test DeepSeek API với Browser-use...
==================================================
✅ DeepSeek API Key đã được tải: sk-9c77041...
✅ DeepSeek LLM đã được khởi tạo thành công
🎯 Task: Truy cập vào google.com và tìm kiếm 'browser automation with AI'
✅ Browser-use Agent đã được khởi tạo thành công
🚀 Bắt đầu chạy agent...
✅ Agent đã hoàn thành task thành công!
🎉 Test DeepSeek + Browser-use hoàn thành thành công!
==================================================
🏁 Test hoàn thành!
```

## 📝 Ví dụ sử dụng cơ bản

### 1. Script đơn giản

```python
import asyncio
from dotenv import load_dotenv
load_dotenv()

from langchain_deepseek import ChatDeepSeek
from browser_use import Agent

async def main():
    # Khởi tạo DeepSeek LLM
    llm = ChatDeepSeek(
        model="deepseek-chat",
        temperature=0.1,
        max_tokens=4000,
    )
    
    # Tạo agent với task
    agent = Agent(
        task="Truy cập Facebook và kiểm tra tin tức mới nhất",
        llm=llm,
    )
    
    # Chạy agent
    await agent.run(max_steps=10)

if __name__ == "__main__":
    asyncio.run(main())
```

### 2. Script với cấu hình nâng cao

```python
import asyncio
from dotenv import load_dotenv
load_dotenv()

from langchain_deepseek import ChatDeepSeek
from browser_use import Agent, BrowserSession

async def main():
    # Cấu hình DeepSeek với các tham số tùy chỉnh
    llm = ChatDeepSeek(
        model="deepseek-chat",
        temperature=0.2,  # Tăng creativity
        max_tokens=8000,  # Tăng độ dài response
        top_p=0.9,
    )
    
    # Cấu hình browser session
    browser_session = BrowserSession(
        headless=False,  # Hiển thị browser
        browser_type="chromium",
    )
    
    # Tạo agent với cấu hình nâng cao
    agent = Agent(
        task="Tìm kiếm thông tin về AI automation tools và lưu kết quả vào file",
        llm=llm,
        browser_session=browser_session,
        max_failures=3,  # Cho phép 3 lần thử lại
    )
    
    # Chạy agent với callback
    result = await agent.run(
        max_steps=15,
        step_callback=lambda step: print(f"Bước {step.step_number}: {step.action}")
    )
    
    print(f"Kết quả: {result}")

if __name__ == "__main__":
    asyncio.run(main())
```

## 🔧 Cấu hình nâng cao

### 1. Logging

```python
import logging

# Cấu hình logging chi tiết
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Hoặc sử dụng environment variable
# BROWSER_USE_LOGGING_LEVEL=debug
```

### 2. Browser Settings

```python
from browser_use import BrowserSession, BrowserProfile

# Tạo browser profile tùy chỉnh
profile = BrowserProfile(
    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    viewport_size=(1920, 1080),
    locale="vi-VN",
)

browser_session = BrowserSession(
    profile=profile,
    headless=False,
    slow_mo=1000,  # Chậm lại 1 giây giữa các action
)
```

### 3. Memory và Context

```python
from browser_use.agent.memory import MemoryConfig

# Cấu hình memory
memory_config = MemoryConfig(
    max_history_length=50,
    enable_summarization=True,
)

agent = Agent(
    task="Task phức tạp cần ghi nhớ context",
    llm=llm,
    memory_config=memory_config,
)
```

## 🐛 Troubleshooting

### 1. Lỗi API Key

```
❌ Lỗi: DEEPSEEK_API_KEY không được tìm thấy
```

**Giải pháp:**
- Kiểm tra file `.env` có tồn tại không
- Đảm bảo API key đúng format
- Restart terminal sau khi thay đổi `.env`

### 2. Lỗi Playwright

```
❌ Lỗi: Browser executable not found
```

**Giải pháp:**
```powershell
# Cài đặt lại Playwright
playwright install chromium --with-deps --no-shell

# Hoặc cài đặt tất cả browsers
playwright install
```

### 3. Lỗi Import

```
❌ ModuleNotFoundError: No module named 'langchain_deepseek'
```

**Giải pháp:**
```powershell
pip install langchain-deepseek
# Hoặc
pip install --upgrade langchain-deepseek
```

### 4. Lỗi Memory

```
❌ Lỗi: sentence-transformers not found
```

**Giải pháp:**
```powershell
pip install "browser-use[memory]"
# Hoặc
pip install sentence-transformers faiss-cpu
```

## 📚 Tài liệu tham khảo

- [Browser-Use Documentation](https://docs.browser-use.com)
- [DeepSeek API Documentation](https://platform.deepseek.com/api-docs)
- [LangChain DeepSeek Integration](https://python.langchain.com/docs/integrations/chat/deepseek)
- [Playwright Documentation](https://playwright.dev/python/)

## 🎯 Use Cases phổ biến

1. **Web Scraping thông minh**: Thu thập dữ liệu từ các website phức tạp
2. **Automated Testing**: Test tự động các web application
3. **Social Media Management**: Tự động post, comment, tương tác
4. **E-commerce**: Tự động mua sắm, so sánh giá
5. **Research**: Tìm kiếm và tổng hợp thông tin từ nhiều nguồn
6. **Form Filling**: Điền form tự động với dữ liệu từ AI

## 🔒 Bảo mật

- **Không commit** file `.env` vào Git
- **Sử dụng** environment variables cho production
- **Giới hạn** quyền truy cập của agent
- **Monitor** các hoạt động của agent
- **Backup** dữ liệu quan trọng trước khi chạy automation

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra log chi tiết
2. Tham khảo troubleshooting guide
3. Tạo issue trên GitHub repository
4. Tham gia Discord community của Browser-Use