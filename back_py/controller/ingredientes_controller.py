# Controlador de ingredientes (versión Python, Flask)
# En Python se recomienda snake_case para nombres de archivos y funciones
# Este controlador implementa la lógica para obtener ingredientes con filtros y paginación

from db.conexion import get_connection  # Importa la función para conectar a la base de datos

# Función para obtener ingredientes con filtros y paginación
# En Flask, los parámetros se reciben en la ruta y se pasan como argumentos

def get_ingredientes(nombre=None, tipo=None, pagina=1):
    conn = get_connection()  # Obtiene la conexión a la base de datos
    cursor = conn.cursor(dictionary=True)
    try:
        # Construye la consulta para contar el total de ingredientes
        sql_total = 'SELECT COUNT(*) AS total FROM ingredientes WHERE usuarioId IS NULL'
        params_total = []
        if nombre:
            sql_total += ' AND nombre LIKE %s'  # LIKE permite buscar coincidencias parciales en SQL
            # f'%{nombre}%' es un f-string: inserta el valor de nombre entre los símbolos % para buscar cualquier coincidencia
            # Ejemplo: si nombre = "arroz", el parámetro será "%arroz%" y buscará cualquier ingrediente que contenga "arroz"
            params_total.append(f'%{nombre}%')
        if tipo:
            sql_total += ' AND tipo = %s'
            params_total.append(tipo)
        # Construye la consulta para obtener los ingredientes
        sql = 'SELECT * FROM ingredientes WHERE usuarioId IS NULL'
        params = []
        if nombre:
            sql += ' AND nombre LIKE %s'
            params.append(f'%{nombre}%')
        if tipo:
            sql += ' AND tipo = %s'
            params.append(tipo)
        limite = 20
        offset = (pagina - 1) * limite
        sql += ' LIMIT %s OFFSET %s'
        params.extend([limite, offset])
        # Ejecuta la consulta total
        cursor.execute(sql_total, params_total)
        resultados_total = cursor.fetchall()
        numero_ingredientes = resultados_total[0]['total']
        # Ejecuta la consulta de ingredientes
        cursor.execute(sql, params)
        ingredientes = cursor.fetchall()
        # Devuelve los datos en formato diccionario y el código de estado
        return {
            'ingredientes': ingredientes,
            'numeroIngredientes': numero_ingredientes,
            'paginaActual': pagina,
            'totalPaginas': (numero_ingredientes + limite - 1) // limite
        }, 200
    except Exception as e:
        print(e)
        return {'error': 'Error interno del servidor'}, 500
    finally:
        cursor.close()
        conn.close()
