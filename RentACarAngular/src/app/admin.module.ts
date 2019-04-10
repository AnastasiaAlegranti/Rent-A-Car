import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './components/admins-components/admin/admin.component';
import { AllUsersComponent } from './components/admins-components/all-users/all-users.component';
import { AllOrdersComponent } from './components/admins-components/all-orders/all-orders.component';
import { FormsModule } from "@angular/forms";
import { ManufacturersComponent } from './components/admins-components/manufacturers/manufacturers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModelsComponent } from './components/admins-components/models/models.component';
import { CarsComponent } from './components/admins-components/cars/cars.component';
import { CarToAddComponent } from './components/admins-components/car-to-add/car-to-add.component';
import { CarToDeleteComponent } from './components/admins-components/car-to-delete/car-to-delete.component';
import { CarToUpdateComponent } from './components/admins-components/car-to-update/car-to-update.component';
import { AdminsMenuComponent } from './components/admins-components/admins-menu/admins-menu.component';


const routes: Routes = [
    {
        path: "", component: AdminComponent,
        children: [
            { path: "users", component: AllUsersComponent },
            { path: "orders", component: AllOrdersComponent },
            { path: "manufacturers", component: ManufacturersComponent },
            { path: "models", component: ModelsComponent },
            { path: "cars", component: CarsComponent },
            { path: "", redirectTo: "users", pathMatch: "full" },
        ]
    }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        NgbModule
    ],
    declarations: [
        AdminComponent,
        AllUsersComponent,
        AllOrdersComponent,
        ManufacturersComponent,
        ModelsComponent,
        CarsComponent,
        CarToAddComponent,
        CarToDeleteComponent,
        CarToUpdateComponent,
        AdminsMenuComponent,
    ]
})
export class AdminModule { }
