# rutas/registro.py - Rutas para el registro de usuarios en Flask
# Se recomienda usar Blueprint para modularidad y snake_case para nombres

from flask import Blueprint, request
from controller.registro_controller import post_registro

# Crea el Blueprint para las rutas de registro
registro_bp = Blueprint('registro', __name__)

# Ruta POST para registrar un usuario
@registro_bp.route('/registro', methods=['POST'])
def registrar_usuario():
    """
    Endpoint para registrar un nuevo usuario.
    Recibe los datos en formato JSON:
    {
        "nombre": "...",
        "apellidos": "...",
        "email": "...",
        "contraseña": "..."
    }
    Llama al controlador post_registro y devuelve la respuesta.
    """
    data = request.get_json()
    nombre = data.get('nombre')
    apellidos = data.get('apellidos')
    email = data.get('email')
    contraseña = data.get('contraseña')
    return post_registro(nombre, apellidos, email, contraseña)
