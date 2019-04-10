import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { baseUrl } from 'src/environments/environment';
import { DetailedOrder } from '../models/DetailedOrder';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private addOrdersUrl = baseUrl + "orders";
    private ordersByUserUrl = baseUrl + "my-orders/";
    
    public constructor(private http: HttpClient) { };

    public addOrder(order:Order):Observable<Order>{
        return this.http.post<Order>(this.addOrdersUrl,order);
    }
    public getAllOrdersByUser(userId:number):Observable<DetailedOrder[]>{
        return this.http.get<DetailedOrder[]>(this.ordersByUserUrl+userId);
    }
}
