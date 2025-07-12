const db = require('../db/conection');

const postLogout = (req, res) => {
  // Elimina la cookie del JWT en el cliente
  res.clearCookie('token'); // 'token' es el nombre de la cookie donde guardas el JWT
  res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
};


/* const postLogout = async (req, res) => {
  try {
    // Verificar si hay una sesión activa
    if (req.session && req.session.id_user) {
      // Destruir la sesión
      req.session.destroy((err) => {
        if (err) {
          console.error('Error al destruir la sesión:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        // Enviar respuesta de éxito
        res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
      });
    } else {
      res.status(400).json({ error: 'No hay sesión activa' });
    }
  } catch (error) {
    console.error('Error en el logout:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; */

module.exports = postLogout;