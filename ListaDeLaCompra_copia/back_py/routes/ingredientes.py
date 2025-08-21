from flask import Blueprint, request
from controller.ingredientes_controller import get_ingredientes
ingredientes_bp = Blueprint('ingredientes', __name__)
@ingredientes_bp.route('/ingredientes', methods=['GET'])
def obtener_ingredientes():
    nombre = request.args.get('nombre')
    tipo = request.args.get('tipo')
    try:
        pagina = int(request.args.get('pagina', 1))
    except ValueError:
        pagina = 1
    respuesta, status = get_ingredientes(nombre, tipo, pagina)
    return respuesta, status
