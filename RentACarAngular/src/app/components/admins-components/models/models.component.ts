import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { AdminsService } from 'src/app/services/admins.service';
import { CarsService } from 'src/app/services/cars.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { Car } from 'src/app/models/Car';

@Component({
    selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

    public allModelsInUpdate: Model[];
    public allModelsInDelete: Model[];
    public allManufacturers: Manufacturer[];
    public modelToDelete = new Model();
    public modelToAdd = new Model();
    public modelToUpdate = new Model();
    public messageAddModel: string;
    public messageUpdateModel: string;
    public messageDeleteModel: string;
    public file;

    public constructor(private adminsService: AdminsService, private carsService: CarsService, private modalService: NgbModal) { }

    public ngOnInit() {
        this.getAllModels();
        this.getAllManufacturers();
    }

    public getAllModels(): void {
        let ob = this.adminsService.getAllModels();
        ob.subscribe(m => {
            this.allModelsInDelete = m; this.allModelsInUpdate = m;
        });
    }

    public getAllManufacturers(): void {
        let ob = this.carsService.getAllManufacturers();
        ob.subscribe(m => this.allManufacturers = m);
    }

    public getAllModelsByManufacturer(event: any): void {
        let manufacturerId = event.target.value;
        let ob = this.carsService.getAllModelsByManufacturer(manufacturerId);
        ob.subscribe(m => {//Get all models when manufacturerId selected
            if (this.modelToUpdate.manufacturerId == manufacturerId) {//Check if manufacturerId selected in modelToUpdate
                this.modelToUpdate.id = undefined;
                this.allModelsInUpdate = m;
            }
            if (this.modelToDelete.manufacturerId == manufacturerId) {//Check if manufacturerId selected in modelToDelete
                this.modelToDelete.id = undefined;
                this.allModelsInDelete = m;
            }
        });
    }

    public updateModelsByManufacturer(manufacturerId: number): void {
        let ob = this.carsService.getAllModelsByManufacturer(manufacturerId);
        ob.subscribe(m => {//Update all models where manufacturerId already selected and equals to transferred parameter
            if (this.modelToUpdate.manufacturerId == manufacturerId) {
                this.modelToUpdate.id = undefined;
                this.allModelsInUpdate = m;
            }
            if (this.modelToDelete.manufacturerId == manufacturerId) {
                this.modelToDelete.id = undefined;
                this.allModelsInDelete = m;
            }
        });
    }

    public getModelById(event: any): void {
        let modelId = event.target.value;
        this.adminsService.getOneModel(modelId).subscribe(m => {
            (this.modelToUpdate.id) ? this.modelToUpdate = m : this.modelToDelete.name = m.name;
        })
    }

    public uploadImage(event): void {
        this.file = event.target.files[0];
    }

    public addModel(): void {
        console.log(this.modelToAdd);
        let observable = this.adminsService.saveImageInServer(this.file);
        observable.subscribe(newImageName => {
            this.modelToAdd.imageName = newImageName;//gets image new name from server.
            let ob = this.adminsService.addModel(this.modelToAdd);//add model.
            ob.subscribe(m => {
                this.modelToAdd = m;
                this.messageAddModel = `Model ${this.modelToAdd.name} is  added.`;
                if (this.modelToDelete.manufacturerId) {//Update all models in modelToDelete if manufacturerId already selected.
                    this.updateModelsByManufacturer(this.modelToDelete.manufacturerId);
                }
                if (this.modelToUpdate.manufacturerId) {//Update all models in modelToUpdate if manufacturerId already selected.
                    this.updateModelsByManufacturer(this.modelToUpdate.manufacturerId);
                }
            },
                response => this.messageAddModel = `${response.error.errors}+ in adding model process`);
            // If image successfully saved, and error occured in adding model- messageAddModel will have that error.
        }
            , response => {
                this.messageAddModel = response.error.errors + " in adding image process";// If was an error in saving image action- messageAddModel will have that error.
            });
    }

    public updateModel(): void {
        let observable = this.adminsService.saveImageInServer(this.file);
        observable.subscribe(newImageName => {
            this.modelToUpdate.imageName = newImageName;//gets image new name from server
            let ob = this.adminsService.updateModel(this.modelToUpdate);//updates model with new image name
            ob.subscribe(m => {
                this.modelToUpdate = m;
                this.messageUpdateModel = `Model ${this.modelToUpdate.name} id:${this.modelToUpdate.id} is updated.`;
                if (this.modelToDelete.manufacturerId) {//Update all models in modelToDelete if manufacturerId already selected.
                    this.updateModelsByManufacturer(this.modelToDelete.manufacturerId);
                }
                if (this.modelToUpdate.manufacturerId) {//Update all models in modelToUpdate if manufacturerId already selected.
                    this.updateModelsByManufacturer(this.modelToUpdate.manufacturerId);
                }
            },
                response => this.messageUpdateModel = `${response.error.errors} in updating model proccess`);     // If image successfully saved, and error occured in updating model- messageAddModel will have that error.
        }
            , response => {
                this.messageUpdateModel = response.error.errors + " in adding image process.";// If was an error in saving image action- messageAddModel will have that error.
            });
    }

    public deleteModel(): void {
        this.messageDeleteModel = null;
        let modelCars: Car[];
        this.adminsService.getAllCarsByModel(this.modelToDelete.id).subscribe(cars => {
            modelCars = cars;//Bring all modelToDelete cars
            if (modelCars.length > 0) {//Check if modelToDelete have cars
                this.messageDeleteModel = "It is forbidden to delete model that have cars.";
            }
            else {//If modelToDelete have no cars- delete model.
                let ob = this.adminsService.deleteModel(this.modelToDelete.id);
                ob.subscribe(() => {
                    this.messageDeleteModel = "Delete completed.";
                    this.updateModelsByManufacturer(this.modelToDelete.manufacturerId);//Update models in modelToDelete.
                    if (this.modelToUpdate.manufacturerId) {//Update all models in modelToUpdate if manufacturerId already selected.
                        this.updateModelsByManufacturer(this.modelToUpdate.manufacturerId);
                    }
                },
                    response => this.messageDeleteModel = `${response.error.errors}`
                );
            }
        })
    }

    public open(content) {//Open modal
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
}
