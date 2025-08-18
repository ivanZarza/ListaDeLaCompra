# Resumen general de preguntas y respuestas sobre rutas en Flask

## Índice
1. Diccionarios y listas en Python
2. Comparaciones clave entre Flask y Node.js/Express
3. Modularización: Blueprints vs Routers
4. Parámetros y manejo de datos en rutas
5. Autenticación y sesión
6. Respuestas y manejo de estado
7. Decoradores en Python
8. Ejemplos y tablas comparativas

---

### 1. Diccionarios y listas en Python
+ Listas: se declaran con corchetes. Métodos útiles:
  - `.append(x)`: añade un elemento al final de la lista.
  - `.extend(iterable)`: añade todos los elementos de un iterable al final de la lista.
  - `.pop([i])`: elimina y devuelve el elemento en la posición `i` (por defecto el último).
  - `.remove(x)`: elimina la primera aparición del valor `x`.
  - `.sort()`: ordena la lista in-place.
  - `.reverse()`: invierte el orden de la lista in-place.
  - `len(lista)`: devuelve el número de elementos de la lista.

Diccionarios: se declaran con llaves. Métodos útiles:
  - `.get(clave, valor_por_defecto)`: obtiene el valor de una clave, devuelve `valor_por_defecto` si no existe.
  - `.keys()`: devuelve una vista con todas las claves.
  - `.values()`: devuelve una vista con todos los valores.
  - `.items()`: devuelve una vista con pares `(clave, valor)`.
  - `.update(dic2)`: actualiza el diccionario con los pares de otro diccionario.
  - `.pop(clave)`: elimina la clave y devuelve su valor.
  - `len(dic)`: devuelve el número de pares clave-valor.

Acceso: `lista[indice]`, `dic['clave']` o `dic.get('clave')`.
Diferencia con JS: arrays usan `.push()`, objetos usan punto/corchetes.

---

### 2. Comparaciones clave entre Flask y Node.js/Express
- Flask usa Blueprints para modularizar rutas, Express usa Routers.
- Decoradores en Flask (`@route`) vs métodos en Express (`router.get`, `router.post`).
- En Flask se devuelve una tupla `(respuesta, status)`, en Express se usa `res.status(status).json(respuesta)`.
- Flask usa el objeto `session`, Express usa `req.session` (con express-session).
- Parámetros en rutas: Flask `<tipo:nombre>`, Express `:nombre`.

---

### 3. Modularización: Blueprints vs Routers
- Blueprints permiten agrupar rutas por funcionalidad y registrarlas en la app principal.
- Ejemplo Flask: `Blueprint('nombre', __name__)`.
- Ejemplo Express: `const router = express.Router()`.

---

### 4. Parámetros y manejo de datos en rutas
- En Flask: `request.get_json()` para JSON, `request.form` para formularios, `request.args.get('param')` para query string.
- En Express: `req.body` para JSON, `req.query.param` para query string.
- Paginación: en Flask se obtiene y convierte el parámetro, en Express se usa `Number(req.query.pagina) || 1`.

---

### 5. Autenticación y sesión
- En Flask: `session.get('usuario_id')` para obtener el usuario autenticado.
- En Express: `req.session.usuarioId`.
- Es recomendable obtener el usuario_id desde la sesión y no desde la URL o el body.
- Tras login, se guarda el usuario en la sesión: `session['usuario_id'] = ...` (Flask), `req.session.usuarioId = ...` (Express).

---

### 6. Respuestas y manejo de estado
- En Flask: `return respuesta, status` (tupla).
- En Express: `res.status(status).json(respuesta)`.
- Flask convierte automáticamente diccionarios en JSON.
- Control de errores: devolver mensaje y código de estado adecuado (400, 401, 404, 500).
 - Usar siempre `cursor = db.cursor(dictionary=True)` en las consultas que devuelven datos, para obtener listas de diccionarios y evitar bucles de conversión manual.

---

### 7. Decoradores en Python
- El símbolo `@` en Python se llama decorador y modifica el comportamiento de la función que sigue.
- En Flask, `@route` asocia la función a una URL y la convierte en una vista HTTP.
- La función definida justo debajo del decorador es la que responde a la petición.

---

### 8. Ejemplos y tablas comparativas
- Ejemplo de ruta con parámetro:
  - Flask: `@blueprint.route('/usuario/<int:usuario_id>')`
  - Express: `router.get('/usuario/:usuarioId', handler)`
- Ejemplo de modularización:
  - Flask: `app.register_blueprint(recetas_bp)`
  - Express: `app.use('/recetas', recetasRouter)`
- Tabla comparativa de rutas:

| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Definir ruta          | router.get('/tipos', handler)    | @tipos_bp.route('/tipos', methods=['GET']) |
| Modularización        | router en archivo                | Blueprint en archivo          |
| Importar controlador  | require('./tipos.controller')    | from controller.tipos_controller import get_tipos |
| Retornar respuesta    | res.json(tipos)                  | return tipos_list, 200        |

---

Este resumen agrupa las preguntas y respuestas más relevantes sobre rutas en Flask, comparaciones con Express, y conceptos clave para aprender backend en Python.

¿Quieres agregar más preguntas, ejemplos o una sección específica?
