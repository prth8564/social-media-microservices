import { insertRowConversation,insertRowMessage } from '../Database/DBoperations.js';
export async function createConversation(req, res) {
    const { user1_id, user2_id } = req.body;

    if (!user1_id || !user2_id) {
        return res.status(400).json({ error: 'user1_id and user2_id are required' });
    }

    try {
        const conversationId = await insertRowConversation(user1_id, user2_id);
        return res.status(201).json({ conversationId });
    } catch (error) {
        console.error('Error creating conversation:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export async function createMessage(req, res) {
    const { conversation_id, sender_id, receiver_id, content } = req.body;

    if (!conversation_id || !sender_id || !receiver_id || !content) {
        return res.status(400).json({ error: 'conversation_id, sender_id, receiver_id and content are required' });
    }

    try {
        const messageId = await insertRowMessage(conversation_id, sender_id, receiver_id, content);
        return res.status(201).json({ messageId });
    } catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}