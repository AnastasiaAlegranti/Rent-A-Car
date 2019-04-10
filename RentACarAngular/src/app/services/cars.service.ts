import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailedCar } from '../models/DetailedCar';
import { CarsSearch } from '../models/CarsSearch';
import { baseUrl } from 'src/environments/environment';
import { Manufacturer } from '../models/Manufacturer';
import { Order } from '../models/Order';
import { Model } from '../models/Model';

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    public search: CarsSearch;
    public car: DetailedCar;
    public order: Order;

    constructor(private http: HttpClient) { };

    public getOneCar(search: CarsSearch): Observable<DetailedCar> {
        return this.http.post<DetailedCar>(baseUrl + "search-car", search);
    }

    public getBookedDates(carId: number): Observable<Date[]> {
        return this.http.get<Date[]>(baseUrl + "ordered-dates/" + carId);
    }

    public getAllCars(search: CarsSearch): Observable<DetailedCar[]> {
        return this.http.post<DetailedCar[]>(baseUrl + "search-vehicles", search);
    }

    public getAllManufacturers(): Observable<Manufacturer[]> {
        return this.http.get<Manufacturer[]>(baseUrl + "manufacturers");
    }
    public getAllModelsByManufacturer(manufacturerId:number): Observable<Model[]> {
        return this.http.get<Model[]>(baseUrl + "models/"+manufacturerId);
    }
}
