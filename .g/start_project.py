#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script khởi động dự án Browser-Use với DeepSeek API
Tác giả: AI Assistant
Ngày tạo: 2025
"""

import asyncio
import os
from dotenv import load_dotenv
from langchain_deepseek import ChatDeepSeek
from browser_use import Agent

def main():
    """Hàm chính để khởi động dự án Browser-Use"""
    print("🚀 Khởi động dự án Browser-Use với DeepSeek API...")
    print("=" * 60)
    
    # Tải biến môi trường
    load_dotenv()
    
    # Kiểm tra API key
    api_key = os.getenv('DEEPSEEK_API_KEY')
    if not api_key:
        print("❌ Lỗi: Không tìm thấy DEEPSEEK_API_KEY trong file .env")
        print("💡 Hướng dẫn: Thêm DEEPSEEK_API_KEY=your_api_key vào file .env")
        return
    
    print(f"✅ DeepSeek API Key đã được tải: {api_key[:10]}...")
    
    # Khởi tạo LLM
    try:
        llm = ChatDeepSeek(
            model="deepseek-chat",
            temperature=0.1,
            max_tokens=4000
        )
        print("✅ DeepSeek LLM đã được khởi tạo thành công")
    except Exception as e:
        print(f"❌ Lỗi khởi tạo DeepSeek LLM: {e}")
        return
    
    # Menu lựa chọn task
    print("\n📋 Chọn task để thực hiện:")
    print("1. Tìm kiếm trên Google")
    print("2. Kiểm tra giá sản phẩm")
    print("3. Đọc tin tức")
    print("4. Task tùy chỉnh")
    
    choice = input("\nNhập lựa chọn (1-4): ").strip()
    
    # Định nghĩa task dựa trên lựa chọn
    tasks = {
        "1": "Truy cập vào google.com và tìm kiếm 'browser automation with AI'",
        "2": "Truy cập vào amazon.com và tìm kiếm laptop, so sánh giá 3 sản phẩm đầu tiên",
        "3": "Truy cập vào vnexpress.net và đọc 3 tin tức mới nhất",
        "4": input("Nhập task tùy chỉnh: ").strip()
    }
    
    task = tasks.get(choice, tasks["1"])
    print(f"\n🎯 Task được chọn: {task}")
    
    # Chạy agent
    async def run_agent():
        try:
            agent = Agent(
                task=task,
                llm=llm,
                use_vision=False,  # DeepSeek chưa hỗ trợ vision
                enable_memory=True,
                max_actions_per_step=10
            )
            print("\n🤖 Bắt đầu chạy Browser-Use Agent...")
            print("=" * 60)
            
            result = await agent.run()
            
            print("\n" + "=" * 60)
            print("✅ Agent đã hoàn thành task!")
            print(f"📊 Kết quả: {result}")
            
        except Exception as e:
            print(f"\n❌ Lỗi khi chạy agent: {e}")
            print("💡 Kiểm tra lại cấu hình và thử lại")
    
    # Chạy async function
    try:
        asyncio.run(run_agent())
    except KeyboardInterrupt:
        print("\n⏹️ Người dùng đã dừng chương trình")
    except Exception as e:
        print(f"\n❌ Lỗi không mong muốn: {e}")
    
    print("\n🏁 Kết thúc chương trình. Cảm ơn bạn đã sử dụng Browser-Use!")

if __name__ == "__main__":
    main()