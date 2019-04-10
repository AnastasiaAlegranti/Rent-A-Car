import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/User';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  public constructor(private router:Router, private loginService:LoginService) { }

  public canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
      let storage=this.loginService.storage;      
      let user:User=JSON.parse(storage.getItem("User"));
      if(!user){
          this.router.navigate(["/login"]);
          return false;
      }
      return true;
  }
}
