import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId:"auth-service",
    brokers:["kafka:9092"]
})

export const kafkaProducer = kafka.producer();