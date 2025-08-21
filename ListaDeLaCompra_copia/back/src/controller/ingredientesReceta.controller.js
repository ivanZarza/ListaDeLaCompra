const db = require('../db/conection');
const getIngredientesRecetaPorUsuario = async (req, res) => {
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  const sql = `SELECT * FROM ingredientes_por_receta WHERE usuario_id = ?`;
  try {
    const [ingredientes] = await db.query(sql, [usuarioId]);
    if (ingredientes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ingredientes para este usuario' });
    }
    return res.status(200).json(ingredientes);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const getIngredientesPorReceta = async (req, res) => {
  const { recetaId } = req.params;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId) {
    return res.status(400).json({ error: 'Falta el ID de la receta' });
  }
  const sql = 'SELECT * FROM ingredientes_por_receta WHERE receta_id = ? AND usuario_id = ?';
  try {
    const [ingredientes] = await db.query(sql, [recetaId, usuarioId]);
    if (ingredientes.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ingredientes para esta receta' });
    }
    return res.status(200).json(ingredientes);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const getUnIngredienteReceta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!id) {
    return res.status(400).json({ error: 'Falta el ID del ingrediente' });
  }
  const sql = 'SELECT * FROM ingredientes_por_receta WHERE id = ? AND usuario_id = ?';
  try {
    const [ingrediente] = await db.query(sql, [id, usuarioId]);
    if (ingrediente.length === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado o no tienes permiso para verlo' });
    }
    return res.status(200).json(ingrediente[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const postIngredienteReceta = async (req, res) => {
  const { recetaId, ingredienteId, peso } = req.body;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId || !ingredienteId || !peso) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  const sql = 'INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.query(sql, [recetaId, ingredienteId, peso, usuarioId]);
    return res.status(201).json({ mensaje: 'Ingrediente agregado correctamente', id: result.insertId });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const postVariosIngredientesReceta = async (req, res) => {
  const { ingredientes } = req.body;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  const sql = 'INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (?, ?, ?, ?)';
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    for (const ingrediente of ingredientes) {
      const { recetaId, ingredienteId, peso } = ingrediente;
      await connection.query(sql, [recetaId, ingredienteId, peso, usuarioId]);
    }
    await connection.commit();
    return res.status(201).json({ mensaje: 'Ingredientes agregados correctamente' });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    connection.release();
  }
};
const putIngredienteReceta = async (req, res) => {
  const { id } = req.params;
  const { peso } = req.body;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!id || !peso) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  const sql = 'UPDATE ingredientes_por_receta SET peso = ? WHERE id = ? AND usuario_id = ?';
  try {
    const [result] = await db.query(sql, [peso, id, usuarioId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado o no tienes permiso para actualizarlo' });
    }
    return res.status(200).json({ mensaje: 'Ingrediente actualizado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const deleteIngredienteReceta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.session.usuarioId;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!id) {
    return res.status(400).json({ error: 'Falta el ID del ingrediente' });
  }
  const sql = 'DELETE FROM ingredientes_por_receta WHERE id = ? AND usuario_id = ?';
  try {
    const [result] = await db.query(sql, [id, usuarioId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado o no tienes permiso para eliminarlo' });
    }
    return res.status(200).json({ mensaje: 'Ingrediente eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
module.exports = {
  getIngredientesRecetaPorUsuario,
  getIngredientesPorReceta,
  getUnIngredienteReceta,
  postIngredienteReceta,
  postVariosIngredientesReceta,
  putIngredienteReceta,
  deleteIngredienteReceta
};
