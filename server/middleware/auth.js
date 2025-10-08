const jwt = require('jsonwebtoken');

function auth(requiredRole) {
	return (req, res, next) => {
		const authHeader = req.headers.authorization || '';
		const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
		if (!token) {
			return res.status(401).json({ message: 'No token, authorization denied' });
		}
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
			req.user = decoded;
			if (requiredRole && decoded.role !== requiredRole) {
				return res.status(403).json({ message: 'Forbidden' });
			}
			next();
		} catch (error) {
			return res.status(401).json({ message: 'Token is not valid' });
		}
	};
}

module.exports = auth;


