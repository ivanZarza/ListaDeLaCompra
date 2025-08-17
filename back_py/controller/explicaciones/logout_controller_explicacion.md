# Preguntas y respuestas sobre el controlador de logout en Python (Flask)

## 1. ¿Cómo se gestiona la sesión en Flask comparado con Express?
- En Express (Node.js) se usa `req.session` para acceder y destruir la sesión. En Flask se usa el objeto global `session`.

## 2. ¿Cómo se destruye la sesión?
- En Node.js: `req.session.destroy(callback)` elimina la sesión y ejecuta un callback.
- En Flask: `session.clear()` borra todos los datos de la sesión. No hay callback, pero se puede manejar excepciones con try/except.

## 3. ¿Cómo se verifica si hay sesión activa?
- En Node.js: `if (req.session && req.session.usuarioId)`.
- En Flask: `if session.get('usuario_id')`.

## 4. ¿Cómo se responde al cliente?
- En Node.js: `res.status(200).json({...})`.
- En Flask: se retorna una tupla: `({'mensaje': ...}, 200)`.

## 5. ¿Qué diferencias hay en el manejo de errores?
- En Node.js se usa try/catch y el callback de destroy puede recibir errores.
- En Flask se usa try/except y se imprime el error en consola.

## 6. ¿Por qué se usa snake_case en Python?
- Es la convención oficial de nombres en Python (PEP 8).

## 7. ¿Qué métodos útiles tienen los diccionarios y listas en Python?
- Diccionarios: `.get()`, `.keys()`, `.values()`, `.items()`, `.update()`, `.pop()`
- Listas: `.append()`, `.extend()`, `.insert()`, `.remove()`, `.pop()`, `.sort()`, `.reverse()`, `len()`

## 8. ¿Cómo se accede a los valores de un diccionario?
- Con corchetes: `dic['clave']` o con `.get('clave')`.

## 9. Tabla comparativa de manejo de sesión y respuesta
| Acción                | Node.js (Express)                | Python (Flask)                |
|-----------------------|----------------------------------|-------------------------------|
| Verificar sesión      | req.session && req.session.usuarioId | session.get('usuario_id')     |
| Destruir sesión       | req.session.destroy(callback)     | session.clear()               |
| Responder al cliente  | res.status(200).json({...})      | return {...}, 200             |
| Manejo de errores     | try/catch + callback             | try/except                    |

## 10. ¿Cómo se importan módulos en Python y JS?
- Python: `from flask import session`
- JS: `const session = require('express-session')`
