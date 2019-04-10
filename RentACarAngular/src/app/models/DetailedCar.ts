import { Car } from "./Car";

export class DetailedCar extends Car {
    public constructor(
        id?: number,
        modelId?: number,
        licenseNumber?: string,
        public manufacturerName?: string,
        public modelName?: string,
        public modelImageName?: string,
        public modelPrice?: number,
        public startDate?: Date,
        public finishDate?: Date,
        public numberOfDays?: number,
        public totalCost?: number,
    ) { super(id, modelId, licenseNumber) }
}
