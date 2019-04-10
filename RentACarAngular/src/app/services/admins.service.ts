import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { User } from '../models/User';
import { Manufacturer } from '../models/Manufacturer';
import { Model } from '../models/Model';
import { Car } from '../models/Car';
import { DetailedOrder } from '../models/DetailedOrder';
import { OrdersSearch } from '../models/OrdersSearch';

@Injectable({
    providedIn: 'root'
})
export class AdminsService {
    public adminUrl = baseUrl + "admin/";
    public allCars: Car[];

    public constructor(private http: HttpClient) { }

    public getAllOrders(ordersSearch: OrdersSearch): Observable<DetailedOrder[]> {
        return this.http.post<DetailedOrder[]>(this.adminUrl + "orders", ordersSearch);
    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.adminUrl + "users");
    }

    public getAllCarsByModel(modelId: number): Observable<Car[]> {
        return this.http.get<Car[]>(this.adminUrl + "all-cars/" + modelId);
    }

    public getOneManufacturer(manufacturerId: number): Observable<Manufacturer> {
        return this.http.get<Manufacturer>(this.adminUrl + "manufacturers/" + manufacturerId);
    }

    public addManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
        return this.http.post<Manufacturer>(this.adminUrl + "manufacturers", manufacturer);
    }

    public updateManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
        return this.http.put<Manufacturer>(this.adminUrl + "manufacturers/" + manufacturer.id, manufacturer);
    }

    public deleteManufacturer(manufacturerId: number): Observable<any> {
        return this.http.delete(this.adminUrl + "manufacturers/" + manufacturerId);
    }

    public addModel(model: Model): Observable<Model> {
        return this.http.post<Model>(this.adminUrl + "models", model);
    }

    public updateModel(model: Model): Observable<Model> {
        return this.http.put<Model>(this.adminUrl + "models/" + model.id, model);
    }

    public deleteModel(modelId: number): Observable<any> {
        return this.http.delete(this.adminUrl + "models/" + modelId);
    }

    public getOneModel(modelId: number): Observable<Manufacturer> {
        return this.http.get<Manufacturer>(this.adminUrl + "models/" + modelId);
    }

    public saveImageInServer(file): Observable<string> {
        return this.http.post<string>(this.adminUrl + "models" + "/image", file);
    }

    public addCar(car: Car): Observable<Car> {
        return this.http.post<Car>(this.adminUrl + "cars", car);
    }

    public updateCar(car: Car): Observable<Car> {
        return this.http.put<Car>(this.adminUrl + "cars/" + car.id, car);
    }

    public deleteCar(carId: number): Observable<any> {
        return this.http.delete(this.adminUrl + "cars/" + carId);
    }

    public getOneCar(carId: number): Observable<Car> {
        return this.http.get<Car>(this.adminUrl + "cars/" + carId);
    }

    public getAllModels(): Observable<Model[]> {
        return this.http.get<Model[]>(this.adminUrl + "models");
    }
    
    public getAllCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.adminUrl + "cars");
    }
}
