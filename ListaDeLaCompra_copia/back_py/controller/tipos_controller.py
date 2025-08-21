from db.conexion import get_connection

def get_tipos():
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute('SELECT DISTINCT tipo FROM ingredientes')
        tipos = cursor.fetchall()
        if not tipos:
            return {'message': 'No se encontraron tipos de ingredientes'}, 404
        return tipos, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500
