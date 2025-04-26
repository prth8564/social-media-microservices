import express from 'express';
import { signup } from './controllers/signup.js';
import { login } from './controllers/login.js';

const app = express()
app.use(express.json());

app.post('/auth/signup',signup);
app.post('auth.login',login);

app.listen(3000, () => {
    console.log("app running on port 3000...");
})