import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth"; //para saber si el usuario esta autenticado
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth, public router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.AFauth.authState.pipe(
        map( auth => {
          console.log(auth)
          if(!isNullOrUndefined(auth)){
            return true
          }else{
            this.router.navigate(['/']) 
            return false
          }
          })
        )
      
    }
  
}
