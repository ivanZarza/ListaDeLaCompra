# Ruta de pasos_receta en Flask
# Todas las funciones y rutas en snake_case
# Modularizado con Blueprint

from flask import Blueprint, request
from controller.pasos_receta_controller import (
    get_pasos_receta_por_usuario,
    get_pasos_receta_por_receta,
    get_un_paso_receta,
    post_paso_receta,
    post_varios_pasos_receta,
    put_paso_receta,
    delete_paso_receta
)

pasos_receta_bp = Blueprint('pasos_receta', __name__)

@pasos_receta_bp.route('/pasos_receta/usuario', methods=['GET'])
def pasos_receta_por_usuario():
    return get_pasos_receta_por_usuario()

@pasos_receta_bp.route('/pasos_receta/receta/<int:receta_id>', methods=['GET'])
def pasos_receta_por_receta(receta_id):
    return get_pasos_receta_por_receta(receta_id)

@pasos_receta_bp.route('/pasos_receta/<int:id>', methods=['GET'])
def un_paso_receta(id):
    return get_un_paso_receta(id)

@pasos_receta_bp.route('/pasos_receta', methods=['POST'])
def agregar_paso_receta():
    data = request.get_json()
    return post_paso_receta(
        data.get('receta_id'),
        data.get('elaboracion'),
        data.get('imagen')
    )

@pasos_receta_bp.route('/pasos_receta/varios', methods=['POST'])
def agregar_varios_pasos_receta():
    data = request.get_json()
    return post_varios_pasos_receta(data.get('pasos'))

@pasos_receta_bp.route('/pasos_receta/<int:id>', methods=['PUT'])
def actualizar_paso_receta(id):
    data = request.get_json()
    return put_paso_receta(
        id,
        data.get('receta_id'),
        data.get('elaboracion'),
        data.get('imagen')
    )

@pasos_receta_bp.route('/pasos_receta/<int:id>', methods=['DELETE'])
def eliminar_paso_receta(id):
    return delete_paso_receta(id)
