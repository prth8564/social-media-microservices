import { kafkaProducer } from "./kafka.js";
export async function userCreatedEvent(userName){
    kafkaProducer.connect();
    kafkaProducer.send({
        topic:'user-created',
        messages:[{userName}]
    })
}