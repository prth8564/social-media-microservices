import { insertRowConversation } from '../Database/DBoperations.js';
export async function createMessages(req,res){
    const {conversation_id,sender_id,receiver_id,content} = req.body;
    if (!conversation_id || !sender_id || !receiver_id || !content) {
        return res.status(400).json({ error: 'conversation_id, sender_id, receiver_id and content are required' });
    }
    try{
        const conversationId = await insertRowConversation(sender_id, receiver_id);
        //kafka producer
    }
    catch(error){

    }

}