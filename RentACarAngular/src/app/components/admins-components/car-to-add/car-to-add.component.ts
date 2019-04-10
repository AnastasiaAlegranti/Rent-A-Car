import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { Car } from 'src/app/models/Car';
import { AdminsService } from 'src/app/services/admins.service';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-to-add',
  templateUrl: './car-to-add.component.html',
  styleUrls: ['./car-to-add.component.css']
})
export class CarToAddComponent implements OnInit {
    public allModels: Model[];
    public allManufacturers: Manufacturer[];
    public carToAdd=new Car();
    public messageAddCar:string;
    public manufacturerId:number;       

    public constructor(private adminsService: AdminsService, private carsService:CarsService) { }

    public ngOnInit() {
        this.getAllManufacturers();
        this.getAllModels();
    }

    public getAllModels(): void {
        let ob = this.adminsService.getAllModels();
        ob.subscribe(m => {this.allModels=m });
    }    

    public addCar(): void {
        let ob = this.adminsService.addCar(this.carToAdd);
        ob.subscribe(c => {
            this.carToAdd = c;
            this.messageAddCar = `Car ${this.carToAdd.licenseNumber} is added.`;
        },
            response => this.messageAddCar =`${response.message}`);
    }

    public getAllManufacturers(): void {
        let ob = this.carsService.getAllManufacturers();
        ob.subscribe(m => this.allManufacturers = m);
    }

    public getAllModelsByManufacturer(): void {
        let ob = this.carsService.getAllModelsByManufacturer(this.manufacturerId);
        ob.subscribe(m => {         
            this.carToAdd.modelID = undefined; 
            this.carToAdd.id = undefined; 
            this.allModels = m;                
        });    
    }  
}
