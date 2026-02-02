from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from .database import Base

class Especie(Base):
    __tablename__ = "especies"

    id = Column(String(150), primary_key=True, index=True)  # nome científico
    nome = Column(String(150), nullable=False)
    tipo = Column(String(50))
    nivel_ameaca = Column(String(100))
    habitat = Column(Text)
    estados_ocorrencia = Column(Text)
    caracteristicas = Column(Text)
    papel_ecologico = Column(Text)

    imagens = relationship("AnimalImage", back_populates="especie")

class AnimalImage(Base):
    __tablename__ = "animal_images"

    id = Column(Integer, primary_key=True, index=True)
    especie_id = Column(String(150), ForeignKey("especies.id"))
    caminho_arquivo = Column(String(255))
    embedding = Column(Vector(384)) # DINO ViT-S/16 output size

    especie = relationship("Especie", back_populates="imagens")
