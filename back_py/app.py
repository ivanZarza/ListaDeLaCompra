
# app.py - Punto de entrada principal para la API Flask
# Inicializa la app, configura la sesión y registra los Blueprints

from flask import Flask, session
""" from flask_session import Session  # Para gestionar sesiones en servidor """
from routes.recetas import recetas_bp
from routes.datos_usuario import datos_usuario_bp
from routes.tipos import tipos_bp
from routes.logout import logout_bp
from routes.ingredientes import ingredientes_bp
from routes.pasos_receta import pasos_receta_bp
from routes.login import login_bp
from routes.ingredientes_receta import ingredientes_receta_bp
from routes.registro import registro_bp

import os
from datetime import timedelta

# Crea la instancia de Flask
app = Flask(__name__)

# Configuración de la clave secreta para sesiones
app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')


# Configuración de sesiones en servidor (no cookies)
app.config['SESSION_TYPE'] = 'filesystem'
""" Session(app)
"""

# Duración de la cookie de sesión (por ejemplo, 2 horas)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=2)



# Prefijo común para todas las rutas de la API
API_PREFIX = '/api/listadelacompra'

# Registro de todos los Blueprints de rutas usando el prefijo

app.register_blueprint(recetas_bp, url_prefix=API_PREFIX)
app.register_blueprint(datos_usuario_bp, url_prefix=API_PREFIX)
app.register_blueprint(tipos_bp, url_prefix=API_PREFIX)
app.register_blueprint(logout_bp, url_prefix=API_PREFIX)
app.register_blueprint(ingredientes_bp, url_prefix=API_PREFIX)
app.register_blueprint(pasos_receta_bp, url_prefix=API_PREFIX)
app.register_blueprint(login_bp, url_prefix=API_PREFIX)
app.register_blueprint(ingredientes_receta_bp, url_prefix=API_PREFIX)
app.register_blueprint(registro_bp, url_prefix=API_PREFIX)

# Ruta de prueba para verificar que la API está viva
@app.route('/')
def home():
    return {'mensaje': 'API Flask funcionando'}, 200

# Arranque de la app
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
