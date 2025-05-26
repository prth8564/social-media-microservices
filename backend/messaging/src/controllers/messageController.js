import {messageSentEvent} from '../kafka/producer.js';
import { getRowMessages, getRowConversations } from '../Database/DBoperations.js';
export async function createMessages(req,res){
    const {conversation_id,sender_id,receiver_id,content} = req.body;
    if (!conversation_id || !sender_id || !receiver_id || !content) {
        return res.status(400).json({ error: 'conversation_id, sender_id, receiver_id and content are required' });
    }
    try{
        await messageSentEvent(sender_id,receiver_id,content);
    }
    catch(error){
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Failed to send message' });   
    }
}

export async function getConversations(req, res) {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }
    try{
        const conversations = await getRowConversations(user_id);
        if (conversations.length === 0) {
            return res.status(404).json({ error: 'No conversations found for this user' });
        }
        return res.status(200).json(conversations);
    }
    catch(error){
        console.error('Error fetching conversations:', error);
        return res.status(500).json({ error: 'Failed to fetch conversations' });
    }
}

export async function getMessages(req, res) {
    const { conversation_id } = req.params;
    if (!conversation_id) {
        return res.status(400).json({ error: 'conversation_id is required' });
    }
    try{
        const messages = await getRowMessages(conversation_id);
        if (messages.length === 0) {
            return res.status(404).json({ error: 'No messages found for this conversation' });
        }
        return res.status(200).json(messages);
    }
    catch(error){
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Failed to fetch messages' });
    }
}