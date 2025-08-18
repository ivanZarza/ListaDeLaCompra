# Controlador de registro (versión Python, snake_case)
# En Python se recomienda snake_case para nombres de archivos y funciones (en JS suele usarse camelCase).


import bcrypt  # Importa la librería para cifrar/verificar contraseñas (en JS: require('bcrypt'))
from db.conexion import get_connection  # Importa la función para conectar a la base de datos (en JS: require('../db/conection'))
from flask import session  # Importa el objeto session de Flask


def post_registro(nombre, apellidos, email, contraseña):
    # Verifica que todos los datos obligatorios estén presentes (en JS: req.body)
    if not nombre or not apellidos or not email or not contraseña:
        return {
            "error": "Faltan datos obligatorios"
        }, 400  # En JS: res.status(400).json(...)

    conn = get_connection()  # Obtiene la conexión a la base de datos
    cursor = conn.cursor(dictionary=True)
    try:
        # Comprobar si el usuario ya existe (en JS: SELECT * FROM usuarios WHERE email = ?)
        sql_comprobar = "SELECT * FROM usuarios WHERE email = %s"
        cursor.execute(sql_comprobar, (email,))
        resultados = (
            cursor.fetchall()
        )  # Obtiene todos los resultados (en JS: [resultados] = await db.query(...))
        if len(resultados) > 0:
            return {"error": "El usuario ya existe"}, 400

        # Hashea la contraseña (en JS: await bcrypt.hash(...))
        contraseña_hasheada = bcrypt.hashpw(
            contraseña.encode(), bcrypt.gensalt()
        ).decode()

        # Inserta el usuario (en JS: INSERT INTO ... VALUES (UUID(), ?, ?, ?, ?))
        sql = "INSERT INTO usuarios (id, nombre, apellidos, email, contraseña) VALUES (UUID(), %s, %s, %s, %s)"
        cursor.execute(sql, (nombre, apellidos, email, contraseña_hasheada))
        conn.commit()  # Guarda los cambios en la base de datos
        if cursor.rowcount == 0:  # Verifica si se insertó el usuario (en JS: result.affectedRows)
            return {"error": "Error al registrar el usuario"}, 500

        # Solo devuelve el mensaje, igual que en Node.js
        return {"mensaje": "Usuario registrado correctamente"}, 201
    except Exception as e:
        print(e)  # Muestra el error por consola
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()  # Cierra el cursor
        conn.close()  # Cierra la conexión
