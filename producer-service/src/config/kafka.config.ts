import { Admin, Kafka, Message, Producer } from "kafkajs";

export class KafkaConfig{
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;
    constructor(brokers:string[]){
        this.kafka = new Kafka({
            clientId: 'producer-service',
            brokers: brokers
        });
        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
    }
    async connect(){
        try {
            await this.producer.connect();
            await this.admin.connect();
        } catch (error) {
            console.log("KAFKACONFIG::CONNECT::ERROR",error);
        }
    }
    async createTopic(topic:string){
        try {
            const topicExists=await this.admin.listTopics()
            if(!topicExists.includes(topic)){
                await this.admin.createTopics({
                topics: [{topic}]
                });
                console.log("Topic created");
            }else{
            console.log("Topic already created");
            }
        } catch (error) {
            console.log("KAFKACONFIG::CREATETOPIC::ERROR",error);
        }
    }
    //produce messages
    async produceMessages(topic:string, messages:Message[]){
        try {
            await this.producer.send({
                topic,
                messages
            })
            console.log("Messages sent successfully");
        } catch (error) {
            console.log("KAFKACONFIG::PRODUCEMESSAGES::ERROR",error);
            
        }
    }
    async disconnect(){
        try {
            await this.producer.disconnect();
            await this.admin.disconnect();
        } catch (error) {
            console.log("KAFKACONFIG::DISCONNECT::ERROR",error);
        }
    }
}
