import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/Credentials';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public isLoggedIn: boolean;
    public isAdmin: boolean;
    private loginUrl = baseUrl + "login";
    private registerUrl = baseUrl + "register";
    public storage=JSON.parse(localStorage.getItem("User")) ?localStorage : sessionStorage;   

    public constructor(private http: HttpClient) {
        let storage = this.storage;
        let user: User = JSON.parse(storage.getItem("User"));
        if (user) {
            this.isLoggedIn = true;
            if (user.role == "Admin") {
                this.isAdmin = true;
            }
        }
    }

    public login(credentials: Credentials): Observable<User> {
        return this.http.post<User>(this.loginUrl, credentials);
    }
    public addUser(user: User): Observable<User> {
        return this.http.post<User>(this.registerUrl, user);
    }
}
