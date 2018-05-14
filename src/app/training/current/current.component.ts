import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ConfirmStopDialog } from './confirm-stop-dialog.component';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: number;
  suscription: Subscription;
  exercise: Exercise;
  constructor(private dialog: MatDialog, private traingingSv: TrainingService) { }

  ngOnInit() {
    this.exercise = this.traingingSv.getRunningExercise();
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.exercise.duration / 100 * 1000;
    this.timer = window.setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        this.traingingSv.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogref = this.dialog.open(ConfirmStopDialog, {
      data: {
        progress: this.progress
      }
    });

    this.suscription = dialogref.afterClosed().subscribe(
      result => {
        if (result) {
          this.traingingSv.cancelExercise(this.progress);
        } else {
          this.startOrResumeTimer();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

}
