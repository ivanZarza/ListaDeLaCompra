const db = require('../../db/conection');

const getPasosRecetas = async (req, res) => {
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  const sql = 'SELECT * FROM pasos_por_receta WHERE usuario_id = ?';
  try {
    const [pasos] = await db.query(sql, [usuarioId]);
    if (pasos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron pasos para este usuario' });
    }
    return res.status(200).json(pasos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getUnPasoReceta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!id) {
    return res.status(400).json({ error: 'Falta el ID del paso' });
  }
  
  const sql = 'SELECT * FROM pasos_por_receta WHERE id = ? AND usuario_id = ?';
  try {
    const [paso] = await db.query(sql, [id, usuarioId]);
    if (paso.length === 0) {
      return res.status(404).json({ error: 'Paso no encontrado o no tienes permiso para verlo' });
    }
    return res.status(200).json(paso[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const postPasoReceta = async (req, res) => {
  const { recetaId, elaboracion, imagen } = req.body;
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId || !elaboracion || !imagen) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = 'INSERT INTO pasos_por_receta (receta_id, elaboracion, imagen, usuario_id) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.query(sql, [recetaId, elaboracion, imagen, usuarioId]);
    return res.status(201).json({ mensaje: 'Paso agregado correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const putPasoReceta = async (req, res) => {
  const { id } = req.params;
  const { recetaId, elaboracion, imagen } = req.body;
  const usuarioId = req.session.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!id || !recetaId || !elaboracion || !imagen) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = 'UPDATE pasos_por_receta SET receta_id = ?, elaboracion = ?, imagen = ? WHERE id = ? AND usuario_id = ?';
  try {
    const [result] = await db.query(sql, [recetaId, elaboracion, imagen, id, usuarioId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paso no encontrado o no tienes permiso para editarlo' });
    }
    return res.status(200).json({ mensaje: 'Paso actualizado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deletePasoReceta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!id) {
    return res.status(400).json({ error: 'Falta el ID del paso' });
  }

  const sql = 'DELETE FROM pasos_por_receta WHERE id = ? AND usuario_id = ?';
  try {
    const [result] = await db.query(sql, [id, usuarioId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paso no encontrado o no tienes permiso para eliminarlo' });
    }
    return res.status(200).json({ mensaje: 'Paso eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getPasosReceta,
  getUnPasoReceta,
  postPasoReceta,
  putPasoReceta,
  deletePasoReceta
};

