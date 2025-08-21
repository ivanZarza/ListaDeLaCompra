from flask import Blueprint
from controller.tipos_controller import get_tipos
tipos_bp = Blueprint('tipos', __name__)
@tipos_bp.route('/tipos', methods=['GET'])
def tipos():
    respuesta, status = get_tipos()
    return respuesta, status
