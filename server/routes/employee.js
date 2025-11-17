// routes/employee.js
import express from 'express';
import {
  addEmployee,
  editEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,

} from '../controllers/Employee.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// ******************** Employee Management Routes ********************

// Get all employees (Admin only)
router.get('/employees', auth, getAllEmployees);

// Get single employee by ID (Admin only)
router.get('/employees/:id', auth, getEmployee);

// Create new employee (Admin only)
router.post('/employees', auth, addEmployee);

// Update employee by ID (Admin only)
router.put('/employees/:id', auth, editEmployee);

// Delete employee by ID (Admin only)
router.delete('/employees/:id', auth, deleteEmployee);



export default router;
