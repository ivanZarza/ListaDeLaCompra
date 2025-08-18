# Ejemplos prácticos comparativos Python (Flask) vs Node.js (Express)

---

## 1. Consulta SQL y conversión de resultados

### Python (Flask)
```python
# Consulta y conversión de tuplas a diccionario
cursor.execute("SELECT id, nombre FROM recetas WHERE usuario_id = %s", (usuario_id,))
recetas = cursor.fetchall()
recetas_list = [dict(zip([desc[0] for desc in cursor.description], r)) for r in recetas]
# Resultado: [{'id': 1, 'nombre': 'Tarta'}, ...]
```

### Node.js (Express)
```javascript
// Consulta y resultado como array de objetos
const [recetas] = await db.query('SELECT id, nombre FROM recetas WHERE usuario_id = ?', [usuarioId]);
// Resultado: [{id: 1, nombre: 'Tarta'}, ...]
```

---

## 2. Uso de sesiones y autenticación

### Python (Flask)
```python
# Guardar usuario en sesión tras login
session['usuario_id'] = usuario['id']
# Obtener usuario en cualquier ruta
usuario_id = session.get('usuario_id')
```

### Node.js (Express)
```javascript
// Guardar usuario en sesión tras login
req.session.usuarioId = usuario.id;
// Obtener usuario en cualquier ruta
const usuarioId = req.session.usuarioId;
```

---

## 3. Manejo de errores

### Python (Flask)
```python
try:
    # código que puede fallar
except Exception as e:
    print(e)
    return {'error': 'Error interno del servidor'}, 500
```

### Node.js (Express)
```javascript
try {
    // código que puede fallar
} catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Error interno del servidor' });
}
```

---

## 4. Configuración avanzada de Flask y Express

### Python (Flask)
```python
app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SESSION_TYPE'] = 'redis'
app.run(debug=True, host='127.0.0.1', port=8080, threaded=True)
```

### Node.js (Express)
```javascript
const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.static('static'));
app.set('views', './templates');
app.use(session({ secret: 'clave', resave: false, saveUninitialized: true }));
app.listen(8080, '127.0.0.1');
```

---

## 5. Ejemplo de ruta y controlador completo

### Python (Flask)
```python
from flask import Blueprint, request, session
from controller.recetas_controller import get_recetas
recetas_bp = Blueprint('recetas', __name__)

@recetas_bp.route('/recetas', methods=['GET'])
def route_get_recetas():
    usuario_id = session.get('usuario_id')
    data, status = get_recetas(usuario_id)
    return data, status
```

### Node.js (Express)
```javascript
const express = require('express');
const router = express.Router();
const { getRecetas } = require('../controller/recetas.controller');

router.get('/recetas', async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const recetas = await getRecetas(usuarioId);
    res.status(200).json(recetas);
});
```

---

¿Quieres ejemplos de pruebas, paginación, o integración con frontend?
