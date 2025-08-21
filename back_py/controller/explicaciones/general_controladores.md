# Resumen general de preguntas y respuestas sobre controladores en Flask

## Índice
1. Listas y diccionarios en Python
2. Diferencias clave con Node.js/Express
3. Manejo de SQL y cursores
4. Autenticación y sesión
5. Manejo de errores y excepciones
6. Buenas prácticas y convenciones
7. Ejemplos y tablas comparativas

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

### 2. Diferencias clave con Node.js/Express
- Python usa snake_case, JS usa camelCase.
- Importaciones: Python `import`/`from ... import ...`, JS `require`/`import`.
- Manejo de base de datos: Python usa `mysql.connector` y cursores, JS usa `mysql2` y promesas.
- Manejo de errores: Python `try/except/finally`, JS `try/catch` y callbacks/promesas.
- Respuestas: Flask devuelve tuplas `(dict, status)`, Express usa `res.status(...).json(...)`.
- Hash de contraseñas: sintaxis de bcrypt varía entre ambos lenguajes.

---

### 3. Manejo de SQL y cursores
+ `dictionary=True` en el cursor de MySQL Connector/Python hace que los resultados se devuelvan como diccionarios en vez de tuplas. Ejemplo:
 `dictionary=True` en el cursor de MySQL Connector/Python hace que los resultados se devuelvan como diccionarios en vez de tuplas. Ejemplo:
```python
cursor = db.cursor(dictionary=True)
```
Esto permite acceder a los valores por nombre de columna: `fila['nombre']`.

Otras opciones:
  - Por defecto, el cursor devuelve tuplas: `cursor = conn.cursor()`.
  - Puedes usar `DictCursor` en otras librerías como `pymysql`.
  - En SQLite, puedes usar `row_factory` para obtener diccionarios: `conn.row_factory = sqlite3.Row`.

Métodos principales de los cursores:
  - `execute(sql, params)`: ejecuta una consulta SQL con parámetros.
  - `fetchone()`: obtiene la siguiente fila del resultado (o None si no hay más).
  - `fetchall()`: obtiene todas las filas restantes como lista.
  - `fetchmany(size)`: obtiene hasta `size` filas.
  - `close()`: cierra el cursor y libera recursos.
  - `rowcount`: número de filas afectadas por la última operación.
  - `lastrowid`: id de la última fila insertada (si aplica).
  - `callproc(procname, params)`: llama a un procedimiento almacenado.

Conexión y cursor se cierran al final de cada función (buena práctica).
Marcadores de posición: `%s` en Python, `?` en JS.

#### Preguntas sobre filtros, parámetros y LIKE en SQL:

7. ¿Cómo se pasan los parámetros para filtros en Node.js vs Python?
   - En Node.js/Express puedes pasar los parámetros como un objeto (por ejemplo, `req.query`) y la consulta se adapta según los valores presentes. Si el objeto está vacío, no se añaden filtros.
   - En Python, normalmente defines los parámetros de la función con valores por defecto (`None`) y construyes la consulta solo si esos parámetros tienen valor. No se suele pasar un objeto de parámetros, sino cada argumento por separado.
   - **Ejemplo en Node.js:**
     ```javascript
     const params = {};
     if (nombre) params.nombre = nombre;
     if (tipo) params.tipo = tipo;
     ```
   - **Ejemplo en Python:**
     ```python
     def get_ingredientes(nombre=None, tipo=None, pagina=1):
         # Solo añades a la consulta si nombre o tipo tienen valor
         ...
     ```
   - También podrías recibir un diccionario en Python, pero no es lo habitual en controladores Flask.

8. ¿Qué es un f-string en Python y cómo se usa en consultas SQL?
   - Un f-string es una forma de crear cadenas en Python insertando variables dentro de llaves. Por ejemplo, `f"Hola {nombre}"`. 
   - En consultas SQL, se usa para construir patrones de búsqueda como `f"%{nombre}%"` para el operador LIKE.
   - **Ejemplo:** Si `nombre = "arroz"`, `f"%{nombre}%"` será `"%arroz%"`.

9. ¿Para qué sirve el símbolo `%` en consultas SQL con LIKE?
   - El símbolo `%` es un comodín en SQL. Permite buscar coincidencias parciales:
     - `"%texto%"` busca cualquier valor que contenga "texto".
     - `"texto%"` busca valores que empiezan por "texto".
     - `"%texto"` busca valores que terminan en "texto".
   - Así, `LIKE "%arroz%"` encuentra cualquier ingrediente que contenga "arroz" en el nombre.
---

### 4. Autenticación y sesión
- En Flask: `session.get('usuario_id')` para obtener el usuario autenticado.
- En Express: `req.session.usuarioId`.
- Es recomendable obtener el usuario_id desde la sesión y no desde la URL o el body.
- Tras login, se guarda el usuario en la sesión: `session['usuario_id'] = ...` (Flask), `req.session.usuarioId = ...` (Express).

---

### 5. Manejo de errores y excepciones
- Python: `try/except Exception as e` para capturar errores.
- JS: `try/catch (error)`.
- Permite manejar errores sin detener el programa y mostrar mensajes adecuados.

---

### 6. Buenas prácticas y convenciones
- Usar siempre la variable `db` y la función `get_connection()` en todos los controladores para coherencia.
- Usar snake_case en Python (PEP 8).
- Cerrar conexiones y cursores tras cada consulta.
- Confirmar cambios con `db.commit()` y revertir con `db.rollback()` si hay error.
 - Usar siempre `cursor = db.cursor(dictionary=True)` en las consultas que devuelven datos, para obtener listas de diccionarios y evitar bucles de conversión manual.

---

### 7. Ejemplos y tablas comparativas
 - Ejemplo de consulta y conversión de tuplas a diccionario (solo necesario si el cursor no tiene `dictionary=True`):
   ```python
   recetas_list = [dict(zip([desc[0] for desc in cursor.description], r)) for r in recetas]
   ```
   Si usas `dictionary=True` en el cursor, puedes obtener directamente una lista de diccionarios:
   ```python
   cursor = db.cursor(dictionary=True)
   cursor.execute(sql, params)
   recetas_list = cursor.fetchall()  # Ya es una lista de diccionarios
   ```
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

Este resumen agrupa las preguntas y respuestas más relevantes sobre controladores en Flask, comparaciones con Express, y conceptos clave para aprender backend en Python.

¿Quieres agregar más preguntas, ejemplos o una sección específica?
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

**Condicionales en Python vs JavaScript**
¿Los if tienen diferente forma de declararse que en JS?
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

**bcrypt en Python vs JS**
¿bcrypt tiene diferente forma de declaración entre Python y JS?
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

**commit en Python vs JS**
¿conn.commit() qué es y cuál es la diferencia con JS? ¿Por qué en JS no hay que hacerlo y en Python sí?
- `conn.commit()` guarda los cambios realizados en la base de datos (INSERT, UPDATE, DELETE).
- En JS (con mysql2), los cambios se guardan automáticamente tras ejecutar la consulta.
- En Python, si no llamas a `commit()`, los cambios no se aplican realmente en la base de datos.

**rowcount y affectedRows**
¿rowcount==0 es las líneas que se vieron afectadas?
- Sí. `cursor.rowcount` indica cuántas filas fueron modificadas por la última consulta (INSERT, UPDATE, DELETE).
- Si es 0, significa que no se insertó, actualizó o eliminó ningún registro.
- En JS, se usa `result.affectedRows` para lo mismo.

**Ejemplos de diferencias de declaración entre Python y JavaScript**
- Declaración de variables, funciones, condicionales, bucles, listas/arrays, objetos/diccionarios, clases, importaciones, manejo de errores, None vs null.
- Ejemplos detallados en ambos lenguajes para cada caso.
---

**¿Cómo se gestiona y destruye la sesión en Flask comparado con Express?**
En Express (Node.js) se usa `req.session` para acceder y destruir la sesión (`req.session.destroy(callback)`), y para verificar si hay sesión activa (`if (req.session && req.session.usuarioId)`). En Flask se usa el objeto global `session`, se destruye con `session.clear()` y se verifica con `if session.get('usuario_id')`. Flask no usa callback, pero se pueden manejar excepciones con try/except.
---

**9. ¿Por qué en Python (Flask) los controladores reciben parámetros directamente y en JavaScript (Express) suelen recibir `req` y `res`?**
**Respuesta:**
En Flask, los controladores suelen recibir solo los parámetros relevantes (por ejemplo, `email`, `contraseña`) porque la extracción de datos del request se realiza en la ruta y se pasan como argumentos. Esto hace que el código sea más limpio y fácil de testear. En Express, los controladores reciben los objetos `req` y `res` para tener acceso completo a la petición y la respuesta, lo que puede ser útil pero menos modular y más difícil de testear.
---

#### Preguntas sobre resultados y transacciones

10. ¿Cómo se maneja el resultado de una inserción/actualización/eliminación?
- En Node.js: se usa `result.insertId` y `result.affectedRows`.
- En Python: se usa `cursor.lastrowid` y `cursor.rowcount`.

12. ¿Cómo se maneja la transacción en la inserción múltiple?
- En Node.js: `beginTransaction`, `commit`, `rollback`.
- En Python: `db.start_transaction()`, `db.commit()`, `db.rollback()`.

16. ¿Cómo se reciben los datos de la consulta antes de convertirlos?
- Se reciben como una lista de tuplas, por ejemplo: `[(1, 2, 50, 3), (2, 5, 100, 3)]`.
- Cada tupla representa una fila de la tabla, con los valores en el orden de las columnas.
- Se puede imprimir con `print(ingredientes)` para ver el formato antes de convertirlo.

17. ¿Cómo funciona la línea ingredientes_list = [dict(zip([desc[0] for desc in cursor.description], ing)) for ing in ingredientes]?
- `[desc[0] for desc in cursor.description]` obtiene los nombres de las columnas de la consulta.
- `zip(...)` une cada nombre de columna con su valor correspondiente en la tupla.
- `dict(zip(...))` crea un diccionario para cada tupla, donde las claves son los nombres de columna y los valores son los datos.
- El resultado es una lista de diccionarios, más fácil de usar en el frontend.
- Ejemplo: Si la consulta devuelve `[('Fruta', 50), ('Verdura', 100)]` y las columnas son `['tipo', 'peso']`, el resultado será `[{'tipo': 'Fruta', 'peso': 50}, {'tipo': 'Verdura', 'peso': 100}]`.

18. ¿Para qué sirve db.rollback()?
- Si ocurre un error durante una transacción, `db.rollback()` revierte todos los cambios realizados en la base de datos desde el inicio de la transacción.
- Así se evita que la base de datos quede en un estado inconsistente o con datos parciales.
