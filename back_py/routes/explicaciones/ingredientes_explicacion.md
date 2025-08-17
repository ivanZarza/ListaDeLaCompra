# Preguntas y respuestas sobre la ruta de ingredientes en Flask y diferencias con Express/Node.js

---

**1. ¿Cómo se reciben los parámetros en la ruta en Flask vs Express?**
- En Flask: `request.args.get('nombre')` para query string.
- En Express: `req.query.nombre`.

---

**2. ¿Cómo se maneja la paginación en la ruta?**
- En Flask: se obtiene el parámetro `pagina` y se convierte a entero, con valor por defecto 1.
- En Express: se obtiene con `Number(req.query.pagina) || 1`.

---

**3. ¿Cómo se conecta la ruta con el controlador?**
- En Flask: se llama a la función del controlador pasando los parámetros.
- En Express: se llama al controlador pasando `req` y `res`.

---

**4. ¿Cómo se devuelve la respuesta y el código de estado?**
- En Flask: `return respuesta, status`.
- En Express: `res.status(status).json(respuesta)`.

---

¿Quieres agregar más preguntas o ejemplos específicos sobre rutas, filtros o paginación en Flask y Express?
