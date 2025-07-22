const db = require('../db/conection');

// Obtener recetas del usuario
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

// Obtener detalles de una receta
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

// Crear una nueva receta
const postReceta = async (req, res) => {
  const { nombre, descripcion, ingredientes, pasos } = req.body;
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  if (!nombre || !descripcion || !Array.isArray(ingredientes) || !Array.isArray(pasos) || !usuarioId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  if (ingredientes.length === 0) {
    return res.status(400).json({ error: 'Debes añadir al menos un ingrediente' });
  }
  if (pasos.length === 0) {
    return res.status(400).json({ error: 'Debes añadir al menos un paso' });
  }

  const sqlReceta = 'INSERT INTO recetas (usuario_id, nombre, descripcion) VALUES (?, ?, ?)';

  try {
    const [result] = await db.query(sqlReceta, [usuarioId, nombre, descripcion]);
    const recetaId = result.insertId;

    const ingredientesArray = ingredientes.map(obj => [recetaId, obj.ingrediente_id, obj.peso, usuarioId]);
    const sqlIngredientes = 'INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES ?';
    const [resultIngredientes] = await db.query(sqlIngredientes, [ingredientesArray]);
    if (resultIngredientes.affectedRows === 0) {
      return res.status(500).json({ error: 'Error al insertar los ingredientes' });
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
