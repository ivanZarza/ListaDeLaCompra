from flask import Blueprint, request, jsonify
from controller.recetas_controller import (
    get_recetas,
    get_detalles_receta,
    post_receta,
    put_receta,
    delete_receta
)
recetas_bp = Blueprint('recetas', __name__)
@recetas_bp.route('/usuario/recetas', methods=['GET'])
def route_get_recetas():
    data, status = get_recetas()
    return jsonify(data), status
@recetas_bp.route('/usuario/recetas/<id>', methods=['GET'])
def route_get_detalles_receta(id):
    data, status = get_detalles_receta(id)
    return jsonify(data), status
@recetas_bp.route('/usuario/recetas', methods=['POST'])
def route_post_receta():
    body = request.get_json()
    nombre = body.get('nombre')
    descripcion = body.get('descripcion')
    data, status = post_receta(nombre, descripcion)
    return jsonify(data), status
@recetas_bp.route('/usuario/recetas/<id>', methods=['PUT'])
def route_put_receta(id):
    body = request.get_json()
    nombre = body.get('nombre')
    descripcion = body.get('descripcion')
    data, status = put_receta(id, nombre, descripcion)
    return jsonify(data), status
@recetas_bp.route('/usuario/recetas/<id>', methods=['DELETE'])
def route_delete_receta(id):
    data, status = delete_receta(id)
    return jsonify(data), status
