# Resumen final de preguntas y respuestas para aprender backend Python (Flask) desde Node.js

## Índice
1. Listas y diccionarios en Python
2. Comparaciones clave con Node.js/Express
3. Modularización: Blueprints y rutas
4. Controladores y lógica de negocio
5. Configuración y arranque de Flask
6. Conexión y pruebas de base de datos
7. Autenticación y sesión
8. Manejo de errores y buenas prácticas
9. Ejemplos y tablas comparativas
10. Enlaces útiles y recursos

11. Configuración avanzada de sesiones (Flask vs Express, Redis, DB)

---

### 1. Listas y diccionarios en Python
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

### 2. Comparaciones clave con Node.js/Express
- Python usa snake_case, JS usa camelCase.
- Importaciones: Python `import`/`from ... import ...`, JS `require`/`import`.
- Manejo de base de datos: Python usa `mysql.connector` y cursores, JS usa `mysql2` y promesas.
- Manejo de errores: Python `try/except/finally`, JS `try/catch` y callbacks/promesas.
- Respuestas: Flask devuelve tuplas `(dict, status)`, Express usa `res.status(...).json(...)`.
- Hash de contraseñas: sintaxis de bcrypt varía entre ambos lenguajes.
- Parámetros en rutas: Flask `<tipo:nombre>`, Express `:nombre`.

---

### 3. Modularización: Blueprints y rutas
- Blueprints permiten agrupar rutas por funcionalidad y registrarlas en la app principal.
- Decoradores en Flask (`@route`) vs métodos en Express (`router.get`, `router.post`).
- Ejemplo Flask: `Blueprint('nombre', __name__)`.
- Ejemplo Express: `const router = express.Router()`.

---

### 4. Controladores y lógica de negocio
  ```python
  recetas_list = [dict(zip([desc[0] for desc in cursor.description], r)) for r in recetas]
  ```

#### Preguntas frecuentes sobre controladores:

1. ¿Qué es `dictionary=True`?
   - Es un argumento del método `cursor()` de `mysql.connector`.
   - Hace que los resultados de las consultas se devuelvan como diccionarios (clave: nombre de columna, valor: dato), en vez de tuplas.
   - Ejemplo:
     - Sin `dictionary=True`: `('Juan', 'Pérez', 'juan@email.com')`
     - Con `dictionary=True`: `{'nombre': 'Juan', 'apellidos': 'Pérez', 'email': 'juan@email.com'}`
   - **Diferencia JS:** En Node.js, los resultados suelen ser arrays de objetos, similar a los diccionarios de Python.

2. ¿Qué métodos tiene `cursor`?
   - Principales:
     - `execute(sql, params)`: ejecuta una consulta SQL.
     - `fetchone()`: obtiene el siguiente resultado (una fila).
     - `fetchall()`: obtiene todas las filas.
     - `fetchmany(size)`: obtiene varias filas.
     - `close()`: cierra el cursor.
     - `rowcount`: número de filas afectadas por la última consulta.
     - `lastrowid`: id de la última fila insertada.
     - `callproc(procname, params)`: llama a un procedimiento almacenado.
   - **Diferencia JS:** En Node.js, el objeto de resultado tiene métodos y propiedades como `affectedRows`, `insertId`, etc.

3. ¿Para qué es `cursor.fetchone()` y qué pasaría si no lo pones?
   - Obtiene la primera fila del resultado de la consulta.
   - Si no lo pones, no tendrás acceso a los datos consultados; el cursor solo almacena el resultado, pero no lo extrae.
   - Si usas `fetchall()`, obtienes todas las filas en una lista.
   - Si no llamas a ningún método de obtención, no puedes procesar los datos.
   - **Diferencia JS:** En Node.js, el resultado de la consulta ya es un array de objetos.

4. ¿Por qué en Python (Flask) los controladores reciben parámetros directamente y en JavaScript (Express) suelen recibir `req` y `res`?
**Respuesta:**
En Flask, los controladores suelen recibir solo los parámetros relevantes (por ejemplo, `email`, `contraseña`) porque la extracción de datos del request se realiza en la ruta y se pasan como argumentos. Esto hace que el código sea más limpio y fácil de testear. En Express, los controladores reciben los objetos `req` y `res` para tener acceso completo a la petición y la respuesta, lo que puede ser útil pero menos modular y más difícil de testear.
---

### 5. Configuración y arranque de Flask
- `app.py` inicializa la app, configura la sesión y registra los Blueprints.
- Clave secreta: usar variable de entorno para seguridad.
- Configuración de sesiones: `'filesystem'`, `'redis'`, `'mongodb'`, etc.
    - Ver sección 11 para comparativa y ejemplos avanzados de sesiones.
- Arranque: `app.run(debug=True, host='0.0.0.0', port=5000)`.
- Opciones avanzadas: `use_reloader`, `threaded`, `ssl_context`, etc.
- No usar `debug=True` en producción.

---

### 6. Conexión y pruebas de base de datos
- Usar dotenv y variables de entorno para credenciales.
- Conexión directa vs pool de conexiones.
5. **¿Cómo se gestiona y destruye la sesión en Flask comparado con Express?**
En Express (Node.js) se usa `req.session` para acceder y destruir la sesión (`req.session.destroy(callback)`), y para verificar si hay sesión activa (`if (req.session && req.session.usuarioId)`). En Flask se usa el objeto global `session`, se destruye con `session.clear()` y se verifica con `if session.get('usuario_id')`. Flask no usa callback, pero se pueden manejar excepciones con try/except.
- Prueba de conexión: ejecutar `SELECT 1`.
 - Usar siempre `cursor = db.cursor(dictionary=True)` en las consultas que devuelven datos, para obtener listas de diccionarios y evitar bucles de conversión manual.

---

### 7. Autenticación y sesión
- En Flask: `session.get('usuario_id')` para obtener el usuario autenticado.
- En Express: `req.session.usuarioId`.
- Tras login, se guarda el usuario en la sesión: `session['usuario_id'] = ...` (Flask), `req.session.usuarioId = ...` (Express).

---

### 11. Configuración avanzada de sesiones (Flask vs Express, Redis, DB)

#### Comparativa básica

**Flask (Python):**
```python
# Crea la instancia de Flask
```

# Configuración de la clave secreta para sesiones
app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')

**Express (Node.js):**
```javascript
- En Flask: `request.args.get('nombre')` para query string.
- En Express: `req.query.nombre`.
- En Express: se obtiene con `Number(req.query.pagina) || 1`.


- En Flask se usa Blueprint y decoradores `@logout_bp.route('/logout', methods=['POST'])`
  El símbolo @ en Python se llama "decorador". Sirve para modificar el comportamiento de la función que sigue. En Flask, el decorador @logout_bp.route(...) asocia la función a una URL específica y la convierte en una vista que responde a peticiones HTTP. Así, cuando se recibe una petición en esa ruta, se ejecuta la función decorada.

---

**¿Cómo se maneja la respuesta del controlador en Flask?**
- El controlador devuelve una tupla `(data, status)`, donde `data` es el contenido (normalmente un diccionario o lista) y `status` es el código HTTP (por ejemplo, 200 para éxito, 404 para no encontrado).
- La ruta usa `jsonify(data), status` para enviar la respuesta al frontend. `jsonify` convierte automáticamente el diccionario o lista de Python en JSON, que es el formato que entiende el frontend (JavaScript, Vue, React, etc.).
- Así, el navegador recibe una respuesta con el contenido en JSON y el código de estado HTTP correcto.
- Ejemplo:
```python
@app.route('/recetas')
def get_recetas():
    recetas, status = controlador_get_recetas()
    return jsonify(recetas), status
```
- ¿Qué hace `jsonify` y de dónde viene?
  - `jsonify` es una función de Flask que convierte automáticamente diccionarios y listas de Python en una respuesta JSON válida para el frontend. Además, establece el tipo de contenido (`Content-Type: application/json`) y gestiona la codificación.
  - Se importa desde el propio paquete Flask:
    ```python
    from flask import jsonify
    ```

**¿Cómo se convierten las tuplas SQL en diccionarios?**
- Así el frontend recibe una lista de objetos con claves y valores, no tuplas.

- Ejemplo: `/recetas/5` llama a `route_get_detalles_receta(5)`.


**¿Cómo se definen y obtienen los parámetros de ruta en Flask?**
- En Flask, los parámetros de ruta se definen usando los símbolos `< >` en la URL. Por ejemplo:
```python
@recetas_bp.route('/recetas/<int:id>')
def get_receta(id):
    # El parámetro id se recibe como argumento en la función
```
El valor que el usuario pone en la URL (por ejemplo `/recetas/5`) se pasa automáticamente como argumento a la función (`id = 5`). Puedes especificar el tipo (`int`, `string`, etc.) dentro de los corchetes.
- Se usa `<int:id>` en la ruta y el parámetro se pasa como argumento a la función.
- Ejemplo: `/recetas/5` llama a `route_get_detalles_receta(5)`.
- En Express se usa `router.post('/logout', handler)`.
- En Flask se usa Blueprint y decoradores `@logout_bp.route('/logout', methods=['POST'])`
  El símbolo @ en Python se llama "decorador". Sirve para modificar el comportamiento de la función que sigue. En Flask, el decorador @logout_bp.route(...) asocia la función a una URL específica y la convierte en una vista que responde a peticiones HTTP. Así, cuando se recibe una petición en esa ruta, se ejecuta la función decorada.
- En Flask: se obtiene el parámetro `pagina` y se convierte a entero, con valor por defecto 1.
  `pagina = int(request.args.get('pagina', 1))`
- En Express: se obtiene con `Number(req.query.pagina) || 1`.
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: process.env.SECRET_KEY || 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore() // o usar connect-mongo, connect-redis, etc.
}));
```
- `secret`: Protege los datos de sesión. Obligatoria para usar sesiones.
- `store`: Permite guardar sesiones en memoria, archivos, MongoDB, Redis, etc.
- `resave` y `saveUninitialized`: Opciones de control de persistencia y seguridad.

**¿Por qué es necesario?**
- En ambos frameworks, la clave secreta es fundamental para proteger la información de usuario y evitar manipulación de sesiones.
- El almacenamiento en servidor (filesystem, Redis, etc.) permite persistencia y mayor seguridad, especialmente para autenticación.
- Es la forma estándar de gestionar sesiones en aplicaciones web modernas.

**Recomendación:**
Siempre configura la clave secreta y el almacenamiento de sesiones, tanto en Flask como en Express, para asegurar la seguridad y funcionalidad de tu backend.

---

#### Ejemplo avanzado: Guardar sesiones en Redis o base de datos con Flask-Session

**Redis:**
```python
from flask import Flask
from flask_session import Session
import redis
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')

# Configuración para usar Redis como backend de sesiones
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.Redis(host='localhost', port=6379, db=0)
Session(app)
```

**Base de datos relacional (SQLAlchemy):**
```python
from flask import Flask
from flask_session import Session
from sqlalchemy import create_engine
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')

# Configuración para usar SQLAlchemy como backend de sesiones
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SESSION_SQLALCHEMY'] = create_engine('mysql+pymysql://usuario:clave@localhost/db')
Session(app)
```

Puedes usar otros backends soportados: `mongodb`, `memcached`, `filesystem`, etc.
Consulta la documentación oficial: https://flask-session.readthedocs.io/en/latest/

---

**Express también permite usar MongoDB, Redis, etc. como backend de sesiones con paquetes como `connect-mongo`, `connect-redis`, etc.**

¿Quieres ejemplos de instalación y configuración de Redis o SQLAlchemy? Pídelo y te lo explico paso a paso.

---

### 8. Manejo de errores y buenas prácticas
- Python: `try/except Exception as e` para capturar errores.
- JS: `try/catch (error)`.
- Usar snake_case en Python (PEP 8).
- Modularizar rutas y controladores.
- Usar variables de entorno y proteger credenciales.

---

### 9. Ejemplos y tablas comparativas
- Ejemplo de list comprehension:
  ```python
  tipos_list = [{'tipo': t[0]} for t in tipos]
  ```
- Ejemplo de manejo de errores:
  ```python
  try:
      # código
  except Exception as e:
      print(e)
  ```
- Tabla comparativa de acciones:

| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Verificar usuario     | req.session.usuarioId            | session.get('usuario_id')     |
| Consulta por usuario  | db.query(sql, [usuarioId])       | cursor.execute(sql, (usuario_id,)) |
| Consulta por receta   | db.query(sql, [recetaId, usuarioId]) | cursor.execute(sql, (receta_id, usuario_id)) |
| Insertar/actualizar   | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Eliminar              | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Responder al cliente  | res.status(200).json({...})      | return {...}, 200             |

---

### 10. Enlaces útiles y recursos
- Documentación oficial de Flask: https://flask.palletsprojects.com/en/latest/
- Documentación de Flask-Session: https://flask-session.readthedocs.io/en/latest/
- Documentación de MySQL Connector/Python: https://dev.mysql.com/doc/connector-python/en/
- Documentación de mysql2 para Node.js: https://www.npmjs.com/package/mysql2

---

Este resumen final agrupa y organiza todo el contenido para aprender backend en Python (Flask) desde la perspectiva de Node.js, empezando por los conceptos básicos y avanzando hacia la configuración, modularización, controladores, rutas, base de datos, autenticación y buenas prácticas.


---

## Explicación sobre request.form en Flask

  - Los datos que accedes con `request.form` los envía el front-end, normalmente a través de un formulario HTML. El usuario rellena el formulario en la página web y, al enviarlo (por POST), Flask recibe esos datos en el backend usando `request.form`. No importa si el frontend está hecho con Flask (plantillas) o con otro framework (Vue, React, etc.): siempre que se envíe un formulario por POST, Flask puede recibir esos datos con `request.form`.
  - Además, `request.form` es un diccionario especial que contiene los datos enviados por el cliente. Los valores siempre llegan como cadenas (strings), por lo que si necesitas un entero, debes convertirlo explícitamente: `edad = int(request.form.get('edad'))`. Si el campo no existe, devuelve `None`. Es útil para procesar formularios tradicionales y acceder a cada campo por su nombre.
---

**¿Por qué se pone __name__ en Blueprint y qué significa?**
El parámetro `__name__` en `Blueprint('nombre', __name__)` no es obligatorio, pero es muy recomendable. Se utiliza para que Flask sepa el nombre del módulo donde se define el blueprint, lo que ayuda a gestionar rutas, importar recursos estáticos y mostrar errores con información precisa. Si no lo pones, puedes tener problemas al registrar el blueprint o al servir archivos estáticos, y la depuración será más difícil. Por convención y buenas prácticas, siempre se incluye `__name__` para asegurar que Flask tenga el contexto correcto del módulo.

**¿__name__ se refiere al archivo donde está la ruta?**
Sí, `__name__` es una variable especial de Python que representa el nombre del módulo (archivo) donde se está ejecutando el código. Cuando usas `Blueprint('nombre', __name__)`, Flask utiliza ese valor para saber desde qué archivo se está creando el blueprint, lo que ayuda a registrar rutas, importar recursos y mostrar errores correctamente. Así, Flask tiene el contexto exacto del módulo donde está definida la ruta.
---

**¿Cómo se prueba la conexión a la base de datos y por qué se usa 'SELECT 1'?**
- En Python: se obtiene la conexión, se crea un cursor y se ejecuta una consulta simple (`SELECT 1`).
- En JS: se obtiene la conexión y se ejecuta una consulta con `await db.query('SELECT 1')`.
- 'SELECT 1' es una consulta muy simple que no depende de ninguna tabla y solo verifica que la base de datos responde correctamente.

**¿Cómo se cierran los recursos tras la consulta y qué significa cursor en Python?**
- En Python: `cursor.close()` y `conn.close()`. El cursor es el objeto que permite ejecutar consultas y leer resultados.
- En JS: `conn.release()` (si es pool) o `conn.end()`. En JS se usa el resultado de la consulta directamente.
---

**¿Cómo se accede a los resultados de la consulta en Python?**
- Se obtiene una lista de tuplas, se puede convertir a lista de diccionarios si se usa `cursor.description`.

**¿Qué hace la línea tipos_list = [{'tipo': t[0]} for t in tipos]?**
- Utiliza una list comprehension para recorrer la lista de tuplas obtenida de la consulta SQL.
- Por cada tupla `t` en la lista `tipos`, toma el primer elemento (`t[0]`) y lo coloca en un diccionario con la clave 'tipo'.
- El resultado es una lista de diccionarios, por ejemplo: si `tipos = [('Fruta',), ('Verdura',)]`, entonces `tipos_list = [{'tipo': 'Fruta'}, {'tipo': 'Verdura'}]`.
- Esto permite que el frontend reciba los datos en formato JSON, más fácil de consumir que una lista de tuplas.

**¿Cómo funciona el bucle en la línea tipos_list = [{'tipo': t[0]} for t in tipos]?**
- Se utiliza una list comprehension, que es una forma compacta de crear listas en Python.
- El bucle interno `for t in tipos` recorre cada elemento de la lista `tipos`.
- Cada elemento `t` es una tupla, por ejemplo `('Fruta',)`.
- Por cada tupla, se toma el primer elemento `t[0]` y se crea un diccionario `{'tipo': t[0]}`.
- El resultado es una lista de diccionarios, uno por cada tipo encontrado en la consulta SQL.
- Por ejemplo, si `tipos = [('Fruta',), ('Verdura',)]`, el resultado será:
  `[{'tipo': 'Fruta'}, {'tipo': 'Verdura'}]`
- Esto facilita el uso en el frontend, ya que cada tipo queda en formato JSON y es más fácil de consumir que una lista de tuplas.
---

**1. ¿Los if tienen diferente forma de declararse que en JS?**
- Sí. En Python:
  ```python
  if condicion:
      # código
  if not condicion:
      # negación
  ```
  En JavaScript:
  ```javascript
  if (condicion) {
    // código
  }
  if (!condicion) {
    // negación
  }
  ```
- En Python no se usan paréntesis ni llaves, sino dos puntos y sangría. La negación se hace con `not` en vez de `!` como en JS.

**3. bcrypt tiene diferente forma de declaración entre Python y JS**
- Sí. En JS:
  ```javascript
  const bcrypt = require('bcrypt');
  const hash = await bcrypt.hash(password, 10);
  const valid = await bcrypt.compare(password, hash);
  ```
- En Python:
  ```python
  import bcrypt
  hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
  valid = bcrypt.checkpw(password.encode(), hash.encode())
  ```
- En Python se usan métodos de clase y hay que codificar/decodificar los strings.

**4. conn.commit() ¿qué es y cuál es la diferencia con JS? ¿Por qué en JS no hay que hacerlo y en Python sí?**
- `conn.commit()` guarda los cambios realizados en la base de datos (INSERT, UPDATE, DELETE).
- En JS (con mysql2), los cambios se guardan automáticamente tras ejecutar la consulta.
- En Python, si no llamas a `commit()`, los cambios no se aplican realmente en la base de datos.

**5. len(resultados): ¿len es un método de arrays o listas en Python? ¿Cuáles más hay?**
- `len()` es una función que devuelve la longitud de listas, arrays, diccionarios, strings, etc.
- Ejemplo:
  ```python
  lista = [1, 2, 3]
  print(len(lista))  # 3
  ```
- Otros métodos útiles para listas:
  - `append()`: añade un elemento
  - `pop()`: elimina y devuelve el último elemento
  - `remove()`: elimina un elemento por valor
  - `sort()`: ordena la lista
  - `reverse()`: invierte la lista

**6. rowcount==0 ¿es las líneas que se vieron afectadas?**
- Sí. `cursor.rowcount` indica cuántas filas fueron modificadas por la última consulta (INSERT, UPDATE, DELETE).
- Si es 0, significa que no se insertó, actualizó o eliminó ningún registro.
- En JS, se usa `result.affectedRows` para lo mismo.

**7. Ejemplos de diferencias de declaración entre Python y JavaScript**
- Declaración de variables
  - Python:
    ```python
    nombre = "Juan"
    edad = 30
    ```
  - JavaScript:
    ```javascript
    let nombre = "Juan";
    const edad = 30;
    ```
- Funciones
  - Python:
    ```python
    def saludar(nombre):
        print("Hola", nombre)
    ```
  - JavaScript:
    ```javascript
    function saludar(nombre) {
      console.log("Hola", nombre);
    }
    // O con arrow function:
    const saludar = nombre => console.log("Hola", nombre);
    ```
- Condicionales
  - Python:
    ```python
    if edad > 18:
        print("Mayor de edad")
    if not activo:
        print("No está activo")
    ```
  - JavaScript:
    ```javascript
    if (edad > 18) {
      console.log("Mayor de edad");
    }
    if (!activo) {
      console.log("No está activo");
    }
    ```
- Bucles
  - Python:
    ```python
    for i in range(5):
        print(i)
    ```
  - JavaScript:
    ```javascript
    for (let i = 0; i < 5; i++) {
      console.log(i);
    }
    ```
- Listas/Arrays
  - Python:
    ```python
    lista = [1, 2, 3]
    lista.append(4)
    ```
  - JavaScript:
    ```javascript
    let lista = [1, 2, 3];
    lista.push(4);
    ```
- Objetos/Diccionarios
  - Python:
    ```python
    persona = {"nombre": "Juan", "edad": 30}
    print(persona["nombre"])
    persona["ciudad"] = "Madrid"
    ```
  - JavaScript:
    ```javascript
    let persona = { nombre: "Juan", edad: 30 };
    console.log(persona.nombre);
    persona.ciudad = "Madrid";
    ```
- Clases
  - Python:
    ```python
    class Persona:  # Define la clase Persona
        def __init__(self, nombre, edad):  # Método constructor, se llama al crear el objeto
            self.nombre = nombre  # Asigna el parámetro nombre al atributo del objeto
            self.edad = edad      # Asigna el parámetro edad al atributo del objeto
        def saludar(self):  # Método de la clase para saludar
            print(f"Hola, soy {self.nombre}")  # Imprime un saludo usando el atributo nombre
    juan = Persona("Juan", 30)  # Crea una instancia de Persona con nombre "Juan" y edad 30
    juan.saludar()  # Llama al método saludar de la instancia juan
    ```
  - JavaScript:
    ```javascript
    class Persona { // Define la clase Persona
      constructor(nombre, edad) { // Método constructor, se llama al crear el objeto
        this.nombre = nombre;     // Asigna el parámetro nombre al atributo del objeto
        this.edad = edad;         // Asigna el parámetro edad al atributo del objeto
      }
      saludar() { // Método de la clase para saludar
        console.log(`Hola, soy ${this.nombre}`); // Imprime un saludo usando el atributo nombre
      }
    }
    const juan = new Persona("Juan", 30); // Crea una instancia de Persona con nombre "Juan" y edad 30
    juan.saludar(); // Llama al método saludar de la instancia juan
    ```
- Importaciones
  - Python:
    ```python
    import math
    from db.conexion import get_connection
    ```
  - JavaScript:
    ```javascript
    const math = require('mathjs');
    const getConnection = require('./db/conection');
    // O con ES Modules:
    import math from 'mathjs';
    import { getConnection } from './db/conection.js';
    ```
- Manejo de errores
  - Python:
    ```python
    try:
        resultado = 10 / 0
    except Exception as e:
        print("Error:", e)
    ```
  - JavaScript:
    ```javascript
    try {
      let resultado = 10 / 0;
    } catch (e) {
      console.log("Error:", e);
    }
    ```
- None vs null
  - Python:
    ```python
    valor = None
    if valor is None:
        print("Sin valor")
    ```
  - JavaScript:
    ```javascript
    let valor = null;
    if (valor === null) {
      console.log("Sin valor");
    }
    ```
