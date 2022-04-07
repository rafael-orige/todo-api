import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface UserInstance extends Model {
    user_id: number;
    user_email: string;
    user_password: string;
    user_name: string;
    verified: boolean;
}

export const User = sequelize.define<UserInstance>('User',
    {
        user_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER

        },
        user_email: {
            type: DataTypes.STRING,
            unique: true
        },
        user_password: {
            type: DataTypes.STRING,
        },
        user_name: {
            type: DataTypes.STRING,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'users',
        timestamps: false,
        underscored: true,
    },


)
