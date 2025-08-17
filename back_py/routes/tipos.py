# Ruta de tipos en Flask
# Esta ruta conecta la petición HTTP con el controlador de tipos
# Se recomienda usar Blueprints para modularidad

from flask import Blueprint
from controller.tipos_controller import get_tipos

tipos_bp = Blueprint('tipos', __name__)

@tipos_bp.route('/tipos', methods=['GET'])
def tipos():
    # Llama al controlador y retorna la respuesta
    respuesta, status = get_tipos()
    return respuesta, status
