#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script kiểm tra website trên localhost:3000
Tự động duyệt qua tất cả các trang và ghi lại lỗi
Tác giả: AI Assistant
Ngày tạo: 2025
"""

import asyncio
import os
import sys
import json
import time
from datetime import datetime
from urllib.parse import urljoin, urlparse
from typing import Set, List, Dict, Any
import subprocess
import threading
import signal

# Thêm đường dẫn để import browser_use
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from playwright.async_api import async_playwright, Page, Browser, BrowserContext
except ImportError:
    print("❌ Lỗi: Playwright chưa được cài đặt")
    print("💡 Chạy lệnh: pip install playwright && playwright install chromium")
    sys.exit(1)

class WebsiteCrawler:
    """Class để crawl và kiểm tra website"""
    
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url
        self.visited_urls: Set[str] = set()
        self.error_pages: List[Dict[str, Any]] = []
        self.successful_pages: List[Dict[str, Any]] = []
        self.all_links: Set[str] = set()
        self.browser: Browser = None
        self.context: BrowserContext = None
        self.page: Page = None
        self.start_time = datetime.now()
        
    async def start_browser(self):
        """Khởi động browser"""
        print("🚀 Khởi động Playwright browser...")
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=False,  # Hiển thị browser để dễ theo dõi
            args=['--disable-web-security', '--disable-features=VizDisplayCompositor']
        )
        self.context = await self.browser.new_context(
            viewport={'width': 1280, 'height': 720},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        self.page = await self.context.new_page()
        
        # Thiết lập timeout
        self.page.set_default_timeout(30000)  # 30 giây
        
        print("✅ Browser đã được khởi động thành công")
    
    async def close_browser(self):
        """Đóng browser"""
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()
        print("🔒 Browser đã được đóng")
    
    async def check_page(self, url: str) -> Dict[str, Any]:
        """Kiểm tra một trang web"""
        result = {
            'url': url,
            'status': 'unknown',
            'error': None,
            'response_time': 0,
            'title': '',
            'links_found': [],
            'timestamp': datetime.now().isoformat()
        }
        
        try:
            print(f"🔍 Đang kiểm tra: {url}")
            start_time = time.time()
            
            # Điều hướng đến trang
            response = await self.page.goto(url, wait_until='domcontentloaded')
            
            # Tính thời gian phản hồi
            result['response_time'] = round((time.time() - start_time) * 1000, 2)  # ms
            
            if response:
                result['status'] = response.status
                
                # Lấy title của trang
                try:
                    result['title'] = await self.page.title()
                except:
                    result['title'] = 'Không thể lấy title'
                
                # Tìm tất cả các link trên trang
                try:
                    links = await self.page.evaluate("""
                        () => {
                            const links = Array.from(document.querySelectorAll('a[href]'));
                            return links.map(link => link.href).filter(href => href);
                        }
                    """)
                    
                    # Lọc các link thuộc cùng domain
                    internal_links = []
                    for link in links:
                        parsed = urlparse(link)
                        if parsed.netloc == urlparse(self.base_url).netloc or not parsed.netloc:
                            full_url = urljoin(self.base_url, link)
                            internal_links.append(full_url)
                            self.all_links.add(full_url)
                    
                    result['links_found'] = internal_links
                    
                except Exception as e:
                    result['error'] = f"Lỗi khi tìm links: {str(e)}"
                
                # Kiểm tra console errors
                try:
                    console_errors = await self.page.evaluate("""
                        () => {
                            return window.console_errors || [];
                        }
                    """)
                    if console_errors:
                        result['console_errors'] = console_errors
                except:
                    pass
                
                if response.status >= 400:
                    result['error'] = f"HTTP Error {response.status}"
                    print(f"❌ Lỗi HTTP {response.status}: {url}")
                else:
                    print(f"✅ Thành công ({response.status}): {url}")
            else:
                result['error'] = "Không nhận được response"
                result['status'] = 'no_response'
                print(f"❌ Không có response: {url}")
                
        except Exception as e:
            result['error'] = str(e)
            result['status'] = 'error'
            print(f"❌ Lỗi khi truy cập {url}: {str(e)}")
        
        return result
    
    async def crawl_website(self):
        """Crawl toàn bộ website"""
        print(f"🕷️ Bắt đầu crawl website: {self.base_url}")
        print("=" * 60)
        
        # Bắt đầu từ trang chủ
        to_visit = {self.base_url}
        
        while to_visit:
            current_url = to_visit.pop()
            
            if current_url in self.visited_urls:
                continue
                
            self.visited_urls.add(current_url)
            
            # Kiểm tra trang
            result = await self.check_page(current_url)
            
            # Phân loại kết quả
            if result['error'] or (result['status'] != 'unknown' and result['status'] >= 400):
                self.error_pages.append(result)
            else:
                self.successful_pages.append(result)
            
            # Thêm các link mới vào danh sách cần visit
            if 'links_found' in result:
                for link in result['links_found']:
                    if link not in self.visited_urls:
                        to_visit.add(link)
            
            # Nghỉ một chút giữa các request
            await asyncio.sleep(1)
        
        print("\n" + "=" * 60)
        print(f"🏁 Hoàn thành crawl website")
        print(f"📊 Tổng số trang đã kiểm tra: {len(self.visited_urls)}")
        print(f"✅ Trang thành công: {len(self.successful_pages)}")
        print(f"❌ Trang có lỗi: {len(self.error_pages)}")
    
    def generate_report(self) -> Dict[str, Any]:
        """Tạo báo cáo chi tiết"""
        end_time = datetime.now()
        duration = (end_time - self.start_time).total_seconds()
        
        report = {
            'summary': {
                'base_url': self.base_url,
                'start_time': self.start_time.isoformat(),
                'end_time': end_time.isoformat(),
                'duration_seconds': round(duration, 2),
                'total_pages_checked': len(self.visited_urls),
                'successful_pages': len(self.successful_pages),
                'error_pages': len(self.error_pages),
                'success_rate': round((len(self.successful_pages) / len(self.visited_urls)) * 100, 2) if self.visited_urls else 0
            },
            'successful_pages': self.successful_pages,
            'error_pages': self.error_pages,
            'all_links_found': list(self.all_links)
        }
        
        return report
    
    def save_report(self, report: Dict[str, Any], filename: str = None):
        """Lưu báo cáo vào file"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"website_test_report_{timestamp}.json"
        
        # Tạo thư mục test nếu chưa có
        test_dir = "test"
        os.makedirs(test_dir, exist_ok=True)
        
        filepath = os.path.join(test_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print(f"📄 Báo cáo đã được lưu: {filepath}")
        return filepath
    
    def print_summary(self, report: Dict[str, Any]):
        """In tóm tắt báo cáo"""
        summary = report['summary']
        
        print("\n" + "=" * 60)
        print("📋 TÓM TẮT BÁO CÁO KIỂM TRA WEBSITE")
        print("=" * 60)
        print(f"🌐 Website: {summary['base_url']}")
        print(f"⏰ Thời gian bắt đầu: {summary['start_time']}")
        print(f"⏰ Thời gian kết thúc: {summary['end_time']}")
        print(f"⏱️ Thời gian thực hiện: {summary['duration_seconds']} giây")
        print(f"📊 Tổng số trang: {summary['total_pages_checked']}")
        print(f"✅ Trang thành công: {summary['successful_pages']}")
        print(f"❌ Trang có lỗi: {summary['error_pages']}")
        print(f"📈 Tỷ lệ thành công: {summary['success_rate']}%")
        
        if report['error_pages']:
            print("\n❌ DANH SÁCH TRANG CÓ LỖI:")
            print("-" * 40)
            for error_page in report['error_pages']:
                print(f"🔗 URL: {error_page['url']}")
                print(f"   Status: {error_page['status']}")
                print(f"   Lỗi: {error_page['error']}")
                print(f"   Thời gian: {error_page['timestamp']}")
                print()
        else:
            print("\n🎉 KHÔNG CÓ TRANG NÀO BỊ LỖI!")

def start_gradio_server():
    """Khởi động Gradio server trên port 3000"""
    try:
        print("🚀 Đang khởi động Gradio server trên port 3000...")
        
        # Chạy gradio demo với port 3000
        gradio_script = os.path.join(os.path.dirname(__file__), "examples", "ui", "gradio_demo.py")
        
        if os.path.exists(gradio_script):
            # Sửa đổi file gradio để chạy trên port 3000
            cmd = [sys.executable, gradio_script]
            process = subprocess.Popen(cmd, cwd=os.path.dirname(__file__))
            return process
        else:
            print(f"❌ Không tìm thấy file: {gradio_script}")
            return None
            
    except Exception as e:
        print(f"❌ Lỗi khi khởi động server: {e}")
        return None

def create_simple_server():
    """Tạo một HTTP server đơn giản trên port 3000"""
    import http.server
    import socketserver
    from threading import Thread
    
    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory="static", **kwargs)
    
    def run_server():
        try:
            with socketserver.TCPServer(("", 3000), CustomHandler) as httpd:
                print("✅ HTTP Server đang chạy trên http://localhost:3000")
                httpd.serve_forever()
        except Exception as e:
            print(f"❌ Lỗi server: {e}")
    
    # Tạo thư mục static với một số file demo
    os.makedirs("static", exist_ok=True)
    
    # Tạo file index.html
    index_content = """
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Website - Trang Chủ</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .nav { margin-bottom: 20px; }
        .nav a { margin-right: 15px; text-decoration: none; color: blue; }
        .nav a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="nav">
        <a href="/">Trang Chủ</a>
        <a href="/about.html">Giới Thiệu</a>
        <a href="/contact.html">Liên Hệ</a>
        <a href="/products.html">Sản Phẩm</a>
        <a href="/error-page.html">Trang Lỗi</a>
        <a href="/nonexistent.html">Link Không Tồn Tại</a>
    </div>
    
    <h1>Chào mừng đến với Test Website</h1>
    <p>Đây là trang chủ của website test để kiểm tra crawler.</p>
    
    <h2>Các tính năng:</h2>
    <ul>
        <li>Trang chủ (hiện tại)</li>
        <li><a href="/about.html">Trang giới thiệu</a></li>
        <li><a href="/contact.html">Trang liên hệ</a></li>
        <li><a href="/products.html">Trang sản phẩm</a></li>
        <li><a href="/error-page.html">Trang có lỗi JavaScript</a></li>
        <li><a href="/nonexistent.html">Link không tồn tại (404)</a></li>
    </ul>
    
    <p>Website này được tạo để test crawler và kiểm tra lỗi.</p>
</body>
</html>
    """
    
    with open("static/index.html", "w", encoding="utf-8") as f:
        f.write(index_content)
    
    # Tạo các trang khác
    pages = {
        "about.html": """
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Giới Thiệu - Test Website</title>
</head>
<body>
    <nav><a href="/">Trang Chủ</a> | <a href="/contact.html">Liên Hệ</a></nav>
    <h1>Giới Thiệu</h1>
    <p>Đây là trang giới thiệu của website test.</p>
</body>
</html>
        """,
        
        "contact.html": """
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Liên Hệ - Test Website</title>
</head>
<body>
    <nav><a href="/">Trang Chủ</a> | <a href="/about.html">Giới Thiệu</a></nav>
    <h1>Liên Hệ</h1>
    <p>Email: test@example.com</p>
    <p>Điện thoại: 0123456789</p>
</body>
</html>
        """,
        
        "products.html": """
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Sản Phẩm - Test Website</title>
</head>
<body>
    <nav><a href="/">Trang Chủ</a> | <a href="/about.html">Giới Thiệu</a></nav>
    <h1>Sản Phẩm</h1>
    <ul>
        <li>Sản phẩm A</li>
        <li>Sản phẩm B</li>
        <li>Sản phẩm C</li>
    </ul>
</body>
</html>
        """,
        
        "error-page.html": """
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Trang Có Lỗi - Test Website</title>
</head>
<body>
    <nav><a href="/">Trang Chủ</a></nav>
    <h1>Trang Có Lỗi JavaScript</h1>
    <p>Trang này có lỗi JavaScript để test việc phát hiện lỗi.</p>
    
    <script>
        // Lỗi JavaScript cố ý
        console.error("Đây là lỗi JavaScript test");
        undefinedFunction(); // Gây lỗi
    </script>
</body>
</html>
        """
    }
    
    for filename, content in pages.items():
        with open(f"static/{filename}", "w", encoding="utf-8") as f:
            f.write(content)
    
    # Chạy server trong thread riêng
    server_thread = Thread(target=run_server, daemon=True)
    server_thread.start()
    
    return server_thread

async def main():
    """Hàm chính"""
    print("🔧 KIỂM TRA WEBSITE LOCALHOST:3000")
    print("=" * 60)
    
    # Tạo và khởi động server
    print("📡 Đang khởi động server...")
    server_thread = create_simple_server()
    
    # Đợi server khởi động
    await asyncio.sleep(3)
    
    # Khởi tạo crawler
    crawler = WebsiteCrawler("http://localhost:3000")
    
    try:
        # Khởi động browser
        await crawler.start_browser()
        
        # Crawl website
        await crawler.crawl_website()
        
        # Tạo báo cáo
        report = crawler.generate_report()
        
        # Lưu báo cáo
        report_file = crawler.save_report(report)
        
        # In tóm tắt
        crawler.print_summary(report)
        
        print(f"\n📁 Báo cáo chi tiết đã được lưu tại: {report_file}")
        
    except KeyboardInterrupt:
        print("\n⏹️ Người dùng đã dừng chương trình")
    except Exception as e:
        print(f"\n❌ Lỗi không mong muốn: {e}")
    finally:
        # Đóng browser
        await crawler.close_browser()
        print("\n🏁 Hoàn thành kiểm tra website!")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n⏹️ Chương trình đã được dừng")
    except Exception as e:
        print(f"\n❌ Lỗi: {e}")