const db = require('../../db/conection');

const getRecetas = async (req, res) => {
  const usuarioId = req.session.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  const sql = 'SELECT * FROM recetas WHERE usuario_id = ?';

  try {
    const [recetas] = await db.query(sql, [usuarioId]);
    if (recetas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron recetas para este usuario' });
    }
    return res.status(200).json(recetas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getDetallesReceta = async (req, res) => {
  const { recetaId } = req.params;

  if (!recetaId) {
    return res.status(400).json({ error: 'Falta el ID de la receta' });
  }

  const sqlIngredientes = 'SELECT * FROM ingredientes_por_receta WHERE receta_id = ?';
  const sqlPasos = 'SELECT * FROM pasos_por_receta WHERE receta_id = ?';

  try {
    const [ingredientes] = await db.query(sqlIngredientes, [recetaId]);
    if (ingredientes.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ingredientes para esta receta' });
    }
    const [pasos] = await db.query(sqlPasos, [recetaId]);
    if (pasos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron pasos para esta receta' });
    }
    return res.status(200).json({ ingredientes, pasos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const postReceta = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sqlReceta = 'INSERT INTO recetas (usuario_id, nombre, descripcion) VALUES (?, ?, ?)';
  try {
    const [result] = await db.query(sqlReceta, [usuarioId, nombre, descripcion]);
    return res.status(201).json({ id: result.insertId, mensaje: 'Receta creada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const putReceta = async (req, res) => {
  const { recetaId } = req.params;
  const usuarioId = req.session.id;
  const { nombre, descripcion } = req.body;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId || !nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const [resultReceta] = await db.query(
      'UPDATE recetas SET nombre = ?, descripcion = ? WHERE id = ? AND usuario_id = ?',
      [nombre, descripcion, recetaId, usuarioId]
    );
    if (resultReceta.affectedRows === 0) {
      return res.status(404).json({ error: 'Receta no encontrada o no tienes permiso para editarla' });
    }
    return res.status(200).json({ mensaje: 'Receta actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteReceta = async (req, res) => {
  const { recetaId } = req.params;
  const usuarioId = req.session.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId) {
    return res.status(400).json({ error: 'Falta el ID de la receta' });
  }

  try {
    const [resultReceta] = await db.query(
      'DELETE FROM recetas WHERE id = ? AND usuario_id = ?',
      [recetaId, usuarioId]
    );
    if (resultReceta.affectedRows === 0) {
      return res.status(404).json({ error: 'Receta no encontrada o no tienes permiso para eliminarla' });
    }
    return res.status(200).json({ mensaje: 'Receta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getRecetas,
  getDetallesReceta,
  postReceta,
  deleteReceta,
  putReceta
};
