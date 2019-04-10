import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { DetailedCar } from 'src/app/models/DetailedCar';
import { imagesFolder } from 'src/environments/environment';
import { CarsSearch } from 'src/app/models/CarsSearch';
import { Order } from 'src/app/models/Order';
import { NgbDateStruct, NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.component.html',
    styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
    public car: DetailedCar;
    public imagesFolder: string;
    public search: CarsSearch;
    public order = new Order();
    public unavailableDates: Date[];
    public start: NgbDateStruct;//start date in datepicker
    public end: NgbDateStruct;//end date in datepicker
    public minDateStart = this.isMinDateStart();//minimum start date in datepicker
    public minDateEnd = this.isMinDateEnd();//minimum end date in datepicker
    public maxDateEnd = this.isMaxDateEnd();//maximum end date in datepicker

    public message: string = "";

    public constructor(private carsService: CarsService, config: NgbDatepickerConfig) {
        // days that don't belong to current month are not visible in calendar
        config.outsideDays = 'hidden';
    }

    public ngOnInit() {
        this.imagesFolder = imagesFolder;//Images folder address from environment
        this.search = this.carsService.search;
        this.getOneCar();// Get car by search
        this.getUnavailableDates();//Get car unavailable dates
    }

    public setOrder(): void {
        this.order.carId = this.car.id;
        this.order.startDate = this.car.startDate;
        this.order.finishDate = this.car.finishDate;
        this.order.totalCost = this.car.totalCost;
        this.carsService.order = this.order;
    }

    public getUnavailableDates(): void {
        let ob = this.carsService.getBookedDates(this.search.carID);
        ob.subscribe(d => this.unavailableDates = d);
    }

    public isDisabledList = (date: NgbDateStruct) => {//Mark unavailable dates in datepicker
        for (let i = 0; i < this.unavailableDates.length; i++) {
            this.unavailableDates[i] = new Date(this.unavailableDates[i]);// New is for .getDate() function
            if (date.day == this.unavailableDates[i].getDate() && (date.month - 1) == this.unavailableDates[i].getMonth() && date.year == this.unavailableDates[i].getFullYear()) {
                return true;
            }
        }
        return false;
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
        }// If start date selected- minimum end date is startdate plus one.
        let date = new NgbDate(this.start.year, this.start.month, this.start.day + 1);
        return date;
    }

    public isMaxDateEnd(): NgbDate {//Set maximum end date
        if (this.start && this.unavailableDates) {//If start date selected- maximum end date is first unavailable date after start date
            for (let i = 0; i < this.unavailableDates.length; i++) {
                if (this.unavailableDates[i] >= this.search.startDate) {
                    let maxDateEnd = new NgbDate(this.unavailableDates[i].getFullYear(), this.unavailableDates[i].getMonth() + 1, this.unavailableDates[i].getDate());
                    return maxDateEnd;
                }
            }
            return new NgbDate(2048, 12, 31);// If start date not selected
        }
    }
    public getOneCar(): void {
        this.message = "";
        let today = new Date();
        if (this.start != null) {//Set search.startDate if selected new start date in car details
            let temple = new Date(this.start.year, this.start.month - 1, this.start.day, today.getHours(), today.getMinutes());
            this.search.startDate = new Date(temple.getUTCFullYear(), temple.getUTCMonth(), temple.getUTCDate(), temple.getUTCHours(), temple.getUTCMinutes());
        }
        if (this.end != null) {//Set search.finishDate if selected new finish date in car details
            let temple = new Date(this.end.year, this.end.month - 1, this.end.day, today.getHours(), today.getMinutes());
            this.search.finishDate = new Date(temple.getUTCFullYear(), temple.getUTCMonth(), temple.getUTCDate(), temple.getUTCHours(), temple.getUTCMinutes());
        }
        let ob = this.carsService.getOneCar(this.search);//Get details 
        ob.subscribe(c => {
            this.car = c;
            //Sets datepickers 
            if (this.search.startDate) {//Sets datepickers 
                this.start = new NgbDate(this.search.startDate.getFullYear(), this.search.startDate.getMonth() + 1, this.search.startDate.getDate());
                this.minDateEnd = this.isMinDateEnd();
                this.maxDateEnd = this.isMaxDateEnd();
            }
            if (this.search.finishDate) {
                this.end = new NgbDate(this.search.finishDate.getFullYear(), this.search.finishDate.getMonth() + 1, this.search.finishDate.getDate());
            }            
            if (!this.car) {
                this.message = "Those dates are not available."
            }
        });
    }
}
