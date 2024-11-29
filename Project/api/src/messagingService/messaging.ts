import { Express, Request, Response } from 'express';
import { KafkaAdapter } from './kafkaAdapter.ts';
import MessageBroker from './types/types';
// Configure Kafka Adapter
const messageBroker: MessageBroker = new KafkaAdapter(
    process.env.KAFKA_BROKERS?.split(',') || [],
    'mtogo', //Name for the specific service for debugging purposes
    'mtogo-group', //Group name for the service, used for load balancing
    'test-topic' //Topic name for the service, used for message routing so that only relevant services receive the message
);

export function messagingRoutes(app: Express) {
    app.get('/example', async (req: Request, res: Response) => {
        try {
            await messageBroker.sendEvent('OrderPlaced', {
                orderId: 1234,
                customer: 'John Doe',
            });
        } catch (error) {
            console.error('Error sending event:', error); // eslint-disable-line no-console
            res.status(500).json({ error: 'Server error' });
        }
    });

    app.post('/sendEvent', async (req: Request, res: Response) => {
        const _payload = req.body;
        const _eventType = req.query.eventType as string;
        try {
            await messageBroker.sendEvent(_eventType, _payload);
            res.json({ message: 'Event sent!' });
        } catch (error) {
            console.error('Error sending event:', error); // eslint-disable-line no-console
            res.status(500).json({ error: 'Server error' });
        }
    });
}
