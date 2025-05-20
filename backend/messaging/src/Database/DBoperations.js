import { client } from "./DBclient.js";
import { v4 as uuidv4 } from 'uuid';

export async function insertRowConversation(user1_id,user2_id){
    const id = uuidv4();
    const query = 'INSERT INTO conversations (id, user1_id, user2_id) VALUES ($1, $2, $3) WHERE NOT EXISTS (SELECT 1 FROM conversations WHERE user1_id = $2 AND user2_id = $3)';
    const values = [id, user1_id, user2_id];
    try {
        await client.query(query, values);
        console.log('Row inserted successfully');
        return id;
    } catch (error) {
        console.error('Error inserting row:', error);
        throw error;
    }
}

export async function insertRowMessage(conversation_id,sender_id,receiver_id,content){
    const id = uuidv4();
    const query = 'INSERT INTO messages (id, conversation_id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4, $5)';
    const values = [id, conversation_id, sender_id, receiver_id, content];
    try {
        await client.query(query, values);
        console.log('Row inserted successfully');
        return id;
    } catch (error) {
        console.error('Error inserting row:', error);
        throw error;
    }
}