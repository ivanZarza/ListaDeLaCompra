const bcrypt = require('bcrypt');
const db = require('../db/conection');  

const postRegistro = async (req, res) => {
  const { nombre, apellidos, email, contraseña } = req.body;
  if (!nombre || !apellidos || !email || !contraseña) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    // Comprobar si el usuario ya existe
    const sqlComprobar = 'SELECT * FROM usuarios WHERE email = ?';
    const [resultados] = await db.query(sqlComprobar, [email]);
    if (resultados.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10); 
    const sql = 'INSERT INTO usuarios (nombre, apellidos, email, contraseña) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [nombre, apellidos, email, contraseñaHasheada]);
    if (result.affectedRows === 0) {
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    return res.status(201).json({ id: result.insertId, mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { postRegistro };