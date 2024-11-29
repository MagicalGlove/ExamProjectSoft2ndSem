import { GetOwnOrdersStatus } from '../api/orders';
import { deliveryOrdersMock } from '../mocks/orders';

describe('delivery employee tests', () => {
    it('correct delivery id should return orders', async () => {
        const correctDeliveryEmployeeID = '111';
        const res = await GetOwnOrdersStatus(correctDeliveryEmployeeID, 2);

        expect(res).toEqual(deliveryOrdersMock);
    });


    it('incorrect delivery id should throw error', async () => {
        const incorrectDeliveryEmployeeID = '';
        try {
            await GetOwnOrdersStatus(incorrectDeliveryEmployeeID, 2);
        } catch (error) {
            expect(error.message).toEqual('Failed to find orders by delivery employee ID')
        }
    });
});