"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Todo_1 = require("./Todo");
Todo_1.Todo.belongsTo(User_1.User, { constraints: true, foreignKey: "user_id", as: "todos" });
User_1.User.hasMany(Todo_1.Todo, { foreignKey: "user_id", as: "user", onDelete: "cascade" });
