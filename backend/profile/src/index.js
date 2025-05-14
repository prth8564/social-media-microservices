import { startConsumer } from "./kafka/consumer.js";
import { editProfile } from "./controllers/editProfile.js";
import express from 'express';
const app = express();
app.use(express.json());
startConsumer();


app.post('profile/editProfile',editProfile)
app.listen(4000,()=>{
    console.log("running on 4000");
})