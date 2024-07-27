const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your secret key

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.userRole)) return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
  next();
};

module.exports = { authenticate, authorize };
