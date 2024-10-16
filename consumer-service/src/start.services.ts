import { KafkaConfig } from "./config/kafka.config";
import { comsumeMessages } from "./services/consume";

export const startServices=async()=>{
    try {
        const kafka=new KafkaConfig(['localhost:9092']);
        await kafka.connect();
        await kafka.subscribe("test-topic");
        await comsumeMessages(kafka);
    } catch (error) {
        console.log("STARTSERVICES::ERROR",error);
        process.exit(1)
    }
}