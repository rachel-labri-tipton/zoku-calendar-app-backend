'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeLogs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endTime: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.TEXT
      },
      todoId: {
        type: Sequelize.UUID,
        references: {
          model: 'Todos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      todoListId: {
        type: Sequelize.UUID,
        references: {
          model: 'TodoLists',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      eventId: {
        type: Sequelize.UUID,
        references: {
          model: 'Events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // adding indexes for better table performance
    await queryInterface.addIndex('TimeLogs', ['userId']);
    await queryInterface.addIndex('TimeLogs', ['todoId']);
    await queryInterface.addIndex('TimeLogs', ['todoListId']);
    await queryInterface.addIndex('TimeLogs', ['eventId']);
    await queryInterface.addIndex('TimeLogs', ['categoryId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TimeLogs');
  }
};
