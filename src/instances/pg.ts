import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_URL as string,
    {
        dialect: 'postgres',
        port: parseInt(process.env.PG_PORT as string),
        logging: false,
        ssl: true,
        dialectOptions: {
            connectTimeout: 60000,
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
    }
)

