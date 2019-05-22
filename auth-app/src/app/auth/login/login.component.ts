import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: firebase.User;
  constructor(
    private service: LoginService
  ) { }

  ngOnInit() {
    this.service.getLoggedInUser()
      .subscribe(user => {
        this.user = user;
      })
  }


  login(pltfrm) {
    console.log('Login...');
    this.service.login(pltfrm);
  }

  logout() {
    console.log('Logging out...');
    this.service.logout();
  }

}
