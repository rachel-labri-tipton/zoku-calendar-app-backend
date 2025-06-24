'use strict';
const { Model } = require('sequelize');
const { generateAvatarUrl } = require('../src/utils/avatarGenerator');

module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    static associate(models) {
      Settings.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }

    async getDefaultAvatar() {
      const user = await this.getUser();
      return generateAvatarUrl(user?.name);
    }
  }

  Settings.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    theme: {
      type: DataTypes.STRING,
      defaultValue: 'light'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const storedValue = this.getDataValue('avatar');
        return storedValue || generateAvatarUrl(this.user?.name);
      }
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: 'en'
    },
    timezone: {
      type: DataTypes.STRING,
      defaultValue: 'UTC'
    },
    startOfWeek: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0 = Sunday, 1 = Monday
      validate: {
        min: 0,
        max: 6
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Settings',
  });

  // Hook to set default avatar when creating settings
  Settings.beforeCreate(async (settings, options) => {
    if (!settings.avatar) {
      const user = await settings.getUser();
      settings.avatar = generateAvatarUrl(user?.name);
    }
  });

  return Settings;
};