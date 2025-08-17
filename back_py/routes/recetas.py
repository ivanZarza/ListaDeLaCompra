# routes/recetas.py
# Rutas Flask para el controlador de recetas
# Todas las rutas en snake_case y con comentarios explicativos

from flask import Blueprint, request, jsonify
from controller.recetas_controller import (
    get_recetas,
    get_detalles_receta,
    post_receta,
    put_receta,
    delete_receta
)

recetas_bp = Blueprint('recetas', __name__)

# Obtener todas las recetas del usuario autenticado
@recetas_bp.route('/recetas', methods=['GET'])
def route_get_recetas():
    # Llama al controlador y devuelve la respuesta
    data, status = get_recetas()
    return jsonify(data), status

# Obtener detalles de una receta (ingredientes y pasos)
@recetas_bp.route('/recetas/<int:id>', methods=['GET'])
def route_get_detalles_receta(id):
    # Llama al controlador y devuelve la respuesta
    data, status = get_detalles_receta(id)
    return jsonify(data), status

# Crear una nueva receta
@recetas_bp.route('/recetas', methods=['POST'])
def route_post_receta():
    # Obtiene los datos del cuerpo de la petición
    body = request.get_json()
    nombre = body.get('nombre')
    descripcion = body.get('descripcion')
    # Llama al controlador y devuelve la respuesta
    data, status = post_receta(nombre, descripcion)
    return jsonify(data), status

# Actualizar una receta existente
@recetas_bp.route('/recetas/<int:id>', methods=['PUT'])
def route_put_receta(id):
    body = request.get_json()
    nombre = body.get('nombre')
    descripcion = body.get('descripcion')
    data, status = put_receta(id, nombre, descripcion)
    return jsonify(data), status

# Eliminar una receta
@recetas_bp.route('/recetas/<int:id>', methods=['DELETE'])
def route_delete_receta(id):
    data, status = delete_receta(id)
    return jsonify(data), status

# Nota: Para usar este Blueprint, debes registrarlo en tu app principal:
# app.register_blueprint(recetas_bp)
