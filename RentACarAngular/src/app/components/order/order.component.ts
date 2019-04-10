import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { LoginService } from 'src/app/services/login.service';
import { Order } from 'src/app/models/Order';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    public order: Order;
    public message: string;

    public constructor(private carsService: CarsService, private loginService: LoginService, private usersService: UsersService) {
    }

    public ngOnInit() {
        this.order = this.carsService.order;
        this.order.userId = (JSON.parse(this.loginService.storage.getItem("User"))).userId;
        this.message = null;
    }

    public addOrder(): void {
        this.order.orderDate = new Date();
        this.order.orderDate.setHours(this.order.orderDate.getHours() - this.order.orderDate.getTimezoneOffset() / 60);//Sets the time difference between angular and DB
        let ob = this.usersService.addOrder(this.order);
        ob.subscribe(o => {
        this.order = o;
            this.message = "Your order completed."
        },
            () => { this.message = "Some error occured. Please try again later." });
    }
}
