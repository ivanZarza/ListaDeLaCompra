# Preguntas y respuestas sobre la conexión a MySQL en Python y diferencias con Node.js/Express

---

**1. ¿Por qué se usa dotenv y os en Python para la configuración?**
- `dotenv` permite cargar variables de entorno desde un archivo `.env`, igual que en Node.js con `require('dotenv').config()`.
- `os` se usa para acceder a las variables de entorno, equivalente a `process.env` en Node.js.

---

**2. ¿Cómo se obtienen los valores de configuración en Python y en JS?**
- En Python: `os.getenv('DB_HOST', 'localhost')` (valor por defecto si no existe).
- En JS: `process.env.DB_HOST || 'localhost'`.

---

**3. ¿Cómo se crea la conexión a MySQL en Python y en JS?**
- En Python: `mysql.connector.connect({...})`.
- En JS: `mysql.createConnection({...})` o usando un pool con `mysql.createPool({...})`.

---

**4. ¿Qué diferencia hay entre conexión directa y pool de conexiones?**
- Conexión directa: se abre y cierra cada vez que se necesita.
- Pool: mantiene varias conexiones abiertas y las reutiliza, mejor para aplicaciones con muchas peticiones.

---

**5. ¿Cómo se recomienda gestionar las credenciales y configuración?**
- Siempre usar variables de entorno y nunca dejar credenciales en el código fuente.
- Usar archivos `.env` y librerías como dotenv.

---

¿Quieres agregar más preguntas o ejemplos específicos sobre conexiones a bases de datos en Python y Node.js?
