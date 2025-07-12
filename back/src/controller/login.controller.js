const db = require('../db/conection');

const postLogin = async (req, res) => {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try{
    let sql = 'SELECT * FROM usuarios WHERE email = ?';
    const [resultados] = await db.query(sql, [email]);
    
    if (resultados.length === 0) {
      return res.status(401).json({ error: 'El usuario no existe' });
    }
    const usuario = resultados[0]
    const contraseñaValidada = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValidada) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email
      },
      mensaje: 'Inicio de sesión exitoso'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}