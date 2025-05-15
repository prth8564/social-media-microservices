import { startConsumer } from "./kafka/consumer.js";
import { editProfile } from "./controllers/editProfile.js";
import { deleteProfile } from "./controllers/deleteProfile.js";
import express from 'express';
const app = express();
app.use(express.json());
startConsumer();


app.update('profile/editProfile',editProfile)
app.delete('profile/deleteProfile',deleteProfile);
app.listen(4000,()=>{
    console.log("running on 4000");
})