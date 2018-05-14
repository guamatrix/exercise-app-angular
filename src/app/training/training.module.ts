import { NgModule } from '@angular/core';

import { TrainingComponent } from '../training/training.component';
import { CurrentComponent } from '../training/current/current.component';
import { NewTrainingComponent } from '../training/new-training/new-training.component';
import { PastTrainingsComponent } from '../training/past-trainings/past-trainings.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmStopDialog } from '../training/current/confirm-stop-dialog.component';
import { TrainingRoutingModule } from './training-routing.module';


const COMPONENT = [
  TrainingComponent,
  CurrentComponent,
  NewTrainingComponent,
  PastTrainingsComponent,
  ConfirmStopDialog
];

@NgModule({
  declarations: [
    COMPONENT
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  exports: [
    COMPONENT
  ],
  entryComponents: [ConfirmStopDialog]
})

export class TrainingModule {}

