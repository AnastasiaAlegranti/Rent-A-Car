import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/admins.service';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { CarsService } from 'src/app/services/cars.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Model } from 'src/app/models/Model';

@Component({
    selector: 'app-manufacturers',
    templateUrl: './manufacturers.component.html',
    styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {
    public allManufacturers: Manufacturer[];
    public manufacturerToDelete = new Manufacturer();
    public manufacturerToAdd = new Manufacturer();
    public manufacturerToUpdate = new Manufacturer();
    public message: string;
    public messageAddManufacturer: string;
    public messageUpdateManufacturer: string;
    public messageDeleteManufacturer: string;

    public constructor(private adminsService: AdminsService, private carsService: CarsService, private modalService: NgbModal) { }

    public ngOnInit() {
        this.getAllManufacturers();
    }

    public getAllManufacturers(): void {
        let ob = this.carsService.getAllManufacturers();
        ob.subscribe(m => this.allManufacturers = m);
    }

    public getManufacturerById() {
        let ob = this.adminsService.getOneManufacturer(this.manufacturerToDelete.id);
        ob.subscribe(m => this.manufacturerToDelete = m);
    }

    public addManufacturer(): void {
        let ob = this.adminsService.addManufacturer(this.manufacturerToAdd);
        ob.subscribe(m => {
            this.manufacturerToAdd = m;
            this.messageAddManufacturer = `Manufacturer ${this.manufacturerToAdd.name} is added.`;
            this.getAllManufacturers();
        },
            response => this.messageAddManufacturer = `${response.message}`);
    }

    public updateManufacturer(): void {
        let ob = this.adminsService.updateManufacturer(this.manufacturerToUpdate);
        ob.subscribe(m => {
            this.manufacturerToUpdate = m;
            this.messageUpdateManufacturer = `Manufacturer ${this.manufacturerToUpdate.name} id:${this.manufacturerToUpdate.id} updated.`;
            this.getAllManufacturers();
        },
            response => this.messageUpdateManufacturer = `${response.message}`);
    }

    public deleteManufacturer(): void {
        this.messageDeleteManufacturer = null;
        let manufacturerModels:Model[];
        this.carsService.getAllModelsByManufacturer(this.manufacturerToDelete.id).subscribe(models => {
            manufacturerModels = models;//Bring all manufacturerToDelete models
            if (manufacturerModels.length>0) {//Check if manufacturerToDelete have models
                this.messageDeleteManufacturer = "It is forbidden to delete manufacturer that have models.";
            }
            else {//If manufacturerToDelete have no models- delete manufacturer.
                let ob = this.adminsService.deleteManufacturer(this.manufacturerToDelete.id);
                ob.subscribe(() => {
                    this.messageDeleteManufacturer = "Delete completed.";
                    this.getAllManufacturers()
                },
                    response => this.messageDeleteManufacturer = `${response.message}`
                );
            }
        })
    }

    public open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
}
