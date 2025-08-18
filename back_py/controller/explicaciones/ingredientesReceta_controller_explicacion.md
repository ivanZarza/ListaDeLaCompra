# Preguntas y respuestas sobre el controlador ingredientesReceta en Python (Flask)

## 1. ¿Qué hace este controlador?
- Gestiona la obtención, inserción, actualización y eliminación de ingredientes asociados a recetas de un usuario.

## 2. ¿Cómo se verifica la autenticación del usuario?
- En Node.js: `req.session.usuarioId`.
- En Python: `session.get('usuario_id')`.

## 3. ¿Cómo se obtienen los ingredientes por usuario?
- Consulta SQL: `SELECT * FROM ingredientes_por_receta WHERE usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (usuario_id,))` y `fetchall()`.

## 4. ¿Cómo se obtienen los ingredientes por receta?
- Consulta SQL: `SELECT * FROM ingredientes_por_receta WHERE receta_id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (receta_id, usuario_id))`.

## 5. ¿Cómo se inserta un ingrediente?
- Consulta SQL: `INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (?, ?, ?, ?)`.
- En Python se usa `cursor.execute(sql, (receta_id, ingrediente_id, peso, usuario_id))`.

## 6. ¿Cómo se insertan varios ingredientes en una transacción?
- En Node.js se usa `beginTransaction`, en Python se usa `db.start_transaction()` y se recorre la lista con un bucle.

## 7. ¿Cómo se actualiza un ingrediente?
- Consulta SQL: `UPDATE ingredientes_por_receta SET peso = ? WHERE id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (peso, id, usuario_id))`.

## 8. ¿Cómo se elimina un ingrediente?
- Consulta SQL: `DELETE FROM ingredientes_por_receta WHERE id = ? AND usuario_id = ?`.
- En Python se usa `cursor.execute(sql, (id, usuario_id))`.

## 9. ¿Cómo se maneja el resultado de la consulta?
- En Node.js: se verifica `ingredientes.length === 0`.
- En Python: se verifica `if not ingredientes:`.

## 10. ¿Cómo se maneja el resultado de una inserción/actualización/eliminación?
- En Node.js: se usa `result.insertId` y `result.affectedRows`.
- En Python: se usa `cursor.lastrowid` y `cursor.rowcount`.

## 11. ¿Cómo se maneja la respuesta al cliente?
- Node.js: `res.status(200).json({...})`.
- Python: `return {...}, 200`.

## 12. ¿Cómo se maneja la transacción en la inserción múltiple?
- En Node.js: `beginTransaction`, `commit`, `rollback`.
- En Python: `db.start_transaction()`, `db.commit()`, `db.rollback()`.

## 13. ¿Qué métodos útiles tienen las listas y diccionarios en Python?
- Listas: `.append()`, `.extend()`, `.insert()`, `.remove()`, `.pop()`, `.sort()`, `.reverse()`, `len()`
- Diccionarios: `.get()`, `.keys()`, `.values()`, `.items()`, `.update()`, `.pop()`

## 14. ¿Cómo se accede a los valores de una lista o diccionario?
- Lista: `lista[indice]`
- Diccionario: `dic['clave']` o `dic.get('clave')`

## 15. Tabla comparativa de acciones
| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Verificar usuario     | req.session.usuarioId            | session.get('usuario_id')     |
| Consulta por usuario  | db.query(sql, [usuarioId])       | cursor.execute(sql, (usuario_id,)) |
| Consulta por receta   | db.query(sql, [recetaId, usuarioId]) | cursor.execute(sql, (receta_id, usuario_id)) |
| Insertar ingrediente  | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Insertar varios       | beginTransaction, commit, rollback | start_transaction, commit, rollback |
| Actualizar ingrediente| db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Eliminar ingrediente  | db.query(sql, [...])             | cursor.execute(sql, (...))    |
| Responder al cliente  | res.status(200).json({...})      | return {...}, 200             |

## 16. ¿Cómo se reciben los datos de la consulta antes de convertirlos?
- Se reciben como una lista de tuplas, por ejemplo: `[(1, 2, 50, 3), (2, 5, 100, 3)]`.
- Cada tupla representa una fila de la tabla, con los valores en el orden de las columnas.
- Se puede imprimir con `print(ingredientes)` para ver el formato antes de convertirlo.

## 17. ¿Cómo funciona la línea ingredientes_list = [dict(zip([desc[0] for desc in cursor.description], ing)) for ing in ingredientes]?
- `[desc[0] for desc in cursor.description]` obtiene los nombres de las columnas de la consulta.
- `zip(...)` une cada nombre de columna con su valor correspondiente en la tupla.
- `dict(zip(...))` crea un diccionario para cada tupla, donde las claves son los nombres de columna y los valores son los datos.
- El resultado es una lista de diccionarios, más fácil de usar en el frontend.
- Ejemplo: Si la consulta devuelve `[('Fruta', 50), ('Verdura', 100)]` y las columnas son `['tipo', 'peso']`, el resultado será `[{'tipo': 'Fruta', 'peso': 50}, {'tipo': 'Verdura', 'peso': 100}]`.

## 18. ¿Para qué sirve db.rollback()?
- Si ocurre un error durante una transacción, `db.rollback()` revierte todos los cambios realizados en la base de datos desde el inicio de la transacción.
- Así se evita que la base de datos quede en un estado inconsistente o con datos parciales.

## 19. ¿Cómo funciona la línea ingrediente_dict = dict(zip([desc[0] for desc in cursor.description], ingrediente))?

## 20. ¿Por qué se usa siempre db y get_connection() en todos los controladores?
 Para mantener coherencia y legibilidad en todo el proyecto, se recomienda usar siempre la variable `db` y la función `get_connection()` en todos los controladores Python.
 Así, el código es más fácil de entender y mantener, y se evita confusión entre diferentes nombres.
 `get_connection()` es la función definida en el módulo de conexión y debe usarse en todos los controladores para obtener la conexión activa a la base de datos.
 El nombre de la variable (`db`) es una convención que representa la conexión activa y se debe mantener igual en todos los archivos.

- Si todo va bien, se confirma con `db.commit()`.

## 22. ¿Por qué se cambian los nombres de las funciones y variables entre controladores?
- En Python se recomienda usar snake_case para nombres de funciones y variables, siguiendo la convención PEP 8.
- En Node.js/JavaScript es común usar camelCase.
- Los nombres de las funciones pueden variar entre controladores para reflejar mejor su propósito o para mantener consistencia con el resto del proyecto.
- El nombre de la función que obtiene la conexión (`get_db` o `get_connection`) puede cambiar según cómo esté definida en el módulo de conexión. Se busca mantener coherencia con el resto de los controladores y facilitar la lectura del código.
- El nombre de la variable (`db` o `conn`) es solo una convención; lo importante es que represente la conexión activa a la base de datos.
- Si en un controlador se usa `get_db()` y en otro `get_connection()`, es porque el proyecto puede tener ambas funciones definidas, y se elige la que mejor se adapte a la estructura y estilo del código.
