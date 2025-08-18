# Preguntas y respuestas sobre el archivo app.py (Flask)

## 1. ¿Qué hace app.py?
- Es el punto de entrada principal de la API Flask. Inicializa la app, configura la sesión y registra los Blueprints.

## 2. ¿Por qué se usa Flask y Flask-Session?
- Flask gestiona las rutas y la lógica web. Flask-Session permite guardar la sesión en el servidor (más seguro que solo en cookies).

## 3. ¿Cómo se configura la clave secreta?
- Se usa `app.secret_key` para proteger la sesión. Puede venir de una variable de entorno o ser fija para desarrollo.

## 4. ¿Cómo se configuran las sesiones?
- `SESSION_TYPE = 'filesystem'` guarda la sesión en archivos temporales del servidor.
- `Session(app)` inicializa la gestión de sesiones.

## 5. ¿Cómo se registran los Blueprints?
- Con `app.register_blueprint(recetas_bp)`, se añaden todas las rutas del módulo recetas.

## 6. ¿Cómo se define una ruta de prueba?
- Con `@app.route('/')` se crea una ruta raíz que responde con un mensaje para verificar que la API está viva.

## 7. ¿Cómo se arranca la app?
- Con `app.run(debug=True, host='0.0.0.0', port=5000)` se inicia el servidor Flask en modo desarrollo.

## 8. ¿Por qué se usa 'if __name__ == "__main__"'?
- Para que la app solo se ejecute si el archivo se lanza directamente y no cuando se importa como módulo.

## 9. ¿Qué diferencia hay con Node.js/Express?
- Express usa `app.use` y `require` para rutas y middlewares. Flask usa Blueprints y decoradores `@app.route`.
- La gestión de sesiones en Express suele ser con `express-session` y en Flask con `flask-session`.

## 10. ¿Cómo se accede a la sesión en los controladores?
- Se importa `session` desde Flask y se usa `session.get('usuario_id')` para obtener el usuario autenticado.

## 11. ¿Cómo se puede cambiar el puerto o el modo debug?
- Modificando los parámetros de `app.run()`.

## 12. ¿Qué ventajas tiene usar Blueprints?
- Permite modularizar el código, separar rutas por funcionalidad y facilitar el mantenimiento.

## 13. ¿Cómo se agregan más rutas o Blueprints?
- Se crean nuevos archivos en la carpeta `routes` y se registran con `app.register_blueprint(...)`.

## 14. ¿Cómo se protege la API en producción?
- Usando una clave secreta fuerte, configurando HTTPS y gestionando sesiones en servidor o base de datos.

## 15. ¿Cómo se accede a variables de entorno?
- Con `os.environ.get('NOMBRE', 'valor_por_defecto')`.

# Preguntas y respuestas sobre la configuración inicial de Flask y sesiones

## 1. ¿Qué hace `app = Flask(__name__)`?
- Crea la instancia principal de la aplicación Flask.
- El parámetro `__name__` indica el nombre del módulo actual y permite a Flask encontrar archivos estáticos y plantillas.
- Es el objeto central sobre el que se configuran rutas, sesiones y Blueprints.

## 2. ¿Qué hace `app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')`?
- Define la clave secreta que Flask usa para cifrar y proteger la sesión del usuario.
- Se recomienda obtenerla de una variable de entorno (`SECRET_KEY`) para mayor seguridad en producción.
- Si no existe la variable, usa `'supersecretkey'` como valor por defecto (solo recomendable en desarrollo).
- Sin esta clave, Flask no puede gestionar sesiones seguras.

## 3. ¿Qué hace `app.config['SESSION_TYPE'] = 'filesystem'`?
- Configura el tipo de almacenamiento de la sesión.
- `'filesystem'` guarda los datos de sesión en archivos temporales en el servidor.
- Es útil para desarrollo y pruebas; en producción se recomienda usar base de datos o Redis.
- Otras opciones posibles: `'redis'`, `'mongodb'`, `'sqlalchemy'`, `'memcached'`, etc.

## 4. ¿Qué hace `Session(app)`?
- Inicializa la extensión Flask-Session sobre la app Flask.
- Permite que la sesión se gestione en el servidor según la configuración anterior.
- Sin esto, Flask solo gestiona sesiones en cookies (menos seguro y menos flexible).
- Es necesario para usar `session` en los controladores y rutas.

## 5. ¿Por qué es importante esta configuración?
- Permite gestionar usuarios autenticados y datos persistentes entre peticiones.
- Protege la información sensible de los usuarios.
- Facilita la escalabilidad y la seguridad de la API.

## 6. ¿Qué buenas prácticas hay?
- Usar una clave secreta fuerte y única en producción.
- No compartir la clave secreta en el código fuente.
- Elegir el tipo de sesión adecuado según el entorno (filesystem para desarrollo, Redis o base de datos para producción).
- Configurar correctamente los permisos de los archivos de sesión.

## 7. ¿Dónde se puede consultar más sobre la configuración de sesiones?
- Documentación oficial de Flask: https://flask.palletsprojects.com/en/latest/
- Documentación de Flask-Session: https://flask-session.readthedocs.io/en/latest/

## 8. ¿Qué opciones de configuración se pueden usar en cada línea?

### 1. `app = Flask(__name__)`
- Puedes pasar parámetros opcionales:
  - `static_url_path`: Cambia la URL de los archivos estáticos.
  - `static_folder`: Carpeta donde se guardan los archivos estáticos.
  - `template_folder`: Carpeta de las plantillas HTML.
  - Ejemplo: `app = Flask(__name__, static_folder='static', template_folder='templates')`

### 2. `app.secret_key = ...`
- Puedes definir la clave directamente o usar variables de entorno.
- En producción, usa una clave larga y aleatoria.
- Ejemplo: `app.secret_key = 'mi_clave_super_segura_123!@#'`

### 3. `app.config['SESSION_TYPE'] = 'filesystem'`
- Puedes cambiar el tipo de sesión:
  - `'redis'`: Usa Redis para almacenar sesiones.
  - `'mongodb'`: Usa MongoDB.
  - `'sqlalchemy'`: Usa una base de datos SQL.
  - `'memcached'`: Usa Memcached.
- Ejemplo: `app.config['SESSION_TYPE'] = 'redis'`
- Otras opciones útiles:
  - `SESSION_PERMANENT`: Si la sesión debe ser permanente (`True` o `False`).
  - `SESSION_USE_SIGNER`: Firma la sesión para mayor seguridad (`True` o `False`).
  - `SESSION_KEY_PREFIX`: Prefijo para las claves de sesión.
  - `SESSION_FILE_DIR`: Carpeta donde se guardan los archivos de sesión si usas `'filesystem'`.

### 4. `Session(app)`
- Puedes pasar la app directamente o configurar antes con un objeto `Session`.
- Ejemplo avanzado:
  ```python
  sess = Session()
  sess.init_app(app)
  ```
- Así puedes modificar la configuración antes de inicializar la sesión.

## 9. ¿Dónde consultar todas las opciones?
- Documentación de Flask: https://flask.palletsprojects.com/en/latest/config/
- Documentación de Flask-Session: https://flask-session.readthedocs.io/en/latest/

# Preguntas y respuestas sobre el arranque de la app Flask (líneas finales de app.py)

## 1. ¿Qué significa `if __name__ == "__main__":`?
- Es una condición estándar en Python que comprueba si el archivo se está ejecutando directamente (por ejemplo, con `python app.py`).
- Si el archivo se importa como módulo en otro archivo, el bloque no se ejecuta.
- Así se evita que el servidor Flask se inicie automáticamente al importar el archivo para pruebas o desde otros módulos.

## 2. ¿Qué hace `app.run(...)`?
- Inicia el servidor web Flask y pone la API en funcionamiento.
- Es el método principal para lanzar la aplicación en modo desarrollo.

## 3. ¿Qué significa `debug=True`?
- Activa el modo debug de Flask.
- Permite ver errores detallados en el navegador si ocurre una excepción.
- Recarga automáticamente la app cuando se modifica el código fuente (hot reload).
- Es útil para desarrollo, pero nunca debe usarse en producción porque muestra información sensible.

## 4. ¿Qué significa `host='0.0.0.0'`?
- Hace que la API sea accesible desde cualquier IP de la red local, no solo desde localhost.
- Si usas `host='127.0.0.1'` solo podrías acceder desde la misma máquina.
- Es útil para probar desde otros dispositivos (móvil, otro PC) en la misma red.

## 5. ¿Qué significa `port=5000`?
- Define el puerto en el que se ejecuta la API Flask.
- El valor por defecto de Flask es 5000, pero puedes cambiarlo si lo necesitas.
- Para acceder a la API, usarías la URL `http://localhost:5000` o `http://<ip_local>:5000`.

## 6. ¿Por qué es importante este bloque?
- Permite controlar cuándo y cómo se arranca la app.
- Facilita el desarrollo y las pruebas locales.
- Evita problemas al importar el archivo en otros contextos.

## 7. ¿Qué diferencia hay con Node.js/Express?
- En Express, el arranque suele ser con `app.listen(port, ...)`.
- En Flask, se usa `app.run(...)` y la condición `if __name__ == "__main__":`.
- Ambos permiten definir el puerto y el modo de ejecución.

## 8. ¿Qué buenas prácticas hay para producción?
- No usar `debug=True` en producción.
- Usar un servidor WSGI como Gunicorn o uWSGI para desplegar Flask.
- Configurar el host y el puerto según las necesidades del entorno.

## 9. ¿Cómo se puede cambiar el puerto o el host?
- Modificando los parámetros de `app.run()`, por ejemplo: `app.run(host='127.0.0.1', port=8080)`.

## 10. ¿Qué ocurre si omites este bloque?
- Si ejecutas el archivo directamente, la app no se iniciará y no podrás acceder a la API.
- Si importas el archivo en otro módulo, no se lanzará el servidor automáticamente, lo cual es lo deseado para pruebas o scripts.

## 11. ¿Qué otras opciones se pueden usar en `app.run()`?
- `debug`: Activa/desactiva el modo debug (`True` o `False`).
- `host`: IP en la que se expone la API (`'127.0.0.1'`, `'0.0.0.0'`, etc.).
- `port`: Puerto de escucha (por defecto 5000, pero puedes poner 8080, 3000, etc.).
- `use_reloader`: Si es `True`, recarga la app automáticamente al cambiar el código (por defecto `True` si debug está activo).
- `use_debugger`: Si es `True`, muestra el debugger interactivo en caso de error.
- `threaded`: Si es `True`, permite manejar varias peticiones simultáneas usando hilos.
- `processes`: Número de procesos para manejar peticiones (no suele usarse en desarrollo).
- `ssl_context`: Permite activar HTTPS, por ejemplo: `ssl_context='adhoc'` para desarrollo.

### Ejemplo de uso avanzado:
```python
app.run(debug=True, host='127.0.0.1', port=8080, use_reloader=False, threaded=True)
```

## 12. ¿Cuándo usar cada opción?
- `debug=True`: Solo en desarrollo, nunca en producción.
- `host='0.0.0.0'`: Para acceder desde otros dispositivos en la red local.
- `port=3000`: Si tienes otro servicio en el puerto 5000 o prefieres otro número.
- `use_reloader=False`: Si no quieres que Flask recargue la app automáticamente.
- `threaded=True`: Si esperas varias peticiones simultáneas y quieres probar concurrencia.
- `ssl_context='adhoc'`: Para probar HTTPS en local sin certificado.

## 13. ¿Dónde puedo ver todas las opciones?
- En la documentación oficial de Flask: https://flask.palletsprojects.com/en/latest/api/#flask.Flask.run
