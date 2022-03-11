import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard2Guard implements CanActivate {

  token:string;
  constructor(private router:Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.token=JSON.parse(sessionStorage.getItem('token'));
    if(this.token){
      this.router.navigate(['home']);
      return false;
    }else{
      return true;
    }
  }
  
}
