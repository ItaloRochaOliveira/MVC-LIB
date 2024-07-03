import { Dialect } from "sequelize";

export interface DbType{
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: Dialect;
}