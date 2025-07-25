const bcrypt = require('bcrypt');
const db = require('../db/conection');

const postLogin = async (req, res) => {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try{
    let sql = 'SELECT * FROM usuarios WHERE email = ?';
    const [resultados] = await db.query(sql, [email]);
    
    if (resultados.length === 0) {
      return res.status(401).json({ error: 'El usuario no existe' });
    }
    const usuario = resultados[0]
    console.log(`ID de usuario: ${usuario.id} linea 18 login.controller.js`); // Debugging line to check user ID
    const contraseñaValidada = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValidada) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    console.log('Inicio de sesión exitoso:', usuario);
    req.session.usuarioId = usuario.id;
    req.session.nombre = usuario.nombre;
    req.session.apellidos = usuario.apellidos;
    req.session.email = usuario.email;
    req.session.save((err) => {
      if (err) {
        console.error('Error al guardar la sesión:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email
      },
      mensaje: 'Inicio de sesión exitoso'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { postLogin };