import {Kafka} from 'kafkajs';
const kafka = new Kafka({
    clientId:'profile-service',
    brokers:['kafka:9092']
})
export const kafkaConsumer = kafka.consumer({groupId:'social-media-group'})