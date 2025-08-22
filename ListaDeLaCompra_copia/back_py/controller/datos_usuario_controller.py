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

def put_datos_usuario(usuario_id, nombre, apellidos, email, contraseña_actual, nueva_contraseña):
    # Validación de datos
    if not all([usuario_id, nombre, apellidos, email, contraseña_actual, nueva_contraseña]):
        print("Faltan datos obligatorios en la petición")
        return {"error": "Faltan datos obligatorios"}, 400
    print(f"Datos recibidos: usuario_id={usuario_id if usuario_id else False}, nombre={nombre if nombre else False}, apellidos={apellidos if apellidos else False}, email={email if email else False}, contraseña_actual={'***' if contraseña_actual else False}, nueva_contraseña={'***' if nueva_contraseña else False}")
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT contraseña FROM usuarios WHERE id = %s", (usuario_id,))
        usuario = cursor.fetchone()
        if not usuario:
            return {"error": "Usuario no encontrado"}, 404   
        if not bcrypt.checkpw(contraseña_actual.encode(), usuario["contraseña"].encode()):
            return {"error": "Contraseña actual incorrecta"}, 401
        contraseña_hasheada = bcrypt.hashpw(nueva_contraseña.encode(), bcrypt.gensalt()).decode()
        sql = "UPDATE usuarios SET nombre = %s, apellidos = %s, email = %s, contraseña = %s WHERE id = %s"
        cursor.execute(sql, (nombre, apellidos, email, contraseña_hasheada, usuario_id))
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
