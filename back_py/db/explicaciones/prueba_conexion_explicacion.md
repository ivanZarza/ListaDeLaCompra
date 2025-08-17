# Preguntas y respuestas sobre la prueba de conexión a MySQL en Python y diferencias con Node.js/Express

---

**1. ¿Cómo se prueba la conexión a la base de datos en Python y en JS?**
- En Python: se obtiene la conexión, se crea un cursor y se ejecuta una consulta simple (`SELECT 1`).
- En JS: se obtiene la conexión y se ejecuta una consulta con `await db.query('SELECT 1')`.

---

**2. ¿Por qué se usa try/except en Python y try/catch en JS?**
- Ambos sirven para capturar errores y evitar que el programa se detenga si la conexión falla.

---

**3. ¿Cómo se cierran los recursos tras la consulta?**
- En Python: `cursor.close()` y `conn.close()`.
- En JS: `conn.release()` (si es pool) o `conn.end()`.

---

**4. ¿Qué significa cursor en Python y cómo se compara con JS?**
- El cursor en Python es el objeto que permite ejecutar consultas y leer resultados. En JS, se usa el resultado de la consulta directamente.

---

**5. ¿Por qué se usa 'SELECT 1' para probar la conexión?**
- Es una consulta muy simple que no depende de ninguna tabla y solo verifica que la base de datos responde correctamente.

---

¿Quieres agregar más preguntas o ejemplos específicos sobre pruebas de conexión en Python y Node.js?
