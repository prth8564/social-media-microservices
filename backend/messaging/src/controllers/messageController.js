import {messageSentEvent} from '../kafka/producer.js';
export async function createMessages(req,res){
    const {conversation_id,sender_id,receiver_id,content} = req.body;
    if (!conversation_id || !sender_id || !receiver_id || !content) {
        return res.status(400).json({ error: 'conversation_id, sender_id, receiver_id and content are required' });
    }
    try{
        //kafka producer
        await messageSentEvent(sender_id,receiver_id,content);
        //get conversation id after kafka emits "message-sent" event
        // send sender and receiver id and content to kafka producer
        //kafkak emits "message-sent" event
        //consumer listens to this and updates database
    }
    catch(error){
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Failed to send message' });   
    }

}