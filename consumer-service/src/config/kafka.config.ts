import { Consumer, Kafka, Message } from "kafkajs";

export class KafkaConfig{
    private kafka: Kafka;
    private consumer: Consumer;
    constructor(brokers:string[]){
        this.kafka = new Kafka({
            clientId: 'producer-service',
            brokers: brokers
        });
        this.consumer=this.kafka.consumer({
            groupId:"consumer-test-group"
        });
    }
    async connect(){
        try {
            await this.consumer.connect();
        } catch (error) {
            console.log("KAFKACONFIG::CONNECT::ERROR",error);
        }
    }
    //subscribe topics
    async subscribe(topic:string){
        try {
            await this.consumer.subscribe({
                topic,
                fromBeginning:true
            })
            console.log("Topic subscribed: ",topic);
        } catch (error) {
            console.log("KAFKACONFIG::SUBSCRIBETOPICS::ERROR",error);
        }
    }
    //message consuming
    async consume(onMessage:(message:string)=>void){
        try {
            await this.consumer.run({
                eachMessage:async({topic,partition,message})=>{
                    message?.value&&onMessage(message?.value?.toString());
                }
            })
        } catch (error) {
            console.log("KAFKACONFIG::CONSUMEMESSAGES::ERROR",error);
        }
    }
    async disconnect(){
        try {
            await this.consumer.disconnect();
        } catch (error) {
            console.log("KAFKACONFIG::DISCONNECT::ERROR",error);
        }
    }
}
