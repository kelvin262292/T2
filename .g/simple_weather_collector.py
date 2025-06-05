import asyncio
import os
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

from langchain_deepseek import ChatDeepSeek
from pydantic import SecretStr
from browser_use import Agent

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

# Danh sách 3 trang web dự báo thời tiết đơn giản để test
weather_websites = [
    "https://www.timeanddate.com/weather/vietnam/hanoi",
    "https://www.accuweather.com/en/vn/hanoi/353412/weather-forecast/353412",
    "https://weather.com/weather/today/l/Hanoi+Vietnam"
]

# Lưu trữ kết quả thu thập
weather_data = []

async def collect_weather_simple(url, site_index):
    """Thu thập thông tin thời tiết từ một trang web với task đơn giản"""
    try:
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%d/%m/%Y")
        
        task = f"""
        Truy cập trang web {url} và tìm thông tin dự báo thời tiết cho ngày mai ({tomorrow}).
        Chỉ cần tìm:
        1. Nhiệt độ cao nhất và thấp nhất
        2. Tình trạng thời tiết (nắng/mưa/mây)
        3. Độ ẩm (nếu có)
        
        Trả về thông tin ngắn gọn trong 2-3 câu.
        """
        
        print(f"🔍 Đang thu thập từ trang {site_index + 1}: {url}")
        
        agent = Agent(
            task=task, 
            llm=llm,
            use_vision=False,
            max_actions_per_step=3,  # Giới hạn số action để tránh chạy quá lâu
        )
        
        result = await agent.run()
        
        # Lưu kết quả
        weather_info = {
            "site_index": site_index + 1,
            "url": url,
            "collected_at": datetime.now().isoformat(),
            "weather_data": str(result) if result else "Không thu thập được dữ liệu",
            "status": "success"
        }
        
        weather_data.append(weather_info)
        print(f"✅ Hoàn thành trang {site_index + 1}")
        
    except Exception as e:
        error_info = {
            "site_index": site_index + 1,
            "url": url,
            "collected_at": datetime.now().isoformat(),
            "error": str(e),
            "weather_data": "Lỗi khi thu thập dữ liệu",
            "status": "error"
        }
        weather_data.append(error_info)
        print(f"❌ Lỗi trang {site_index + 1}: {str(e)}")

async def main():
    """Hàm chính để thu thập thông tin từ các trang web"""
    print("🌤️ Bắt đầu thu thập thông tin thời tiết (phiên bản đơn giản)...")
    print(f"📅 Ngày dự báo: {(datetime.now() + timedelta(days=1)).strftime('%d/%m/%Y')}")
    print("="*60)
    
    # Thu thập tuần tự từ từng trang web
    for i, url in enumerate(weather_websites):
        await collect_weather_simple(url, i)
        
        # Nghỉ 3 giây giữa các lần thu thập
        if i < len(weather_websites) - 1:
            print("⏳ Nghỉ 3 giây...")
            await asyncio.sleep(3)
    
    # Lưu kết quả vào file JSON
    output_file = "weather_results/simple_weather_data.json"
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
    
    successful_collections = [data for data in weather_data if data.get("status") == "success"]
    failed_collections = [data for data in weather_data if data.get("status") == "error"]
    
    print(f"✅ Thu thập thành công: {len(successful_collections)}/{len(weather_data)} trang")
    print(f"❌ Thu thập thất bại: {len(failed_collections)}/{len(weather_data)} trang")
    
    if failed_collections:
        print("\n❌ Các trang thất bại:")
        for failed in failed_collections:
            print(f"   - Trang {failed['site_index']}: {failed['url']}")
            print(f"     Lỗi: {failed.get('error', 'Không xác định')}")
    
    if successful_collections:
        print("\n✅ Dữ liệu thu thập được:")
        for success in successful_collections:
            print(f"   - Trang {success['site_index']}: {success['weather_data'][:100]}...")
    
    print("\n📊 Dữ liệu này sẽ được sử dụng để tạo landing page với hiệu ứng phù hợp với thời tiết ngày mai.")

if __name__ == '__main__':
    asyncio.run(main())