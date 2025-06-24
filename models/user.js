'use strict';
const bcrypt = require('bcryptjs');
const { generateAvatarUrl } = require('../src/utils/avatarGenerator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Add any associations here
  User.associate = function(models) {
    User.hasMany(models.Event, {
      foreignKey: 'userId',
      as: 'events'
    });
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todos'
    });
    User.hasOne(models.Settings, {
        foreignKey: 'userId',
        as: 'settings'
      });// define associations here
  };

  User.afterCreate(async (user, options) => {
    const { Settings } = require('../models');
    try {
      await Settings.create({
        userId: user.id,
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC',
        startOfWeek: 0, 
        avatar: generateAvatarUrl(user.name)
      });
    } catch (error) {
      console.error('Error creating user settings:', error);
    }
  });

  return User;
};