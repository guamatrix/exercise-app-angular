import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/UI.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  maxDate: Date;
  showSpinner = false;
  private subscription: Subscription;
  constructor(private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit() {
    this.initForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.subscription = this.uiService.loadingSatteChanged.subscribe(isRequesStart => this.showSpinner = isRequesStart);
  }

  initForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] } ),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      born: new FormControl(null, { validators: [Validators.required] }),
      agree: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    const { email, password } = this.signupForm.value;
    this.authService.registredUser({ email, password });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
