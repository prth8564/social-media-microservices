import { kafkaConsumer } from "./kafka.js";
import { insertRow } from "../database/dbOperations.js";
export function startConsumer(){
    kafkaConsumer.connect()
    .then(() => {
        console.log("Connected to Kafka Consumer");
        return kafkaConsumer.subscribe({ topic: 'user-created', fromBeginning: true });
    })
    .then(() => {
        console.log("Subscribed to user-created topic");
        return kafkaConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const userName = JSON.parse(message.value.toString());
                console.log(userName.userName);
                // Handle the user creation event
                await insertRow(userName.userName);
                console.log(`User created event received for user: ${userName}`);
            },
        });
    })
    .catch((error) => {
        console.error("Error in Kafka Consumer:", error);
    });
}