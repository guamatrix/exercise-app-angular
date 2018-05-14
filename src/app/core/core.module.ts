import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from '../auth/auth.service';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/UI.service';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { environment } from '../../environments/environment';

const COMPONENTS = [
  WelcomeComponent,
  NavigationComponent,
  HeaderComponent,
  SidenavListComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AuthModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  exports: [
    AppRoutingModule,
    BrowserModule,
    COMPONENTS,
    BrowserAnimationsModule
  ],
  providers: [AuthService, TrainingService, UIService],
})

export class CoreModule {}
