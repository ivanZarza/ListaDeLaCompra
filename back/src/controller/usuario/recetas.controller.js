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

    const [resultPasos] = await db.query(
      'DELETE FROM pasos_por_receta WHERE receta_id = ? AND usuario_id = ?',
      [recetaId, usuarioId]
    );

    if (resultPasos.affectedRows === 0) {
      return res.status(404).json({ error: 'No se encontraron pasos para esta receta' });
    }

    const [resultIngredientes] = await db.query(
      'DELETE FROM ingredientes_por_receta WHERE receta_id = ? AND usuario_id = ?',
      [recetaId, usuarioId]
    );

    if (resultIngredientes.affectedRows === 0) {
      return res.status(404).json({ error: 'No se encontraron ingredientes para esta receta' });
    }

    const [resultReceta] = await db.query(
      'DELETE FROM recetas WHERE id = ? AND usuario_id = ?',
      [recetaId, usuarioId]
    );

    if (resultReceta.affectedRows === 0) {
      return res.status(404).json({ error: 'Receta no encontrada o no tienes permiso para eliminarla' });
    } 

    return res.status(200).json({ mensaje: 'Receta y datos asociados eliminados correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const putReceta = async (req, res) => {
  const { recetaId } = req.params;
  const usuarioId = req.session.id;
  const { nombre, descripcion, ingredientes, pasos } = req.body;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  if (!recetaId || !nombre || !descripcion || !Array.isArray(ingredientes) || !Array.isArray(pasos)) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    // 1. Actualizar receta
    const [resultReceta] = await db.query(
      'UPDATE recetas SET nombre = ?, descripcion = ? WHERE id = ? AND usuario_id = ?',
      [nombre, descripcion, recetaId, usuarioId]
    );
    if (resultReceta.affectedRows === 0) {
      return res.status(404).json({ error: 'Receta no encontrada o no tienes permiso para editarla' });
    }

    // 2. Eliminar ingredientes que ya no están en el body
    const [ingredientesBD] = await db.query(
      'SELECT id FROM ingredientes_por_receta WHERE receta_id = ? AND usuario_id = ?',
      [recetaId, usuarioId]
    );
    const idsEnBD = ingredientesBD.map(i => i.id);
    const idsEnBody = ingredientes.filter(i => i.id).map(i => i.id);
    const idsAEliminar = idsEnBD.filter(id => !idsEnBody.includes(id));
    if (idsAEliminar.length > 0) {
      await db.query(
        `DELETE FROM ingredientes_por_receta WHERE id IN (${idsAEliminar.map(() => '?').join(',')}) AND receta_id = ? AND usuario_id = ?`,
        [...idsAEliminar, recetaId, usuarioId]
      );
    }

    // 3. Actualizar o insertar ingredientes
    for (const ing of ingredientes) {
      if (ing.id) {
        // Actualizar existente
        await db.query(
          'UPDATE ingredientes_por_receta SET ingrediente_id = ?, peso = ? WHERE id = ? AND receta_id = ? AND usuario_id = ?',
          [ing.ingrediente_id, ing.peso, ing.id, recetaId, usuarioId]
        );
      } else {
        // Insertar nuevo
        await db.query(
          'INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (?, ?, ?, ?)',
          [recetaId, ing.ingrediente_id, ing.peso, usuarioId]
        );
      }
    }

    // 4. (Opcional) Haz lo mismo para los pasos si quieres permitir borrado/añadido

    for (const paso of pasos) {
      if (paso.id) {
        await db.query(
          'UPDATE pasos_por_receta SET paso = ?, imagen = ? WHERE id = ? AND receta_id = ? AND usuario_id = ?',
          [paso.elaboracion, paso.imagen, paso.id, recetaId, usuarioId]
        );
      } else {
        await db.query(
          'INSERT INTO pasos_por_receta (receta_id, paso, imagen, usuario_id) VALUES (?, ?, ?, ?)',
          [recetaId, paso.elaboracion, paso.imagen, usuarioId]
        );
      }
    }

    return res.status(200).json({ mensaje: 'Receta actualizada correctamente' });
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
