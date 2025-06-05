#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Website Checker - Tự động kiểm tra tất cả các trang Web và Admin
Tạo báo cáo chi tiết về tình trạng hoạt động của từng trang
"""

import requests
import time
import json
import os
from datetime import datetime
from urllib.parse import urljoin
from typing import Dict, List, Tuple
import sys

class WebsiteChecker:
    def __init__(self):
        self.client_base_url = "http://localhost:3001"
        self.admin_base_url = "http://localhost:3002"
        self.backend_base_url = "http://localhost:3003"
        self.report_dir = r"c:\Users\AB\Documents\New folder\.g\kiem tra"
        self.results = []
        
        # Danh sách các route cần kiểm tra cho Client
        self.client_routes = [
            "/",                           # Trang chủ
            "/products",                   # Danh sách sản phẩm
            "/products/1",                 # Chi tiết sản phẩm (giả định ID=1)
            "/cart",                       # Giỏ hàng
            "/checkout",                   # Thanh toán
            "/checkout/success",           # Thành công
            "/search",                     # Tìm kiếm
            "/categories",                 # Danh mục
            "/about",                      # Giới thiệu
            "/contact",                    # Liên hệ
            "/auth/signin",                # Đăng nhập
            "/auth/signup",                # Đăng ký
            "/auth/forgot-password",       # Quên mật khẩu
            "/account",                    # Tài khoản
            "/nonexistent-page"            # Trang 404 test
        ]
        
        # Danh sách các route cần kiểm tra cho Admin
        self.admin_routes = [
            "/",                           # Dashboard
            "/settings"                    # Cài đặt
        ]
        
        # Tạo thư mục báo cáo nếu chưa có
        os.makedirs(self.report_dir, exist_ok=True)
    
    def check_server_status(self, url: str) -> bool:
        """Kiểm tra xem server có đang chạy không"""
        try:
            response = requests.get(url, timeout=5)
            return True
        except requests.exceptions.RequestException:
            return False
    
    def check_page(self, base_url: str, route: str, page_type: str) -> Dict:
        """Kiểm tra một trang cụ thể"""
        full_url = urljoin(base_url, route)
        result = {
            "url": full_url,
            "route": route,
            "page_type": page_type,
            "timestamp": datetime.now().isoformat(),
            "status": "unknown",
            "status_code": None,
            "response_time": None,
            "error": None,
            "content_length": None,
            "content_type": None
        }
        
        try:
            start_time = time.time()
            response = requests.get(full_url, timeout=10)
            end_time = time.time()
            
            result["status_code"] = response.status_code
            result["response_time"] = round((end_time - start_time) * 1000, 2)  # ms
            result["content_length"] = len(response.content)
            result["content_type"] = response.headers.get('content-type', 'unknown')
            
            if response.status_code == 200:
                result["status"] = "success"
            elif response.status_code == 404:
                result["status"] = "not_found"
            elif response.status_code >= 500:
                result["status"] = "server_error"
            elif response.status_code >= 400:
                result["status"] = "client_error"
            else:
                result["status"] = "other"
                
        except requests.exceptions.Timeout:
            result["status"] = "timeout"
            result["error"] = "Request timeout after 10 seconds"
        except requests.exceptions.ConnectionError:
            result["status"] = "connection_error"
            result["error"] = "Cannot connect to server"
        except requests.exceptions.RequestException as e:
            result["status"] = "error"
            result["error"] = str(e)
        
        return result
    
    def check_all_pages(self):
        """Kiểm tra tất cả các trang"""
        print("🚀 Bắt đầu kiểm tra website...")
        print("=" * 50)
        
        # Kiểm tra server trước
        print("📡 Kiểm tra trạng thái server...")
        client_online = self.check_server_status(self.client_base_url)
        admin_online = self.check_server_status(self.admin_base_url)
        backend_online = self.check_server_status(self.backend_base_url)
        
        print(f"   Client (3001): {'✅ Online' if client_online else '❌ Offline'}")
        print(f"   Admin (3002):  {'✅ Online' if admin_online else '❌ Offline'}")
        print(f"   Backend (3003): {'✅ Online' if backend_online else '❌ Offline'}")
        print()
        
        # Kiểm tra Client pages
        if client_online:
            print("🌐 Kiểm tra Client Web Application...")
            for i, route in enumerate(self.client_routes, 1):
                print(f"   [{i:2d}/{len(self.client_routes)}] Checking {route}...", end=" ")
                result = self.check_page(self.client_base_url, route, "client")
                self.results.append(result)
                
                # In kết quả ngay lập tức
                status_icon = {
                    "success": "✅",
                    "not_found": "🔍",
                    "server_error": "❌",
                    "client_error": "⚠️",
                    "timeout": "⏰",
                    "connection_error": "🔌",
                    "error": "💥",
                    "other": "❓"
                }.get(result["status"], "❓")
                
                print(f"{status_icon} {result['status_code'] or 'N/A'} ({result['response_time'] or 'N/A'}ms)")
                time.sleep(0.5)  # Tránh spam server
        else:
            print("❌ Client server offline - bỏ qua kiểm tra")
        
        print()
        
        # Kiểm tra Admin pages
        if admin_online:
            print("🔧 Kiểm tra Admin Dashboard...")
            for i, route in enumerate(self.admin_routes, 1):
                print(f"   [{i:2d}/{len(self.admin_routes)}] Checking {route}...", end=" ")
                result = self.check_page(self.admin_base_url, route, "admin")
                self.results.append(result)
                
                # In kết quả ngay lập tức
                status_icon = {
                    "success": "✅",
                    "not_found": "🔍",
                    "server_error": "❌",
                    "client_error": "⚠️",
                    "timeout": "⏰",
                    "connection_error": "🔌",
                    "error": "💥",
                    "other": "❓"
                }.get(result["status"], "❓")
                
                print(f"{status_icon} {result['status_code'] or 'N/A'} ({result['response_time'] or 'N/A'}ms)")
                time.sleep(0.5)  # Tránh spam server
        else:
            print("❌ Admin server offline - bỏ qua kiểm tra")
        
        print()
        print("✅ Hoàn thành kiểm tra!")
    
    def generate_report(self):
        """Tạo báo cáo chi tiết"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Báo cáo JSON chi tiết
        json_report_path = os.path.join(self.report_dir, f"website_check_report_{timestamp}.json")
        with open(json_report_path, 'w', encoding='utf-8') as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "summary": self.get_summary(),
                "results": self.results
            }, f, ensure_ascii=False, indent=2)
        
        # Báo cáo HTML dễ đọc
        html_report_path = os.path.join(self.report_dir, f"website_check_report_{timestamp}.html")
        self.generate_html_report(html_report_path)
        
        # Báo cáo text đơn giản
        txt_report_path = os.path.join(self.report_dir, f"website_check_report_{timestamp}.txt")
        self.generate_text_report(txt_report_path)
        
        print(f"📊 Báo cáo đã được tạo:")
        print(f"   JSON: {json_report_path}")
        print(f"   HTML: {html_report_path}")
        print(f"   TEXT: {txt_report_path}")
    
    def get_summary(self) -> Dict:
        """Tạo tóm tắt kết quả"""
        total = len(self.results)
        success = len([r for r in self.results if r["status"] == "success"])
        errors = len([r for r in self.results if r["status"] in ["server_error", "error", "timeout", "connection_error"]])
        not_found = len([r for r in self.results if r["status"] == "not_found"])
        
        client_results = [r for r in self.results if r["page_type"] == "client"]
        admin_results = [r for r in self.results if r["page_type"] == "admin"]
        
        return {
            "total_pages": total,
            "successful_pages": success,
            "error_pages": errors,
            "not_found_pages": not_found,
            "success_rate": round((success / total * 100) if total > 0 else 0, 2),
            "client_pages": len(client_results),
            "admin_pages": len(admin_results),
            "avg_response_time": round(sum([r["response_time"] for r in self.results if r["response_time"]]) / len([r for r in self.results if r["response_time"]]) if any(r["response_time"] for r in self.results) else 0, 2)
        }
    
    def generate_html_report(self, file_path: str):
        """Tạo báo cáo HTML"""
        summary = self.get_summary()
        
        html_content = f"""
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Báo cáo kiểm tra Website - {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        h1 {{ color: #333; text-align: center; border-bottom: 3px solid #007bff; padding-bottom: 10px; }}
        .summary {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }}
        .summary-card {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }}
        .summary-card h3 {{ margin: 0 0 10px 0; font-size: 14px; opacity: 0.9; }}
        .summary-card .value {{ font-size: 24px; font-weight: bold; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
        th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }}
        th {{ background-color: #f8f9fa; font-weight: bold; }}
        .status-success {{ color: #28a745; font-weight: bold; }}
        .status-error {{ color: #dc3545; font-weight: bold; }}
        .status-warning {{ color: #ffc107; font-weight: bold; }}
        .status-info {{ color: #17a2b8; font-weight: bold; }}
        .page-type-client {{ background-color: #e3f2fd; }}
        .page-type-admin {{ background-color: #fff3e0; }}
        .response-time {{ font-family: monospace; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Báo cáo kiểm tra Website</h1>
        <p style="text-align: center; color: #666; margin-bottom: 30px;">
            Thời gian kiểm tra: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
        </p>
        
        <div class="summary">
            <div class="summary-card">
                <h3>Tổng số trang</h3>
                <div class="value">{summary['total_pages']}</div>
            </div>
            <div class="summary-card">
                <h3>Thành công</h3>
                <div class="value">{summary['successful_pages']}</div>
            </div>
            <div class="summary-card">
                <h3>Lỗi</h3>
                <div class="value">{summary['error_pages']}</div>
            </div>
            <div class="summary-card">
                <h3>Tỷ lệ thành công</h3>
                <div class="value">{summary['success_rate']}%</div>
            </div>
            <div class="summary-card">
                <h3>Thời gian phản hồi TB</h3>
                <div class="value">{summary['avg_response_time']}ms</div>
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Loại</th>
                    <th>URL</th>
                    <th>Trạng thái</th>
                    <th>Mã HTTP</th>
                    <th>Thời gian (ms)</th>
                    <th>Kích thước</th>
                    <th>Lỗi</th>
                </tr>
            </thead>
            <tbody>
"""
        
        for result in self.results:
            status_class = {
                "success": "status-success",
                "not_found": "status-info",
                "server_error": "status-error",
                "client_error": "status-warning",
                "timeout": "status-error",
                "connection_error": "status-error",
                "error": "status-error"
            }.get(result["status"], "")
            
            page_type_class = f"page-type-{result['page_type']}"
            
            html_content += f"""
                <tr class="{page_type_class}">
                    <td>{result['page_type'].upper()}</td>
                    <td><a href="{result['url']}" target="_blank">{result['route']}</a></td>
                    <td class="{status_class}">{result['status'].replace('_', ' ').title()}</td>
                    <td>{result['status_code'] or 'N/A'}</td>
                    <td class="response-time">{result['response_time'] or 'N/A'}</td>
                    <td>{result['content_length'] or 'N/A'} bytes</td>
                    <td>{result['error'] or ''}</td>
                </tr>
            """
        
        html_content += """
            </tbody>
        </table>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <h3>📝 Ghi chú:</h3>
            <ul>
                <li><strong>Client:</strong> Ứng dụng web chính (localhost:3001)</li>
                <li><strong>Admin:</strong> Dashboard quản trị (localhost:3002)</li>
                <li><strong>Success:</strong> Trang tải thành công (HTTP 200)</li>
                <li><strong>Not Found:</strong> Trang không tồn tại (HTTP 404)</li>
                <li><strong>Error:</strong> Lỗi server hoặc kết nối</li>
            </ul>
        </div>
    </div>
</body>
</html>
        """
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
    
    def generate_text_report(self, file_path: str):
        """Tạo báo cáo text đơn giản"""
        summary = self.get_summary()
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write("=" * 60 + "\n")
            f.write("           BÁO CÁO KIỂM TRA WEBSITE\n")
            f.write("=" * 60 + "\n")
            f.write(f"Thời gian: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n\n")
            
            f.write("TỔNG QUAN:\n")
            f.write("-" * 30 + "\n")
            f.write(f"Tổng số trang kiểm tra: {summary['total_pages']}\n")
            f.write(f"Thành công: {summary['successful_pages']}\n")
            f.write(f"Lỗi: {summary['error_pages']}\n")
            f.write(f"Không tìm thấy: {summary['not_found_pages']}\n")
            f.write(f"Tỷ lệ thành công: {summary['success_rate']}%\n")
            f.write(f"Thời gian phản hồi trung bình: {summary['avg_response_time']}ms\n\n")
            
            f.write("CHI TIẾT TỪNG TRANG:\n")
            f.write("-" * 30 + "\n")
            
            for result in self.results:
                f.write(f"\n[{result['page_type'].upper()}] {result['route']}\n")
                f.write(f"  URL: {result['url']}\n")
                f.write(f"  Trạng thái: {result['status']}\n")
                f.write(f"  Mã HTTP: {result['status_code'] or 'N/A'}\n")
                f.write(f"  Thời gian: {result['response_time'] or 'N/A'}ms\n")
                if result['error']:
                    f.write(f"  Lỗi: {result['error']}\n")
    
    def print_summary(self):
        """In tóm tắt kết quả ra console"""
        summary = self.get_summary()
        
        print("\n" + "=" * 50)
        print("📊 TÓM TẮT KẾT QUẢ")
        print("=" * 50)
        print(f"📄 Tổng số trang: {summary['total_pages']}")
        print(f"✅ Thành công: {summary['successful_pages']}")
        print(f"❌ Lỗi: {summary['error_pages']}")
        print(f"🔍 Không tìm thấy: {summary['not_found_pages']}")
        print(f"📈 Tỷ lệ thành công: {summary['success_rate']}%")
        print(f"⏱️  Thời gian phản hồi TB: {summary['avg_response_time']}ms")
        
        # Hiển thị các trang có lỗi
        error_pages = [r for r in self.results if r["status"] in ["server_error", "error", "timeout", "connection_error"]]
        if error_pages:
            print("\n🚨 CÁC TRANG CÓ LỖI:")
            for page in error_pages:
                print(f"   ❌ {page['route']} - {page['status']} ({page['error'] or 'Unknown error'})")
        
        print("=" * 50)

def main():
    """Hàm chính"""
    print("🔍 Website Checker - Kiểm tra tự động tất cả các trang")
    print("Tác giả: AI Assistant")
    print("Thời gian:", datetime.now().strftime('%d/%m/%Y %H:%M:%S'))
    print()
    
    checker = WebsiteChecker()
    
    try:
        # Kiểm tra tất cả các trang
        checker.check_all_pages()
        
        # In tóm tắt
        checker.print_summary()
        
        # Tạo báo cáo
        checker.generate_report()
        
    except KeyboardInterrupt:
        print("\n⚠️ Đã dừng kiểm tra theo yêu cầu người dùng")
    except Exception as e:
        print(f"\n💥 Lỗi không mong muốn: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()