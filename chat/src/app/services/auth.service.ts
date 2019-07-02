import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { UsersService } from "./users.service";
import { user } from '../models/users';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private AFauth: AngularFireAuth,
              private usersService: UsersService,
              private gplus: GooglePlus,
              private platform: Platform) {}

  // pregunta al servidor por los datos, retorna en caso de que la respuesta sea positiva
  async login(email:string, password:string){
      await this.AFauth.auth.signInWithEmailAndPassword(email, password).then(
        res=>{
          return res;
        }
      ).catch(
        err=>{
          throw err;
        }
      )
  }

  // autentificación para iniciar sesión
  async logout(){
    await this.AFauth.auth.signOut()
      .then(res => {
          return res
        }
      ).catch(
        err=>{
          throw err;
        }
      )
  }

  // autentificación para registrarse
  async signup(email:string, password:string, name:string){
    let uid : string
    let error_user_info: boolean = false
    await this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(
      res=>{
        //console.log(res.user.uid)
        uid = res.user.uid
      }
    ).catch(
      err=>{
        throw err;
      }
    )
    let userInfo: user = {
      img: "",
      name: name,
      uid: uid
    }
    
    await this.usersService.createUser(userInfo)
      .then(resp => {
        return resp // inserta el nuevo usuario en la base de datos
      })
      .catch(error => {
        throw error
      })
  }

  async googleLogin() {
    if (this.platform.is('cordova')) {//funciona dependiendo de la plataforma 
      return await this.nativeGooglePlusLogin(); //para celular
    } else {
      return await this.webGooglePlusLogin(); //para navegadores
    }
  }

  async googleSignup(uid:string, name:string, img:string){// almacena los datos del usuario en un diccionario para luego insertalo en firestore
    let userInfo: user = {
      img: img,
      name: name,
      uid: uid 
    }
    
    await this.usersService.createUser(userInfo)
      .then(resp => {
        return resp 
      })
      .catch(error => {
        throw error
      })
  }

  async nativeGooglePlusLogin(){
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '109568563866-0ifhc0njnb09a7v9lg92kgekffgit3a5.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      const credential = await this.AFauth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)// se autentica en firebase
        )
      return await this.googleSignup(// datos del usuario autenticado
        credential.user.uid,
        credential.user.displayName,
        credential.user.photoURL)
    } catch(err) {
      console.log(err)
    }
  }
  
  async webGooglePlusLogin(){
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.AFauth.auth.signInWithPopup(provider);
      return await this.googleSignup(
        credential.user.uid,
        credential.user.displayName,
        credential.user.photoURL)
    } catch(err) {
      console.log(err)
    }
    
  }
}
