
# Importa el módulo os para acceder a variables de entorno (en JS: require('os'))
import os
# Importa el conector de MySQL para Python (en JS: require('mysql2'))
import mysql.connector

# Carga las variables de entorno desde un archivo .env (en JS: require('dotenv').config())
from dotenv import load_dotenv
load_dotenv()

# Obtiene las variables de entorno, con valores por defecto si no existen
# En JS sería process.env.DB_HOST || 'localhost'
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_NAME = os.getenv('DB_NAME', 'materias_primas')
DB_PORT = int(os.getenv('DB_PORT', 3306))

# Función para obtener la conexión a la base de datos
def get_connection():
    # Crea y devuelve una conexión a la base de datos MySQL
    # En JS sería mysql.createConnection({...}) o pool.getConnection()
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        port=DB_PORT
    )
