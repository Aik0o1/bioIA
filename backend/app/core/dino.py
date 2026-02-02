import torch
import torchvision.transforms as T
from PIL import Image
import numpy as np

class DinoFeatureExtractor:
    def __init__(self, model_name='dino_vits16'):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Loading DINO model: {model_name} on {self.device}...")
        self.model = torch.hub.load('facebookresearch/dino:main', model_name)
        self.model.eval()
        self.model.to(self.device)
        
        self.transform = T.Compose([
            T.Resize(256),
            T.CenterCrop(224),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

    def extract_features(self, image_path_or_image):

        if isinstance(image_path_or_image, str):
            img = Image.open(image_path_or_image).convert('RGB')
        else:
            img = image_path_or_image.convert('RGB')
            
        img_tensor = self.transform(img).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            features = self.model(img_tensor)
            
        return features.cpu().numpy().flatten()

# Instantiate global extractor
dino_extractor = DinoFeatureExtractor()
