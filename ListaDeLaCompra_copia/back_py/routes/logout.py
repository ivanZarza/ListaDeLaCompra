from flask import Blueprint
from controller.logout_controller import post_logout
logout_bp = Blueprint('logout', __name__)
@logout_bp.route('/logout', methods=['POST'])
def logout():
    respuesta, status = post_logout()
    return respuesta, status
