const db = require('../db/conection');
const getPasosRecetas = async (req, res) => {
  const usuarioId = req.session.usuarioId;
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
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
getPasosRecetasPorReceta = async (req, res) => {
  const { recetaId } = req.params;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId) {
    return res.status(400).json({ error: 'Falta el ID de la receta' });
  }
  const sql = 'SELECT * FROM pasos_por_receta WHERE receta_id = ? AND usuario_id = ?';
  try {
    const [pasos] = await db.query(sql, [recetaId, usuarioId]);
    if (pasos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron pasos para esta receta' });
    }
    return res.status(200).json(pasos);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const getUnPasoReceta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.session.usuarioId;
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
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const postPasoReceta = async (req, res) => {
  const { recetaId, elaboracion, imagen } = req.body;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  const sql = 'INSERT INTO pasos_por_receta (receta_id, elaboracion, imagen, usuario_id) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.query(sql, [recetaId, elaboracion, imagen, usuarioId]);
    return res.status(201).json({ mensaje: 'Paso agregado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const postVariosPasosReceta = async (req, res) => {
  const { pasos } = req.body;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!Array.isArray(pasos) || pasos.length === 0) {
    return res.status(400).json({ error: 'Faltan pasos para agregar' });
  }
  const sql = 'INSERT INTO pasos_por_receta (receta_id, elaboracion, imagen, usuario_id) VALUES (?, ?, ?, ?)';
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    for (const paso of pasos) {
      const { recetaId, elaboracion, imagen } = paso;
      await connection.query(sql, [recetaId, elaboracion, imagen, usuarioId]);
    }
    await connection.commit();
    return res.status(201).json({ mensaje: 'Pasos agregados correctamente' });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    connection.release();
  }
};
const putPasoReceta = async (req, res) => {
  const { id } = req.params;
  const { recetaId, elaboracion, imagen } = req.body;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!id || !recetaId ) {
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
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const deletePasoReceta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.session.usuarioId;
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
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
module.exports = {
  getPasosRecetas,
  getPasosRecetasPorReceta,
  getUnPasoReceta,
  postPasoReceta,
  postVariosPasosReceta,
  putPasoReceta,
  deletePasoReceta
};
