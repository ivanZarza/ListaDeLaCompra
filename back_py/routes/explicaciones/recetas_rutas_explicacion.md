# Preguntas y respuestas sobre las rutas de recetas en Flask

## 1. ¿Cómo se organiza el archivo de rutas?
- Se usa un Blueprint llamado `recetas_bp` para agrupar todas las rutas relacionadas con recetas.
- Cada ruta llama a la función correspondiente del controlador y devuelve la respuesta como JSON.

## 2. ¿Por qué se usa snake_case en las rutas y funciones?
- Es la convención oficial en Python (PEP 8) y facilita la coherencia en todo el proyecto.

## 3. ¿Cómo se obtienen los datos del usuario autenticado?
- El controlador accede a la sesión con `session.get('usuario_id')`.
- Si el usuario no está autenticado, se devuelve un error 401.

## 4. ¿Cómo se reciben los datos en POST y PUT?
- Se usa `request.get_json()` para obtener el cuerpo de la petición como diccionario.
- Se extraen los campos `nombre` y `descripcion` para crear o actualizar la receta.

## 5. ¿Cómo se maneja la respuesta del controlador?
- El controlador devuelve una tupla `(data, status)`.
- La ruta usa `jsonify(data), status` para enviar la respuesta al frontend.
Qué hace jsonify y de dónde viene?
- jsonify es una función de Flask que convierte automáticamente diccionarios y listas de Python en una respuesta JSON válida para el frontend. Además, establece el tipo de contenido (Content-Type: application/json) y gestiona la codificación.
Se importa desde el propio paquete Flask:
from flask import jsonify
- Convierte automáticamente diccionarios y listas de Python en JSON válido para el frontend.
- Gestiona el tipo de contenido y la codificación.

## 6. ¿Cómo se convierten las tuplas SQL en diccionarios?
- El controlador usa `[dict(zip([desc[0] for desc in cursor.description], r)) for r in recetas]` para convertir cada tupla en un diccionario.
- Así el frontend recibe una lista de objetos con claves y valores, no tuplas.

## 7. ¿Cómo se registran los Blueprints en Flask?
- En la app principal se debe usar: `app.register_blueprint(recetas_bp)`.
- Esto permite modularizar el código y separar las rutas por funcionalidad.

## 8. ¿Qué diferencia hay entre Node.js y Flask en la gestión de rutas?
- Node.js usa `router.get`, `router.post`, etc. y Express para agrupar rutas.
- Flask usa Blueprints y decoradores `@route` para definir rutas y métodos HTTP.

## 9. ¿Cómo se maneja el control de errores?
- Si ocurre un error, el controlador devuelve un mensaje y el código de estado correspondiente (400, 401, 404, 500).
- La ruta simplemente pasa esa respuesta al frontend.

## 10. ¿Por qué es útil separar rutas y controladores?
- Permite mantener el código organizado, facilitar el mantenimiento y la reutilización.
- Los controladores gestionan la lógica de negocio y las rutas solo reciben y envían datos.

## 11. ¿Cómo se accede a los parámetros de la URL?
- En Flask, se usa `<int:id>` en la ruta y el parámetro se pasa como argumento a la función.
- Ejemplo: `/recetas/5` llama a `route_get_detalles_receta(5)`.

## 12. ¿Cómo se accede a los datos del cuerpo de la petición?
- Se usa `request.get_json()` para obtener los datos enviados por el frontend en formato JSON.

## 13. ¿Qué ventajas tiene usar jsonify?
- Convierte automáticamente diccionarios y listas de Python en JSON válido para el frontend.
- Gestiona el tipo de contenido y la codificación.

## 14. ¿Qué métodos HTTP se usan y para qué?
- GET: obtener recetas o detalles.
- POST: crear receta.
- PUT: actualizar receta.
- DELETE: eliminar receta.

## 15. ¿Cómo se asegura la coherencia en todo el proyecto?
- Usando siempre los mismos nombres de variables (`db`, `get_connection`), snake_case y separando rutas/controladores.
