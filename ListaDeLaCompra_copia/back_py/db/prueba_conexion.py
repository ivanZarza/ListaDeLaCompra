from conexion import get_connection
try:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT 1')
    cursor.fetchall()
    print('Conexion a la base de datos exitosa')
    cursor.close()
    conn.close()
except Exception as err:
    print('Error de conexion a la base de datos:', err)
