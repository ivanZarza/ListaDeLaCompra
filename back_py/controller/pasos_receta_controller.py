# Controlador pasos_receta en Python (Flask)
# Traducción y comentarios línea a línea del controller de Node.js
# Se usa snake_case en nombres de funciones y variables

from db.conexion import get_connection  # Importa la función para obtener la conexión a la base de datos
from flask import session  # Para gestionar la sesión del usuario

# Obtener todos los pasos por usuario
# Equivalente a getPasosRecetas en Node.js

def get_pasos_receta_por_usuario():
    usuario_id = session.get('usuario_id')
    print(f"Usuario ID: {usuario_id}")
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    sql = "SELECT * FROM pasos_por_receta WHERE usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (usuario_id,))
        pasos = cursor.fetchall()
        print(f"Tuplas recibidas de la consulta: {pasos}")  # Muestra cómo se reciben los datos antes de convertirlos
        if not pasos:
            return {'mensaje': 'No se encontraron pasos para este usuario'}, 404
        # Conversión detallada:
        # [desc[0] for desc in cursor.description] obtiene los nombres de las columnas de la consulta SQL.
        # Cada elemento 'p' en 'pasos' es una tupla con los valores de cada columna.
        # zip(...) une cada nombre de columna con su valor correspondiente en la tupla.
        # dict(zip(...)) crea un diccionario donde las claves son los nombres de columna y los valores son los datos de la tupla.
        # Así, cada paso queda como {'columna': valor, ...} y el frontend recibe una lista de diccionarios.
        # Ejemplo: Si la consulta devuelve [('Cortar', 'imagen1.png'), ('Mezclar', 'imagen2.png')] y las columnas son ['elaboracion', 'imagen'], el resultado será:
        # [{'elaboracion': 'Cortar', 'imagen': 'imagen1.png'}, {'elaboracion': 'Mezclar', 'imagen': 'imagen2.png'}]
        pasos_list = [dict(zip([desc[0] for desc in cursor.description], p)) for p in pasos]
        return pasos_list, 200
    except Exception as e:
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Obtener pasos por receta
# Equivalente a getPasosRecetasPorReceta en Node.js

def get_pasos_receta_por_receta(receta_id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not receta_id:
        return {'error': 'Falta el ID de la receta'}, 400
    sql = "SELECT * FROM pasos_por_receta WHERE receta_id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (receta_id, usuario_id))
        pasos = cursor.fetchall()
        if not pasos:
            return {'mensaje': 'No se encontraron pasos para esta receta'}, 404
        # Conversión detallada igual que en la función anterior.
        pasos_list = [dict(zip([desc[0] for desc in cursor.description], p)) for p in pasos]
        return pasos_list, 200
    except Exception as e:
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Obtener un paso por id
# Equivalente a getUnPasoReceta en Node.js

def get_un_paso_receta(id):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not id:
        return {'error': 'Falta el ID del paso'}, 400
    sql = "SELECT * FROM pasos_por_receta WHERE id = %s AND usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, (id, usuario_id))
        paso = cursor.fetchone()
        if not paso:
            return {'error': 'Paso no encontrado o no tienes permiso para verlo'}, 404
        # Convierte la tupla resultado en un diccionario, asociando cada nombre de columna con su valor.
        # Así el frontend recibe un objeto con claves y valores, no una tupla.
        paso_dict = dict(zip([desc[0] for desc in cursor.description], paso))
        return paso_dict, 200
    except Exception as e:
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Insertar un paso
# Equivalente a postPasoReceta en Node.js

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
    except Exception as e:
        print(e)
        db.rollback()  # Revierte la transacción si hay error
        return {'error': 'Error interno del servidor'}, 500

# Insertar varios pasos en una transacción
# Equivalente a postVariosPasosReceta en Node.js

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
        db.start_transaction()  # Inicia la transacción
        for paso in pasos:
            receta_id = paso.get('receta_id')
            elaboracion = paso.get('elaboracion')
            imagen = paso.get('imagen')
            cursor.execute(sql, (receta_id, elaboracion, imagen, usuario_id))
        db.commit()  # Confirma la transacción si todo va bien
        return {'mensaje': 'Pasos agregados correctamente'}, 201
    except Exception as e:
        db.rollback()  # Revierte la transacción si hay error
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Actualizar un paso
# Equivalente a putPasoReceta en Node.js

def put_paso_receta(id, receta_id, elaboracion, imagen):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
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
    except Exception as e:
        db.rollback()
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Eliminar un paso
# Equivalente a deletePasoReceta en Node.js

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
    except Exception as e:
        db.rollback()
        print(e)
        return {'error': 'Error interno del servidor'}, 500
