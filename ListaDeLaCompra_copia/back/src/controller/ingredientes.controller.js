const db = require('../db/conection');
const getIngredientes = async (req, res) => {
  const nombre = req.query.nombre;
  const tipo = req.query.tipo;
  let sqlTotal = 'SELECT COUNT(*) AS total FROM ingredientes WHERE usuarioId IS NULL';
  let paramsTotal = [];
  if (nombre) {
    sqlTotal += ' AND nombre LIKE ?';
    paramsTotal.push(`%${nombre}%`);
  }
  if (tipo) {
    sqlTotal += ' AND tipo = ?';
    paramsTotal.push(tipo);
  }
  let sql = 'SELECT * FROM ingredientes WHERE usuarioId IS NULL';
  let params = [];
  if (nombre) {
    sql += ' AND nombre LIKE ?';
    params.push(`%${nombre}%`);
  }
  if (tipo) {
    sql += ' AND tipo = ?';
    params.push(tipo);
  }
  const limite = 20;
  const pagina = 'pagina' in req.query ? Number(req.query.pagina) : 1;
  const offset = (pagina - 1) * limite;
  sql += ' LIMIT ? OFFSET ?';
  params.push(limite, offset);
  try {
    const [resultadosTotal] = await db.query(sqlTotal, paramsTotal);
    const numeroIngredientes = resultadosTotal[0].total;
    const [ingredientes] = await db.query(sql, params);
    res.json({
      ingredientes,
      numeroIngredientes,
      paginaActual: pagina,
      totalPaginas: Math.ceil(numeroIngredientes / limite)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
module.exports = { getIngredientes };
