export enum OrderStatusEnum {
    Created,
    Rejected,
    Accepted,
    OnItsWay,
    Complete,
}

export function OrderStatusTextEnum(status: number): string {
    switch (status) {
        case (status = OrderStatusEnum.Created):
            return 'Pending...'; // Created

        case (status = OrderStatusEnum.Accepted):
            return 'Accepted';

        case (status = OrderStatusEnum.Rejected):
            return 'Rejected';

        case (status = OrderStatusEnum.OnItsWay):
            return 'On Its Way';

        case (status = OrderStatusEnum.Complete):
            return 'Complete';

        default:
            return 'Unknown';
    }
}
