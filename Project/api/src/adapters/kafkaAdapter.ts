import { Kafka, Producer, Consumer } from 'kafkajs';
import MessageBroker from './types/types.ts';

export class KafkaAdapter implements MessageBroker {
    private static producer: Producer | undefined;
    private static consumer: Consumer | undefined;
    private kafka: Kafka;
    private readonly topic: string;
    private readonly groupId: string;

    constructor(clientId: string, groupId: string, topic: string) {
        const brokers = process.env.KAFKA_BROKERS?.split(',') || [];
        console.log('brokers:', brokers);
        this.kafka = new Kafka({
            clientId,
            brokers,
        });
        this.groupId = groupId;
        this.topic = topic;
    }

    getProducer() {
        if (!KafkaAdapter.producer) {
            KafkaAdapter.producer = this.kafka.producer();
            console.log('Creating new producer');
        }
        return KafkaAdapter.producer;
    }

    getConsumer(groupId: string) {
        if (!KafkaAdapter.consumer) {
            KafkaAdapter.consumer = this.kafka.consumer({ groupId: groupId });
            console.log('Creating new consumer');
        }
        return KafkaAdapter.consumer;
    }

    async sendEvent(eventType: string, payload: any): Promise<void> {
        const retries = 3;
        const producer = this.getProducer();

        try {
            await producer.connect();

            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const message = {
                        topic: this.topic,
                        messages: [
                            {
                                value: JSON.stringify({
                                    eventType,
                                    payload,
                                    timestamp: Date.now(),
                                }),
                            },
                        ],
                    };

                    await producer.send(message);
                    return;
                } catch (error) {
                    if (attempt === retries) {
                        throw error;
                    }
                    console.warn(`Attempt ${attempt} failed. Retrying...`);
                }
            }
        } finally {
            await producer.disconnect();
        }
    }

    async consumeEvents(
        handler: (eventType: string, payload: any) => void
    ): Promise<void> {
        const consumer = this.getConsumer(this.groupId);
        await consumer.connect();
        await consumer.subscribe({
            topic: this.topic,
            fromBeginning: false,
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (!message.value) {
                    console.warn('Message value is null');
                    return;
                }

                const event = JSON.parse(message.value.toString());
                const { eventType, payload } = event;

                try {
                    handler(eventType, payload);
                } catch (error) {
                    console.error(
                        `Error handling event type: ${eventType}`,
                        error
                    );
                }

                await consumer.commitOffsets([
                    {
                        topic,
                        partition,
                        offset: (Number(message.offset) + 1).toString(),
                    },
                ]);
            },
        });
    }
}