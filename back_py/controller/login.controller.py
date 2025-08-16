
# Controlador de login (versión Python, snake_case)
# En Python se recomienda snake_case para nombres de archivos y funciones (en JS suele usarse camelCase).

import bcrypt  # Importa la librería para verificar contraseñas (en JS: require('bcrypt'))
from db.conexion import get_connection  # Importa la función para conectar a la base de datos (en JS: require('../db/conection'))
from flask import session  # Importa el objeto session de Flask

def post_login(email, contrasena):
    # Verifica que todos los datos obligatorios estén presentes (en JS: req.body)
    if not email or not contrasena:
        return {"error": "Faltan datos obligatorios"}, 400  # En JS: res.status(400).json(...)

    conn = get_connection()  # Obtiene la conexión a la base de datos
    cursor = conn.cursor(dictionary=True)
    try:
        # Consulta el usuario por email (en JS: SELECT * FROM usuarios WHERE email = ?)
        sql = "SELECT * FROM usuarios WHERE email = %s"
        cursor.execute(sql, (email,))
        resultados = cursor.fetchall()  # Obtiene todos los resultados (en JS: [resultados] = await db.query(...))
        if len(resultados) == 0:
            return {"error": "El usuario no existe"}, 401  # En JS: res.status(401).json(...)

        usuario = resultados[0]  # Toma el primer usuario encontrado (en JS: resultados[0])
        print(f"ID de usuario: {usuario['id']} línea login.controller.py")  # Debug

        # Verifica la contraseña usando bcrypt (en JS: await bcrypt.compare(...))
        contrasena_validada = bcrypt.checkpw(contrasena.encode(), usuario["contraseña"].encode())
        if not contrasena_validada:
            return {"error": "Contraseña incorrecta"}, 401  # En JS: res.status(401).json(...)

        print("Inicio de sesión exitoso:", usuario)  # Debug

        # Guarda los datos del usuario en la sesión de Flask (en JS: req.session)
        session["usuario_id"] = usuario["id"]
        session["nombre"] = usuario["nombre"]
        session["apellidos"] = usuario["apellidos"]
        session["email"] = usuario["email"]

        # En Flask no es necesario llamar a save() como en Express

        # Devuelve los datos del usuario y el mensaje junto con el código de estado HTTP
        # En Python, puedes devolver varios valores separados por coma (esto se llama tupla)
        # Así, en la ruta puedes recibirlos como: respuesta, status = post_login(...)
        # En JS sería: res.status(200).json({...})
        return {
            "usuario": {
                "id": usuario["id"],
                "nombre": usuario["nombre"],
                "apellidos": usuario["apellidos"],
                "email": usuario["email"]
            },
            "mensaje": "Inicio de sesión exitoso"
        }, 200
    except Exception as e:
        print(e)  # Muestra el error por consola
        return {"error": "Error interno del servidor"}, 500
    finally:
        cursor.close()  # Cierra el cursor
        conn.close()  # Cierra la conexión
