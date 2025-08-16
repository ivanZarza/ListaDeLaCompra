from conexion import get_connection

try:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT 1')
    cursor.fetchall()  # Añade esta línea para leer el resultado
    print('Conexión a la base de datos exitosa')
    cursor.close()
    conn.close()
except Exception as err:
    print('Error de conexión a la base de datos:', err)