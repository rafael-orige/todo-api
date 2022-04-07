import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface UserVerifyInstance extends Model {
    id: number,
    hash: string,
    user_id: number
}

export const UserVerify = sequelize.define<UserVerifyInstance>('UserVerify', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: 'users_verify',
        timestamps: false,
        underscored: true,
    })