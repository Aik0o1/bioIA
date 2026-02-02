from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import text
import shutil
import os
from typing import List

from app.db.database import SessionLocal, engine
from app.db.models import Base, Especie, AnimalImage
from app.core.dino import dino_extractor # Global instance
from app.db import crud

# Create tables if not exist (redundant if verify script run, but good for safety)
# Base.metadata.create_all(bind=engine) 
# Note: pgvector extension must be enabled manually or via script if not waiting for create_tables.py

app = FastAPI(title="BioAI API", description="API for animal identification using DINO embeddings")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "BioAI API is running"}

@app.post("/identificar")
async def identificar_animal(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Identifies an animal from an uploaded image.
    """
    # Verify file type
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG and PNG are supported.")

    # Save temp file
    temp_filename = f"temp_{file.filename}"
    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Generate embedding for uploaded image
        # This uses the global dino_extractor instance loaded at startup/import
        query_embedding = dino_extractor.extract_features(temp_filename)
        
        # Search in DB using pgvector L2 distance operator (<->)
        # We find the closest image and get its species
        # Note: We need to cast the list to a format suitable for the vector operator if needed, 
        # but sqlalchemy-pgvector handles lists directly.
        
        closest_match = db.query(AnimalImage).order_by(
            AnimalImage.embedding.l2_distance(query_embedding)
        ).first()

        if not closest_match:
            return JSONResponse(status_code=404, content={"message": "No matching animal found"})
            
        # Get species details
        especie = closest_match.especie
        
        # Determine confidence (distance) if needed for thresholding
        # distance = db.query(AnimalImage.embedding.l2_distance(query_embedding)).filter(AnimalImage.id == closest_match.id).scalar()
        
        return {
            "especie": {
                "id": especie.id,
                "nome": especie.nome,
                "tipo": especie.tipo,
                "nivel_ameaca": especie.nivel_ameaca,
                "habitat": especie.habitat,
                "caracteristicas": especie.caracteristicas,
                "papel_ecologico": especie.papel_ecologico
            },
            "match_image": closest_match.caminho_arquivo
        }

    except Exception as e:
        print(f"Error identifying animal: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        
    finally:
        # Clean up temp file
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
