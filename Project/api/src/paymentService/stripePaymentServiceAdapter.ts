import { Stripe } from 'stripe';
import { PaymentStrategy } from './types/payment.ts';

export class StripePaymentStrategy implements PaymentStrategy {
    private readonly apiKey =
        'sk_test_51Q9kMkFpImY9hrD4SNtwYUp8z7y411DmXJ2sA3ahnPxmGcUT34ylDpJSVArqQpRVlkmFHFsXzkwszTi7cJaPEwR500E6HrAWDf';

    private readonly stripe = new Stripe(this.apiKey);
    async pay(amount: number, customerId: string): Promise<boolean> {
        try {
            const stripeUserId = await this.stripe.customers.create({
                name: customerId,
            });
            const paymentMethod = await this.stripe.paymentMethods.create({
                type: 'card',
                card: { token: 'tok_visa' },
            });
            await this.stripe.paymentMethods.attach(paymentMethod.id, {
                customer: stripeUserId.id,
            });
            await this.stripe.paymentIntents.create({
                amount,
                currency: 'dkk',
                payment_method: paymentMethod.id,
                customer: stripeUserId.id,
                confirm: true,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never',
                },
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
