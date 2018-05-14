import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggle = new EventEmitter<void>();
  isLoged: boolean;
  suscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.suscription = this.authService.authChange
      .subscribe(
        (isAuth: boolean) => this.isLoged = isAuth
      );
  }

  onToggle() {
    this.toggle.emit();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}
