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
