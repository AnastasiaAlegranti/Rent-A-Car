import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/admins.service';
import { DetailedOrder } from 'src/app/models/DetailedOrder';
import { OrdersSearch } from 'src/app/models/OrdersSearch';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { Model } from 'src/app/models/Model';
import { User } from 'src/app/models/User';
import { CarsService } from 'src/app/services/cars.service';
import { imagesFolder } from 'src/environments/environment';
import { Car } from 'src/app/models/Car';

@Component({
    selector: 'app-all-orders',
    templateUrl: './all-orders.component.html',
    styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
    public ordersSearch = new OrdersSearch();
    public allOrders: DetailedOrder[];
    public allManufacturers: Manufacturer[];
    public allModels: Model[];
    public allCars: Car[];
    public allUsers: User[];
    public imagesFolder: string;
    public message: string;

    constructor(private adminsService: AdminsService, private carsService: CarsService) { }

    public ngOnInit() {
        this.getAllOrders();
        this.getAllManufacturers();
        this.getAllUsers();
        this.imagesFolder = imagesFolder;
    }

    public getAllOrders(): void {      
        this.allOrders = null;
        if (this.ordersSearch.manufacturerId) {
            this.getAllModels();
        }
        if (this.ordersSearch.modelId) {
            this.getAllCars();
        }
        let ob = this.adminsService.getAllOrders(this.ordersSearch);
        ob.subscribe(o => {          
            this.allOrders = o;           
            if (!this.allOrders.length) {
                this.message = "There is no orders for this search."
            }
            else{
                this.message = null;
            }
        });
    }

    public getAllManufacturers(): void {
        let ob = this.carsService.getAllManufacturers();
        ob.subscribe(m => this.allManufacturers = m);
    }

    public getAllModels(): void {
        let ob = this.carsService.getAllModelsByManufacturer(this.ordersSearch.manufacturerId);
        ob.subscribe(m => this.allModels = m);
    }
    
    public getAllCars(): void {
        let ob = this.adminsService.getAllCarsByModel(this.ordersSearch.modelId);
        ob.subscribe(c => this.allCars = c);
    }

    public getAllUsers(): void {
        let ob = this.adminsService.getAllUsers();
        ob.subscribe(u => this.allUsers = u);
    }
}
