from flask import Blueprint, request, session
from controller.login_controller import post_login
login_bp = Blueprint('login', __name__)
@login_bp.route('/login', methods=['POST'])
def login():
    datos = request.get_json()
    email = datos.get('email')
    contrasena = datos.get('contrasena')
    respuesta, status = post_login(email, contrasena)
    if status == 200 and 'usuario' in respuesta:
        session['usuario_id'] = respuesta['usuario']['id']
    return respuesta, status
