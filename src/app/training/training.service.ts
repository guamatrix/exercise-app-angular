import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/UI.service';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[];
  private runningExercise: Exercise;
  exerscisesChanged = new Subject<Exercise[]>();
  selectedExercise = new Subject<Exercise>();
  historyExerciseChanged = new Subject<Exercise[]>();
  private subscription: Subscription[] = [];

  constructor(private db: AngularFirestore,
    private uiService: UIService) {}

  fetchAvailableExercise() {
    this.uiService.loadingSatteChanged.next(true);
    this.db.firestore.settings({timestampsInSnapshots: true});
    this.subscription.push(this.db.collection('availableExercise')
      .snapshotChanges()
      .map(resultArray => {
        // throw ( Error());
        return resultArray.map(res => {
            return {
              id: res.payload.doc.id,
              name: res.payload.doc.data().name,
              duration: res.payload.doc.data().duration,
              calories: res.payload.doc.data().calories
            };
          });
        }
      ).subscribe((exercise: Exercise[]) => {
        this.uiService.loadingSatteChanged.next(false);
        this.availableExercises = exercise;
        this.exerscisesChanged.next([ ...this.availableExercises ]);
      }, error => {
        this.uiService.loadingSatteChanged.next(false);
        this.uiService.showSnackBar(error, null, 3000);
        this.exerscisesChanged.next(null);
      }
    ));
  }

  startExericise(selectedId: string) {
    // this.db.doc(`availableExercise/${selectedId}`).update({lastSelected: new Date()}); this way we can add properties to the document
    const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.runningExercise = selectedExercise;
    this.selectedExercise.next({ ...selectedExercise });
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.selectedExercise.next(null);
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.selectedExercise.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompleteOrCancelledExercises() {
    this.uiService.loadingSatteChanged.next(true);
    this.subscription.push(this.db.collection('finishedExercises').valueChanges().subscribe(
      (exercise: Exercise[]) => {
        this.uiService.loadingSatteChanged.next(false);
        this.historyExerciseChanged.next(exercise);
      }, error => {
        this.uiService.showSnackBar(error, null, 3000);
        this.uiService.loadingSatteChanged.next(false);
      }
    ));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
      .then(
        resp => {
          console.log(resp);
        }
      ).catch(error => {
        console.log(error);
      });
  }

  cancelSubscription() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
