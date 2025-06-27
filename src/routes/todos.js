const express = require('express');
const router = express.Router();
const { TodoList, Todo } = require('../../models');
const auth = require('../middleware/auth.middleware');

router.use(auth);

// Create empty TodoList
router.post('/empty', async (req, res) => {
  try {
    const { title, description, color } = req.body;
    
    const todoList = await TodoList.create({
      title,
      description,
      color,
      userId: req.userId
    });

    res.status(201).json(todoList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Create TodoList with Todos
router.post('/', async (req, res) => {
  try {
    const { title, description, color, todos } = req.body;
    
    const todoList = await TodoList.create({
      title,
      description,
      color,
      userId: req.userId
    });

    if (todos && todos.length > 0) {
      const todoItems = todos.map(todo => ({
        ...todo,
        todoListId: todoList.id,
        userId: req.userId
      }));
      await Todo.bulkCreate(todoItems);
    }

    const createdList = await TodoList.findOne({
      where: { id: todoList.id },
      include: [{
        model: Todo,
        as: 'todos'
      }]
    });

    res.status(201).json(createdList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all TodoLists with their Todos
router.get('/', async (req, res) => {
  try {
    const todoLists = await TodoList.findAll({
      where: { userId: req.userId },
      include: [{
        model: Todo,
        as: 'todos',
        order: [['order', 'ASC']]
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(todoLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single TodoList with its Todos
router.get('/:id', async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      },
      include: [{
        model: Todo,
        as: 'todos',
        order: [['order', 'ASC']]
      }]
    });
    if (!todoList) {
      return res.status(404).json({ error: 'TodoList not found' });
    }
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Update TodoList
router.put('/:id', async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      }
    });
    if (!todoList) {
      return res.status(404).json({ error: 'TodoList not found' });
    }
    await todoList.update(req.body);
    res.json(todoList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete TodoList and all associated Todos
router.delete('/:id', async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      }
    });
    if (!todoList) {
      return res.status(404).json({ error: 'TodoList not found' });
    }
    await todoList.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add single Todo to existing TodoList
router.post('/list/:todoListId/todo', async (req, res) => {
  try {
    // First verify the TodoList exists and belongs to user
    const todoList = await TodoList.findOne({
      where: { 
        id: req.params.todoListId,
        userId: req.user.id
      }
    });

    if (!todoList) {
      return res.status(404).json({ error: 'TodoList not found' });
    }

    // Create the new todo
    const todo = await Todo.create({
      ...req.body,
      todoListId: todoList.id,
      userId: req.user.id
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Add todo error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.put('/item/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { 
        id: req.params.todoId,
        userId: req.user.id
      }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo item not found' });
    }

    await todo.update(req.body);
    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;