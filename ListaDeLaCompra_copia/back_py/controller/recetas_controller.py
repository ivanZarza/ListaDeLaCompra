from db.conexion import get_connection
from flask import session

def get_recetas():
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    sql = "SELECT id, nombre, descripcion, created_at FROM recetas WHERE usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (usuario_id,))
        recetas_list = cursor.fetchall()
        if not recetas_list:
            return {'mensaje': 'No se encontraron recetas para este usuario'}, 404
        return recetas_list, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def get_detalles_receta(id):
    if not id:
        return {'error': 'Falta el ID de la receta'}, 400
    sql_ingredientes = "SELECT * FROM ingredientes_por_receta WHERE receta_id = %s"
    sql_pasos = "SELECT * FROM pasos_por_receta WHERE receta_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql_ingredientes, (id,))
        ingredientes_list = cursor.fetchall()
        if not ingredientes_list:
            return {'error': 'No se encontraron ingredientes para esta receta'}, 404
        cursor.execute(sql_pasos, (id,))
        pasos_list = cursor.fetchall()
        if not pasos_list:
            return {'error': 'No se encontraron pasos para esta receta'}, 404
        return {'ingredientes': ingredientes_list, 'pasos': pasos_list}, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def post_receta(nombre, descripcion):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not nombre or not descripcion:
        return {'error': 'Faltan datos obligatorios'}, 400
    sql_receta = "INSERT INTO recetas (usuario_id, nombre, descripcion) VALUES (%s, %s, %s)"
    sql_receta_id = "SELECT id FROM recetas WHERE usuario_id = %s AND nombre = %s AND descripcion = %s ORDER BY created_at DESC LIMIT 1"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql_receta, (usuario_id, nombre, descripcion))
        db.commit()
        cursor.execute(sql_receta_id, (usuario_id, nombre, descripcion))
        result_id = cursor.fetchone()
        id = result_id[0] if result_id else None
        return {'id': id, 'mensaje': 'Receta creada correctamente'}, 201
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def put_receta(id, nombre, descripcion):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id or not nombre or not descripcion:
        return {'error': 'Faltan datos obligatorios'}, 400
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE recetas SET nombre = %s, descripcion = %s WHERE id = %s AND usuario_id = %s",
            (nombre, descripcion, id, usuario_id)
        )
        db.commit()
        if cursor.rowcount == 0:
            return {'error': 'Receta no encontrada o no tienes permiso para editarla'}, 404
        return {'mensaje': 'Receta actualizada correctamente'}, 200
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def delete_receta(id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id:
        return {'error': 'Falta el ID de la receta'}, 400
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(
            "DELETE FROM recetas WHERE id = %s AND usuario_id = %s",
            (id, usuario_id)
        )
        db.commit()
        if cursor.rowcount == 0:
            return {'error': 'Receta no encontrada o no tienes permiso para eliminarla'}, 404
        return {'mensaje': 'Receta eliminada correctamente'}, 200
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500
