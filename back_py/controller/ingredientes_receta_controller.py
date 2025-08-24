# Controlador ingredientesReceta en Python (Flask)
# Traducción y comentarios línea a línea del controller de Node.js

from db.conexion import get_connection  # Importa la función para obtener la conexión a la base de datos
# Esta línea importa la función get_connection desde el módulo db/conexion.py.
# get_connection() devuelve una conexión activa a la base de datos MySQL.
# Permite que cada función del controlador pueda ejecutar consultas SQL usando esa conexión.
# Es equivalente a require('../db/conection') en Node.js, pero en Python se usa import y la función puede tener un nombre diferente.
from flask import session  # Para gestionar la sesión del usuario

# Obtener todos los ingredientes por usuario
# Equivalente a getIngredientesRecetaPorUsuario en Node.js

def get_ingredientes_receta_por_usuario():
    usuario_id = session.get('usuario_id')
    print(f"ID de usuario: {usuario_id}")
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    sql = "SELECT * FROM ingredientes_por_receta WHERE usuario_id = %s"
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql, (usuario_id,))
        ingredientes_list = cursor.fetchall()  # Ya es una lista de diccionarios
        print(f"Ingredientes recibidos: {ingredientes_list}")
        if not ingredientes_list:
            return {'mensaje': 'No se encontraron ingredientes para este usuario'}, 404
        return ingredientes_list, 200
    except Exception as e:
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Obtener ingredientes por receta
# Equivalente a getIngredientesPorReceta en Node.js

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
    except Exception as e:
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Obtener un ingrediente por id
# Equivalente a getUnIngredienteReceta en Node.js

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
        ingrediente = cursor.fetchone()  # Ya es un diccionario
        if not ingrediente:
            return {'error': 'Ingrediente no encontrado o no tienes permiso para verlo'}, 404
        return ingrediente, 200
    except Exception as e:
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Insertar un ingrediente
# Equivalente a postIngredienteReceta en Node.js

def post_ingrediente_receta(receta_id, ingrediente_id, peso):
    usuario_id = session.get('usuario_id')
    print(f"Receta ID: {receta_id}, Ingrediente ID: {ingrediente_id}, Peso: {peso}, Usuario ID: {usuario_id}")
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
    except Exception as e:
        print(e)
        # Si ocurre un error, se revierte la transacción para evitar cambios parciales en la base de datos.
        db.rollback()
        return {'error': 'Error interno del servidor'}, 500

# Insertar varios ingredientes en una transacción
# Equivalente a postVariosIngredientesReceta en Node.js

def post_varios_ingredientes_receta(ingredientes):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not isinstance(ingredientes, list) or len(ingredientes) == 0:
        # Esta línea comprueba dos cosas:
        # 1. Que 'ingredientes' sea una lista (isinstance(ingredientes, list)).
        # 2. Que la lista no esté vacía (len(ingredientes) == 0).
        # Si 'ingredientes' no es una lista o está vacía, devuelve un error porque no se pueden procesar los
        return {'error': 'Faltan datos obligatorios'}, 400
    sql = "INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (%s, %s, %s, %s)"
    # En este controlador se usó get_db() en vez de get_connection() por consistencia con otros controladores.
    # Ambos métodos pueden usarse si están definidos correctamente y devuelven una conexión válida.
    # El nombre de la variable (db o conn) es solo una convención, lo importante es que represente la conexión activa.
    db = get_connection()
    cursor = db.cursor()
    try:
        # Inicia una transacción para asegurar que todos los inserts se realicen juntos.
        db.start_transaction()
        # Recorre la lista de ingredientes recibida en el body.
        for ingrediente in ingredientes:
            # Extrae los valores de cada ingrediente usando .get() para evitar errores si falta alguna clave.
            receta_id = ingrediente.get('recetaId')
            ingrediente_id = ingrediente.get('ingredienteId')
            peso = ingrediente.get('peso')
            # Ejecuta el insert para cada ingrediente.
            cursor.execute(sql, (receta_id, ingrediente_id, peso, usuario_id))
        # Si todo va bien, confirma la transacción.
        db.commit()
        return {'mensaje': 'Ingredientes agregados correctamente'}, 201
    except Exception as e:
        db.rollback()
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Actualizar un ingrediente
# Equivalente a putIngredienteReceta en Node.js

def put_ingrediente_receta(id, peso):
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {'error': 'No estás autenticado'}, 401
    if not all([id, peso]):
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
    except Exception as e:
        db.rollback()
        print(e)
        return {'error': 'Error interno del servidor'}, 500

# Eliminar un ingrediente
# Equivalente a deleteIngredienteReceta en Node.js

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
    except Exception as e:
        db.rollback()
        print(e)
        return {'error': 'Error interno del servidor'}, 500
