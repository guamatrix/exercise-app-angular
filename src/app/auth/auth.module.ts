import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthRoutingModule } from './auth-routing.module';

const COMPONENTS = [
  SignupComponent,
  LoginComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class AuthModule {}
