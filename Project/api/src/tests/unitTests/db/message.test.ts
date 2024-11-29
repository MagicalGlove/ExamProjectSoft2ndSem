import { KafkaAdapter } from '../../../messagingService/kafkaAdapter.ts';
import { Kafka } from 'kafkajs';

jest.mock('kafkajs', () => {
    return {
        Kafka: jest.fn().mockImplementation(() => {
            return {
                producer: jest.fn().mockReturnValue({
                    connect: jest.fn(),
                    send: jest.fn(),
                    disconnect: jest.fn(),
                }),
                consumer: jest.fn().mockReturnValue({
                    connect: jest.fn(),
                    subscribe: jest.fn(),
                    run: jest.fn(),
                    disconnect: jest.fn(),
                }),
            };
        }),
    };
});

describe('KafkaAdapter Functionality', () => {
    let kafkaAdapter: KafkaAdapter;
    const brokers = ['broker1:9092', 'broker2:9092'];
    const clientId = 'my-client-id';
    const groupId = 'my-group-id';
    const topic = 'my-topic';

    beforeAll(() => {
        kafkaAdapter = new KafkaAdapter(brokers, clientId, groupId, topic);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should initialize Kafka producer and consumer', () => {
        expect(Kafka).toHaveBeenCalledWith({ clientId, brokers });
        expect(kafkaAdapter).toBeDefined();
    });

    it('should send an event', async () => {
        const event = { type: 'OrderPlaced', payload: { orderId: '12345' } };
        await kafkaAdapter.sendEvent(event.type, event.payload);
        const producer = (Kafka as jest.Mock).mock.results[0].value.producer();
        const sentMessage = JSON.parse(
            producer.send.mock.calls[0][0].messages[0].value
        );

        expect(sentMessage).toEqual(
            expect.objectContaining({
                eventType: event.type,
                payload: event.payload,
                timestamp: expect.any(Number),
            })
        );
    });
});
