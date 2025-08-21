const jwt = require('jsonwebtoken');
const db = require('../db/conection');
require('dotenv').config();
function verificarToken(req, res, next) {
  const token = req.cookies['auth_token'];
  if (!token) {
    return res.status(401).json({ error: 'Se requiere un token valido para autenticación' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sql = 'SELECT * FROM materias_primas.usuarios WHERE usuId = ?';
    db.query(sql, [decoded.id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener los datos del usuario'});
      }
      if (results.length === 0) {
        return res.status(400).json({ error: 'Usuario no encontrado'});
      }
      req.user = results[0];
      if (req.user.nombre !== decoded.nombre) {
        return res.status(403).json({ error: 'No tienes los permisos necesarios' });
      }
      next();
    });
  } catch (error) {
    return res.status(403).json({ error: 'No tienes los permisos necesarios o el token ha expirado' });
  }
}
module.exports = verificarToken
