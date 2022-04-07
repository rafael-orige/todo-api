import { User } from "./User";
import { Todo } from "./Todo";

Todo.belongsTo(User, { constraints: true, foreignKey: "user_id", as: "todos" });
User.hasMany(Todo, { foreignKey: "user_id", as: "user", onDelete: "cascade" })