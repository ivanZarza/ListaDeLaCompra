from db.conexion import get_connection
from flask import session

def get_ingredientes_receta_por_usuario():
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    sql = "SELECT * FROM ingredientes_por_receta WHERE usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (usuario_id,))
        ingredientes_list = cursor.fetchall()
        if not ingredientes_list:
            return {'mensaje': 'No se encontraron ingredientes para este usuario'}, 404
        return ingredientes_list, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def get_ingredientes_por_receta(receta_id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not receta_id:
        return {'error': 'Falta el ID de la receta'}, 400
    sql = "SELECT * FROM ingredientes_por_receta WHERE receta_id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (receta_id, usuario_id))
        ingredientes_list = cursor.fetchall()
        if not ingredientes_list:
            return {'error': 'No se encontraron ingredientes para esta receta'}, 404
        return ingredientes_list, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def get_un_ingrediente_receta(id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id:
        return {'error': 'Falta el ID del ingrediente'}, 400
    sql = "SELECT * FROM ingredientes_por_receta WHERE id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (id, usuario_id))
        ingrediente_dict = cursor.fetchone()
        if not ingrediente_dict:
            return {'error': 'Ingrediente no encontrado o no tienes permiso para verlo'}, 404
        return ingrediente_dict, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500

def post_ingrediente_receta(receta_id, ingrediente_id, peso):
    usuario_id = session.get('usuario_id')
    print
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not all([receta_id, ingrediente_id, peso]):
        return {'error': 'Faltan datos obligatorios'}, 400
    sql = "INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (%s, %s, %s, %s)"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (receta_id, ingrediente_id, peso, usuario_id))
        db.commit()
        return {'mensaje': 'Ingrediente agregado correctamente', 'id': cursor.lastrowid}, 201
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def post_varios_ingredientes_receta(ingredientes):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not isinstance(ingredientes, list) or len(ingredientes) == 0:
        return {'error': 'Faltan datos obligatorios'}, 400
    sql = "INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (%s, %s, %s, %s)"
    db = get_connection()
    cursor = db.cursor()
    try:
        db.start_transaction()
        for ingrediente in ingredientes:
            receta_id = ingrediente.get('recetaId')
            ingrediente_id = ingrediente.get('ingredienteId')
            peso = ingrediente.get('peso')
            cursor.execute(sql, (receta_id, ingrediente_id, peso, usuario_id))
        db.commit()
        return {'mensaje': 'Ingredientes agregados correctamente'}, 201
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def put_ingrediente_receta(id, peso):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id or not peso:
        return {'error': 'Faltan datos obligatorios'}, 400
    sql = "UPDATE ingredientes_por_receta SET peso = %s WHERE id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (peso, id, usuario_id))
        db.commit()
        if cursor.rowcount == 0:
            return {'error': 'Ingrediente no encontrado o no tienes permiso para actualizarlo'}, 404
        return {'mensaje': 'Ingrediente actualizado correctamente'}, 200
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

def delete_ingrediente_receta(id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id:
        return {'error': 'Falta el ID del ingrediente'}, 400
    sql = "DELETE FROM ingredientes_por_receta WHERE id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (id, usuario_id))
        db.commit()
        if cursor.rowcount == 0:
            return {'error': 'Ingrediente no encontrado o no tienes permiso para eliminarlo'}, 404
        return {'mensaje': 'Ingrediente eliminado correctamente'}, 200
    except Exception:
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500
