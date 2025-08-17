# Preguntas y respuestas sobre la ruta de logout en Flask

## 1. ¿Cómo se conecta la ruta con el controlador?
- Se importa el controlador y se llama dentro de la función de la ruta.

## 2. ¿Por qué se usa Blueprint?
- Permite modularizar las rutas y agruparlas por funcionalidad.

## 3. ¿Cómo se define la ruta y el método HTTP?
- Con el decorador `@logout_bp.route('/logout', methods=['POST'])`.

## 4. ¿Cómo se retorna la respuesta?
- Se retorna una tupla: `(respuesta, status)`.

## 5. ¿Qué diferencia hay con Express?
- En Express se usa `router.post('/logout', handler)`. En Flask se usa Blueprint y decoradores.

## 6. ¿Cómo se importa el controlador en Python y JS?
- Python: `from controller.logout_controller import post_logout`
- JS: `const { postLogout } = require('./logout.controller')`

## 7. ¿Qué ventajas tiene usar Blueprints?
- Facilita la organización, reutilización y registro de rutas en la app principal.

## 8. ¿Cómo se registra el Blueprint en la app principal?
- En `app.py`: `app.register_blueprint(logout_bp)`

## 9. ¿Cómo se maneja la respuesta JSON?
- Flask convierte automáticamente diccionarios en JSON si se retorna como respuesta.

## 10. Tabla comparativa de rutas
| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Definir ruta          | router.post('/logout', handler)  | @logout_bp.route('/logout', methods=['POST']) |
| Modularización        | router en archivo                | Blueprint en archivo          |
| Importar controlador  | require('./logout.controller')   | from controller.logout_controller import post_logout |
| Retornar respuesta    | res.status(200).json({...})      | return {...}, 200             |
