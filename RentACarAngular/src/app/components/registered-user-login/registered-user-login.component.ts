import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Credentials } from 'src/app/models/Credentials';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registered-user-login',
  templateUrl: './registered-user-login.component.html',
  styleUrls: ['./registered-user-login.component.css']
})
export class RegisteredUserLoginComponent {

    public credentials = new Credentials();
    public user = new User();
    public loginMessage: string;
    public isLocalStorage = false;

    public constructor(private loginService: LoginService, private location: Location) { }

    public login(): void {
        this.loginMessage="";
        let ob = this.loginService.login(this.credentials);
        ob.subscribe(user => {
            if (user) {
                let storage = this.isLocalStorage ? localStorage : sessionStorage;
                this.loginService.storage = storage;
                storage.setItem("User", JSON.stringify(user));
                this.loginService.isLoggedIn = true;
                this.loginService.isAdmin = (user.role === "Admin");
                this.location.back();//navigate to last page
            }
            else {
                this.loginMessage = "Incorrect username or password";
            }
        }, response => this.loginMessage="Some error occure. Please try again."
        );
    }

    public initializeMessage(){
        this.loginMessage=null;
    }

}
