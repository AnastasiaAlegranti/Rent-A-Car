import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-new-register',
    templateUrl: './new-register.component.html',
    styleUrls: ['./new-register.component.css']
})
export class NewRegisterComponent {
    public user = new User();
    public loginMessage: string;
    public isLocalStorage = false;

    public constructor(private loginService: LoginService, private router: Router, private location: Location) { }

    public addUser(): void {
        this.loginMessage = "";
        this.user.role = "user";
        let ob = this.loginService.addUser(this.user);
        ob.subscribe(user => {
            if (user) {
                let storage = this.isLocalStorage ? localStorage : sessionStorage;
                storage.setItem("User", JSON.stringify(user));
                this.loginService.storage = storage;
                this.loginService.isLoggedIn = true;
                this.location.back();//navigate to last page
            }
        },
            response => {
                this.loginMessage = `${response.error.errors }`;//if user name taken or some else error
            });
    }
    public initializeMessage() {
        this.loginMessage = null;
    }
}