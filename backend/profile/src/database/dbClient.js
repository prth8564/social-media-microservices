import { Client } from 'pg';
import { configDotenv } from 'dotenv';
configDotenv();
export const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    database:process.env.DB_NAME,
});
await client.connect();
await client.query('CREATE TABLE profiles (userName VARCHAR(255),age integer,gender text,instruments text[],country text,city text)');