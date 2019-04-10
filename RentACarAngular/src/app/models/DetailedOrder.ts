import { Order } from "./Order";

export class DetailedOrder extends Order {
    public constructor(
        orderId?: number,
        carId?: number,
        userId?: number,
        startDate?: Date,
        finishDate?: Date,
        orderDate?: Date,
        totalCost?: number,
        public manufacturerId?: number,
        public modelId?: number,
        public manufacturerName?: string,
        public modelName?: string,
        public modelImageName?: string,
        public firstName?: string,
        public lastName?: string, ) { super(orderId, carId, userId, startDate, finishDate, orderDate, totalCost) }
}
