import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service"; // clase de autentificación del usuario
import { Router } from "@angular/router"; // tiene metodos para navegar entre paginas
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router, private fb: Facebook) { 

  }

  ngOnInit() {
  }

  //evento para loguearse
  onSubmitLogin(){
    this.authService.login(this.email, this.password)
      .then(
        res=>{
          this.router.navigate(['home/'])
        },
        err=>{
          alert(err)//Muestra una alerta en caso de que los datos sean incorrectos o no exista el usuario
        }
      )
  }

  toSignUp(){
    this.router.navigate(['signup/'])
  }

  //metodo para ingresar con google
  gmailLogin(){
    this.authService.googleLogin()
    .then(
      res=>{
        this.router.navigate(['home/']) // va al home
      },
      err=>{
        alert(err)
      }
    )
  }

  //metodo para ingresar con facebook
  facebookLogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(
      (res: FacebookLoginResponse) =>{ 
        console.log('Logged into Facebook!', res)
        this.router.navigate(['home/'])
      }).catch(e => console.log('Error logging into Facebook', e));
  
  this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }
}
