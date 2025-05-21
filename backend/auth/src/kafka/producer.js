import { kafkaProducer } from "./kafka.js";
export async function userCreatedEvent(userName){
    await kafkaProducer.connect();
    await kafkaProducer.send({
        topic:'user-created',
        messages:[{value:JSON.stringify({userName})}]
    })
    console.log("user created event sent");
}