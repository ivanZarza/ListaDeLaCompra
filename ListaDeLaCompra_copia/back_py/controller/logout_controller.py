from flask import session

def post_logout():
    try:
        if session.get('usuario_id'):
            session.clear()
            return {'mensaje': 'Sesion cerrada correctamente'}, 200
        else:
            return {'error': 'No hay sesion activa'}, 400
    except Exception:
        return {'error': 'Error interno del servidor'}, 500
