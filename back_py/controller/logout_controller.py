# Controlador de logout (versión Python, Flask)
# En Python se recomienda snake_case para nombres de archivos y funciones
# Este controlador implementa la lógica para cerrar la sesión del usuario

from flask import session  # Importa el objeto session de Flask

def post_logout():
    try:
        # Verifica si hay sesión activa (en JS: req.session && req.session.usuarioId)
        if session.get('usuario_id'):
            # Elimina los datos de la sesión (en JS: req.session.destroy())
            session.clear()  # Borra toda la sesión en Flask
            return {'mensaje': 'Sesión cerrada correctamente'}, 200
        else:
            return {'error': 'No hay sesión activa'}, 400
    except Exception as e:
        print('Error en el logout:', e)
        return {'error': 'Error interno del servidor'}, 500
