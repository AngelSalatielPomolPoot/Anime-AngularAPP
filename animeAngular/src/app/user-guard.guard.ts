import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioSesion } from '@app/interfaces/usuario-sesion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  token:string;
  constructor(private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.token=JSON.parse(sessionStorage.getItem('token'));
    if(!this.token){
      this.router.navigate(['auth/login']);
      return false;
    }else{
      return true;
    }
    
  }
  
}
