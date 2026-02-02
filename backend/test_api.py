import requests
import sys
from pathlib import Path

def test_identificacao():
    url = "http://localhost:8001/identificar"
    
    # Use one of the existing images for testing
    image_path = Path("app/core/imagens_animais/panthera_leo/1.jpg")
    
    if not image_path.exists():
        print(f"Error: Test image {image_path} not found")
        sys.exit(1)
        
    print(f"Testing with image: {image_path}")
    
    with open(image_path, "rb") as f:
        files = {"file": ("test.jpg", f, "image/jpeg")}
        try:
            response = requests.post(url, files=files)
            print(f"Status Code: {response.status_code}")
            print("Response:")
            print(response.json())
        except Exception as e:
            print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_identificacao()
