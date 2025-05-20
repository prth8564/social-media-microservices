import express from 'express';
const app = express();
app.use(express.json());

app.post('/messages');

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})