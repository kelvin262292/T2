#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Advanced Website Checker - Kiểm tra website với Playwright
Kiểm tra chi tiết hơn bao gồm JavaScript rendering, screenshot, và performance
"""

import asyncio
import json
import os
import time
from datetime import datetime
from typing import Dict, List
from playwright.async_api import async_playwright, Page, Browser
import aiohttp

class AdvancedWebsiteChecker:
    def __init__(self):
        self.client_base_url = "http://localhost:3001"
        self.admin_base_url = "http://localhost:3002"
        self.backend_base_url = "http://localhost:3003"
        self.report_dir = r"c:\Users\AB\Documents\New folder\.g\kiem tra"
        self.screenshot_dir = os.path.join(self.report_dir, "screenshots")
        self.results = []
        
        # Tạo thư mục nếu chưa có
        os.makedirs(self.report_dir, exist_ok=True)
        os.makedirs(self.screenshot_dir, exist_ok=True)
        
        # Danh sách các route cần kiểm tra cho Client
        self.client_routes = [
            {
                "path": "/",
                "name": "Trang chủ",
                "expected_elements": ["header", "main", "footer"],
                "check_3d": True
            },
            {
                "path": "/products",
                "name": "Danh sách sản phẩm",
                "expected_elements": ["h1", ".product-grid", ".filter"],
                "check_3d": False
            },
            {
                "path": "/cart",
                "name": "Giỏ hàng",
                "expected_elements": ["h1", ".cart-container"],
                "check_3d": False
            },
            {
                "path": "/checkout",
                "name": "Thanh toán",
                "expected_elements": ["form", "input"],
                "check_3d": False
            },
            {
                "path": "/search",
                "name": "Tìm kiếm",
                "expected_elements": ["input[type='search']", ".search-results"],
                "check_3d": False
            },
            {
                "path": "/categories",
                "name": "Danh mục",
                "expected_elements": [".category-grid", "h1"],
                "check_3d": False
            },
            {
                "path": "/about",
                "name": "Giới thiệu",
                "expected_elements": ["h1", ".about-content"],
                "check_3d": False
            },
            {
                "path": "/contact",
                "name": "Liên hệ",
                "expected_elements": ["form", "input[type='email']"],
                "check_3d": False
            },
            {
                "path": "/auth/signin",
                "name": "Đăng nhập",
                "expected_elements": ["form", "input[type='email']", "input[type='password']"],
                "check_3d": False
            },
            {
                "path": "/auth/signup",
                "name": "Đăng ký",
                "expected_elements": ["form", "input[type='email']"],
                "check_3d": False
            }
        ]
        
        # Danh sách các route cần kiểm tra cho Admin
        self.admin_routes = [
            {
                "path": "/",
                "name": "Dashboard Admin",
                "expected_elements": ["nav", "main", ".dashboard"],
                "check_3d": False
            },
            {
                "path": "/settings",
                "name": "Cài đặt Admin",
                "expected_elements": ["form", ".settings"],
                "check_3d": False
            }
        ]
    
    async def check_server_health(self, url: str) -> Dict:
        """Kiểm tra sức khỏe server"""
        try:
            async with aiohttp.ClientSession() as session:
                start_time = time.time()
                async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as response:
                    end_time = time.time()
                    return {
                        "online": True,
                        "status_code": response.status,
                        "response_time": round((end_time - start_time) * 1000, 2),
                        "headers": dict(response.headers)
                    }
        except Exception as e:
            return {
                "online": False,
                "error": str(e),
                "response_time": None
            }
    
    async def check_page_detailed(self, page: Page, base_url: str, route_info: Dict, page_type: str) -> Dict:
        """Kiểm tra chi tiết một trang với Playwright"""
        full_url = f"{base_url}{route_info['path']}"
        result = {
            "url": full_url,
            "route": route_info['path'],
            "name": route_info['name'],
            "page_type": page_type,
            "timestamp": datetime.now().isoformat(),
            "status": "unknown",
            "load_time": None,
            "screenshot_path": None,
            "console_errors": [],
            "network_errors": [],
            "missing_elements": [],
            "page_title": None,
            "meta_description": None,
            "performance": {},
            "accessibility_issues": [],
            "javascript_errors": []
        }
        
        try:
            # Bắt console errors
            console_messages = []
            page.on("console", lambda msg: console_messages.append({
                "type": msg.type,
                "text": msg.text,
                "location": msg.location
            }))
            
            # Bắt network errors
            network_errors = []
            page.on("requestfailed", lambda request: network_errors.append({
                "url": request.url,
                "method": request.method,
                "failure": request.failure
            }))
            
            # Bắt JavaScript errors
            js_errors = []
            page.on("pageerror", lambda error: js_errors.append(str(error)))
            
            # Điều hướng đến trang
            start_time = time.time()
            response = await page.goto(full_url, wait_until="networkidle", timeout=30000)
            end_time = time.time()
            
            result["load_time"] = round((end_time - start_time) * 1000, 2)
            result["status_code"] = response.status if response else None
            
            # Đợi một chút để JavaScript chạy
            await page.wait_for_timeout(2000)
            
            # Lấy thông tin cơ bản
            result["page_title"] = await page.title()
            
            # Lấy meta description
            try:
                meta_desc = await page.get_attribute('meta[name="description"]', 'content')
                result["meta_description"] = meta_desc
            except:
                pass
            
            # Kiểm tra các element mong đợi
            missing_elements = []
            for selector in route_info.get('expected_elements', []):
                try:
                    element = await page.query_selector(selector)
                    if not element:
                        missing_elements.append(selector)
                except:
                    missing_elements.append(selector)
            
            result["missing_elements"] = missing_elements
            
            # Chụp screenshot
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            screenshot_filename = f"{page_type}_{route_info['path'].replace('/', '_')}_{timestamp}.png"
            screenshot_path = os.path.join(self.screenshot_dir, screenshot_filename)
            
            await page.screenshot(path=screenshot_path, full_page=True)
            result["screenshot_path"] = screenshot_path
            
            # Kiểm tra performance
            try:
                performance_metrics = await page.evaluate("""
                    () => {
                        const navigation = performance.getEntriesByType('navigation')[0];
                        return {
                            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                            firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
                            firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
                        };
                    }
                """)
                result["performance"] = performance_metrics
            except:
                pass
            
            # Kiểm tra 3D elements nếu cần
            if route_info.get('check_3d', False):
                try:
                    canvas_elements = await page.query_selector_all('canvas')
                    result["has_3d_canvas"] = len(canvas_elements) > 0
                    result["canvas_count"] = len(canvas_elements)
                except:
                    result["has_3d_canvas"] = False
                    result["canvas_count"] = 0
            
            # Kiểm tra accessibility cơ bản
            try:
                accessibility_issues = await page.evaluate("""
                    () => {
                        const issues = [];
                        
                        // Kiểm tra alt text cho images
                        const images = document.querySelectorAll('img');
                        images.forEach((img, index) => {
                            if (!img.alt) {
                                issues.push(`Image ${index + 1} missing alt text`);
                            }
                        });
                        
                        // Kiểm tra heading hierarchy
                        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                        if (headings.length === 0) {
                            issues.push('No headings found');
                        }
                        
                        // Kiểm tra form labels
                        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
                        inputs.forEach((input, index) => {
                            if (!input.labels || input.labels.length === 0) {
                                issues.push(`Input ${index + 1} missing label`);
                            }
                        });
                        
                        return issues;
                    }
                """)
                result["accessibility_issues"] = accessibility_issues
            except:
                pass
            
            # Lưu console errors
            result["console_errors"] = [msg for msg in console_messages if msg["type"] == "error"]
            result["network_errors"] = network_errors
            result["javascript_errors"] = js_errors
            
            # Xác định trạng thái tổng thể
            if response and response.status == 200:
                if len(missing_elements) == 0 and len(js_errors) == 0:
                    result["status"] = "excellent"
                elif len(missing_elements) <= 1 and len(js_errors) == 0:
                    result["status"] = "good"
                elif len(js_errors) == 0:
                    result["status"] = "fair"
                else:
                    result["status"] = "poor"
            elif response and response.status == 404:
                result["status"] = "not_found"
            else:
                result["status"] = "error"
                
        except Exception as e:
            result["status"] = "error"
            result["error"] = str(e)
        
        return result
    
    async def run_checks(self):
        """Chạy tất cả các kiểm tra"""
        print("🚀 Bắt đầu kiểm tra website nâng cao với Playwright...")
        print("=" * 60)
        
        # Kiểm tra server health trước
        print("📡 Kiểm tra sức khỏe server...")
        client_health = await self.check_server_health(self.client_base_url)
        admin_health = await self.check_server_health(self.admin_base_url)
        backend_health = await self.check_server_health(self.backend_base_url)
        
        print(f"   Client (3001): {'✅ Online' if client_health['online'] else '❌ Offline'} ({client_health.get('response_time', 'N/A')}ms)")
        print(f"   Admin (3002):  {'✅ Online' if admin_health['online'] else '❌ Offline'} ({admin_health.get('response_time', 'N/A')}ms)")
        print(f"   Backend (3003): {'✅ Online' if backend_health['online'] else '❌ Offline'} ({backend_health.get('response_time', 'N/A')}ms)")
        print()
        
        async with async_playwright() as p:
            # Khởi động browser
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            )
            page = await context.new_page()
            
            try:
                # Kiểm tra Client pages
                if client_health['online']:
                    print("🌐 Kiểm tra Client Web Application...")
                    for i, route_info in enumerate(self.client_routes, 1):
                        print(f"   [{i:2d}/{len(self.client_routes)}] {route_info['name']}...", end=" ")
                        result = await self.check_page_detailed(page, self.client_base_url, route_info, "client")
                        self.results.append(result)
                        
                        # In kết quả
                        status_icon = {
                            "excellent": "🟢",
                            "good": "🟡", 
                            "fair": "🟠",
                            "poor": "🔴",
                            "not_found": "🔍",
                            "error": "💥"
                        }.get(result["status"], "❓")
                        
                        print(f"{status_icon} {result['status']} ({result['load_time'] or 'N/A'}ms)")
                        
                        # Hiển thị vấn đề nếu có
                        if result.get('missing_elements'):
                            print(f"      ⚠️ Missing: {', '.join(result['missing_elements'])}")
                        if result.get('javascript_errors'):
                            print(f"      🐛 JS Errors: {len(result['javascript_errors'])}")
                        
                        await asyncio.sleep(1)  # Tránh spam
                else:
                    print("❌ Client server offline - bỏ qua kiểm tra")
                
                print()
                
                # Kiểm tra Admin pages
                if admin_health['online']:
                    print("🔧 Kiểm tra Admin Dashboard...")
                    for i, route_info in enumerate(self.admin_routes, 1):
                        print(f"   [{i:2d}/{len(self.admin_routes)}] {route_info['name']}...", end=" ")
                        result = await self.check_page_detailed(page, self.admin_base_url, route_info, "admin")
                        self.results.append(result)
                        
                        # In kết quả
                        status_icon = {
                            "excellent": "🟢",
                            "good": "🟡", 
                            "fair": "🟠",
                            "poor": "🔴",
                            "not_found": "🔍",
                            "error": "💥"
                        }.get(result["status"], "❓")
                        
                        print(f"{status_icon} {result['status']} ({result['load_time'] or 'N/A'}ms)")
                        
                        # Hiển thị vấn đề nếu có
                        if result.get('missing_elements'):
                            print(f"      ⚠️ Missing: {', '.join(result['missing_elements'])}")
                        if result.get('javascript_errors'):
                            print(f"      🐛 JS Errors: {len(result['javascript_errors'])}")
                        
                        await asyncio.sleep(1)  # Tránh spam
                else:
                    print("❌ Admin server offline - bỏ qua kiểm tra")
                
            finally:
                await browser.close()
        
        print()
        print("✅ Hoàn thành kiểm tra nâng cao!")
    
    def generate_advanced_report(self):
        """Tạo báo cáo nâng cao"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Báo cáo JSON chi tiết
        json_report_path = os.path.join(self.report_dir, f"advanced_website_report_{timestamp}.json")
        with open(json_report_path, 'w', encoding='utf-8') as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "summary": self.get_advanced_summary(),
                "results": self.results
            }, f, ensure_ascii=False, indent=2)
        
        # Báo cáo HTML nâng cao
        html_report_path = os.path.join(self.report_dir, f"advanced_website_report_{timestamp}.html")
        self.generate_advanced_html_report(html_report_path)
        
        print(f"📊 Báo cáo nâng cao đã được tạo:")
        print(f"   JSON: {json_report_path}")
        print(f"   HTML: {html_report_path}")
        print(f"   Screenshots: {self.screenshot_dir}")
    
    def get_advanced_summary(self) -> Dict:
        """Tạo tóm tắt nâng cao"""
        total = len(self.results)
        excellent = len([r for r in self.results if r["status"] == "excellent"])
        good = len([r for r in self.results if r["status"] == "good"])
        fair = len([r for r in self.results if r["status"] == "fair"])
        poor = len([r for r in self.results if r["status"] == "poor"])
        errors = len([r for r in self.results if r["status"] == "error"])
        
        # Tính toán performance metrics
        load_times = [r["load_time"] for r in self.results if r["load_time"]]
        avg_load_time = sum(load_times) / len(load_times) if load_times else 0
        
        # Đếm các vấn đề
        total_js_errors = sum(len(r.get("javascript_errors", [])) for r in self.results)
        total_missing_elements = sum(len(r.get("missing_elements", [])) for r in self.results)
        total_accessibility_issues = sum(len(r.get("accessibility_issues", [])) for r in self.results)
        
        return {
            "total_pages": total,
            "excellent_pages": excellent,
            "good_pages": good,
            "fair_pages": fair,
            "poor_pages": poor,
            "error_pages": errors,
            "health_score": round(((excellent * 100 + good * 80 + fair * 60 + poor * 40) / total) if total > 0 else 0, 2),
            "avg_load_time": round(avg_load_time, 2),
            "total_js_errors": total_js_errors,
            "total_missing_elements": total_missing_elements,
            "total_accessibility_issues": total_accessibility_issues
        }
    
    def generate_advanced_html_report(self, file_path: str):
        """Tạo báo cáo HTML nâng cao"""
        summary = self.get_advanced_summary()
        
        html_content = f"""
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Báo cáo kiểm tra Website Nâng cao - {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}</title>
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }}
        .container {{ max-width: 1400px; margin: 0 auto; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); overflow: hidden; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }}
        .header h1 {{ margin: 0; font-size: 2.5em; font-weight: 300; }}
        .header p {{ margin: 10px 0 0 0; opacity: 0.9; }}
        .content {{ padding: 30px; }}
        .summary {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }}
        .summary-card {{ background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }}
        .summary-card h3 {{ margin: 0 0 15px 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }}
        .summary-card .value {{ font-size: 32px; font-weight: bold; margin-bottom: 5px; }}
        .summary-card .unit {{ font-size: 14px; opacity: 0.8; }}
        .health-score {{ background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important; }}
        .page-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; }}
        .page-card {{ background: #f8f9fa; border-radius: 12px; padding: 25px; box-shadow: 0 3px 10px rgba(0,0,0,0.1); transition: transform 0.2s; }}
        .page-card:hover {{ transform: translateY(-2px); }}
        .page-header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }}
        .page-title {{ font-size: 18px; font-weight: bold; color: #333; }}
        .status-badge {{ padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }}
        .status-excellent {{ background: #d4edda; color: #155724; }}
        .status-good {{ background: #fff3cd; color: #856404; }}
        .status-fair {{ background: #f8d7da; color: #721c24; }}
        .status-poor {{ background: #f5c6cb; color: #721c24; }}
        .status-error {{ background: #f8d7da; color: #721c24; }}
        .metrics {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-bottom: 20px; }}
        .metric {{ text-align: center; padding: 15px; background: white; border-radius: 8px; }}
        .metric-value {{ font-size: 20px; font-weight: bold; color: #333; }}
        .metric-label {{ font-size: 12px; color: #666; margin-top: 5px; }}
        .issues {{ margin-top: 20px; }}
        .issue-list {{ background: #fff; border-radius: 8px; padding: 15px; margin-top: 10px; }}
        .issue-item {{ padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; }}
        .issue-item:last-child {{ border-bottom: none; }}
        .screenshot {{ text-align: center; margin-top: 20px; }}
        .screenshot img {{ max-width: 100%; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.2); }}
        .no-issues {{ color: #28a745; font-style: italic; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Báo cáo kiểm tra Website Nâng cao</h1>
            <p>Thời gian kiểm tra: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}</p>
        </div>
        
        <div class="content">
            <div class="summary">
                <div class="summary-card">
                    <h3>Tổng số trang</h3>
                    <div class="value">{summary['total_pages']}</div>
                </div>
                <div class="summary-card health-score">
                    <h3>Điểm sức khỏe</h3>
                    <div class="value">{summary['health_score']}</div>
                    <div class="unit">/ 100</div>
                </div>
                <div class="summary-card">
                    <h3>Trang xuất sắc</h3>
                    <div class="value">{summary['excellent_pages']}</div>
                </div>
                <div class="summary-card">
                    <h3>Thời gian tải TB</h3>
                    <div class="value">{summary['avg_load_time']}</div>
                    <div class="unit">ms</div>
                </div>
                <div class="summary-card">
                    <h3>Lỗi JavaScript</h3>
                    <div class="value">{summary['total_js_errors']}</div>
                </div>
                <div class="summary-card">
                    <h3>Vấn đề Accessibility</h3>
                    <div class="value">{summary['total_accessibility_issues']}</div>
                </div>
            </div>
            
            <div class="page-grid">
"""
        
        for result in self.results:
            status_class = f"status-{result['status']}"
            
            html_content += f"""
                <div class="page-card">
                    <div class="page-header">
                        <div class="page-title">{result['name']}</div>
                        <div class="status-badge {status_class}">{result['status']}</div>
                    </div>
                    
                    <div class="metrics">
                        <div class="metric">
                            <div class="metric-value">{result['load_time'] or 'N/A'}</div>
                            <div class="metric-label">Load Time (ms)</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">{len(result.get('missing_elements', []))}</div>
                            <div class="metric-label">Missing Elements</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">{len(result.get('javascript_errors', []))}</div>
                            <div class="metric-label">JS Errors</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">{len(result.get('accessibility_issues', []))}</div>
                            <div class="metric-label">A11y Issues</div>
                        </div>
                    </div>
                    
                    <div class="issues">
            """
            
            # Missing Elements
            if result.get('missing_elements'):
                html_content += """
                        <h4>⚠️ Missing Elements:</h4>
                        <div class="issue-list">
                """
                for element in result['missing_elements']:
                    html_content += f'<div class="issue-item">{element}</div>'
                html_content += "</div>"
            
            # JavaScript Errors
            if result.get('javascript_errors'):
                html_content += """
                        <h4>🐛 JavaScript Errors:</h4>
                        <div class="issue-list">
                """
                for error in result['javascript_errors'][:5]:  # Chỉ hiển thị 5 lỗi đầu
                    html_content += f'<div class="issue-item">{error}</div>'
                if len(result['javascript_errors']) > 5:
                    html_content += f'<div class="issue-item">... và {len(result["javascript_errors"]) - 5} lỗi khác</div>'
                html_content += "</div>"
            
            # Accessibility Issues
            if result.get('accessibility_issues'):
                html_content += """
                        <h4>♿ Accessibility Issues:</h4>
                        <div class="issue-list">
                """
                for issue in result['accessibility_issues']:
                    html_content += f'<div class="issue-item">{issue}</div>'
                html_content += "</div>"
            
            # Nếu không có vấn đề gì
            if not any([result.get('missing_elements'), result.get('javascript_errors'), result.get('accessibility_issues')]):
                html_content += '<div class="no-issues">✅ Không phát hiện vấn đề nào!</div>'
            
            html_content += """
                    </div>
                </div>
            """
        
        html_content += """
            </div>
        </div>
    </div>
</body>
</html>
        """
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
    
    def print_advanced_summary(self):
        """In tóm tắt nâng cao"""
        summary = self.get_advanced_summary()
        
        print("\n" + "=" * 60)
        print("📊 TÓM TẮT KẾT QUẢ NÂNG CAO")
        print("=" * 60)
        print(f"📄 Tổng số trang: {summary['total_pages']}")
        print(f"🟢 Xuất sắc: {summary['excellent_pages']}")
        print(f"🟡 Tốt: {summary['good_pages']}")
        print(f"🟠 Khá: {summary['fair_pages']}")
        print(f"🔴 Kém: {summary['poor_pages']}")
        print(f"💥 Lỗi: {summary['error_pages']}")
        print(f"💯 Điểm sức khỏe: {summary['health_score']}/100")
        print(f"⏱️  Thời gian tải TB: {summary['avg_load_time']}ms")
        print(f"🐛 Tổng lỗi JS: {summary['total_js_errors']}")
        print(f"♿ Vấn đề Accessibility: {summary['total_accessibility_issues']}")
        
        # Hiển thị các trang có vấn đề
        problem_pages = [r for r in self.results if r["status"] in ["poor", "error"]]
        if problem_pages:
            print("\n🚨 CÁC TRANG CÓ VẤN ĐỀ NGHIÊM TRỌNG:")
            for page in problem_pages:
                print(f"   🔴 {page['name']} - {page['status']}")
                if page.get('javascript_errors'):
                    print(f"      🐛 {len(page['javascript_errors'])} JS errors")
                if page.get('missing_elements'):
                    print(f"      ⚠️ Missing: {', '.join(page['missing_elements'][:3])}")
        
        print("=" * 60)

async def main():
    """Hàm chính"""
    print("🔍 Advanced Website Checker - Kiểm tra website nâng cao với Playwright")
    print("Tác giả: AI Assistant")
    print("Thời gian:", datetime.now().strftime('%d/%m/%Y %H:%M:%S'))
    print()
    
    checker = AdvancedWebsiteChecker()
    
    try:
        # Chạy kiểm tra
        await checker.run_checks()
        
        # In tóm tắt
        checker.print_advanced_summary()
        
        # Tạo báo cáo
        checker.generate_advanced_report()
        
    except KeyboardInterrupt:
        print("\n⚠️ Đã dừng kiểm tra theo yêu cầu người dùng")
    except Exception as e:
        print(f"\n💥 Lỗi không mong muốn: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())