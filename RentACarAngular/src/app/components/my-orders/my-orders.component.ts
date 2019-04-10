import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/login.service';
import { DetailedOrder } from 'src/app/models/DetailedOrder';
import { imagesFolder } from 'src/environments/environment';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

    public myOrders: DetailedOrder[];
    public message: string;
    public imagesFolder: string;
    public constructor(private usersService: UsersService, private loginService: LoginService) { }

    public ngOnInit() {
        this.imagesFolder=imagesFolder;
        let ob = this.usersService.getAllOrdersByUser(JSON.parse(this.loginService.storage.getItem("User")).userId);
        ob.subscribe(o => {
            this.myOrders = o;
            if (!this.myOrders.length)
                this.message = "There is no orders yet...";
        });
    }
}
