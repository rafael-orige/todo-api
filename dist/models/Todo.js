"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
exports.Todo = pg_1.sequelize.define('Todo', {
    todo_id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    todo_text: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    tableName: 'todos',
    timestamps: false,
    underscored: true,
});
