const db = require('../db/conection');

const getRecetas = async (req, res) => {
  const usuarioId = req.session.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  try {
    const sql = 'SELECT * FROM recetas WHERE usuario_id = ?';
    const [recetas] = await db.query(sql, [usuarioId]);

    if (recetas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron recetas para este usuario' });
    }

    return res.status(200).json(recetas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

const getDetallesReceta = async (req, res) => {
  const { recetaId } = req.params;

  try {
    const [ingredientes] = await db.query(
      'SELECT * FROM ingredientes_por_receta WHERE receta_id = ?',
      [recetaId]
    );

    const [pasos] = await db.query(
      'SELECT * FROM pasos_por_receta WHERE receta_id = ?',
      [recetaId]
    );

    return res.status(200).json({
      ingredientes,
      pasos
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const postReceta = async (req, res) => {
  const { nombre, descripcion, ingredientes, pasos } = req.body;
  const usuarioId = req.session.id;

  if (!nombre || !descripcion || !Array.isArray(ingredientes) || !Array.isArray(pasos) || !usuarioId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    // 1. Insertar la receta
    const sql = 'INSERT INTO recetas (usuario_id, nombre, descripcion) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [usuarioId, nombre, descripcion]);
    const recetaId = result.insertId;

    // 2. Insertar ingredientes
    if (ingredientes.length === 0) {
      return res.status(400).json({ error: 'Debes añadir al menos un ingrediente' });
    }
    const ingredientesArray = ingredientes.map(obj => [recetaId, obj.ingrediente_id, obj.peso, usuarioId]);
    const sqlIngredientes = 'INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES ?';
    const [resultIngredientes] = await db.query(sqlIngredientes, [ingredientesArray]);
    if (resultIngredientes.affectedRows === 0) {
      return res.status(500).json({ error: 'Error al insertar los ingredientes' });
    }

    // 3. Insertar pasos
    if (pasos.length === 0) {
      return res.status(400).json({ error: 'Debes añadir al menos un paso' });
    }
    const pasosArray = pasos.map(obj => [recetaId, obj.elaboracion, obj.imagen, usuarioId]);
    const sqlPasos = 'INSERT INTO pasos_por_receta (receta_id, paso, imagen, usuario_id) VALUES ?';
    const [resultPasos] = await db.query(sqlPasos, [pasosArray]);
    if (resultPasos.affectedRows === 0) {
      return res.status(500).json({ error: 'Error al insertar los pasos' });
    }

    return res.status(201).json({ id: recetaId, mensaje: 'Receta creada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getRecetas,
  getDetallesReceta,
  postReceta
};
