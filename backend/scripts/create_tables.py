from app.db.database import engine
from app.db.models import Base

from sqlalchemy import text
from app.db.database import engine
from app.db.models import Base

# Enable pgvector extension
with engine.connect() as connection:
    connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
    connection.commit()

Base.metadata.create_all(bind=engine)
print("✅ Tabelas criadas")
