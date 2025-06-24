const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth.middleware');

// Protect all routes
router.use(auth);

// CRUD operations
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Progress tracking routes
router.get('/progress/all', categoryController.getAllCategoryProgress);
router.get('/:id/progress', categoryController.getCategoryProgress);
router.patch('/:id/goals', categoryController.updateCategoryGoals);

module.exports = router;