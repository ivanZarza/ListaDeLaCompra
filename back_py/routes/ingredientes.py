# Rutas para ingredientes usando Flask Blueprint
# En Flask se usa Blueprint para modularizar rutas (en Express se usan routers)
from flask import Blueprint, request  # Importa objetos de Flask
from controller.ingredientes_controller import get_ingredientes  # Importa el controlador de ingredientes

ingredientes_bp = Blueprint('ingredientes', __name__)

# Ruta GET para obtener ingredientes con filtros y paginación
@ingredientes_bp.route('/ingredientes', methods=['GET'])
def obtener_ingredientes():
    # Obtiene los parámetros de la query string (en JS: req.query)
    nombre = request.args.get('nombre')
    tipo = request.args.get('tipo')
    try:
        pagina = int(request.args.get('pagina', 1))
    except ValueError:
        pagina = 1
    # Llama al controlador y devuelve la respuesta y el status
    respuesta, status = get_ingredientes(nombre, tipo, pagina)
    return respuesta, status
