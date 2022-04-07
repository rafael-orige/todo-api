"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
exports.User = pg_1.sequelize.define('User', {
    user_id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
});
