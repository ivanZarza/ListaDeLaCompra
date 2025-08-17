# Preguntas y respuestas sobre la ruta de tipos en Flask

## 1. ¿Cómo se conecta la ruta con el controlador?
- Se importa el controlador y se llama dentro de la función de la ruta.

## 2. ¿Por qué se usa Blueprint?
- Permite modularizar las rutas y agruparlas por funcionalidad.

## 3. ¿Cómo se define la ruta y el método HTTP?
- Con el decorador `@tipos_bp.route('/tipos', methods=['GET'])`.

## 4. ¿Cómo se retorna la respuesta?
- Se retorna una tupla: `(respuesta, status)`.

## 5. ¿Qué diferencia hay con Express?
- En Express se usa `router.get('/tipos', handler)`. En Flask se usa Blueprint y decoradores.

## 6. ¿Cómo se importa el controlador en Python y JS?
- Python: `from controller.tipos_controller import get_tipos`
- JS: `const { getTipos } = require('./tipos.controller')`

## 7. ¿Qué ventajas tiene usar Blueprints?
- Facilita la organización, reutilización y registro de rutas en la app principal.

## 8. ¿Cómo se registra el Blueprint en la app principal?
- En `app.py`: `app.register_blueprint(tipos_bp)`

## 9. ¿Cómo se maneja la respuesta JSON?
- Flask convierte automáticamente diccionarios en JSON si se retorna como respuesta.

## 10. Tabla comparativa de rutas
| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Definir ruta          | router.get('/tipos', handler)    | @tipos_bp.route('/tipos', methods=['GET']) |
| Modularización        | router en archivo                | Blueprint en archivo          |
| Importar controlador  | require('./tipos.controller')    | from controller.tipos_controller import get_tipos |
| Retornar respuesta    | res.json(tipos)                  | return tipos_list, 200        |

## 11. ¿Para qué sirve el parámetro __name__ en Blueprint?
- El parámetro `__name__` indica el nombre del módulo donde se está definiendo el Blueprint.
- Flask lo utiliza para localizar recursos estáticos, plantillas y organizar internamente las rutas.
- Es necesario para que Flask registre correctamente el Blueprint en la aplicación principal.
- Ejemplo: `tipos_bp = Blueprint('tipos', __name__)`.
- Así Flask sabe que el Blueprint 'tipos' está definido en el módulo actual y puede gestionar sus rutas y recursos asociados.
