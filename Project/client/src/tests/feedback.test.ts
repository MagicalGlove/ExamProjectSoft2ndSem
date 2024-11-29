import { submitFeedback } from '../api/orders';
import { feedbackOrderMock } from '../mocks/orders';

describe('feedback tests', () => {
    it('should throw error if any rating is null', async () => {
        try {
            await submitFeedback('', 1, 1, null);
        } catch (error) {
            expect(error.message).toEqual('Missing rating value');
        }

        try {
            await submitFeedback('', 1, null, 1);
        } catch (error) {
            expect(error.message).toEqual('Missing rating value');
        }

        try {
            await submitFeedback('', null, 1, 1);
        } catch (error) {
            expect(error.message).toEqual('Missing rating value');
        }
    });

    it('should return an order if successful submitted feedback', async () => {
        const response = await submitFeedback('673de997fa60e0a917658809', 1, 1, 1);

        expect(response).toEqual(feedbackOrderMock);
    });

    it('should throw error if the order id does not exist', async () => {
        try {
            await submitFeedback('', 1, 1, 1);
        } catch (error) {
            expect(error.message).toContain('failed to change order');
        }
    });
});