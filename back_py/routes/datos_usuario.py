# Rutas para datos de usuario usando Flask Blueprint
# En Flask se usa Blueprint para modularizar rutas (en Express se usan routers)
from flask import Blueprint, request, session  # Importa objetos de Flask (en JS: require('express'))
from controller.datos_usuario_controller import get_datos_usuario, put_datos_usuario, delete_datos_usuario  # Importa los controladores

datos_usuario_bp = Blueprint('datos_usuario', __name__)  # Crea el Blueprint (en JS: const router = express.Router())


# Explicación detaln siguiente responde a la ruta /usuario con método GET.lada línea por línea:
# 1. El decorador @datos_usuario_bp.route('/usuario', methods=['GET']) indica que la funció
#    - El símbolo @ en Python se llama "decorador" y sirve para modificar el comportamiento de la función que sigue.
#    - En Flask, @route asocia la función a una URL específica.
# 2. La función obtener_usuario() es la que se ejecuta cuando se hace una petición GET a /usuario.
# 3. Dentro de la función, se obtiene el usuario_id desde la sesión de Flask con session.get('usuario_id').
#    - Esto es equivalente a req.session.usuarioId en Express.
# 4. Si no hay usuario_id en la sesión, se devuelve un error 401 (no autorizado).
# 5. Se llama al controlador get_datos_usuario(usuario_id) para obtener los datos del usuario.
# 6. "respuesta, status" no es desestructuring como en JS, sino una tupla: en Python se pueden devolver varios valores separados por coma.
# 7. Finalmente, se devuelve la respuesta y el código de estado.

# Ruta GET para obtener datos de usuario
@datos_usuario_bp.route('/usuario', methods=['GET'])
def obtener_usuario():
    # Obtiene el usuario_id de la sesión de Flask
    usuario_id = session.get('usuario_id')  # En JS: req.session.usuarioId
    if not usuario_id:
        return {"error": "No hay usuario logueado"}, 401
    # Llama al controlador y devuelve la respuesta y el status
    # "respuesta, status" no es desestructuring, es una tupla (en Python se puede devolver varios valores separados por coma)
    respuesta, status = get_datos_usuario(usuario_id)
    return respuesta, status  # En JS: res.status(...).json(...)

# Ruta PUT para actualizar datos de usuario
@datos_usuario_bp.route('/usuario', methods=['PUT'])
def actualizar_usuario():
    usuario_id = session.get('usuario_id')  # Obtiene el usuario_id de la sesión
    if not usuario_id:
        return {"error": "No hay usuario logueado"}, 401
    datos = request.get_json()  # Obtiene los datos enviados por el cliente (en JS: req.body)
    nombre = datos.get('nombre')
    apellidos = datos.get('apellidos')
    email = datos.get('email')
    # Llama al controlador con los datos extraídos
    contraseña_actual = datos.get('contraseña_actual')
    nueva_contraseña = datos.get('nueva_contraseña')
    respuesta, status = put_datos_usuario(usuario_id, nombre, apellidos, email, contraseña_actual, nueva_contraseña)
    return respuesta, status

# Ruta DELETE para eliminar usuario
@datos_usuario_bp.route('/usuario', methods=['DELETE'])
def eliminar_usuario():
    usuario_id = session.get('usuario_id')  # Obtiene el usuario_id de la sesión
    if not usuario_id:
        return {"error": "No hay usuario logueado"}, 401
    # Llama al controlador y devuelve la respuesta
    respuesta, status = delete_datos_usuario(usuario_id)
    return respuesta, status
