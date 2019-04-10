import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/admins.service';
import { User } from 'src/app/models/User';

@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
    public allUsers: User[];
    public filteredUsers: User[];
    public searchText: string;
    public message: string;

    public constructor(private adminsService: AdminsService) { }

    public ngOnInit() {
        this.getAllUsers();
    }

    public getAllUsers(): void {
        this.message = null;
        let ob = this.adminsService.getAllUsers();
        ob.subscribe(u => {
            this.allUsers = u;
            this.filteredUsers = u;
        });
    }

    public filterUsers(): void {
        this.message=null;
        this.searchText = this.searchText.toLowerCase();
        this.filteredUsers = this.allUsers.filter(c =>
            c.lastName.toLowerCase().includes(this.searchText) || c.firstName.toLowerCase().includes(this.searchText));
        if (!this.filteredUsers.length)
            this.message = "There is no users that matches this search..."
    }
}
