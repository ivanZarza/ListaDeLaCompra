# Ruta de login usando Flask Blueprint
# En Flask se usa Blueprint para modularizar rutas (en Express se usan routers)
from flask import Blueprint, request, session  # Importa objetos de Flask (en JS: require('express'))
from controller.login_controller import post_login  # Importa el controlador de login

login_bp = Blueprint('login', __name__)  # Crea el Blueprint (en JS: const router = express.Router())

# Ruta POST para login
@login_bp.route('/login', methods=['POST'])
def login():
    # Accede a los datos enviados por el cliente (en JS: req.body)
    datos = request.get_json()
    email = datos.get('email')
    contraseña = datos.get('contraseña')
    # Llama al controlador y obtiene la respuesta y el status
    # El controlador devuelve una tupla: (respuesta, status)
    # respuesta incluye los datos del usuario y el mensaje
    respuesta, status = post_login(email, contraseña)
    respuesta, status = post_login(email, contraseña)
    # Si el login fue exitoso, guarda el usuario_id en la sesión de Flask
    if status == 200 and 'usuario' in respuesta:
        session['usuario_id'] = respuesta['usuario']['id']  # En JS: req.session.usuarioId = ...
    # Se devuelve directamente el usuario en la respuesta, no hace falta otra petición
    return respuesta, status  # En JS: res.status(...).json(...)
 