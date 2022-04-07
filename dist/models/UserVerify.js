"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerify = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
exports.UserVerify = pg_1.sequelize.define('UserVerify', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true
    },
    hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'users_verify',
    timestamps: false,
    underscored: true,
});
