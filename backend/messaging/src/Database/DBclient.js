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
await client.query('CREATE TABLE IF NOT EXISTS conversations (id UUID PRIMARY KEY,user1_id VARCHAR(255),user2_id VARCHAR(255),created_at TIMESTAMP DEFAULT NOW(),updated_at TIMESTAMP DEFAULT NOW(), UNIQUE(user1_id, user2_id))');
await client.query(`CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY, conversation_id UUID, sender_id VARCHAR(255), receiver_id VARCHAR(255), content TEXT, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`);