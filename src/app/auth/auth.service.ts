import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.module';
import { AuthData } from './auth-date.module';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/UI.service';

@Injectable()
export class AuthService {
  private isLogin = false;
  public authChange = new Subject<boolean>();

  constructor(private route: Router,
    private afAuth: AngularFireAuth,
    private trainginSv: TrainingService,
    private uiService: UIService) {}

  initAuthListerner() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isLogin = true;
        this.authChange.next(true);
        this.route.navigate(['']);
      } else {
        this.isLogin = false;
        this.authChange.next(false);
        this.trainginSv.cancelSubscription();
        this.route.navigate(['/login']);
      }
    });
  }

  registredUser(authData: AuthData) {
    this.uiService.loadingSatteChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingSatteChanged.next(false);
        console.log(result);
      }).catch(error => {
        this.uiService.loadingSatteChanged.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingSatteChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(resp => {
        this.uiService.loadingSatteChanged.next(false);
        console.log(resp);
      }).catch(error => {
        this.uiService.loadingSatteChanged.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
      }).catch(error => {
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  isAuth() {
    return this.isLogin;
  }
}
