import { Component} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public excistingUser = 1;

    public toExcistingUser() {
        this.excistingUser = 1;
    }
    public toNewUser(){
        this.excistingUser = null;
    }
}


