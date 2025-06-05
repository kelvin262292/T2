import asyncio
import os
import sys
import json
from datetime import datetime, timedelta

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from langchain_deepseek import ChatDeepSeek
from pydantic import SecretStr
from browser_use import Agent

# Danh sách 10 trang web dự báo thời tiết
weather_websites = [
    "https://www.accuweather.com/en/vn/vietnam-weather",
    "https://nchmf.gov.vn/KttvsiteE/en-US/2/index.html",
    "https://www.metoffice.gov.uk/weather/world/vietnam",
    "https://www.timeanddate.com/weather/vietnam/hanoi/ext",
    "https://www.wunderground.com/weather/vn/hanoi",
    "https://weather-and-climate.com/10-ten-day-forecast,hanoi,Vietnam",
    "https://www.weather.com/weather/tenday/l/Hanoi+Vietnam",
    "https://www.worldweatheronline.com/hanoi-weather/ha-noi/vn.aspx",
    "https://www.weatherbase.com/weather/city.php3?c=VN&name=Hanoi",
    "https://www.yr.no/en/forecast/daily-table/2-1581130/Vietnam/Hanoi/Hanoi"
]

# Khởi tạo model DeepSeek
api_key = os.getenv('DEEPSEEK_API_KEY', '')
if not api_key:
    raise ValueError('DEEPSEEK_API_KEY is not set')

llm = ChatDeepSeek(
    base_url='https://api.deepseek.com/v1',
    model='deepseek-chat',
    api_key=SecretStr(api_key),
    temperature=0.0,
)

# Lưu trữ kết quả thu thập
weather_data = []

async def collect_weather_from_site(url, site_index):
    """Thu thập thông tin thời tiết từ một trang web cụ thể"""
    try:
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        task = f"""
        Truy cập trang web {url} và thu thập thông tin dự báo thời tiết cho ngày mai ({tomorrow}).
        Tìm kiếm các thông tin sau:
        1. Nhiệt độ cao nhất và thấp nhất
        2. Tình trạng thời tiết (nắng, mưa, mây, bão, v.v.)
        3. Độ ẩm
        4. Tốc độ gió
        5. Khả năng mưa (%)
        6. Mô tả chi tiết về thời tiết
        
        Lưu thông tin vào một định dạng có cấu trúc và dễ đọc.
        """
        
        agent = Agent(task=task, llm=llm)
        result = await agent.run()
        
        # Lưu kết quả
        weather_info = {
            "site_index": site_index + 1,
            "url": url,
            "collected_at": datetime.now().isoformat(),
            "weather_data": str(result) if result else "Không thu thập được dữ liệu"
        }
        
        weather_data.append(weather_info)
        print(f"✅ Đã thu thập dữ liệu từ trang {site_index + 1}: {url}")
        
    except Exception as e:
        error_info = {
            "site_index": site_index + 1,
            "url": url,
            "collected_at": datetime.now().isoformat(),
            "error": str(e),
            "weather_data": "Lỗi khi thu thập dữ liệu"
        }
        weather_data.append(error_info)
        print(f"❌ Lỗi khi thu thập từ trang {site_index + 1}: {url} - {str(e)}")

async def main():
    """Hàm chính để thu thập thông tin từ tất cả các trang web"""
    print("🌤️ Bắt đầu thu thập thông tin thời tiết từ 10 trang web...")
    print(f"📅 Ngày dự báo: {(datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')}")
    print("="*60)
    
    # Thu thập tuần tự từ từng trang web
    for i, url in enumerate(weather_websites):
        print(f"🔍 Đang thu thập từ trang {i + 1}/10: {url}")
        await collect_weather_from_site(url, i)
        
        # Nghỉ 2 giây giữa các lần thu thập để tránh quá tải
        if i < len(weather_websites) - 1:
            await asyncio.sleep(2)
    
    # Lưu kết quả vào file JSON
    output_file = "weather_results/weather_data.json"
    os.makedirs("weather_results", exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(weather_data, f, ensure_ascii=False, indent=2)
    
    print("="*60)
    print(f"✅ Hoàn thành thu thập dữ liệu từ {len(weather_websites)} trang web")
    print(f"📁 Kết quả đã được lưu vào: {output_file}")
    
    # Phân tích dữ liệu thu thập được
    analyze_weather_data()

def analyze_weather_data():
    """Phân tích dữ liệu thời tiết đã thu thập"""
    print("\n🔍 PHÂN TÍCH DỮ LIỆU THU THẬP:")
    print("="*40)
    
    successful_collections = [data for data in weather_data if "error" not in data]
    failed_collections = [data for data in weather_data if "error" in data]
    
    print(f"✅ Thu thập thành công: {len(successful_collections)}/{len(weather_data)} trang")
    print(f"❌ Thu thập thất bại: {len(failed_collections)}/{len(weather_data)} trang")
    
    if failed_collections:
        print("\n❌ Các trang thất bại:")
        for failed in failed_collections:
            print(f"   - Trang {failed['site_index']}: {failed['url']}")
            print(f"     Lỗi: {failed.get('error', 'Không xác định')}")
    
    print("\n📊 Dữ liệu sẽ được sử dụng để tạo landing page với hiệu ứng phù hợp với thời tiết ngày mai.")

if __name__ == '__main__':
    asyncio.run(main())