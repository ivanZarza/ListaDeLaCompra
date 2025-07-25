const bcrypt = require('bcrypt');
const db = require('../db/conection');

const getDatosUsuario = async (req, res) => {
  const usuarioId = req.session.id;
console.log(`ID de usuario: ${usuarioId}`); // Debugging line to check user ID
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  try {
    const [usuarios] = await db.query('SELECT nombre, apellidos, email FROM usuarios WHERE id = ?', [usuarioId]);
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json(usuarios[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const putDatosUsuario = async (req, res) => {
  const { nombre, apellidos, email, contraseñaActual, nuevaContraseña } = req.body;
  const usuarioId = req.session.id;

  if (!nombre || !apellidos || !email || !contraseñaActual || !nuevaContraseña) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const [usuarios] = await db.query('SELECT contraseña FROM usuarios WHERE id = ?', [usuarioId]);
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const contraseñaValida = await bcrypt.compare(contraseñaActual, usuarios[0].contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }

    const contraseñaHasheada = await bcrypt.hash(nuevaContraseña, 10);
    const sql = 'UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, contraseña = ? WHERE id = ?';
    const [result] = await db.query(sql, [nombre, apellidos, email, contraseñaHasheada, usuarioId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Datos de usuario actualizados correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteDatosUsuario = async (req, res) => {
  const usuarioId = req.session.id;
  
  try {
    const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [usuarioId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    req.session.destroy();
    return res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getDatosUsuario, putDatosUsuario, deleteDatosUsuario };