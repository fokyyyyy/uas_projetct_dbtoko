const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' }); // Return 401 untuk token invalid
  }
}

module.exports = authenticateJWT;

