import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId:"messaging-service",
    brokers:["kafka:9092"]
})

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({groupId:'social-media-group'})