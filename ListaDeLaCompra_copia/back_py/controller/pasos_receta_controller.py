from db.conexion import get_connection
from flask import session

def get_pasos_receta_por_usuario():
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    sql = "SELECT * FROM pasos_por_receta WHERE usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (usuario_id,))
        pasos_list = cursor.fetchall()
        if not pasos_list:
            return {'mensaje': 'No se encontraron pasos para este usuario'}, 404
        return pasos_list, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def get_pasos_receta_por_receta(receta_id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not receta_id:
        return {'error': 'Falta el ID de la receta'}, 400
    sql = "SELECT * FROM pasos_por_receta WHERE receta_id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (receta_id, usuario_id))
        pasos_list = cursor.fetchall()
        if not pasos_list:
            return {'mensaje': 'No se encontraron pasos para esta receta'}, 404
        return pasos_list, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def get_un_paso_receta(id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id:
        return {'error': 'Falta el ID del paso'}, 400
    sql = "SELECT * FROM pasos_por_receta WHERE id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (id, usuario_id))
        paso_dict = cursor.fetchone()
        if not paso_dict:
            return {'error': 'Paso no encontrado o no tienes permiso para verlo'}, 404
        return paso_dict, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def post_paso_receta(receta_id, elaboracion, imagen):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not receta_id or not elaboracion:
        return {'error': 'Faltan datos obligatorios'}, 400
    sql = "INSERT INTO pasos_por_receta (receta_id, elaboracion, imagen, usuario_id) VALUES (%s, %s, %s, %s)"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (receta_id, elaboracion, imagen, usuario_id))
        db.commit()
        return {'mensaje': 'Paso agregado correctamente'}, 201
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def post_varios_pasos_receta(pasos):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not isinstance(pasos, list) or len(pasos) == 0:
        return {'error': 'Faltan pasos para agregar'}, 400
    sql = "INSERT INTO pasos_por_receta (receta_id, elaboracion, imagen, usuario_id) VALUES (%s, %s, %s, %s)"
    db = get_connection()
    cursor = db.cursor()
    try:
        db.start_transaction()
        for paso in pasos:
            receta_id = paso.get('receta_id')
            elaboracion = paso.get('elaboracion')
            imagen = paso.get('imagen')
            cursor.execute(sql, (receta_id, elaboracion, imagen, usuario_id))
        db.commit()
        return {'mensaje': 'Pasos agregados correctamente'}, 201
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def put_paso_receta(id, receta_id, elaboracion, imagen):
    usuario_id = session.get('usuario_id')
    print(usuario_id)
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    print(id, receta_id, elaboracion, imagen)
    if not id or not receta_id:
        return {'error': 'Faltan datos obligatorios'}, 400
    sql = "UPDATE pasos_por_receta SET receta_id = %s, elaboracion = %s, imagen = %s WHERE id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (receta_id, elaboracion, imagen, id, usuario_id))
        db.commit()
        if cursor.rowcount == 0:
            return {'error': 'Paso no encontrado o no tienes permiso para editarlo'}, 404
        return {'mensaje': 'Paso actualizado correctamente'}, 200
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def delete_paso_receta(id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id:
        return {'error': 'Falta el ID del paso'}, 400
    sql = "DELETE FROM pasos_por_receta WHERE id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (id, usuario_id))
        db.commit()
        if cursor.rowcount == 0:
            return {'error': 'Paso no encontrado o no tienes permiso para eliminarlo'}, 404
        return {'mensaje': 'Paso eliminado correctamente'}, 200
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500
