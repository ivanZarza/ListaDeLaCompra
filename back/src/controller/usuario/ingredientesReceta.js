const db = require('../../db/conection');

const getIngredientesRecetas = async (req, res) => { 
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  } 

  const sql = ` SELECT * FROM ingredientes_por_receta WHERE usuario_id = ?`;
  try {
    const [ingredientes] = await db.query(sql, [usuarioId]);
    if (ingredientes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ingredientes para este usuario' });
    }
    return res.status(200).json(ingredientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

getUnIngredienteReceta = async (req, res) => {
  const { ingredienteId } = req.params;
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }   
  if (!ingredienteId) {
    return res.status(400).json({ error: 'Falta el ID del ingrediente'
    });
  }
  const sql = 'SELECT * FROM ingredientes_por_receta WHERE id = ? AND usuario_id = ?';
  try {
    const [ingrediente] = await db.query(sql, [ingredienteId, usuarioId]);
    if (ingrediente.length === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado o no tienes permiso para verlo' });
    }
    return res.status(200).json(ingrediente[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};    

const postIngredienteReceta = async (req, res) => {
  const { recetaId, ingredienteId, peso } = req.body;
  const usuarioId = req.session.id;
  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  if (!recetaId || !ingredienteId || !peso) { 
    return res.status(400).json({ error: 'Faltan datos obligatorios'
    });
  }
  const sql = 'INSERT INTO ingredientes_por_receta (receta_id, ingrediente_id, peso, usuario_id) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.query(sql, [recetaId, ingredienteId, peso, usuarioId]);
    return res.status(201).json({ mensaje: 'Ingrediente agregado correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const putIngredienteReceta = async (req, res) => {
  const { ingredienteId, peso } = req.body;
  const usuarioId = req.session.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  if (!ingredienteId || !peso) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = 'UPDATE ingredientes_por_receta SET peso = ? WHERE id = ? AND usuario_id = ?';
  try {
    const [result] = await db.query(sql, [peso, ingredienteId, usuarioId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado o no tienes permiso para actualizarlo' });
    }
    return res.status(200).json({ mensaje: 'Ingrediente actualizado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const deleteIngredienteReceta = async (req, res) => {
  const { ingredienteId } = req.params;
  const usuarioId = req.session.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  if (!ingredienteId) {
    return res.status(400).json({ error: 'Falta el ID del ingrediente' });
  }

  const sql = 'DELETE FROM ingredientes_por_receta WHERE id = ? AND usuario_id = ?';
  try {
    const [result] = await db.query(sql, [ingredienteId, usuarioId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado o no tienes permiso para eliminarlo' });
    }
    return res.status(200).json({ mensaje: 'Ingrediente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  getIngredientesRecetas,
  getUnIngredienteReceta,
  postIngredienteReceta,
  putIngredienteReceta,
  deleteIngredienteReceta
};
