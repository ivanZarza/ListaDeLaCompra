import bcrypt
from db.conexion import get_connection

def get_datos_usuario(usuario_id):
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT nombre, apellidos, email FROM usuarios WHERE id = %s", (usuario_id,))
        usuario = cursor.fetchone()
        if not usuario:
            return {"error": "Usuario no encontrado"}, 404
        return usuario, 200
    except Exception:
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()
        db.close()

def put_datos_usuario(usuario_id, nombre, apellidos, email, contrasena_actual, nueva_contrasena):
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT contrasena FROM usuarios WHERE id = %s", (usuario_id,))
        usuario = cursor.fetchone()
        if not usuario:
            return {"error": "Usuario no encontrado"}, 404
        if not bcrypt.checkpw(contrasena_actual.encode(), usuario["contrasena"].encode()):
            return {"error": "Contrasena actual incorrecta"}, 401
        contrasena_hasheada = bcrypt.hashpw(nueva_contrasena.encode(), bcrypt.gensalt()).decode()
        sql = "UPDATE usuarios SET nombre = %s, apellidos = %s, email = %s, contrasena = %s WHERE id = %s"
        cursor.execute(sql, (nombre, apellidos, email, contrasena_hasheada, usuario_id))
        db.commit()
        if cursor.rowcount == 0:
            return {"error": "Usuario no encontrado"}, 404
        return {"mensaje": "Datos de usuario actualizados correctamente"}, 200
    except Exception:
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()
        db.close()

def delete_datos_usuario(usuario_id):
    db = get_connection()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM usuarios WHERE id = %s", (usuario_id,))
        db.commit()
        if cursor.rowcount == 0:
            return {"error": "Usuario no encontrado"}, 404
        return {"mensaje": "Usuario eliminado correctamente"}, 200
    except Exception:
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()
        db.close()
