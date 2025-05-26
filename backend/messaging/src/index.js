import express from 'express';
import { startConsumer } from './kafka/consumer.js';
import { createMessages,getMessages,getConversations } from './controllers/messageController.js';
const app = express();
app.use(express.json());
startConsumer();
app.post('/conversations/createMessage',createMessages);
app.get('/messaging/conversations/:user_id',getConversations);
app.get('/messaging/messages/:conversation_id',getMessages);

app.listen(5000,()=>{
    console.log("Server is running on ports 5000");
})