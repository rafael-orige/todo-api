import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface TodoInstance extends Model {
    todo_id: number;
    todo_text: string;
    user_id: number;
}

export const Todo = sequelize.define<TodoInstance>('Todo', {
    todo_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    todo_text: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    completed: {
        type: DataTypes.BOOLEAN
    }
},
    {
        tableName: 'todos',
        timestamps: false,
        underscored: true,
    }
)
