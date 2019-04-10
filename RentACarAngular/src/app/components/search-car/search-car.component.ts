import { Component, OnInit } from '@angular/core';
import { DetailedCar } from 'src/app/models/DetailedCar';
import { CarsService } from 'src/app/services/cars.service';
import { CarsSearch } from 'src/app/models/CarsSearch';
import { imagesFolder } from 'src/environments/environment';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { NgbDateStruct, NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Model } from 'src/app/models/Model';

@Component({
    selector: 'app-search-car',
    templateUrl: './search-car.component.html',
    styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {
    public allCars: DetailedCar[];
    public search = new CarsSearch();
    public imagesFolder: string;
    public allManufacturers: Manufacturer[];
    public allModels: Model[];
    public start: NgbDateStruct;
    public end: NgbDateStruct;
    public minDateStart = this.isMinDateStart();//minimum start date in datepicker
    public minDateEnd = this.isMinDateEnd();//minimum end date in datepicker

    public constructor(private carsService: CarsService, config: NgbDatepickerConfig) {
        // days that don't belong to current month are not visible in calendar
        config.outsideDays = 'hidden';
    }

    ngOnInit() {
        this.imagesFolder = imagesFolder;//Images folder address from environment
        this.getAllCars();
        this.getAllManufacturers();
    }

    public isMinDateStart(): NgbDate {//Set minimum date for start date
        let toDay = new Date();
        let date = new NgbDate(toDay.getFullYear(), toDay.getMonth() + 1, toDay.getDate());
        return date;
    }

    public isMinDateEnd(): NgbDate {//Set minimum date for end date
        if (!this.start) {// If start date not selected- minimum end date is tomorrow
            let toDay = new Date();
            let date = new NgbDate(toDay.getFullYear(), toDay.getMonth() + 1, toDay.getDate() + 1);
            return date;
        }
        let date = new NgbDate(this.start.year, this.start.month, this.start.day + 1);// If start date selected- minimum end date is startdate plus one.
        return date;
    }

    public getAllCars(): void {
        let today = new Date();
        if (this.start != null) {//Set search.startDate if selected new start date
            let temple = new Date(this.start.year, this.start.month - 1, this.start.day, today.getHours(), today.getMinutes());
            this.search.startDate = new Date(temple.getUTCFullYear(), temple.getUTCMonth(), temple.getUTCDate(), temple.getUTCHours(), temple.getUTCMinutes());
        }
        if (this.end != null) {//Set search.andDate if selected new end date
            let temple = new Date(this.end.year, this.end.month - 1, this.end.day, today.getHours(), today.getMinutes());
            this.search.finishDate = new Date(temple.getUTCFullYear(), temple.getUTCMonth(), temple.getUTCDate(), temple.getUTCHours(), temple.getUTCMinutes());
        }
        if (this.search.manufacturerId) {
            this.getAllModelsByManufacturer();
        }
        this.minDateEnd = this.isMinDateEnd();//updates minimum end date
        let ob = this.carsService.getAllCars(this.search);//Get all available cars
        ob.subscribe(cars => this.allCars = cars);
        this.carsService.search = this.search;      
    }

    public getAllManufacturers(): void {
        let ob = this.carsService.getAllManufacturers();
        ob.subscribe(m => this.allManufacturers = m);
    }
    public getAllModelsByManufacturer(): void {
        let ob = this.carsService.getAllModelsByManufacturer(this.search.manufacturerId);
        ob.subscribe(m => this.allModels = m);
    }

    public getDetails(car: DetailedCar): void {
        this.search.carID = car.id;
        this.carsService.car = car;
        this.carsService.search = this.search;
    }
}
