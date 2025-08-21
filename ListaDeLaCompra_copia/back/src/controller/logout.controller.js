const postLogout = async (req, res) => {
  try {
    if (req.session && req.session.usuarioId) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
      });
    } else {
      res.status(400).json({ error: 'No hay sesión activa' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
module.exports = { postLogout };
