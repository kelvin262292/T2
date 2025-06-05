import os
from dotenv import load_dotenv

load_dotenv()

from langchain_deepseek import ChatDeepSeek
from pydantic import SecretStr

def test_deepseek_api():
    """Test đơn giản để kiểm tra DeepSeek API"""
    
    # Kiểm tra API key
    api_key = os.getenv('DEEPSEEK_API_KEY', '')
    if not api_key:
        print("❌ Lỗi: DEEPSEEK_API_KEY không được tìm thấy trong file .env")
        return False
    
    print(f"✅ DeepSeek API Key đã được tải: {api_key[:10]}...")
    
    try:
        # Khởi tạo model DeepSeek
        llm = ChatDeepSeek(
            base_url='https://api.deepseek.com/v1',
            model='deepseek-chat',
            api_key=SecretStr(api_key),
            temperature=0.0,
        )
        print("✅ Model DeepSeek đã được khởi tạo thành công")
        
        # Test một câu hỏi đơn giản
        response = llm.invoke("Xin chào! Hôm nay thời tiết thế nào?")
        print(f"✅ Phản hồi từ DeepSeek: {response.content}")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi khi test DeepSeek: {str(e)}")
        return False

if __name__ == '__main__':
    print("🚀 Bắt đầu test DeepSeek API...")
    success = test_deepseek_api()
    
    if success:
        print("\n✅ DeepSeek API hoạt động tốt!")
        print("📝 Có thể sử dụng DeepSeek cho weather_collector.py")
    else:
        print("\n❌ DeepSeek API gặp vấn đề. Cần kiểm tra lại cấu hình.")