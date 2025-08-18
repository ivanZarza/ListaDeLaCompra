# Preguntas y respuestas sobre el registro de usuarios en Flask

## ¿Cómo se define la ruta para registrar usuarios?
Se utiliza un Blueprint llamado `registro_bp` y se define la ruta POST `/registro` en el archivo `routes/registro.py`.

## ¿Qué datos espera el endpoint de registro?
Recibe un JSON con los campos: `nombre`, `apellidos`, `email`, `contraseña`.

## ¿Cómo se valida si el usuario ya existe?
El controlador ejecuta una consulta SQL para buscar el email en la tabla `usuarios`. Si existe, devuelve un error 400.

## ¿Cómo se almacena la contraseña?
Se hashea usando la librería `bcrypt` antes de guardar en la base de datos.

## ¿Qué devuelve el endpoint si el registro es exitoso?
Un mensaje JSON: `{"mensaje": "Usuario registrado correctamente"}` y el código 201.

## ¿Qué ocurre si falta algún dato obligatorio?
Devuelve un error 400 y un mensaje indicando los datos faltantes.

## ¿Qué ocurre si hay un error interno?
Devuelve un error 500 y un mensaje de error genérico.

## ¿Cómo se prueba el endpoint desde Postman?
- Método: POST
- URL: `http://localhost:5000/api/listadelacompra/registro`
- Body: JSON con los campos requeridos

## ¿Por qué se recomienda usar Blueprint?
Para modularizar las rutas y mantener el código organizado y escalable.

## ¿Qué ventajas tiene usar `dictionary=True` en el cursor?
Permite obtener los resultados de la base de datos como diccionarios, facilitando el manejo y la conversión a JSON.
