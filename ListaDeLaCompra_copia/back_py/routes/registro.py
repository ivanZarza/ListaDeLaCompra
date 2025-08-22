from flask import Blueprint, request
from controller.registro_controller import post_registro
registro_bp = Blueprint('registro', __name__)
@registro_bp.route('/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()
    nombre = data.get('nombre')
    apellidos = data.get('apellidos')
    email = data.get('email')
    contraseña = data.get('contraseña')
    return post_registro(nombre, apellidos, email, contraseña)
