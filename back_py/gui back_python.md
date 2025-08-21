

## 1. Conceptos del lenguaje Python y diferencias con JavaScript

---

### Sintaxis básica: variables, funciones, condicionales, bucles

**Python:**
if condicion:
    # código
if not condicion:
    # negación

**JavaScript:**
if (condicion) {
  // código
}
if (!condicion) {
  // negación
}


---

### Declaración de variables

**Python:**
nombre = "Juan"
edad = 30
activo = True

**JavaScript:**
let nombre = "Juan";
let edad = 30;
let activo = true;


---

### Declaración de funciones

**Python:**
def saludar(nombre):
    return f"Hola, {nombre}!"

print(saludar("Ana"))

**JavaScript:**
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

console.log(saludar("Ana"));


---

### Condicionales

**Python:**
if edad >= 18:
    print("Mayor de edad")
else:
    print("Menor de edad")

**JavaScript:**
if (edad >= 18) {
  console.log("Mayor de edad");
} else {
  console.log("Menor de edad");
}


---

### Bucles

**Python:**
for i in range(5):
    print(i)

while condicion:
    # código
    break

**JavaScript:**
for (let i = 0; i < 5; i++) {
  console.log(i);
}

while (condicion) {
  // código
  break;
}


---

### Declaración de clases

**Python:**
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    def saludar(self):
        return f"Hola, soy {self.nombre} y tengo {self.edad} años."

p = Persona("Juan", 30)
print(p.saludar())

**¿Es obligatorio poner `self` en los métodos de instancia?**
> En Python siempre debes poner `self` como primer parámetro en los métodos de instancia. `self` representa la propia instancia del objeto y permite acceder a sus atributos y otros métodos. Si lo omites, Python dará error porque el método no recibirá la instancia.
>
> Ejemplo incorrecto (falta `self`, da error):
>
> class Persona:
>     def saludar():
>         print("Hola")
>
> p = Persona()
> p.saludar()  # TypeError: saludar() takes 0 positional arguments but 1 was given
> 
> Ejemplo correcto:
>
> class Persona:
>     def saludar(self):
>         print("Hola")
>
> p = Persona()
> p.saludar()  # Imprime "Hola"
> 
> En resumen: siempre pon `self` como primer parámetro en los métodos de instancia de una clase Python.

**JavaScript:**
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  saludar() {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
  }
}

const p = new Persona("Juan", 30);
console.log(p.saludar());


---

### Importaciones

**Python:**
# Importar todo el módulo
import math
print(math.sqrt(16))

# Importar solo una función
from math import sqrt
print(sqrt(25))

# Importar con alias
import numpy as np

**JavaScript:**
// CommonJS
const fs = require('fs');

// ES Modules
import { readFileSync } from 'fs';

// Importar con alias
import * as utils from './utils.js';


---

### Listas y diccionarios: métodos y acceso

**Listas (Python):**
- `.append(x)`: añade un elemento al final de la lista.
- `.extend(iterable)`: añade todos los elementos de un iterable al final de la lista.
- `.pop([i])`: elimina y devuelve el elemento en la posición `i` (por defecto el último).
- `.remove(x)`: elimina la primera aparición del valor `x`.
- `.sort()`: ordena la lista in-place.
- `.reverse()`: invierte el orden de la lista in-place.
- `len(lista)`: devuelve el número de elementos de la lista.

**Diccionarios (Python):**
- `.get(clave, valor_por_defecto)`: obtiene el valor de una clave, devuelve `valor_por_defecto` si no existe.
- `.keys()`: devuelve una vista con todas las claves.
- `.values()`: devuelve una vista con todos los valores.
- `.items()`: devuelve una vista con pares `(clave, valor)`.
- `.update(dic2)`: actualiza el diccionario con los pares de otro diccionario.
- `.pop(clave)`: elimina la clave y devuelve su valor.
- `len(dic)`: devuelve el número de pares clave-valor.

**Acceso:** `lista[indice]`, `dic['clave']` o `dic.get('clave')`

**Diferencia con JS:** arrays usan `.push()`, objetos usan punto/corchetes.

---

### Manejo de errores y excepciones

- **Python:** `try/except Exception as e`
- **JavaScript:** `try/catch (error)`

---

### Convenciones de nombres

- **Python:** `snake_case`
- **JavaScript:** `camelCase`

---

### None vs null

- **Python:** `None`
- **JavaScript:** `null`

**Explicación:**
- En Python, `None` es un valor especial que representa la ausencia de valor o un valor nulo. Es equivalente a `null` en JavaScript.
- En JavaScript, `null` también indica ausencia de valor, pero existe además `undefined` para variables no inicializadas.

**Notas:**
- En Python, se usa `is None` para comparar, nunca `== None`.
- En JavaScript, se usa `=== null` para comparar.

---

## 2. Controladores

---

### ¿Qué es un controlador? Estructura y propósito
- Encargado de la lógica de negocio y procesamiento de datos.
- En Flask, suelen recibir solo los parámetros relevantes; en Express, reciben `req` y `res`.

---

### Extracción y manejo de parámetros

- **Flask:** `request.form`, `request.args`, `request.get_json()`
  - **request.form**: Permite acceder a los datos enviados por el frontend mediante un formulario HTML (método POST). Es un diccionario especial donde cada campo del formulario se obtiene por su nombre. Ejemplo: `nombre = request.form.get('nombre')`.
  - **request.args**: Permite acceder a los parámetros enviados en la URL como query string (por ejemplo, `/ruta?pagina=2`). Es útil para obtener filtros, paginación, etc. Ejemplo: `pagina = request.args.get('pagina', 1)`.
  - **request.get_json()**: Permite acceder a los datos enviados en el cuerpo de la petición en formato JSON (por ejemplo, desde un frontend SPA o una API). Devuelve un diccionario con los datos recibidos. Ejemplo: `datos = request.get_json()`.
- **Express:** `req.body`, `req.query`, `req.params`

---

### Lógica de negocio y procesamiento de datos
- Ejemplo de conversión de tuplas SQL a diccionarios:
recetas_list = [dict(zip([desc[0] for desc in cursor.description], r)) for r in recetas]

- Permite que el frontend reciba datos en formato JSON, más fácil de consumir que una lista de tuplas.

**Pero si usas `dictionary=True` al crear el cursor, este bucle es innecesario:**
cursor = db.cursor(dictionary=True)
cursor.execute("SELECT * FROM recetas")
recetas_list = cursor.fetchall()  # Ya devuelve una lista de diccionarios

Así cada fila ya es un diccionario y puedes devolverlo directamente con `jsonify(recetas_list)`.

---

### Ejemplos de controladores en Flask y Express

**Flask:**
@app.route('/recetas')
def get_recetas():
    recetas, status = controlador_get_recetas()
    return jsonify(recetas), status

**Express:**
router.get('/recetas', async (req, res) => {
  const recetas = await getRecetas();
  res.status(200).json(recetas);
});


---

### Parámetros en rutas y función del controlador
En Flask, los parámetros de la ruta (`<int:id>`) se pasan directamente como argumentos a la función del controlador. Esto permite que la función reciba solo los datos relevantes, sin necesidad de acceder a un objeto global como `request`. Es más limpio y facilita la reutilización y el testeo de la función.

@app.route('/recetas/<int:id>')
def get_receta(id):
    receta = obtener_receta_por_id(id)
    return jsonify(receta)


---

### Métodos principales del objeto de conexión
- `cursor(dictionary=True)`: Crea y devuelve un cursor para ejecutar consultas. Si usas `dictionary=True`, los resultados serán diccionarios.
- `commit()`: Confirma los cambios realizados en la base de datos (INSERT, UPDATE, DELETE).
- `rollback()`: Revierte los cambios realizados desde el último commit en caso de error.
- `close()`: Cierra la conexión con la base de datos y libera recursos.
- `ping()`: Verifica si la conexión sigue activa.
- `is_connected()`: Devuelve `True` si la conexión está activa.

conn = db.connect()
cursor = conn.cursor(dictionary=True)
cursor.execute("UPDATE recetas SET nombre='Nueva' WHERE id=1")
conn.commit()
cursor.close()
conn.close()


---

### Métodos principales del cursor
- `execute(sql, params=None)`: Ejecuta una consulta SQL.
- `fetchone()`: Devuelve la siguiente fila del resultado.
- `fetchall()`: Devuelve todas las filas restantes.
- `fetchmany(size)`: Devuelve la cantidad indicada de filas.
- `close()`: Cierra el cursor.
- `rowcount`: Número de filas afectadas.
- `lastrowid`: Id del último registro insertado.

conn = db.connect()
cursor = conn.cursor(dictionary=True)
cursor.execute("SELECT * FROM recetas")
recetas = cursor.fetchall()
cursor.close()
conn.close()


---

### Buenas prácticas
- **Cerrar conexiones y cursores:**
cursor.close()
conn.close()

- **Ejemplo completo de uso seguro:**
conn = db.connect()
cursor = conn.cursor(dictionary=True)
try:
    cursor.execute("UPDATE recetas SET nombre='Nueva' WHERE id=1")
    conn.commit()
except Exception as e:
    conn.rollback()
    print("Error:", e)
finally:
    cursor.close()
    conn.close()


---

### Preguntas frecuentes sobre controladores
- ¿Qué es `dictionary=True`?
- ¿Qué métodos tiene `cursor`?
- ¿Para qué es `cursor.fetchone()`?
- ¿Por qué en Flask los controladores reciben parámetros directamente?

---

## 3. Rutas

---

### Definición de rutas en Flask y Express

- **Flask:** `@recetas_bp.route('/recetas/<int:id>')`, `@recetas_bp.route('/recetas/<int:id>', methods=['GET'])`
- **Express:** `router.get('/recetas/:id', handler)`

---

### Parámetros en rutas
- **Flask:** `<int:id>`
- **Express:** `:id`
- En Flask, los parámetros se pasan como argumento a la función; en Express se accede por `req.params.id`.

---

### Manejo de query string y formularios
- **Flask:** `request.args.get('param')`, `request.form`
- **Express:** `req.query.param`, `req.body`

---

### Modularización: Blueprints vs Routers
- **Flask:** `Blueprint('nombre', __name__)`, registro en la app principal: `app.register_blueprint(recetas_bp)`
- **Express:** `const router = express.Router()`, uso con `app.use()`

---

### Decoradores en Python (@route)
El símbolo `@` en Python es un decorador que asocia la función a una URL y la convierte en una vista HTTP.

@app.route('/recetas/<int:id>', methods=['GET'])
def get_receta(id):
    return jsonify({'id': id, 'nombre': 'Ejemplo'})


---

### Ejemplos de rutas con parámetros y paginación
- **Flask:** `pagina = int(request.args.get('pagina', 1))`
- **Express:** `Number(req.query.pagina) || 1`

---

### Respuestas y manejo de estado
- **Flask:** `return respuesta, status` (tupla), uso de `jsonify`
- **Express:** `res.status(status).json(respuesta)`
- Flask convierte automáticamente diccionarios en JSON.
- Control de errores: devolver mensaje y código de estado adecuado (400, 401, 404, 500).
- Usar siempre `cursor = db.cursor(dictionary=True)` en las consultas que devuelven datos.

---

### Autenticación y sesión en rutas
- **Flask:** `session.get('usuario_id')`
- **Express:** `req.session.usuarioId`
- Es recomendable obtener el `usuario_id` desde la sesión y no desde la URL o el body.
- Tras login, se guarda el usuario en la sesión: `session['usuario_id'] = ...` (Flask), `req.session.usuarioId = ...` (Express).

---

### Ejemplos y tablas comparativas
- Ejemplo de ruta con parámetro:
  - **Flask:** `@blueprint.route('/usuario/<int:usuario_id>')`
  - **Express:** `router.get('/usuario/:usuarioId', handler)`
- Ejemplo de modularización:
  - **Flask:** `app.register_blueprint(recetas_bp)`
  - **Express:** `app.use('/recetas', recetasRouter)`
- Tabla comparativa de rutas:

| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Definir ruta          | router.get('/tipos', handler)    | @tipos_bp.route('/tipos', methods=['GET']) |
| Modularización        | router en archivo                | Blueprint en archivo          |
| Importar controlador  | require('./tipos.controller')    | from controller.tipos_controller import get_tipos |
| Retornar respuesta    | res.json(tipos)                  | return tipos_list, 200        |

---

## 4. Conexión a base de datos

---

### Uso de dotenv y variables de entorno
- **Flask:** `os.getenv('NOMBRE', 'valor_por_defecto')`
- **Express:** `process.env.NOMBRE || 'valor_por_defecto'`

---

### Configuración y obtención de credenciales
- Usar variables de entorno y nunca dejar credenciales en el código fuente.

---

### Conexión directa vs pool de conexiones
- Conexión directa: se abre y cierra cada vez que se necesita.
- Pool: mantiene varias conexiones abiertas y las reutiliza.

---

### Pruebas de conexión (SELECT 1)
- En Python: se obtiene la conexión, se crea un cursor y se ejecuta una consulta simple (`SELECT 1`).
- En JS: se obtiene la conexión y se ejecuta una consulta con `await db.query('SELECT 1')`.
- Se usa `SELECT 1` porque es una consulta muy simple que no depende de ninguna tabla y solo verifica que la base de datos responde correctamente.

---

### Manejo de errores y cierre de recursos
- **Python:** `try/except` para capturar errores, cerrar cursor y conexión con `cursor.close()` y `conn.close()`
- **JavaScript:** `try/catch`, cerrar conexión con `conn.release()` (si es pool) o `conn.end()`

---

### Ejemplos de conexión en Python y Node.js
- **Python:** `mysql.connector.connect({...})`
- **JavaScript:** `mysql.createConnection({...})` o usando un pool con `mysql.createPool({...})`

---

### Buenas prácticas de seguridad y eficiencia
- Usar variables de entorno para credenciales.
- Cerrar recursos tras la consulta.
- Manejar errores para evitar que el programa se detenga si la conexión falla.
- Usar siempre `cursor = db.cursor(dictionary=True)` en las consultas que devuelven datos.

---

## 5. Archivo principal de la app (`app.py`)

---

### Estructura y propósito de `app.py`
- Inicializa la app, configura la sesión y registra los Blueprints.

---

### Inicialización de la aplicación Flask
- `app = Flask(__name__)`

---

### Registro de Blueprints y rutas
- `app.register_blueprint(recetas_bp, url_prefix='/api/listadelacompra')`

---

### Configuración de sesiones y variables globales
- `app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')`
- `app.config['SESSION_TYPE'] = 'filesystem'`

---

### Arranque de la app y opciones avanzadas
- `app.run(debug=True, host='0.0.0.0', port=5000)`
- Opciones avanzadas: `use_reloader`, `threaded`, `ssl_context`, etc.

Opciones y métodos de `app.run`:
- **debug:** Activa el modo debug (recarga automática y errores detallados). Solo para desarrollo.
- **host:** Dirección IP donde se expone la app. Por defecto es 127.0.0.1 (solo local). Para acceso externo usa '0.0.0.0'.
- **port:** Puerto donde se ejecuta la app. Por defecto es 5000.
- **use_reloader:** Si es True, reinicia el servidor al detectar cambios en el código.
- **threaded:** Si es True, permite manejar varias peticiones simultáneas usando hilos.
- **processes:** Número de procesos para manejar peticiones (alternativa a threaded).
- **ssl_context:** Permite activar HTTPS pasando un certificado y clave.

Métodos principales de `app` (Flask):
- `app.run(...)`: Inicia el servidor web.
- `app.route(...)`: Decorador para definir rutas.
- `app.register_blueprint(...)`: Registra Blueprints (módulos de rutas).
- `app.config`: Diccionario para configurar la app (variables, claves, etc).
- `app.before_request`: Decorador para ejecutar lógica antes de cada petición.
- `app.after_request`: Decorador para ejecutar lógica después de cada petición.
- `app.teardown_appcontext`: Decorador para limpiar recursos al finalizar el contexto.

---

### Ejemplo completo de `app.py`
- Ver ejemplo en la documentación original.

---

### Recomendaciones para producción y desarrollo
- No usar `debug=True` en producción.
- Usar variables de entorno para la clave secreta.

---

## 6. Temas avanzados y extras

---

### Configuración avanzada de sesiones (Redis, SQLAlchemy, etc.)
- Ejemplo de configuración con Redis:
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.Redis(host='localhost', port=6379, db=0)
Session(app)

- Ejemplo con SQLAlchemy:
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SESSION_SQLALCHEMY'] = create_engine('mysql+pymysql://usuario:clave@localhost/db')
Session(app)


---

### Seguridad y protección de datos
- Usar claves secretas, proteger credenciales, validar datos de entrada.

---

### Integración con otros servicios
- APIs externas, autenticación OAuth, etc.

---

### Preguntas frecuentes y trucos
- ¿Por qué usar `__name__` en Blueprint?
  - `__name__` es una variable especial en Python que indica el nombre del módulo actual. Al pasarla a Blueprint, Flask puede ubicar correctamente los recursos estáticos y las rutas asociadas a ese módulo. Es una práctica recomendada para modularizar la aplicación y evitar conflictos de nombres.
  - Sí, `__name__` representa el nombre del archivo (módulo) donde se define el Blueprint. Esto ayuda a Flask a saber desde qué módulo cargar las rutas y recursos.
- ¿Cómo se convierten las tuplas SQL en diccionarios?
  - El controlador usa `[dict(zip([desc[0] for desc in cursor.description], r)) for r in recetas]` para convertir cada tupla en un diccionario.
  - Así el frontend recibe una lista de objetos con claves y valores, no tuplas.
- ¿Cómo se gestiona y destruye la sesión?
  - En Express (Node.js) se usa `req.session` para acceder y destruir la sesión (`req.session.destroy(callback)`), y para verificar si hay sesión activa (`if (req.session && req.session.usuarioId)`). En Flask se usa el objeto global `session`, se destruye con `session.clear()` y se verifica con `if session.get('usuario_id')`. Flask no usa callback, pero se pueden manejar excepciones con try/except.
- ¿Diferencias clave entre Flask y Express en cada sección?
  - Todas las secciones incluyen comparativas y ejemplos.

---

### Recursos y enlaces útiles
- Documentación oficial de Flask: https://flask.palletsprojects.com/en/latest/
- Documentación de Flask-Session: https://flask-session.readthedocs.io/en/latest/
- Documentación de MySQL Connector/Python: https://dev.mysql.com/doc/connector-python/en/
- Documentación de mysql2 para Node.js: https://www.npmjs.com/package/mysql2

---

<div align="center">
  <b>Esta guía está organizada por grupos temáticos y cada sección incluye las diferencias clave con JavaScript/Node.js para facilitar la migración y el aprendizaje.</b>
</div>
