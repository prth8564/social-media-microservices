import { kafkaConsumer } from "./kafka.js";
import {insertRowConversation,insertRowMessage} from '../Database/DBoperations.js';
export function startConsumer(){
    kafkaConsumer.connect()
    .then(() => {
        console.log("Connected to Kafka Consumer");
        return kafkaConsumer.subscribe({ topic: 'message-sent', fromBeginning: true });
    })
    .then(() => {
        console.log("Subscribed to message-sent topic");
        return kafkaConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const consumedMessage = JSON.parse(message.value.toString());
                const { sender_id, receiver_id, content } = consumedMessage;
                const conversation_id = await insertRowConversation(sender_id, receiver_id);
                await insertRowMessage(conversation_id, sender_id, receiver_id, content);
                console.log(`Message processed: ${JSON.stringify(consumedMessage)}`);
            },
        });
    })
    .catch((error) => {
        console.error("Error in Kafka Consumer:", error);
    });
}