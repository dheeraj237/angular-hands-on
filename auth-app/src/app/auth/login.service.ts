import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(pltfrm) {
    console.log('redirect to login provider....')
    if (pltfrm === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    } else if (pltfrm === 'github') {
      this.afAuth.auth.signInWithRedirect(new auth.GithubAuthProvider);
    }
  }

  getLoggedInUser() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
