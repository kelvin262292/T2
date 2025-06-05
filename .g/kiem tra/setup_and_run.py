#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Setup and Run Script - Cài đặt và chạy các công cụ kiểm tra website
Script này sẽ tự động cài đặt dependencies và chạy kiểm tra
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(command, description):
    """Chạy command và hiển thị kết quả"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} thành công!")
            return True
        else:
            print(f"❌ {description} thất bại:")
            print(result.stderr)
            return False
    except Exception as e:
        print(f"💥 Lỗi khi {description.lower()}: {e}")
        return False

def check_python_version():
    """Kiểm tra phiên bản Python"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Cần Python 3.8 trở lên!")
        print(f"Phiên bản hiện tại: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} - OK")
    return True

def install_requirements():
    """Cài đặt các thư viện cần thiết"""
    requirements_file = Path(__file__).parent / "requirements.txt"
    
    if not requirements_file.exists():
        print("❌ Không tìm thấy file requirements.txt")
        return False
    
    # Cài đặt pip packages
    success = run_command(
        f"pip install -r {requirements_file}",
        "Cài đặt Python packages"
    )
    
    if not success:
        return False
    
    # Cài đặt Playwright browsers
    success = run_command(
        "playwright install chromium",
        "Cài đặt Playwright Chromium browser"
    )
    
    return success

def check_servers():
    """Kiểm tra xem các server có đang chạy không"""
    import requests
    
    servers = {
        "Client (3001)": "http://localhost:3001",
        "Admin (3002)": "http://localhost:3002",
        "Backend (3003)": "http://localhost:3003"
    }
    
    print("\n📡 Kiểm tra trạng thái server...")
    all_online = True
    
    for name, url in servers.items():
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"✅ {name}: Online")
            else:
                print(f"⚠️ {name}: Phản hồi {response.status_code}")
                all_online = False
        except requests.exceptions.RequestException:
            print(f"❌ {name}: Offline")
            all_online = False
    
    if not all_online:
        print("\n⚠️ Một số server không hoạt động. Vui lòng khởi động chúng trước khi chạy kiểm tra.")
        print("Hướng dẫn khởi động:")
        print("   Client:  cd client && npm run dev")
        print("   Admin:   cd admin && npm run dev")
        print("   Backend: cd backend && npm run dev")
    
    return all_online

def run_basic_checker():
    """Chạy basic website checker"""
    script_path = Path(__file__).parent / "website_checker.py"
    if not script_path.exists():
        print("❌ Không tìm thấy website_checker.py")
        return False
    
    print("\n🚀 Chạy Basic Website Checker...")
    return run_command(f"python {script_path}", "Basic Website Check")

def run_advanced_checker():
    """Chạy advanced website checker"""
    script_path = Path(__file__).parent / "advanced_website_checker.py"
    if not script_path.exists():
        print("❌ Không tìm thấy advanced_website_checker.py")
        return False
    
    print("\n🚀 Chạy Advanced Website Checker...")
    return run_command(f"python {script_path}", "Advanced Website Check")

def show_menu():
    """Hiển thị menu lựa chọn"""
    print("\n" + "=" * 50)
    print("🔍 WEBSITE CHECKER - MENU CHÍNH")
    print("=" * 50)
    print("1. Cài đặt dependencies")
    print("2. Kiểm tra trạng thái server")
    print("3. Chạy Basic Website Checker")
    print("4. Chạy Advanced Website Checker (Playwright)")
    print("5. Chạy cả hai checker")
    print("6. Xem báo cáo đã tạo")
    print("0. Thoát")
    print("=" * 50)
    
    while True:
        try:
            choice = input("\nChọn tùy chọn (0-6): ").strip()
            if choice in ['0', '1', '2', '3', '4', '5', '6']:
                return choice
            else:
                print("❌ Vui lòng chọn số từ 0-6")
        except KeyboardInterrupt:
            print("\n\n👋 Tạm biệt!")
            sys.exit(0)

def show_reports():
    """Hiển thị danh sách báo cáo đã tạo"""
    report_dir = Path(__file__).parent
    
    print("\n📊 DANH SÁCH BÁO CÁO:")
    print("-" * 40)
    
    # Tìm các file báo cáo
    report_files = []
    for pattern in ['*report*.html', '*report*.json', '*report*.txt']:
        report_files.extend(report_dir.glob(pattern))
    
    if not report_files:
        print("❌ Chưa có báo cáo nào được tạo")
        return
    
    # Sắp xếp theo thời gian tạo
    report_files.sort(key=lambda x: x.stat().st_mtime, reverse=True)
    
    for i, file_path in enumerate(report_files, 1):
        file_size = file_path.stat().st_size
        file_time = file_path.stat().st_mtime
        from datetime import datetime
        time_str = datetime.fromtimestamp(file_time).strftime('%d/%m/%Y %H:%M:%S')
        
        print(f"{i:2d}. {file_path.name}")
        print(f"    📅 {time_str} | 📦 {file_size:,} bytes")
        print(f"    📁 {file_path}")
        print()
    
    # Kiểm tra thư mục screenshots
    screenshot_dir = report_dir / "screenshots"
    if screenshot_dir.exists():
        screenshots = list(screenshot_dir.glob("*.png"))
        if screenshots:
            print(f"📸 Screenshots: {len(screenshots)} files trong {screenshot_dir}")

def main():
    """Hàm chính"""
    print("🔍 Website Checker Setup & Runner")
    print("Tác giả: AI Assistant")
    print("Mô tả: Công cụ tự động kiểm tra website và tạo báo cáo")
    
    # Kiểm tra Python version
    if not check_python_version():
        sys.exit(1)
    
    while True:
        choice = show_menu()
        
        if choice == '0':
            print("\n👋 Tạm biệt!")
            break
        
        elif choice == '1':
            print("\n🔧 CÀI ĐẶT DEPENDENCIES")
            print("-" * 30)
            if install_requirements():
                print("\n✅ Cài đặt hoàn tất! Bạn có thể chạy các checker ngay bây giờ.")
            else:
                print("\n❌ Cài đặt thất bại. Vui lòng kiểm tra lại.")
        
        elif choice == '2':
            print("\n📡 KIỂM TRA SERVER")
            print("-" * 30)
            check_servers()
        
        elif choice == '3':
            print("\n🔍 BASIC WEBSITE CHECKER")
            print("-" * 30)
            if check_servers():
                run_basic_checker()
            else:
                print("❌ Không thể chạy checker khi server offline")
        
        elif choice == '4':
            print("\n🚀 ADVANCED WEBSITE CHECKER")
            print("-" * 30)
            if check_servers():
                run_advanced_checker()
            else:
                print("❌ Không thể chạy checker khi server offline")
        
        elif choice == '5':
            print("\n🔥 CHẠY CẢ HAI CHECKER")
            print("-" * 30)
            if check_servers():
                print("\n1️⃣ Chạy Basic Checker trước...")
                run_basic_checker()
                print("\n2️⃣ Chạy Advanced Checker...")
                run_advanced_checker()
                print("\n✅ Hoàn thành cả hai checker!")
            else:
                print("❌ Không thể chạy checker khi server offline")
        
        elif choice == '6':
            show_reports()
        
        input("\n📱 Nhấn Enter để tiếp tục...")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Tạm biệt!")
    except Exception as e:
        print(f"\n💥 Lỗi không mong muốn: {e}")
        import traceback
        traceback.print_exc()