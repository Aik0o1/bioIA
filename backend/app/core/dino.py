import json
import torch
from PIL import Image
from torchvision import transforms
import os

# =====================
# CONFIG
# =====================
IMAGE_PATH = "imagens_teste/elefante.jpg"
DB_PATH = "especies.json"

device = "cuda" if torch.cuda.is_available() else "cpu"

# =====================
# MODELO
# =====================
print("Carregando DINOv2...")
model = torch.hub.load("facebookresearch/dinov2", "dinov2_vits14")
model.eval().to(device)

transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

def embed(path):
    img = Image.open(path).convert("RGB")
    img = transform(img).unsqueeze(0).to(device)
    with torch.no_grad():
        emb = model(img)
        emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb

# =====================
# CARREGAR BANCO
# =====================
with open(DB_PATH, "r", encoding="utf-8") as f:
    especies = json.load(f)

# =====================
# INDEXAR BANCO
# =====================
index = []

for especie in especies:
    folder = f"imagens_animais/{especie['id']}"
    for img_name in os.listdir(folder):
        img_path = os.path.join(folder, img_name)
        emb = embed(img_path)
        index.append((especie, emb))

# =====================
# IDENTIFICAR
# =====================
query = embed(IMAGE_PATH)

best_score = -1
best_especie = None

for especie, emb_ref in index:
    score = (query @ emb_ref.T).item()
    if score > best_score:
        best_score = score
        best_especie = especie

# =====================
# RESULTADO
# =====================
print("\n🐾 Resultado:")
print(f"Espécie: {best_especie['nome_comum']}")
print(f"Nome científico: {best_especie['nome_cientifico']}")
print(f"Descrição: {best_especie['descricao']}")
print(f"Similaridade: {best_score:.2f}")
