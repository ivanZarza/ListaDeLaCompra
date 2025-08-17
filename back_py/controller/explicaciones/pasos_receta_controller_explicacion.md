# Preguntas y respuestas sobre el controlador pasos_receta en Python (Flask)

## 1. ¿Qué hace este controlador?
- Gestiona la obtención, inserción, actualización y eliminación de pasos asociados a recetas de un usuario.

## 2. ¿Cómo se verifica la autenticación del usuario?
- En Node.js: `req.session.usuarioId`.
- En Python: `session.get('usuario_id')`.

## 3. ¿Cómo se obtienen los pasos por usuario?
- Consulta SQL: `SELECT * FROM pasos_por_receta WHERE usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (usuario_id,))` y `fetchall()`.

## 4. ¿Cómo se obtienen los pasos por receta?
- Consulta SQL: `SELECT * FROM pasos_por_receta WHERE receta_id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (receta_id, usuario_id))`.

## 5. ¿Cómo se obtiene un paso por id?
- Consulta SQL: `SELECT * FROM pasos_por_receta WHERE id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (id, usuario_id))` y `fetchone()`.

## 6. ¿Cómo se inserta un paso?
- Consulta SQL: `INSERT INTO pasos_por_receta (receta_id, elaboracion, imagen, usuario_id) VALUES (?, ?, ?, ?)`.
- En Python se usa `cursor.execute(sql, (receta_id, elaboracion, imagen, usuario_id))`.

## 7. ¿Cómo se insertan varios pasos en una transacción?
- En Node.js se usa `beginTransaction`, en Python se usa `db.start_transaction()` y se recorre la lista con un bucle.

## 8. ¿Cómo se actualiza un paso?
- Consulta SQL: `UPDATE pasos_por_receta SET receta_id = ?, elaboracion = ?, imagen = ? WHERE id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (receta_id, elaboracion, imagen, id, usuario_id))`.

## 9. ¿Cómo se elimina un paso?
- Consulta SQL: `DELETE FROM pasos_por_receta WHERE id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (id, usuario_id))`.

## 10. ¿Cómo se maneja el resultado de la consulta?
- En Node.js: se verifica `pasos.length === 0`.
- En Python: se verifica `if not pasos:`.

## 11. ¿Cómo se maneja el resultado de una inserción/actualización/eliminación?
- En Node.js: se usa `result.affectedRows`.
- En Python: se usa `cursor.rowcount`.

## 12. ¿Cómo se maneja la respuesta al cliente?
- Node.js: `res.status(200).json({...})`.
- Python: `return {...}, 200`.

## 13. ¿Cómo se convierte una tupla en diccionario?
- Se usa `[desc[0] for desc in cursor.description]` para obtener los nombres de las columnas de la consulta SQL.
- Cada elemento de la lista de resultados (`pasos`, por ejemplo) es una tupla con los valores de cada columna.
- Se utiliza `zip` para unir cada nombre de columna con su valor correspondiente en la tupla.
- `dict(zip(...))` crea un diccionario donde las claves son los nombres de columna y los valores son los datos de la tupla.
- El resultado es una lista de diccionarios, más fácil de usar en el frontend.
- Ejemplo: Si la consulta devuelve `[('Cortar', 'imagen1.png'), ('Mezclar', 'imagen2.png')]` y las columnas son `['elaboracion', 'imagen']`, el resultado será:
  `[{'elaboracion': 'Cortar', 'imagen': 'imagen1.png'}, {'elaboracion': 'Mezclar', 'imagen': 'imagen2.png'}]`
- Así el frontend recibe un objeto con claves y valores, no una tupla.

## 14. ¿Para qué sirve db.rollback()?
- Si ocurre un error durante una transacción, `db.rollback()` revierte todos los cambios realizados en la base de datos desde el inicio de la transacción.
- Así se evita que la base de datos quede en un estado inconsistente o con datos parciales.

## 15. ¿Por qué se usa siempre db y get_connection() en todos los controladores?
- Para mantener coherencia y legibilidad en todo el proyecto, se recomienda usar siempre la variable `db` y la función `get_connection()` en todos los controladores Python.
- Así, el código es más fácil de entender y mantener, y se evita confusión entre diferentes nombres.
- `get_connection()` es la función definida en el módulo de conexión y debe usarse en todos los controladores para obtener la conexión activa a la base de datos.
- El nombre de la variable (`db`) es una convención que representa la conexión activa y se debe mantener igual en todos los archivos.

## 16. ¿Por qué se usa snake_case en Python?
- Es la convención oficial de nombres en Python (PEP 8).

## 17. ¿Qué métodos útiles tienen las listas y diccionarios en Python?
- Listas: `.append()`, `.extend()`, `.insert()`, `.remove()`, `.pop()`, `.sort()`, `.reverse()`, `len()`
- Diccionarios: `.get()`, `.keys()`, `.values()`, `.items()`, `.update()`, `.pop()`

## 18. ¿Cómo se accede a los valores de una lista o diccionario?
- Lista: `lista[indice]`
- Diccionario: `dic['clave']` o `dic.get('clave')`

## 19. Tabla comparativa de acciones
| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Verificar usuario     | req.session.usuarioId            | session.get('usuario_id')     |
| Consulta por usuario  | db.query(sql, [usuarioId])       | cursor.execute(sql, (usuario_id,)) |
| Consulta por receta   | db.query(sql, [recetaId, usuarioId]) | cursor.execute(sql, (receta_id, usuario_id)) |
| Insertar paso         | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Insertar varios       | beginTransaction, commit, rollback | start_transaction, commit, rollback |
| Actualizar paso       | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Eliminar paso         | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Responder al cliente  | res.status(200).json({...})      | return {...}, 200             |
