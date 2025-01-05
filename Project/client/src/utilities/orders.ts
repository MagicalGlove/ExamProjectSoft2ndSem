export enum OrderStatusEnum {
    Created,
    Rejected,
    Accepted,
    OnItsWay,
    Complete,
}

export function OrderStatusTextEnum(status: number): string {
    switch (status) {
        case OrderStatusEnum.Created:
            return 'Pending...';

        case OrderStatusEnum.Accepted:
            return 'Accepted';

        case OrderStatusEnum.Rejected:
            return 'Rejected';

        case OrderStatusEnum.OnItsWay:
            return 'On Its Way';

        case OrderStatusEnum.Complete:
            return 'Complete';

        default:
            return 'Unknown';
    }
}
