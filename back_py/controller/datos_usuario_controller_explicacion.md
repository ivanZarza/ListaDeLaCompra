# Explicación y diferencias con JavaScript/Node.js

---

## 1. ¿Qué es `dictionary=True`?
- Es un argumento del método `cursor()` de `mysql.connector`.
- Hace que los resultados de las consultas se devuelvan como diccionarios (clave: nombre de columna, valor: dato), en vez de tuplas.
- Ejemplo:
  - Sin `dictionary=True`: `('Juan', 'Pérez', 'juan@email.com')`
  - Con `dictionary=True`: `{'nombre': 'Juan', 'apellidos': 'Pérez', 'email': 'juan@email.com'}`
- **Diferencia JS:** En Node.js, los resultados suelen ser arrays de objetos, similar a los diccionarios de Python.

---

## 2. ¿Qué métodos tiene `cursor`?
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

---

## 3. ¿Para qué es `cursor.fetchone()` y qué pasaría si no lo pones?
- Obtiene la primera fila del resultado de la consulta.
- Si no lo pones, no tendrás acceso a los datos consultados; el cursor solo almacena el resultado, pero no lo extrae.
- Si usas `fetchall()`, obtienes todas las filas en una lista.
- Si no llamas a ningún método de obtención, no puedes procesar los datos.
- **Diferencia JS:** En Node.js, el resultado de la consulta ya es un array de objetos.

---

## 4. `except Exception as e:` ¿Qué hace y cuál es su sintaxis?
- Captura cualquier excepción (error) que ocurra en el bloque `try`.
- `Exception` es la clase base de los errores en Python.
- `as e` guarda el error en la variable `e` para poder imprimirlo o procesarlo.
- Ejemplo:
  ```python
  try:
      # código que puede fallar
  except Exception as e:
      print(e)  # muestra el error
  ```
- Así evitas que el programa se detenga por un error y puedes manejarlo.
- **Diferencia JS:** En Node.js se usa `try/catch (error) { ... }`.

---

## 5. ¿La conexión se cierra cada vez que hago una consulta en la función del controller?
- Sí, en cada función se abre una conexión y un cursor, y ambos se cierran al final (en el bloque `finally`).
- Esto es buena práctica para liberar recursos y evitar conexiones abiertas innecesarias.
- **Diferencia JS:** En Node.js, el pool gestiona las conexiones y normalmente no se cierran manualmente en cada consulta.

---

## 6. ¿No se pone `?` para enviar algo a MySQL, sino `%s`?
- Correcto. En `mysql.connector` (Python), el marcador de posición es `%s`.
- En otros drivers (como sqlite3 o algunos de Node.js), se usa `?`.
- Ejemplo:
  ```python
  cursor.execute("SELECT * FROM usuarios WHERE id = %s", (usuario_id,))
  ```
- **Diferencia JS:** En Node.js, con `mysql2` se puede usar `?` como marcador de posición.

---

## 7. ¿Después controlaremos los datos que una sesión en el backend, habrá que cambiar cosas verdad?
- Sí, si quieres manejar sesiones (por ejemplo, saber qué usuario está logueado), tendrás que:
  - Integrar Flask con sesiones (`flask.session`).
  - Modificar los controladores para obtener el `usuario_id` desde la sesión, no como argumento.
  - Añadir middleware o decoradores para verificar autenticación.
- El código actual espera el `usuario_id` como argumento, pero con sesiones lo obtendrás de la sesión activa.
- **Diferencia JS:** En Node.js, Express usa `req.session` para manejar sesiones.

---

## Diferencias generales con JavaScript/Node.js
- **Estilo de nombres:** Python usa snake_case, JavaScript usa camelCase.
- **Importaciones:** Python usa `import` y `from ... import ...`, Node.js usa `require`.
- **Manejo de base de datos:** Python usa `mysql.connector` y cursores, Node.js usa `mysql2` y promesas.
- **Manejo de errores:** Python usa `try/except/finally`, Node.js usa `try/catch` y callbacks/promesas.
- **Respuestas:** En Flask se devuelve una tupla `(dict, status)`, en Express se usa `res.status(...).json(...)`.
- **Hash de contraseñas:** La lógica es similar, pero la sintaxis de bcrypt varía entre ambos lenguajes.

---

¿Quieres que te explique cómo conectar estos controladores con Flask y exponerlos como endpoints?
