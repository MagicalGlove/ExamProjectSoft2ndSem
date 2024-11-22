import { Express, Request, Response } from 'express';
import { sendEvent } from './kafkaAdapter.ts';

export function messagingRoutes(app: Express) {
    app.get('/example', async (req: Request, res: Response) => {
        try {
            // Example  Sending an "Order Placed" event
            await sendEvent('Order Placed', {
                orderId: '12345',
                userId: 'user1',
                deliveryAddress: '123 Main St',
                items: ['Pizza', 'Soda'],
            });
            res.json({ message: 'Event sent!' });
        } catch (error) {
            console.error('Error sending event:', error); // eslint-disable-line no-console
            res.status(500).json({ error: 'Server error' });
        }
    });

    app.post('/sendEvent', async (req: Request, res: Response) => {
        const _payload = req.body;
        const _eventType = req.query.eventType as string;
        try {
            await sendEvent(_eventType, _payload);
            res.json({ message: 'Event sent!' });
        } catch (error) {
            console.error('Error sending event:', error); // eslint-disable-line no-console
            res.status(500).json({ error: 'Server error' });
        }
    });
}
