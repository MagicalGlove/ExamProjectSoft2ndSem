import { Kafka } from 'kafkajs';


const kafka = new Kafka({
    clientId: 'mtogo',  // unique client identifier for our app
    brokers: process.env.KAFKA_BROKERS?.split(',') || [],     // replace with the ipaddress and port of our Kafka brokers
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'mtogo' });

// Function to send an event (message)
async function sendEvent(eventType: string, payload: any) {
    await producer.connect();

    await producer.send({
        topic: 'test-topic',  // specify the topic to which you want to send events
        messages: [
            {
                value: JSON.stringify({ eventType, payload, timestamp: Date.now() }), // payload is your event data
            },
        ],
    });

    await producer.disconnect();
}

// Function to consume events from a topic
async function runConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: false }); // Start from the latest offset

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            // Parse the message value as JSON
            if (!message.value) {
                console.warn('Message value is null');
                return;
            }
            const event = JSON.parse(message.value.toString());
            const { eventType, payload } = event;

            switch (eventType) {
                case 'OrderPlaced':
                    console.log('Order Placed:', payload);
                    break;
                case 'OrderCancelled':
                    console.log('Order Cancelled:', payload);
                    break;

                case 'OrderDelivered':
                    console.log('Order Delivered:', payload);
                    break;
                default:
                    console.warn(`Unhandled event type: ${eventType}`);
            }
            // Processes the message so it doesn't get consumed again
            await consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
        },
    });
}

export { sendEvent,runConsumer };
