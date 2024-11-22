import { ObjectId } from "mongodb";

export interface FeedbackData {
    foodRating: number;
    overallRating: number;
    deliveryRating: number;
    orderId: ObjectId;
}