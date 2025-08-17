
# Importa la función para obtener la conexión a la base de datos (en JS: require('./db/conection'))
from conexion import get_connection

# Intenta conectar y consultar la base de datos
try:
    # Obtiene la conexión (en JS: const conn = await db.getConnection())
    conn = get_connection()
    # Crea el cursor para ejecutar consultas (en JS: const [rows] = await conn.query(...))
    cursor = conn.cursor()
    # Ejecuta una consulta simple para probar la conexión
    cursor.execute('SELECT 1')
    cursor.fetchall()  # Lee el resultado (en JS: await conn.query('SELECT 1'))
    print('Conexión a la base de datos exitosa')
    # Cierra el cursor y la conexión (en JS: conn.release() o conn.end())
    cursor.close()
    conn.close()
except Exception as err:
    # Captura y muestra cualquier error de conexión
    print('Error de conexión a la base de datos:', err)