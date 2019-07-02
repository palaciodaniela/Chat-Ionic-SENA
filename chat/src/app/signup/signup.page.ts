import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name: string;
  email: string;
  password: string;
  repassword: string;
  
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit() {
  }

  onSubmitSignUp(){
    if (this.password == this.repassword){
      this.authService.signup(this.email, this.password, this.name)
      .then(
        res=>{
          this.router.navigate(['home/'])// si el usuario ya se autentifico, se dirigue al home x
        },
        err=>{
          alert(err)
        }
      )
    }else{
      console.log("Las contraseñas ingresadas no coinciden")
    }

  }
  
  returntoHome(){
    this.router.navigate(['home/'])
  }
}
