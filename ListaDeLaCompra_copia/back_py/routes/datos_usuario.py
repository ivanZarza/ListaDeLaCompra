from flask import Blueprint, request, session
from controller.datos_usuario_controller import get_datos_usuario, put_datos_usuario, delete_datos_usuario

datos_usuario_bp = Blueprint('datos_usuario', __name__)

@datos_usuario_bp.route('/usuario', methods=['GET'])
def obtener_usuario():
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {"error": "No hay usuario logueado"}, 401
    respuesta, status = get_datos_usuario(usuario_id)
    return respuesta, status

@datos_usuario_bp.route('/usuario', methods=['PUT'])
def actualizar_usuario():
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {"error": "No hay usuario logueado"}, 401
    datos = request.get_json()
    nombre = datos.get('nombre')
    apellidos = datos.get('apellidos')
    email = datos.get('email')
    contraseña_actual = datos.get('contraseña_actual')
    nueva_contraseña = datos.get('nueva_contraseña')
    respuesta, status = put_datos_usuario(usuario_id, nombre, apellidos, email, contraseña_actual, nueva_contraseña)
    return respuesta, status

@datos_usuario_bp.route('/usuario', methods=['DELETE'])
def eliminar_usuario():
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return {"error": "No hay usuario logueado"}, 401
    respuesta, status = delete_datos_usuario(usuario_id)
    return respuesta, status
