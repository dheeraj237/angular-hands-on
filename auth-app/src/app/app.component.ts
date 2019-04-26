import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'auth-app';

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log('%c Authenticated ', 'background-color:green;color:white', user)
    })
  }

}
