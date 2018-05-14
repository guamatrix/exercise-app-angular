import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/UI.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  suscription: Subscription[] = [];
  isLoading = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingSv: TrainingService,
    private uiService: UIService) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.suscription.push(this.trainingSv.historyExerciseChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    ));
    this.suscription.push(this.uiService.loadingSatteChanged.subscribe(
      startrequest => this.isLoading = startrequest
    ));
    this.trainingSv.fetchCompleteOrCancelledExercises();
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.suscription.length > 0) {
      this.suscription.map(sub => sub.unsubscribe());
    }
  }
}
