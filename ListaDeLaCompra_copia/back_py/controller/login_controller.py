import bcrypt
from db.conexion import get_connection
from flask import session

def post_login(email, contrasena):
    if not email or not contrasena:
        return {"error": "Faltan datos obligatorios"}, 400
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        sql = "SELECT * FROM usuarios WHERE email = %s"
        cursor.execute(sql, (email,))
        resultados = cursor.fetchall()
        if len(resultados) == 0:
            return {"error": "El usuario no existe"}, 401
        usuario = resultados[0]
        if not bcrypt.checkpw(contrasena.encode(), usuario["contrasena"].encode()):
            return {"error": "Contrasena incorrecta"}, 401
        session["usuario_id"] = usuario["id"]
        session["nombre"] = usuario["nombre"]
        session["apellidos"] = usuario["apellidos"]
        session["email"] = usuario["email"]
        return {
            "usuario": {
                "id": usuario["id"],
                "nombre": usuario["nombre"],
                "apellidos": usuario["apellidos"],
                "email": usuario["email"]
            },
            "mensaje": "Inicio de sesion exitoso"
        }, 200
    except Exception:
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()
        conn.close()
