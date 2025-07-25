const db = require('../db/conection');

async function verificarSesion(req, res, next) {
  console.log('Comprobando sesión:', req.session);
  if (req.session && req.session.usuarioId) {
    console.log('Sesión encontrada para el usuario:', req.session.usuarioId);
    const [user] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.session.usuarioId]);
    if (user.length === 0) {
      console.log('Usuario de la sesión no existe');
      req.session.destroy(() => {});
      return res.status(401).json({ ok: false, message: 'Usuario de la sesión no existe' });
    }
    console.log('Sesión válida para usuario:', user[0].email);
    next();
  } else {
    console.log('No autenticado por sesión');
    res.status(401).json({ ok: false, message: 'No autenticado' });
  }
}

module.exports = verificarSesion;