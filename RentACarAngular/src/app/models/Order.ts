export class Order {
    public constructor(
        public orderId?: number,
        public carId?: number,
        public userId?: number,
        public startDate?: Date,
        public finishDate?: Date,
        public orderDate?: Date,
        public totalCost?: number) { }
}
