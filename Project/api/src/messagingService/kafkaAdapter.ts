import { Kafka, Producer, Consumer } from 'kafkajs';
import MessageBroker from './types/types.ts';

export class KafkaAdapter implements MessageBroker {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private readonly topic: string;

    constructor(
        brokers: string[],
        clientId: string,
        groupId: string,
        topic: string
    ) {
        this.kafka = new Kafka({
            clientId,
            brokers,
        });

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId });
        this.topic = topic;
    }

    // Adapter method for sending events
    async sendEvent(eventType: string, payload: any): Promise<void> {
        await this.producer.connect();

        try {
            await this.producer.send({
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
            });
        } finally {
            await this.producer.disconnect();
        }
    }

    // Adapter method for consuming events
    async consumeEvents(
        handler: (eventType: string, payload: any) => void
    ): Promise<void> {
        await this.consumer.connect();
        await this.consumer.subscribe({
            topic: this.topic,
            fromBeginning: false,
        });

        await this.consumer.run({
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

                await this.consumer.commitOffsets([
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
