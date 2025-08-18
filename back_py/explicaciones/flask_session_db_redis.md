# Guardar sesiones en base de datos o Redis con Flask-Session

---

## Ejemplo: Guardar sesiones en Redis

```python
from flask import Flask
from flask_session import Session
import redis
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')

# Configuración para usar Redis como backend de sesiones
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.Redis(host='localhost', port=6379, db=0)
Session(app)
```

- `SESSION_TYPE = 'redis'`: Indica que las sesiones se guardarán en Redis.
- `SESSION_REDIS`: Instancia de conexión a Redis.

## Ejemplo: Guardar sesiones en base de datos (MySQL, PostgreSQL, etc.)

Flask-Session soporta `sqlalchemy` para guardar sesiones en bases de datos relacionales:

```python
from flask import Flask
from flask_session import Session
from sqlalchemy import create_engine
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'supersecretkey')

# Configuración para usar SQLAlchemy como backend de sesiones
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SESSION_SQLALCHEMY'] = create_engine('mysql+pymysql://usuario:clave@localhost/db')
Session(app)
```

- `SESSION_TYPE = 'sqlalchemy'`: Indica que las sesiones se guardarán en una base de datos.
- `SESSION_SQLALCHEMY`: Instancia de conexión SQLAlchemy.

---

## Nota
- Puedes usar otros backends soportados: `mongodb`, `memcached`, `filesystem`, etc.
- Consulta la documentación oficial: https://flask-session.readthedocs.io/en/latest/

---

¿Quieres ejemplos de cómo instalar y configurar Redis o SQLAlchemy en tu proyecto?
