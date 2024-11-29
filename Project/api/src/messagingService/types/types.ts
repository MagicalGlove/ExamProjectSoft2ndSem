export default interface MessageBroker {
    sendEvent(eventType: string, payload: any): Promise<void>;
    consumeEvents(
        handler: (eventType: string, payload: any) => void
    ): Promise<void>;
}
