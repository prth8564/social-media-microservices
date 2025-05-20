import { kafkaProducer } from "./kafka.js";
export async function messageSentEvent(sender_id,receiver_id,content){
    await kafkaProducer.connect();
    await kafkaProducer.send({
        topic:'message-sent',
        messages:[{value:JSON.stringify({sender_id,receiver_id,content})}]
    })
}