import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { Car } from 'src/app/models/Car';
import { AdminsService } from 'src/app/services/admins.service';
import { CarsService } from 'src/app/services/cars.service';

@Component({
    selector: 'app-car-to-update',
    templateUrl: './car-to-update.component.html',
    styleUrls: ['./car-to-update.component.css']
})
export class CarToUpdateComponent implements OnInit {
    public allModels: Model[];
    public allManufacturers: Manufacturer[];
    public carToUpdate = new Car();
    public messageUpdateCar: string;
    public allCars: Car[];
    public manufacturerId: number;

    public constructor(private adminsService: AdminsService, private carsService: CarsService) {
        this.allCars = this.adminsService.allCars;
    }

    public ngOnInit() {
        this.getAllManufacturers();
        this.getAllModels();
    }

    public getAllManufacturers(): void {
        let ob = this.carsService.getAllManufacturers();
        ob.subscribe(m => this.allManufacturers = m);
    }

    public getAllModels(): void {
        let ob = this.adminsService.getAllModels();
        ob.subscribe(m => this.allModels = m);
    }

    public getAllModelsByManufacturer(): void {
        let ob = this.carsService.getAllModelsByManufacturer(this.manufacturerId);
        ob.subscribe(m => {
            this.carToUpdate.modelID = undefined;
            this.carToUpdate.id = undefined;
            this.allModels = m;
        });
    }

    public getAllCarsByModel(): void {
        let ob = this.adminsService.getAllCarsByModel(this.carToUpdate.modelID);
        ob.subscribe(c => {
            this.carToUpdate.id = undefined;
            this.allCars = c;
        });
    }

    public getCarById(): void {
        let ob = this.adminsService.getOneCar(this.carToUpdate.id);
        ob.subscribe(c => this.carToUpdate.licenseNumber = c.licenseNumber);
    }

    public updateCar(): void {
        let ob = this.adminsService.updateCar(this.carToUpdate);
        ob.subscribe(c => {
            this.carToUpdate = c;
            this.messageUpdateCar = `Car ${this.carToUpdate.licenseNumber} is updated.`;
        },
            response => this.messageUpdateCar = `${response.message}`);
    }
}
