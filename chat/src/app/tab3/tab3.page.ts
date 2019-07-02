import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";
import { user } from "../models/users";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  private userInfo: user

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService) {}
  
  ngOnInit(){
    this.userService.getAuthenticatedUserInfo().then(res => {
      res.subscribe(
        resUser => {
          console.log(resUser)
          this.userInfo = resUser as user
        }
      )
    }).catch(err => {
      console.log(err)
    })
  }

  logOff(){
    this.authService.logout()
      .then(res => {
        this.router.navigate(['/'])
      }
      ).catch(
        err=>{
          console.log(err)
        }
      )
  }
}
