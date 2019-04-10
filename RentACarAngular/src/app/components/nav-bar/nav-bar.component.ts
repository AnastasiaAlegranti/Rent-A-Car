import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  {    

  constructor(public loginService:LoginService) { }

  public logout():void{
      let storage=this.loginService.storage;
      storage.removeItem("User");
      this.loginService.isLoggedIn=false;
      this.loginService.isAdmin=false;
  }
}
