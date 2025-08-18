# Preguntas y respuestas sobre registro.controller.py y diferencias con JavaScript/Node.js


**Pregunta:** ¿Por qué en Python (Flask) los controladores reciben parámetros directamente y en JavaScript (Express) suelen recibir `req` y `res`?
**Respuesta:**
En Flask, los controladores suelen recibir solo los parámetros relevantes (por ejemplo, `email`, `contraseña`) porque la extracción de datos del request se realiza en la ruta y se pasan como argumentos. Esto hace que el código sea más limpio y fácil de testear. En Express, los controladores reciben los objetos `req` y `res` para tener acceso completo a la petición y la respuesta, lo que puede ser útil pero menos modular y más difícil de testear.

**1. ¿Los if tienen diferente forma de declararse que en JS?**
- Sí. En Python:
  ```python
  if condicion:
      # código
  if not condicion:
      # negación
  ```
  En JavaScript:
  ```javascript
  if (condicion) {
    // código
  }
  if (!condicion) {
    // negación
  }
  ```
- En Python no se usan paréntesis ni llaves, sino dos puntos y sangría. La negación se hace con `not` en vez de `!` como en JS.

---

**2. ¿Por qué aquí usa fetchall y en datos usuario solo fetchone?**
- `fetchone()` obtiene solo la primera fila del resultado (ideal para consultas por ID).
- `fetchall()` obtiene todas las filas (ideal para comprobar si hay usuarios existentes con ese email).
- En JS, el resultado de una consulta suele ser un array de objetos, así que no hay distinción entre uno y todos, pero en Python sí.

---

**3. bcrypt tiene diferente forma de declaración entre Python y JS**
- Sí. En JS:
  ```javascript
  const bcrypt = require('bcrypt');
  const hash = await bcrypt.hash(password, 10);
  const valid = await bcrypt.compare(password, hash);
  ```
- En Python:
  ```python
  import bcrypt
  hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
  valid = bcrypt.checkpw(password.encode(), hash.encode())
  ```
- En Python se usan métodos de clase y hay que codificar/decodificar los strings.

---

**4. conn.commit() ¿qué es y cuál es la diferencia con JS? ¿Por qué en JS no hay que hacerlo y en Python sí?**
- `conn.commit()` guarda los cambios realizados en la base de datos (INSERT, UPDATE, DELETE).
- En JS (con mysql2), los cambios se guardan automáticamente tras ejecutar la consulta.
- En Python, si no llamas a `commit()`, los cambios no se aplican realmente en la base de datos.

---

**5. len(resultados): ¿len es un método de arrays o listas en Python? ¿Cuáles más hay?**
- `len()` es una función que devuelve la longitud de listas, arrays, diccionarios, strings, etc.
- Ejemplo:
  ```python
  lista = [1, 2, 3]
  print(len(lista))  # 3
  ```
- Otros métodos útiles para listas:
  - `append()`: añade un elemento
  - `pop()`: elimina y devuelve el último elemento
  - `remove()`: elimina un elemento por valor
  - `sort()`: ordena la lista
  - `reverse()`: invierte la lista

---

**6. rowcount==0 ¿es las líneas que se vieron afectadas?**
- Sí. `cursor.rowcount` indica cuántas filas fueron modificadas por la última consulta (INSERT, UPDATE, DELETE).
- Si es 0, significa que no se insertó, actualizó o eliminó ningún registro.
- En JS, se usa `result.affectedRows` para lo mismo.

---


---

**7. Ejemplos de diferencias de declaración entre Python y JavaScript**

- **Declaración de variables**
  - Python:
    ```python
    nombre = "Juan"
    edad = 30
    ```
  - JavaScript:
    ```javascript
    let nombre = "Juan";
    const edad = 30;
    ```

- **Funciones**
  - Python:
    ```python
    def saludar(nombre):
        print("Hola", nombre)
    ```
  - JavaScript:
    ```javascript
    function saludar(nombre) {
      console.log("Hola", nombre);
    }
    // O con arrow function:
    const saludar = nombre => console.log("Hola", nombre);
    ```

- **Condicionales**
  - Python:
    ```python
    if edad > 18:
        print("Mayor de edad")
    if not activo:
        print("No está activo")
    ```
  - JavaScript:
    ```javascript
    if (edad > 18) {
      console.log("Mayor de edad");
    }
    if (!activo) {
      console.log("No está activo");
    }
    ```

- **Bucles**
  - Python:
    ```python
    for i in range(5):
        print(i)
    ```
  - JavaScript:
    ```javascript
    for (let i = 0; i < 5; i++) {
      console.log(i);
    }
    ```

- **Listas/Arrays**
  - Python:
    ```python
    lista = [1, 2, 3]
    lista.append(4)
    ```
  - JavaScript:
    ```javascript
    let lista = [1, 2, 3];
    lista.push(4);
    ```

---


- **Objetos/Diccionarios**
  - Python:
    ```python
    persona = {"nombre": "Juan", "edad": 30}
    print(persona["nombre"])
    persona["ciudad"] = "Madrid"
    ```
  - JavaScript:
    ```javascript
    let persona = { nombre: "Juan", edad: 30 };
    console.log(persona.nombre);
    persona.ciudad = "Madrid";
    ```

- **Clases**

  - Python (explicación línea por línea):
    ```python
    class Persona:  # Define la clase Persona
        def __init__(self, nombre, edad):  # Método constructor, se llama al crear el objeto
            self.nombre = nombre  # Asigna el parámetro nombre al atributo del objeto
            self.edad = edad      # Asigna el parámetro edad al atributo del objeto
        def saludar(self):  # Método de la clase para saludar
            print(f"Hola, soy {self.nombre}")  # Imprime un saludo usando el atributo nombre
    juan = Persona("Juan", 30)  # Crea una instancia de Persona con nombre "Juan" y edad 30
    juan.saludar()  # Llama al método saludar de la instancia juan
    ```

  - JavaScript (explicación línea por línea):
    ```javascript
    class Persona { // Define la clase Persona
      constructor(nombre, edad) { // Método constructor, se llama al crear el objeto
        this.nombre = nombre;     // Asigna el parámetro nombre al atributo del objeto
        this.edad = edad;         // Asigna el parámetro edad al atributo del objeto
      }
      saludar() { // Método de la clase para saludar
        console.log(`Hola, soy ${this.nombre}`); // Imprime un saludo usando el atributo nombre
      }
    }
    const juan = new Persona("Juan", 30); // Crea una instancia de Persona con nombre "Juan" y edad 30
    juan.saludar(); // Llama al método saludar de la instancia juan
    ```

- **Importaciones**
  - Python:
    ```python
    import math
    from db.conexion import get_connection
    ```
  - JavaScript:
    ```javascript
    const math = require('mathjs');
    const getConnection = require('./db/conection');
    // O con ES Modules:
    import math from 'mathjs';
    import { getConnection } from './db/conection.js';
    ```

- **Manejo de errores**
  - Python:
    ```python
    try:
        resultado = 10 / 0
    except Exception as e:
        print("Error:", e)
    ```
  - JavaScript:
    ```javascript
    try {
      let resultado = 10 / 0;
    } catch (e) {
      console.log("Error:", e);
    }
    ```

- **None vs null**
  - Python:
    ```python
    valor = None
    if valor is None:
        print("Sin valor")
    ```
  - JavaScript:
    ```javascript
    let valor = null;
    if (valor === null) {
      console.log("Sin valor");
    }
    ```

---

¿Quieres ejemplos de estructuras más avanzadas o alguna comparación específica?
