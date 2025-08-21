const db = require('../db/conection');
async function verificarSesion(req, res, next) {
  if (req.session && req.session.usuarioId) {
    const [user] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.session.usuarioId]);
    if (user.length === 0) {
      req.session.destroy(() => {});
      return res.status(401).json({ ok: false, message: 'Usuario de la sesión no existe' });
    }
    next();
  } else {
    res.status(401).json({ ok: false, message: 'No autenticado' });
  }
}
module.exports = verificarSesion;
