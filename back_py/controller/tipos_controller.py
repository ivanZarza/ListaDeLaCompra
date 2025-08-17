# Controlador de tipos en Python (Flask)
# Traducción y comentarios línea a línea del controller de Node.js

from db.conexion import get_connection  # Importa la función para obtener la conexión a la base de datos
from flask import jsonify  # Para retornar respuestas JSON

# Función que obtiene los tipos de ingredientes únicos donde usuario_id es nulo
# Equivalente a getTipos en Node.js

def get_tipos():
    try:
        db = get_connection()  # Obtiene la conexión a la base de datos
        cursor = db.cursor()
        # Ejecuta la consulta SQL (equivalente a db.query en Node.js)
        cursor.execute('SELECT DISTINCT tipo FROM ingredientes WHERE usuario_id IS NULL')
        tipos = cursor.fetchall()  # Obtiene todos los resultados como lista de tuplas
        # Si no hay resultados, retorna 404
        if not tipos:
            return {'message': 'No se encontraron tipos de ingredientes'}, 404
        # Esta línea utiliza una list comprehension, que es una forma compacta de crear listas en Python.
        # El bucle interno 'for t in tipos' recorre cada elemento de la lista 'tipos'.
        # Cada elemento 't' es una tupla, por ejemplo ('Fruta',).
        # Por cada tupla, se toma el primer elemento t[0] y se crea un diccionario {'tipo': t[0]}.
        # El resultado es una lista de diccionarios, uno por cada tipo encontrado en la consulta SQL.
        # Por ejemplo, si tipos = [('Fruta',), ('Verdura',)], el resultado será:
        # [{'tipo': 'Fruta'}, {'tipo': 'Verdura'}]
        # Esto facilita el uso en el frontend, ya que cada tipo queda en formato JSON.
        tipos_list = [{'tipo': t[0]} for t in tipos]
        return tipos_list, 200  # Retorna la lista y el código de estado
    except Exception as e:
        print('Error al obtener los tipos:', e)
        return {'error': 'Error interno del servidor'}, 500
