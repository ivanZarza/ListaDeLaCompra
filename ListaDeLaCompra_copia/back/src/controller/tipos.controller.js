const db = require('../db/conection');
const getTipos = async (req, res) => {
  try {
    const [tipos, fields] = await db.query('SELECT DISTINCT tipo FROM ingredientes WHERE usuarioId IS NULL');
    if (tipos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tipos de ingredientes' });
    }
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
module.exports = { getTipos };
