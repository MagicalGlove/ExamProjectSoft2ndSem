import express from 'express';
import { PaymentCredentials } from './paymentCredentials.ts';
import { pay } from './stripePaymentServiceAdapter.ts';

const paymentRouter = express.Router();

paymentRouter.post('/validatePayment', async (req, res) => {
    try {
        const paymentCredentials: PaymentCredentials = req.body;
        const { price, customerId, cardNumber } = paymentCredentials;
        const response = await pay(price, customerId);

        if (response) {
            res.status(200).json({
                message: 'Payment was successfully validated',
            });
        } else {
            res.status(400).json({
                message: 'Failed to validate payment',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error validating payment' });
    }
});

export { paymentRouter };
