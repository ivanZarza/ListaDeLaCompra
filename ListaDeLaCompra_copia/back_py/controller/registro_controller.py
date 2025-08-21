import bcrypt
from db.conexion import get_connection
from flask import session

def post_registro(nombre, apellidos, email, contrasena):
    if not nombre or not apellidos or not email or not contrasena:
        return {"error": "Faltan datos obligatorios"}, 400
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        sql_comprobar = "SELECT * FROM usuarios WHERE email = %s"
        cursor.execute(sql_comprobar, (email,))
        resultados = cursor.fetchall()
        if len(resultados) > 0:
            return {"error": "El usuario ya existe"}, 400
        contrasena_hasheada = bcrypt.hashpw(contrasena.encode(), bcrypt.gensalt()).decode()
        sql = "INSERT INTO usuarios (id, nombre, apellidos, email, contrasena) VALUES (UUID(), %s, %s, %s, %s)"
        cursor.execute(sql, (nombre, apellidos, email, contrasena_hasheada))
        conn.commit()
        if cursor.rowcount == 0:
            return {"error": "Error al registrar el usuario"}, 500
        return {"mensaje": "Usuario registrado correctamente"}, 201
    except Exception:
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()
        conn.close()
