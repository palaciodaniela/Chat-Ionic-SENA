import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { user } from "../models/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFirestore, private AFauth: AngularFireAuth) { }

  async createUser(user:user){ // almacena el usuario en firestore
    return this.db.collection('Users')
      .doc(user.uid)
      .set(user)
      .then(res => {
        return res
      })
      .catch(err =>{
        throw err
      })
  }

  async getAuthenticatedUserInfo(){
    let uid = this.AFauth.auth.currentUser.uid
    let userInfo: user
    if (uid){
      return this.db.collection('Users').doc(uid).valueChanges()
    }else{
      throw Error('Usuario no autenticado')
    }
  }

}
