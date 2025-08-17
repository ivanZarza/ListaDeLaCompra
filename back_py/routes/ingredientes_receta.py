# Ruta de ingredientes_receta en Flask
# Esta ruta conecta la petición HTTP con el controlador de ingredientes_receta
# Se recomienda usar Blueprints para modularidad y snake_case para nombres

from flask import Blueprint, request
from controller.ingredientesReceta_controller import (
    get_ingredientes_receta_por_usuario,
    get_ingredientes_por_receta,
    get_un_ingrediente_receta,
    post_ingrediente_receta,
    post_varios_ingredientes_receta,
    put_ingrediente_receta,
    delete_ingrediente_receta
)

ingredientes_receta_bp = Blueprint('ingredientes_receta', __name__)

@ingredientes_receta_bp.route('/ingredientes_receta/usuario', methods=['GET'])
def ingredientes_receta_por_usuario():
    return get_ingredientes_receta_por_usuario()

@ingredientes_receta_bp.route('/ingredientes_receta/receta/<int:receta_id>', methods=['GET'])
def ingredientes_por_receta(receta_id):
    return get_ingredientes_por_receta(receta_id)

@ingredientes_receta_bp.route('/ingredientes_receta/<int:id>', methods=['GET'])
def un_ingrediente_receta(id):
    return get_un_ingrediente_receta(id)

@ingredientes_receta_bp.route('/ingredientes_receta', methods=['POST'])
def agregar_ingrediente_receta():
    data = request.get_json()
    return post_ingrediente_receta(
        data.get('receta_id'),
        data.get('ingrediente_id'),
        data.get('peso')
    )

@ingredientes_receta_bp.route('/ingredientes_receta/varios', methods=['POST'])
def agregar_varios_ingredientes_receta():
    data = request.get_json()
    return post_varios_ingredientes_receta(data.get('ingredientes'))

@ingredientes_receta_bp.route('/ingredientes_receta/<int:id>', methods=['PUT'])
def actualizar_ingrediente_receta(id):
    data = request.get_json()
    return put_ingrediente_receta(id, data.get('peso'))

@ingredientes_receta_bp.route('/ingredientes_receta/<int:id>', methods=['DELETE'])
def eliminar_ingrediente_receta(id):
    return delete_ingrediente_receta(id)
