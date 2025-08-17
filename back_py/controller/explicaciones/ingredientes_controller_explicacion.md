# Preguntas y respuestas sobre el controlador de ingredientes en Python y diferencias con Node.js/Express

---

**1. ¿Cómo se reciben los parámetros en Flask vs Express?**
- En Flask, los parámetros se extraen de la ruta o de la petición y se pasan como argumentos a la función.
- En Express, se accede a los parámetros con `req.query` o `req.body`.

---

**2. ¿Cómo se construyen las consultas SQL con filtros en Python y JS?**
- En Python: se usan `%s` como marcadores de posición y se pasan los parámetros en una lista.
- En JS: se usan `?` como marcadores de posición y los parámetros en un array.

---

**3. ¿Cómo se implementa la paginación en ambos lenguajes?**
- En Python: se calcula el `offset` y se añade `LIMIT %s OFFSET %s` a la consulta.
- En JS: se calcula el `offset` y se añade `LIMIT ? OFFSET ?`.

---

**4. ¿Cómo se obtiene el total de resultados para la paginación?**
- Se hace una consulta `SELECT COUNT(*)` con los mismos filtros que la consulta principal.

---

**5. ¿Cómo se devuelven los resultados y el código de estado?**
- En Python: se devuelve un diccionario y el código de estado como una tupla.
- En JS: se usa `res.status(...).json({...})`.

---

**6. ¿Cómo se maneja el control de errores?**
- En Python: bloque `try/except`.
- En JS: bloque `try/catch`.

---

**7. ¿Cómo se pasan los parámetros para filtros en Node.js vs Python?**
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

---

**8. ¿Qué es un f-string en Python y cómo se usa en consultas SQL?**
- Un f-string es una forma de crear cadenas en Python insertando variables dentro de llaves. Por ejemplo, `f"Hola {nombre}"`. 
- En consultas SQL, se usa para construir patrones de búsqueda como `f"%{nombre}%"` para el operador LIKE.
- **Ejemplo:** Si `nombre = "arroz"`, `f"%{nombre}%"` será `"%arroz%"`.

---

**9. ¿Para qué sirve el símbolo `%` en consultas SQL con LIKE?**
- El símbolo `%` es un comodín en SQL. Permite buscar coincidencias parciales:
  - `"%texto%"` busca cualquier valor que contenga "texto".
  - `"texto%"` busca valores que empiezan por "texto".
  - `"%texto"` busca valores que terminan en "texto".
- Así, `LIKE "%arroz%"` encuentra cualquier ingrediente que contenga "arroz" en el nombre.

---

¿Quieres agregar más preguntas o ejemplos específicos sobre filtros, paginación o consultas SQL en Python y Node.js?
