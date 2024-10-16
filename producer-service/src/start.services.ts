import { KafkaConfig } from "./config/kafka.config";

export const kafka=new KafkaConfig(['localhost:9092']);

export const startServices=async()=>{
    try {
        await kafka.connect()
        await kafka.createTopic("test-topic")
    } catch (error) {
        console.log("STARTSERVICES::ERROR",error);
        process.exit(1)
    }
}