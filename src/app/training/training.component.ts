import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  imTraining = false;
  subscription: Subscription;
  constructor(private trainingSv: TrainingService) { }

  ngOnInit() {
    this.subscription = this.trainingSv.selectedExercise.subscribe(
      (exercise: Exercise) => {
        this.imTraining = exercise != null;
      }
    );
  }
}
