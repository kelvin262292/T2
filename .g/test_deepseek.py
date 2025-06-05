#!/usr/bin/env python3
"""
Test script để kiểm tra DeepSeek API với browser-use

Yêu cầu:
- Đã cài đặt browser-use: pip install browser-use
- Đã cài đặt playwright: playwright install chromium --with-deps --no-shell
- Đã cài đặt langchain-deepseek: pip install langchain-deepseek
- File .env đã được tạo với DEEPSEEK_API_KEY
"""

import asyncio
import os
import sys
from pathlib import Path

# Thêm thư mục gốc vào Python path
sys.path.append(str(Path(__file__).parent))

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from langchain_deepseek import ChatDeepSeek
from browser_use import Agent


def main():
    """Hàm chính để test DeepSeek với browser-use"""
    
    # Kiểm tra API key
    api_key = os.getenv('DEEPSEEK_API_KEY')
    if not api_key:
        print("❌ Lỗi: DEEPSEEK_API_KEY không được tìm thấy trong file .env")
        print("Vui lòng kiểm tra file .env và đảm bảo DEEPSEEK_API_KEY đã được thiết lập.")
        return
    
    print(f"✅ DeepSeek API Key đã được tải: {api_key[:10]}...")
    
    # Khởi tạo DeepSeek LLM
    try:
        llm = ChatDeepSeek(
            model="deepseek-chat",
            temperature=0.1,
            max_tokens=4000,
        )
        print("✅ DeepSeek LLM đã được khởi tạo thành công")
    except Exception as e:
        print(f"❌ Lỗi khi khởi tạo DeepSeek LLM: {e}")
        return
    
    # Định nghĩa task đơn giản
    task = "Truy cập vào google.com và tìm kiếm 'browser automation with AI'"
    
    print(f"🎯 Task: {task}")
    
    # Khởi tạo Agent
    try:
        agent = Agent(
            task=task,
            llm=llm,
        )
        print("✅ Browser-use Agent đã được khởi tạo thành công")
    except Exception as e:
        print(f"❌ Lỗi khi khởi tạo Agent: {e}")
        return
    
    # Chạy agent
    async def run_agent():
        try:
            print("🚀 Bắt đầu chạy agent...")
            result = await agent.run(max_steps=5)
            print("✅ Agent đã hoàn thành task thành công!")
            return result
        except Exception as e:
            print(f"❌ Lỗi khi chạy agent: {e}")
            return None
    
    # Chạy async function
    try:
        result = asyncio.run(run_agent())
        if result:
            print("🎉 Test DeepSeek + Browser-use hoàn thành thành công!")
        else:
            print("⚠️ Test hoàn thành nhưng có lỗi xảy ra")
    except Exception as e:
        print(f"❌ Lỗi khi chạy async function: {e}")


if __name__ == "__main__":
    print("🧪 Bắt đầu test DeepSeek API với Browser-use...")
    print("=" * 50)
    main()
    print("=" * 50)
    print("🏁 Test hoàn thành!")