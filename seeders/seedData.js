'use strict';

const { User, TodoList, Todo, Category, Event, TimeLog, sequelize } = require('../models');

// Sample Users
const users = [
  {
    id: "111e4567-e89b-12d3-a456-426614174000",
    email: "john.doe@example.com",
    password: "Password123!",
    name: "John Doe"
  },
  {
    id: "222e4567-e89b-12d3-a456-426614174000",
    email: "jane.smith@example.com",
    password: "SecurePass456!",
    name: "Jane Smith"
  },
    {
      id: "333e4567-e89b-12d3-a456-426614174000",
      email: "alex.wong@example.com",
      password: "TestPass789#",
      name: "Alex Wong"
    },
    {
      id: "444e4567-e89b-12d3-a456-426614174000",
      email: "sarah.johnson@example.com",
      password: "DevTest2025!",
      name: "Sarah Johnson"
    },
    {
      id: "555e4567-e89b-12d3-a456-426614174000",
      email: "mike.brown@example.com",
      password: "Testing456!",
      name: "Mike Brown"
    }
  ];


// Default Categories
const categories = [
  {
    id: "aaaa4567-e89b-12d3-a456-426614174000",
    name: "Work",
    type: "work",
    color: "#FF5733",
    isDefault: true,
    weeklyGoal: 40,
    userEmail: "john.doe@example.com"
  },
  {
    id: "bbbb4567-e89b-12d3-a456-426614174000",
    name: "Study",
    type: "study",
    color: "#33C1FF",
    isDefault: true,
    weeklyGoal: 15,
    userEmail: "john.doe@example.com"
  },
  {
    id: "cccc4567-e89b-12d3-a456-426614174000",
    name: "Health",
    type: "health",
    color: "#28a745",
    isDefault: true,
    weeklyGoal: 7,
    userEmail: "jane.smith@example.com"
  }
];

// Sample TodoLists
const todoLists = [
  {
    id: "333e4567-e89b-12d3-a456-426614174000",
    title: "Work Projects",
    description: "Current work assignments",
    color: "#007bff",
    userEmail: "john.doe@example.com"
  },
  {
    id: "444e4567-e89b-12d3-a456-426614174000",
    title: "Study Goals",
    description: "Learning objectives",
    color: "#17a2b8",
    userEmail: "john.doe@example.com"
  }
];

// Sample Todos
const todos = [
  {
    id: "555e4567-e89b-12d3-a456-426614174000",
    title: "Complete Project Proposal",
    description: "Draft the Q3 project proposal",
    dueDate: new Date('2025-07-01'),
    priority: "high",
    status: "pending",
    todoListId: "333e4567-e89b-12d3-a456-426614174000",
    userEmail: "john.doe@example.com"
  },
  {
    id: "666e4567-e89b-12d3-a456-426614174000",
    title: "Study JavaScript",
    description: "Complete advanced JS course",
    dueDate: new Date('2025-06-30'),
    priority: "medium",
    status: "in_progress",
    todoListId: "444e4567-e89b-12d3-a456-426614174000",
    userEmail: "john.doe@example.com"
  }
];

// Sample Events
const events = [
  {
    id: "777e4567-e89b-12d3-a456-426614174000",
    title: "Team Meeting",
    description: "Weekly team sync",
    startDate: new Date('2025-06-25T10:00:00'),
    endDate: new Date('2025-06-25T11:00:00'),
    location: "Conference Room A",
    isAllDay: false,
    color: "#dc3545",
    userEmail: "john.doe@example.com"
  },
  {
    id: "888e4567-e89b-12d3-a456-426614174000",
    title: "Study Session",
    description: "JavaScript deep dive",
    startDate: new Date('2025-06-26T14:00:00'),
    endDate: new Date('2025-06-26T16:00:00'),
    location: "Library",
    isAllDay: false,
    color: "#ffc107",
    userEmail: "jane.smith@example.com"
  }
];

const timeLogs = [
  {
    id: "dddd4567-e89b-12d3-a456-426614174000",
    startTime: new Date('2025-06-24T09:00:00'),
    endTime: new Date('2025-06-24T10:30:00'),
    duration: 5400, // 1.5 hours in seconds
    notes: "Morning work session",
    todoId: "555e4567-e89b-12d3-a456-426614174000", // Project Proposal todo
    categoryId: "aaaa4567-e89b-12d3-a456-426614174000", // Work category
    userEmail: "john.doe@example.com"
  },
  {
    id: "eeee4567-e89b-12d3-a456-426614174000",
    startTime: new Date('2025-06-24T14:00:00'),
    endTime: new Date('2025-06-24T16:00:00'),
    duration: 7200, // 2 hours in seconds
    notes: "JavaScript study session",
    todoId: "666e4567-e89b-12d3-a456-426614174000", // Study JavaScript todo
    categoryId: "bbbb4567-e89b-12d3-a456-426614174000", // Study category
    userEmail: "john.doe@example.com"
  },
  {
    id: "ffff4567-e89b-12d3-a456-426614174000",
    startTime: new Date('2025-06-24T10:00:00'),
    endTime: new Date('2025-06-24T11:00:00'),
    duration: 3600, // 1 hour in seconds
    notes: "Team meeting",
    eventId: "777e4567-e89b-12d3-a456-426614174000", // Team Meeting event
    categoryId: "aaaa4567-e89b-12d3-a456-426614174000", // Work category
    userEmail: "john.doe@example.com"
  }
];

// Update your seedAll function
async function seedAll() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    // Create users
    const userMap = {};
    for (const userData of users) {
      const userInstance = await User.create(userData);
      userMap[userData.email] = userInstance;
    }
    console.log('Users created.');

    // Create Categories
    const categoryMap = {};
    for (const category of categories) {
      const user = userMap[category.userEmail];
      const categoryInstance = await Category.create({
        ...category,
        userId: user.id
      });
      categoryMap[category.id] = categoryInstance;
    }
    console.log('Categories created.');

    // Create TodoLists
    const listMap = {};
    for (const list of todoLists) {
      const user = userMap[list.userEmail];
      const listInstance = await TodoList.create({
        ...list,
        userId: user.id
      });
      listMap[list.id] = listInstance;
    }
    console.log('TodoLists created.');

    // Create Todos
    for (const todo of todos) {
      const listInstance = listMap[todo.todoListId];
      const user = userMap[todo.userEmail];
      await Todo.create({
        ...todo,
        todoListId: listInstance.id,
        userId: user.id
      });
    }
    console.log('Todos created.');

    // Create Events
    for (const event of events) {
      const user = userMap[event.userEmail];
      await Event.create({
        ...event,
        userId: user.id
      });
    }
    console.log('Events created.');

    // Create TimeLogs
    for (const timeLog of timeLogs) {
      const user = userMap[timeLog.userEmail];
      await TimeLog.create({
        ...timeLog,
        userId: user.id
      });
    }
    console.log('TimeLogs created.');


    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await sequelize.close();
  }
}

// Run the seeding
seedAll();

module.exports = { seedAll };