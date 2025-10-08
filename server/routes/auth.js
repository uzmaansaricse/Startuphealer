const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Helpers
function signToken(user) {
	const payload = { id: user._id, role: user.role, email: user.email, name: user.name };
	return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
}

// POST /api/auth/register
router.post(
	'/register',
	[
		body('name').isString().isLength({ min: 2 }).withMessage('Name is required'),
		body('email').isEmail().withMessage('Valid email required'),
		body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Validation error', errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			const existing = await User.findOne({ email });
			if (existing) {
				return res.status(409).json({ message: 'Email already registered' });
			}
			const passwordHash = await bcrypt.hash(password, 10);
			const user = await User.create({ name, email, passwordHash, role: 'user' });
			const token = signToken(user);
			return res.json({
				user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
				token,
			});
		} catch (error) {
			console.error('Register error:', error);
			return res.status(500).json({ message: 'Server error' });
		}
	}
);

// POST /api/auth/login
router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Valid email required'),
		body('password').isString().isLength({ min: 1 }).withMessage('Password required'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Validation error', errors: errors.array() });
		}
		const { email, password } = req.body;

		// Admin-from-env login
		if (
			process.env.ADMIN_EMAIL &&
			process.env.ADMIN_PASSWORD &&
			email === process.env.ADMIN_EMAIL &&
			password === process.env.ADMIN_PASSWORD
		) {
			const adminUser = {
				_id: 'admin-env',
				name: 'Admin',
				email: email,
				role: 'admin',
			};
			const token = signToken(adminUser);
			return res.json({
				user: { id: 'admin-env', name: 'Admin', email, role: 'admin' },
				token,
			});
		}

		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}
			const isMatch = await bcrypt.compare(password, user.passwordHash);
			if (!isMatch) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}
			const token = signToken(user);
			return res.json({
				user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
				token,
			});
		} catch (error) {
			console.error('Login error:', error);
			return res.status(500).json({ message: 'Server error' });
		}
	}
);

module.exports = router;

// GET /api/auth/me (protected)
router.get('/me', authMiddleware(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({
      user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});


