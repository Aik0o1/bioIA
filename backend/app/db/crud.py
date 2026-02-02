from sqlalchemy.orm import Session
from .models import Especie

def get_especie_by_id(db: Session, especie_id: str):
    return db.query(Especie).filter(Especie.id == especie_id).first()

def create_especie(db: Session, especie: Especie):
    db.add(especie)
    db.commit()
    db.refresh(especie)
    return especie
