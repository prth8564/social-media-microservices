import express from 'express';
import { signup } from './controllers/signup.js';

const app = express()
app.use(express.json());

app.post('/auth/signup',signup);

app.listen(3000, () => {
    console.log("app running on port 3000...");
})