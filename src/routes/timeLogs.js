const express = require('express');
const router = express.Router();
const timeLogController = require('../controllers/timeLogController');
const auth = require('../middleware/auth.middleware');

router.use(auth);

// Time tracking operations
router.post('/start', timeLogController.startTimeLog);
router.post('/:id/stop', timeLogController.stopTimeLog);
router.delete('/:id', timeLogController.deleteTimeLog);

// Reporting and summaries
router.get('/daily', timeLogController.getDailySummary);
router.get('/category/:categoryId', async (req, res) => {
  try {
    const logs = await TimeLog.findAll({
      where: {
        categoryId: req.params.categoryId,
        userId: req.userId
      },
      include: [
        { model: Category, as: 'category' },
        { model: Todo, as: 'todo' },
        { model: TodoList, as: 'todoList' },
        { model: Event, as: 'event' }
      ]
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;