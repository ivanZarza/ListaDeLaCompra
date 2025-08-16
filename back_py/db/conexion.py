import os
import mysql.connector

# Carga las variables de entorno desde un archivo .env
from dotenv import load_dotenv
load_dotenv()

# Obtiene las variables de entorno, con valores por defecto si no existen
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_NAME = os.getenv('DB_NAME', 'materias_primas')
DB_PORT = int(os.getenv('DB_PORT', 3306))

def get_connection():
    # Crea y devuelve una conexión a la base de datos MySQL
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        port=DB_PORT
    )
