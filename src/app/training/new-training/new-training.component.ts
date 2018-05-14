import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import 'rxjs/operator/map';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/UI.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  typesTaingins: Exercise[];
  formTraining: FormGroup;
  private subscription: Subscription[] = [];
  isLoading = true;

  constructor(private trainginSv: TrainingService, private uiServ: UIService) { }

  ngOnInit() {
    this.subscription.push(this.trainginSv.exerscisesChanged.subscribe(
      (exercises: Exercise[]) => this.typesTaingins = exercises
    ));

    this.subscription.push(this.uiServ.loadingSatteChanged.subscribe(startRequest => this.isLoading = startRequest));
    this.tryFetch();

    this.formTraining = new FormGroup({
      training: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSubmit() {
    console.log(this.formTraining.value.training);
    this.trainginSv.startExericise(this.formTraining.value.training);
  }
  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.map(sub => sub.unsubscribe());
    }
  }

  private tryFetch() {
    this.trainginSv.fetchAvailableExercise();
  }
}
