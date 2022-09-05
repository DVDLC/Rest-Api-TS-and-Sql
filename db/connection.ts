import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // logging: false
})

export default db