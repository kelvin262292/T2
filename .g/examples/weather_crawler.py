# weather_crawler.py
"""
Script tự động truy cập 10 trang web thời tiết, lấy thông tin thời tiết và phát hiện thông tin đặc biệt.
"""

from browser_use import Agent
from langchain_openai import ChatOpenAI
import asyncio
import os
from urllib.parse import urlparse

# Danh sách 10 trang web thời tiết phổ biến
WEATHER_URLS = [
    "https://weather.com",
    "https://accuweather.com",
    "https://www.bbc.com/weather",
    "https://www.weather.gov",
    "https://www.metoffice.gov.uk",
    "https://www.wunderground.com",
    "https://www.yr.no",
    "https://www.msn.com/en-us/weather",
    "https://www.vnmh.gov.vn",
    "https://www.tiemnang.vn/thoi-tiet"
]

# Đảm bảo RESULTS_DIR là đường dẫn tuyệt đối
RESULTS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'weather_results'))
os.makedirs(RESULTS_DIR, exist_ok=True)

async def main():
    llm = ChatOpenAI(model="gpt-4o")
    for url in WEATHER_URLS:
        print(f"\nĐang kiểm tra trang: {url}")
        agent = Agent(
            task=f"Truy cập {url}, lấy thông tin thời tiết hiện tại và phát hiện các thông tin đặc biệt như cảnh báo mưa lớn, bão, nhiệt độ cực đoan, ...",
            llm=llm,
        )
        result = await agent.run()
        print(f"Kết quả từ {url}:")
        print(result)
        # Lưu kết quả ra file
        domain = urlparse(url).netloc.replace('.', '_')
        file_path = os.path.join(RESULTS_DIR, f"{domain}.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"Kết quả từ {url}:\n{result}\n")

if __name__ == "__main__":
    asyncio.run(main())
