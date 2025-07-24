const { pool } = require('../db/conection');

async function verificarSesion(req, res, next) {
  console.log('Comprobando sesión:', req.session);
  if (req.session && req.session.id_user) {
    console.log('Sesión encontrada para el usuario:', req.session.id_user);
    const [user] = await pool.query('SELECT * FROM user WHERE id_user = ?', [req.session.id_user]);
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