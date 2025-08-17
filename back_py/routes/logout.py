# Ruta de logout en Flask
# Esta ruta conecta la petición HTTP con el controlador de logout
# Se recomienda usar Blueprints para modularidad

from flask import Blueprint
from controller.logout_controller import post_logout

logout_bp = Blueprint('logout', __name__)

@logout_bp.route('/logout', methods=['POST'])
def logout():
    # Llama al controlador y retorna la respuesta
    respuesta, status = post_logout()
    return respuesta, status
