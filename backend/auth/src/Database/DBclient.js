import { Client } from 'pg';
import { configDotenv } from 'dotenv';
configDotenv();
export const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:'localhost',
    port:5433,
    database:'postgres'
});
client.connect();