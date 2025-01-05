import request from "supertest";
import { Order } from "../../monolithOrderAndFeedback/Order.ts";
import { AppDataSource } from "../../ormconfig.ts";
import app from "../../index.ts";
import { mockOrderCreate } from "../mocks/orderMocksDB.ts";
import { KafkaAdapter } from "../../adapters/kafkaAdapter.ts";

describe("System Test - Create Order Flow", () => {
    let kafkaAdapter: KafkaAdapter;
    const receivedEvents: any[] = [];

  beforeAll(async () => {
    await AppDataSource.initialize();

    // Initialize Kafka adapter matching the application settings
    kafkaAdapter = new KafkaAdapter(
        'order-service',
        'order-service-group',
        'restaurant_topic'
    );

    // Start consuming events
    kafkaAdapter.consumeEvents((eventType, payload) => {
        receivedEvents.push({ eventType, payload });
    });
  });

  afterAll(async () => {
    
  });

  it("should create an order and publish an event", async () => {
    const orderRepository = AppDataSource.getRepository(Order);

    const { customerID, restaurantID, orderItemList, address, totalPrice, timestamp} = mockOrderCreate;

    const orderDetails = {
      customerID,
      restaurantID,
      orderItemList,
      address,
      totalPrice,
      timestamp
  };

    const response = await request(app).post("/createOrder").send(orderDetails);

    // Validate API response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    const createdOrderID = response.body._id;

    // Validate order is saved in the database
    const savedOrder = await orderRepository.findOne(createdOrderID);
    expect(savedOrder).toBeDefined();
    expect(savedOrder?.totalPrice).toBe(mockOrderCreate.totalPrice);
    expect(savedOrder?.status).toBe(0);

     // Wait for Kafka events to be consumed
     await new Promise((resolve) => setTimeout(resolve, 1000));

     // Validate Kafka event
     expect(receivedEvents.length).toBeGreaterThan(0);
     const orderEvent = receivedEvents.find((e) => e.eventType === 'order');
     expect(orderEvent).toBeDefined();
     expect(orderEvent.payload).toMatchObject({
         customerID: mockOrderCreate.customerID.toString(),
         restaurantID: mockOrderCreate.restaurantID.toString(),
         totalPrice: mockOrderCreate.totalPrice,
        });
  });
});
