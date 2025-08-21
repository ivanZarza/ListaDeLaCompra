from flask import Flask
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
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=2)
API_PREFIX = '/api/listadelacompra'
app.register_blueprint(recetas_bp, url_prefix=API_PREFIX)
app.register_blueprint(datos_usuario_bp, url_prefix=API_PREFIX)
app.register_blueprint(tipos_bp, url_prefix=API_PREFIX)
app.register_blueprint(logout_bp, url_prefix=API_PREFIX)
app.register_blueprint(ingredientes_bp, url_prefix=API_PREFIX)
app.register_blueprint(pasos_receta_bp, url_prefix=API_PREFIX)
app.register_blueprint(login_bp, url_prefix=API_PREFIX)
app.register_blueprint(ingredientes_receta_bp, url_prefix=API_PREFIX)
app.register_blueprint(registro_bp, url_prefix=API_PREFIX)
@app.route('/')
def home():
    return {'mensaje': 'API Flask funcionando'}, 200
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
