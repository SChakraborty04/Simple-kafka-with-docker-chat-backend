import { KafkaConfig } from "../config/kafka.config";

export const comsumeMessages=async(kafka:KafkaConfig)=>{
    try {
        await kafka.consume((message:string)=>{
            console.log("Message consumed: ",message);
        })
    } catch (error) {
        console.log("CONSUMEMESSAGES::ERROR",error);
    }
}