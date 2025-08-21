from db.conexion import get_connection

def get_ingredientes(nombre=None, tipo=None, pagina=1):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        sql_total = 'SELECT COUNT(*) AS total FROM ingredientes WHERE usuarioId IS NULL'
        params_total = []
        if nombre:
            sql_total += ' AND nombre LIKE %s'
            params_total.append(f'%{nombre}%')
        if tipo:
            sql_total += ' AND tipo = %s'
            params_total.append(tipo)
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
        cursor.execute(sql_total, params_total)
        resultados_total = cursor.fetchall()
        numero_ingredientes = resultados_total[0]['total']
        cursor.execute(sql, params)
        ingredientes = cursor.fetchall()
        return {
            'ingredientes': ingredientes,
            'numeroIngredientes': numero_ingredientes,
            'paginaActual': pagina,
            'totalPaginas': (numero_ingredientes + limite - 1) // limite
        }, 200
    except Exception:
        return {'error': 'Error interno del servidor'}, 500
    finally:
        cursor.close()
        conn.close()
