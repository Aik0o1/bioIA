import json
from app.db.database import SessionLocal
from app.db.models import Especie

with open("./data/especies.json", "r", encoding="utf-8") as f:
    especies = json.load(f)

db = SessionLocal()

for e in especies:
    especie = Especie(
        id=e["id"],  # nome científico normalizado
        nome=e["nome"],
        tipo=e.get("tipo"),
        nivel_ameaca=e.get("nivel_ameaca"),
        habitat=e.get("habitat"),
        estados_ocorrencia=e.get("estados_ocorrencia"),
        caracteristicas=e.get("caracteristicas"),
        papel_ecologico=e.get("papel_ecologico")
    )
    db.merge(especie)  # evita duplicar
    print(f"✔ {e['id']}")

db.commit()
db.close()
