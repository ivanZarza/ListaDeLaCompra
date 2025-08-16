# Preguntas y respuestas sobre la ruta de login en Flask y diferencias con Express/Node.js

---

**1. ¿Por qué se usa Blueprint en Flask y Router en Express?**
- Blueprint en Flask permite modularizar las rutas y agruparlas por funcionalidad, similar a Router en Express.
- En Flask: `Blueprint('nombre', __name__)`
- En Express: `const router = express.Router()`

---

**2. ¿Cómo se acceden a los datos enviados por el cliente?**
- En Flask: `request.get_json()` para JSON, `request.form` para formularios.
- En Express: `req.body`.

---

**3. ¿Cómo se llama al controlador desde la ruta?**
- En Flask, se llama directamente a la función del controlador pasando los parámetros necesarios.
- En Express, se suele pasar `req` y `res` al controlador.

---

**4. ¿Cómo se guarda el usuario_id en la sesión tras el login?**
- En Flask: `session['usuario_id'] = ...`.
- En Express: `req.session.usuarioId = ...` (con express-session).

---

**5. ¿Cómo se devuelve la respuesta y el código de estado?**
- En Flask: `return respuesta, status`.
- En Express: `res.status(status).json(respuesta)`.

---

**6. ¿Qué diferencias hay entre la gestión de sesión en Flask y Express?**
- Flask usa el objeto `session` integrado, Express necesita el middleware `express-session`.

---

**7. ¿Se devuelve el usuario tras el login o hay que hacer otra petición?**
- El controlador de login devuelve directamente los datos del usuario en la respuesta junto con el mensaje y el código de estado. No es necesario hacer otra petición para obtener los datos del usuario tras el login.
- Ejemplo:
  ```python
  return {
      "usuario": {
          "id": usuario["id"],
          "nombre": usuario["nombre"],
          "apellidos": usuario["apellidos"],
          "email": usuario["email"]
      },
      "mensaje": "Inicio de sesión exitoso"
  }, 200
  ```
- En la ruta, estos datos se devuelven directamente al cliente.

---

**8. ¿Por qué bcrypt se usa diferente en Python y en Express?**
- En Express (Node.js), bcrypt se usa de forma asíncrona y no requiere codificar los strings. En Python, bcrypt es síncrono y requiere convertir los strings a bytes usando .encode() y .decode().
- Ejemplo Node.js:
  ```javascript
  const bcrypt = require('bcrypt');
  const valid = await bcrypt.compare(password, hash);
  const hash = await bcrypt.hash(password, 10);
  ```
- Ejemplo Python:
  ```python
  import bcrypt
  valid = bcrypt.checkpw(password.encode(), hash.encode())
  hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
  ```
- Además, en Python se usan tuplas para devolver respuesta y status, mientras que en Express se usa `res.status(...).json(...)`.

---

**9. ¿Cómo se añaden elementos a una lista en Python?**
- Se usa el método .append() para añadir un solo elemento y .extend() para añadir varios elementos de otra lista.
- Ejemplo:
  ```python
  mi_lista = []
  mi_lista.append("nuevo elemento")
  mi_lista.extend(["otro", "más"])
  ```

---

**10. ¿Cómo se añaden o modifican elementos en un diccionario en Python?**
- Se usa la sintaxis con corchetes: `diccionario["clave"] = valor`
- Ejemplo:
  ```python
  mi_diccionario = {}
  mi_diccionario["usuario_id"] = 123
  ```

---

**11. ¿session["usuario_id"] en Flask es equivalente a req.session.usuarioId en Express?**
- Sí, ambos permiten guardar información en la sesión del usuario. En Flask se usa sintaxis de diccionario, en Express de objeto.

---

**12. ¿Qué diferencia hay entre .append() y .extend() en listas?**
- `.append()` añade un solo elemento, `.extend()` añade todos los elementos de otra lista.

---

**13. ¿Cómo se declaran y manipulan listas y diccionarios en Python vs JavaScript?**
- En Python, las listas se declaran con corchetes: `lista = [1, 2, 3]`
  Para añadir elementos se usa `.append()`, para modificar por índice se usan corchetes: `lista[0] = "nuevo"`.
  Métodos útiles: `.append()`, `.extend()`, `.pop()`, `.remove()`, `.sort()`, `.reverse()`
- En Python, los diccionarios se declaran con llaves: `diccionario = {"clave": "valor"}`
  Para añadir o modificar se usan corchetes: `diccionario["nueva"] = "valor"`
- En JS, las listas (arrays) se declaran con corchetes y se añaden con `.push()`: `let arr = [1,2,3]; arr.push(4)`
  Los objetos se declaran con llaves y se accede con punto o corchetes: `obj.clave` o `obj["clave"]`
- Ejemplo lista Python:
  ```python
  frutas = ["manzana", "plátano"]
  frutas.append("pera")
  frutas[0] = "naranja"
  ```
- Ejemplo diccionario Python:
  ```python
  persona = {"nombre": "Juan", "edad": 30}
  persona["email"] = "juan@email.com"
  print(persona["nombre"])
  ```
- Métodos de listas Python: `.append()`, `.extend()`, `.insert()`, `.pop()`, `.remove()`, `.sort()`, `.reverse()`, `.count()`, `.index()`

---

¿Quieres agregar más preguntas o ejemplos específicos sobre login y sesión en Flask y Express?
