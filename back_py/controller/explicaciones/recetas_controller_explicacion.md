# Preguntas y respuestas sobre el controlador recetas en Python (Flask)

## 1. ¿Qué hace este controlador?
- Gestiona la obtención, inserción, actualización y eliminación de recetas de un usuario.

## 2. ¿Cómo se verifica la autenticación del usuario?
- En Node.js: `req.session.usuarioId`.
- En Python: `session.get('usuario_id')`.

## 3. ¿Cómo se obtienen las recetas por usuario?
- Consulta SQL: `SELECT id, nombre, descripcion, created_at FROM recetas WHERE usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (usuario_id,))` y `fetchall()`.

## 4. ¿Cómo se obtienen los detalles de una receta?
- Consulta SQL: ingredientes y pasos por receta.
- En Python se usa `cursor.execute(sql, (id,))` y `fetchall()` para ambos.

## 5. ¿Cómo se inserta una receta?
- Consulta SQL: `INSERT INTO recetas (usuario_id, nombre, descripcion) VALUES (?, ?, ?)`.
- En Python se usa `cursor.execute(sql, (usuario_id, nombre, descripcion))` y luego se obtiene el id con otra consulta.

## 6. ¿Cómo se actualiza una receta?
- Consulta SQL: `UPDATE recetas SET nombre = ?, descripcion = ? WHERE id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (nombre, descripcion, id, usuario_id))`.

## 7. ¿Cómo se elimina una receta?
- Consulta SQL: `DELETE FROM recetas WHERE id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (id, usuario_id))`.

## 8. ¿Cómo se maneja el resultado de la consulta?
- En Node.js: se verifica `recetas.length === 0`.
- En Python: se verifica `if not recetas:`.

## 9. ¿Cómo se maneja el resultado de una inserción/actualización/eliminación?
- En Node.js: se usa `result.affectedRows`.
- En Python: se usa `cursor.rowcount`.

## 10. ¿Cómo se maneja la respuesta al cliente?
- Node.js: `res.status(200).json({...})`.
- Python: `return {...}, 200`.

## 11. ¿Cómo se convierte una tupla en diccionario?
- Se usa `[desc[0] for desc in cursor.description]` para obtener los nombres de las columnas de la consulta SQL.
- Cada elemento de la lista de resultados (`recetas`, `ingredientes`, `pasos`) es una tupla con los valores de cada columna.
- Se utiliza `zip` para unir cada nombre de columna con su valor correspondiente en la tupla.
- `dict(zip(...))` crea un diccionario donde las claves son los nombres de columna y los valores son los datos de la tupla.
- El resultado es una lista de diccionarios, más fácil de usar en el frontend.
- Ejemplo: Si la consulta devuelve `[('Tarta', 'Postre'), ('Ensalada', 'Entrante')]` y las columnas son `['nombre', 'descripcion']`, el resultado será:
  `[{'nombre': 'Tarta', 'descripcion': 'Postre'}, {'nombre': 'Ensalada', 'descripcion': 'Entrante'}]`
- Así el frontend recibe un objeto con claves y valores, no una tupla.

## 12. ¿Para qué sirve db.rollback()?
- Si ocurre un error durante una transacción, `db.rollback()` revierte todos los cambios realizados en la base de datos desde el inicio de la transacción.
- Así se evita que la base de datos quede en un estado inconsistente o con datos parciales.

## 13. ¿Por qué se usa siempre db y get_connection() en todos los controladores?
- Para mantener coherencia y legibilidad en todo el proyecto, se recomienda usar siempre la variable `db` y la función `get_connection()` en todos los controladores Python.
- Así, el código es más fácil de entender y mantener, y se evita confusión entre diferentes nombres.
- `get_connection()` es la función definida en el módulo de conexión y debe usarse en todos los controladores para obtener la conexión activa a la base de datos.
- El nombre de la variable (`db`) es una convención que representa la conexión activa y se debe mantener igual en todos los archivos.

## 14. ¿Por qué se usa snake_case en Python?
- Es la convención oficial de nombres en Python (PEP 8).

## 15. ¿Qué métodos útiles tienen las listas y diccionarios en Python?
- Listas: `.append()`, `.extend()`, `.insert()`, `.remove()`, `.pop()`, `.sort()`, `.reverse()`, `len()`
- Diccionarios: `.get()`, `.keys()`, `.values()`, `.items()`, `.update()`, `.pop()`

## 16. ¿Cómo se accede a los valores de una lista o diccionario?
- Lista: `lista[indice]`
- Diccionario: `dic['clave']` o `dic.get('clave')`

## 17. Tabla comparativa de acciones
| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Verificar usuario     | req.session.usuarioId            | session.get('usuario_id')     |
| Consulta por usuario  | db.query(sql, [usuarioId])       | cursor.execute(sql, (usuario_id,)) |
| Consulta detalles     | db.query(sql, [id])              | cursor.execute(sql, (id,))    |
| Insertar receta       | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Actualizar receta     | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Eliminar receta       | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Responder al cliente  | res.status(200).json({...})      | return {...}, 200             |
