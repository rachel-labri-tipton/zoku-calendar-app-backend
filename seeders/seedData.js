'use strict';

const { User, TodoList, Todo, sequelize } = require('../models'); // Adjust the path as needed

// Sample Users
const users = [
  {
    email: "john.doe@example.com",
    password: "Password123!",
    name: "John Doe"
  },
  {
    email: "jane.smith@example.com",
    password: "SecurePass456!",
    name: "Jane Smith"
  }
];

// Sample TodoLists
const todoLists = [
  {
    id: "111e4567-e89b-12d3-a456-426614174001",
    title: "Work",
    description: "Tasks related to work projects",
    color: "#007bff",
    userEmail: "john.doe@example.com" // To link after user creation
  },
  {
    id: "222e4567-e89b-12d3-a456-426614174002",
    title: "Personal",
    description: "Personal errands and activities",
    color: "#28a745",
    userEmail: "john.doe@example.com" // To link after user creation
  },
  {
    id: "333e4567-e89b-12d3-a456-426614174003",
    title: "Shopping",
    description: "Groceries and shopping list",
    color: "#ffc107",
    userEmail: "jane.smith@example.com"
  }
];

// Sample Todos
const todos = [
  {
    title: "Finish Report",
    description: "Complete the quarterly report",
    dueDate: "2025-06-25T17:00:00Z",
    priority: "high",
    status: "pending",
    todoListId: "111e4567-e89b-12d3-a456-426614174001",
    userEmail: "john.doe@example.com",
    order: 1
  },
  {
    title: "Buy Groceries",
    description: "Milk, Bread, Fruits",
    dueDate: "2025-06-20T12:00:00Z",
    priority: "medium",
    status: "pending",
    todoListId: "222e4567-e89b-12d3-a456-426614174002",
    userEmail: "john.doe@example.com",
    order: 1
  },
  {
    title: "Schedule Dentist Appointment",
    description: "Call to book appointment",
    dueDate: "2025-07-05T09:00:00Z",
    priority: "low",
    status: "pending",
    todoListId: "222e4567-e89b-12d3-a456-426614174002",
    userEmail: "john.doe@example.com",
    order: 2
  },
  {
    title: "Buy Birthday Gift",
    description: "Get a gift for Jane's birthday",
    dueDate: "2025-07-10T10:00:00Z",
    priority: "medium",
    status: "pending",
    todoListId: "333e4567-e89b-12d3-a456-426614174003",
    userEmail: "jane.smith@example.com",
    order: 1
  }
];

const events = [
  {
    title: "Team Meeting",
    description: "Discuss project progress",
    startDate: "2025-06-15T10:00:00Z",
    endDate: "2025-06-15T11:00:00Z",
    location: "Conference Room A",
    isAllDay: false,
    color: "#FF5733",
    userEmail: "john.doe@example.com"
  },
  {
    title: "Doctor Appointment",
    description: "Annual health check-up",
    startDate: "2025-06-20T09:30:00Z",
    endDate: "2025-06-20T10:00:00Z",
    location: "Downtown Clinic",
    isAllDay: false,
    color: "#33C1FF",
    userEmail: "john.doe@example.com"
  },
  {
    title: "Birthday Party",
    description: "Celebrate Jane's birthday",
    startDate: "2025-07-02T18:00:00Z",
    endDate: "2025-07-02T21:00:00Z",
    location: "Jane's House",
    isAllDay: false,
    color: "#FFC300",
    userEmail: "jane.smith@example.com"
  }]

async function seedAll() {
  try {
    // Sync database
    await sequelize.sync({ force: true }); // Warning: drops existing tables!
    console.log('Database synced.');

    // Create users
    const userMap = {}; // email -> user instance
    for (const userData of users) {
      const userInstance = await User.create(userData);
      userMap[userData.email] = userInstance;
    }
    console.log('Users created.');

    // Create TodoLists
    const listMap = {}; // id -> list instance
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
      await sequelize.models.Event.create({
        ...event,
        userId: user.id
      });
    }

  } catch (err) {
    console.error('Error during seeding:', err);
  }
}

// Run the seeding
seedAll();