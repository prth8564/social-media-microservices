import express from 'express';
import { startConsumer } from './kafka/consumer.js';
import { createMessages } from './controllers/messageController.js';
const app = express();
app.use(express.json());
startConsumer();
app.post('/messages',createMessages);

app.listen(5000,()=>{
    console.log("Server is running on ports 5000");
})