require('dotenv').config();
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET 

const authToken = (req, res, next) => {
  const token = req.headers['token']

  if (!token) {
    return res.status(408).json({ message: 'Token no encontrado' });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(408).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authToken;