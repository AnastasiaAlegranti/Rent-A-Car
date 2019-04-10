import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { Car } from 'src/app/models/Car';
import { AdminsService } from 'src/app/services/admins.service';
import { CarsService } from 'src/app/services/cars.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-car-to-delete',
    templateUrl: './car-to-delete.component.html',
    styleUrls: ['./car-to-delete.component.css']
})
export class CarToDeleteComponent implements OnInit {
    public allModels: Model[];
    public allManufacturers: Manufacturer[];
    public allCars: Car[];
    public manufacturerId: number;
    public carToDelete = new Car();
    public messageDeleteCar: string;

    public constructor(private adminsService: AdminsService, private carsService: CarsService, private modalService: NgbModal) {
        this.allCars = this.adminsService.allCars;
    }

    public ngOnInit() {
        this.getAllManufacturers();
        this.getAllModels();
    }

    public getCarById() {
        let ob = this.adminsService.getOneCar(this.carToDelete.id);
        ob.subscribe(c => this.carToDelete.licenseNumber = c.licenseNumber);
    }

    public getAllModels(): void {
        let ob = this.adminsService.getAllModels();
        ob.subscribe(m => { this.allModels = m; });
    }

    public deleteCar(): void {
        this.messageDeleteCar = null;
        let ob = this.adminsService.deleteCar(this.carToDelete.id);
        ob.subscribe(() => {
        this.messageDeleteCar = "Delete completed.";
            this.getAllCarsByModel();//get updated array;
        },
            response => this.messageDeleteCar = `${response.message}`
        );
    }
    public open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    public getAllManufacturers(): void {
        let ob = this.carsService.getAllManufacturers();
        ob.subscribe(m => this.allManufacturers = m);
    }

    public getAllModelsByManufacturer(): void {
        let ob = this.carsService.getAllModelsByManufacturer(this.manufacturerId);
        ob.subscribe(m => {
            this.carToDelete.modelID = undefined;
            this.carToDelete.id = undefined;
            this.carToDelete.licenseNumber = undefined;
            this.allModels = m;
        });
    }

    public getAllCarsByModel(): void {
        let ob = this.adminsService.getAllCarsByModel(this.carToDelete.modelID);
        ob.subscribe(c => {
            this.carToDelete.id = undefined;
            this.allCars = c;
        });
    }
}
