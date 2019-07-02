import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth, public router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.AFauth.authState.pipe(
        map( auth => {
          if(isNullOrUndefined(auth)){
            return true // si no esta logueado, podra ir al login y no al home
          }else{
            this.router.navigate(['/home'])
            return false // si esta logueado ira al home y no podra ir al login 
          }
          })
        )
      
    }
  
}
