import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
    public allCars: Car[];
    public constructor(private adminsService: AdminsService) { }
    public ngOnInit() {
        this.adminsService.getAllCars().subscribe(c => { this.allCars = c; this.adminsService.allCars = c });
    }

}
