import { createConversation,createMessage } from './controllers/createConversations.js';
import express from 'express';
const app = express();
app.use(express.json());

app.post('/createConversation', createConversation);
app.post('/createMessage', createMessage);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})