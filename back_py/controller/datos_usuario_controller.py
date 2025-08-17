
# Controlador de datos de usuario (versión Python, snake_case)
# En Python se recomienda snake_case para nombres de archivos y funciones (en JS suele usarse camelCase).

import bcrypt  # Importa la librería para cifrar/verificar contraseñas (en JS: require('bcrypt'))
from db.conexion import get_connection  # Importa la función para conectar a la base de datos (en JS: require('../db/conection'))

# Obtener datos del usuario


def get_datos_usuario(usuario_id):
    db = get_connection()  # Obtiene la conexión a la base de datos
    cursor = db.cursor(dictionary=True)  # Crea el cursor; dictionary=True devuelve los resultados como diccionarios (en JS: array de objetos)
    try:
        # %s es el marcador de posición en mysql.connector (en JS con mysql2 se usa ?)
        cursor.execute("SELECT nombre, apellidos, email FROM usuarios WHERE id = %s", (usuario_id,))
        usuario = cursor.fetchone()  # Obtiene la primera fila del resultado (en JS: [usuarios] = await db.query(...))
        if not usuario:
            return {"error": "Usuario no encontrado"}, 404  # En JS: res.status(404).json({ error: ... })
        return usuario, 200  # En JS: res.status(200).json(usuarios[0])
    except Exception as e:
        print(e)  # Muestra el error por consola
        return {"error": "Error interno del servidor"}, 500  # En JS: res.status(500).json({ error: ... })
    finally:
        cursor.close()  # Cierra el cursor (buena práctica)
        db.close()    # Cierra la conexión (en JS el pool gestiona las conexiones)

# Actualizar datos del usuario


def put_datos_usuario(usuario_id, nombre, apellidos, email, contrasena_actual, nueva_contrasena):
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT contraseña FROM usuarios WHERE id = %s", (usuario_id,))  # Consulta la contraseña actual
        usuario = cursor.fetchone()  # Obtiene la fila (en JS: [usuarios] = await db.query(...))
        if not usuario:
            return {"error": "Usuario no encontrado"}, 404
        # Verifica la contraseña actual usando bcrypt (en JS: await bcrypt.compare(...))
        if not bcrypt.checkpw(contrasena_actual.encode(), usuario["contraseña"].encode()):
            return {"error": "Contraseña actual incorrecta"}, 401
        # Hashea la nueva contraseña (en JS: await bcrypt.hash(...))
        contrasena_hasheada = bcrypt.hashpw(nueva_contrasena.encode(), bcrypt.gensalt()).decode()
        # %s como marcador de posición (en JS: ?)
        sql = "UPDATE usuarios SET nombre = %s, apellidos = %s, email = %s, contraseña = %s WHERE id = %s"
        cursor.execute(sql, (nombre, apellidos, email, contrasena_hasheada, usuario_id))
        conn.commit()  # Guarda los cambios en la base de datos
        if cursor.rowcount == 0:  # Verifica si se actualizó algún usuario (en JS: result.affectedRows)
            return {"error": "Usuario no encontrado"}, 404
        return {"mensaje": "Datos de usuario actualizados correctamente"}, 200
    except Exception as e:
        print(e)
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()
        db.close()

# Eliminar usuario


def delete_datos_usuario(usuario_id):
    db = get_connection()
    cursor = db.cursor()
    try:
        # Elimina el usuario por ID (en JS: await db.query(...))
        cursor.execute("DELETE FROM usuarios WHERE id = %s", (usuario_id,))
        conn.commit()
        if cursor.rowcount == 0:  # Verifica si se eliminó algún usuario (en JS: result.affectedRows)
            return {"error": "Usuario no encontrado"}, 404
        return {"mensaje": "Usuario eliminado correctamente"}, 200
    except Exception as e:
        print(e)  # Muestra el error por consola
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()  # Cierra el cursor
        db.close()    # Cierra la conexión
