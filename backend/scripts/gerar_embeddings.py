import os
import sys
import torch
from pathlib import Path
from sqlalchemy.orm import Session

# Add backend directory to path to import app modules
backend_path = Path(__file__).parent.parent
sys.path.append(str(backend_path))

from app.db.database import SessionLocal
from app.db.models import Especie, AnimalImage
from app.core.dino import DinoFeatureExtractor

def gerar_embeddings():
    print("Starting embedding generation...")
    
    # Initialize DB session
    db = SessionLocal()
    
    # Initialize DINO
    extrator = DinoFeatureExtractor()
    
    # Directory containing animal images
    # Located in app/core/imagens_animais
    base_dir = backend_path / "app" / "core" / "imagens_animais"
    
    if not base_dir.exists():
        print(f"Error: Directory {base_dir} not found.")
        return

    # Iterate over species folders
    for especie_dir in base_dir.iterdir():
        if not especie_dir.is_dir():
            continue
            
        nome_cientifico = especie_dir.name
        print(f"Processing {nome_cientifico}...")
        
        # Check if species exists in DB
        especie = db.query(Especie).filter(Especie.id == nome_cientifico).first()
        if not especie:
            print(f"  Warning: Species {nome_cientifico} not found in database. Skipping.")
            continue
            
        # Iterate over images
        for img_file in especie_dir.iterdir():
            if img_file.suffix.lower() not in ['.jpg', '.jpeg', '.png']:
                continue
                
            # Check if image already processed
            existing = db.query(AnimalImage).filter(AnimalImage.caminho_arquivo == str(img_file)).first()
            if existing:
                print(f"  Skipping {img_file.name} (already exists)")
                continue
                
            try:
                # Generate embedding
                embedding = extrator.extract_features(str(img_file))
                
                # Save to DB
                db_image = AnimalImage(
                    especie_id=nome_cientifico,
                    caminho_arquivo=str(img_file),
                    embedding=embedding
                )
                db.add(db_image)
                print(f"  Processed {img_file.name}")
                
            except Exception as e:
                print(f"  Error processing {img_file.name}: {e}")
        
        db.commit()
    
    db.close()
    print("Embedding generation complete!")

if __name__ == "__main__":
    gerar_embeddings()
