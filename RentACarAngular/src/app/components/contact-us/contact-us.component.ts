import { Component, OnInit } from '@angular/core';
import { ContactUsMessageModel } from 'src/app/models/ContactUsMessageModel';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
    public messageToUser: string;
    public addSuccessImage = 0;
    public contactUsMessageModel = new ContactUsMessageModel();
    public isLoggedIn: boolean;
    public storage;

    constructor(private contactUsService: ContactUsService, private loginService: LoginService, private router: Router) { }

    public ngOnInit(): void {
        this.messageToUser = null;
        this.addSuccessImage = 0;
        this.getUserId();
    }

    public getUserId(): void {//If logged in- get user id
        if (this.loginService.isLoggedIn)
            this.contactUsMessageModel.userId = JSON.parse(this.loginService.storage.getItem("User")).userId;
    }

    public send(): void {
        this.messageToUser = null;
        this.addSuccessImage = 0;
        this.contactUsMessageModel.messageDate = new Date();
        this.contactUsMessageModel.messageDate.setHours(this.contactUsMessageModel.messageDate.getHours() - this.contactUsMessageModel.messageDate.getTimezoneOffset() / 60);//Sets the time difference between angular and DB      

        const ob = this.contactUsService.addContactUsMessage(this.contactUsMessageModel);
        ob.subscribe(cum => {
            this.messageToUser = "Your message has been successfully sent.";
            this.addSuccessImage = 1;
            setTimeout(() => {//After 8 seconds navigate to home page
                this.router.navigate(["/home"]);
            },
                8000);
        }, response => {
            this.messageToUser = "Some error occur... Please try later.";
            setTimeout(() => {
                this.messageToUser = null;
            },
                8000);
        }
        );
    }
}
